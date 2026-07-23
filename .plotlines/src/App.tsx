import { lazy, Suspense, useMemo, useState } from 'react'
import rawData from './generated/story-data.json'
import type { ViewEdge, ViewNode } from './components/CytoscapeView'
import type { StoryData } from './types'

const CytoscapeView = lazy(() => import('./components/CytoscapeView').then((module) => ({ default: module.CytoscapeView })))
const StageFlowView = lazy(() => import('./components/StageFlowView').then((module) => ({ default: module.StageFlowView })))
const CoverageView = lazy(() => import('./components/CoverageView').then((module) => ({ default: module.CoverageView })))

const data = rawData as StoryData
type ViewId = 'stages' | 'relationships' | 'coverage' | 'cases' | 'chapters' | 'clues'

const nav: { id: ViewId; label: string; group: string }[] = [
  { id: 'stages', label: '剧情编排', group: '剧情' },
  { id: 'relationships', label: '人物关系', group: '人物' },
  { id: 'coverage', label: '人物×剧情', group: '人物' },
  { id: 'cases', label: '案件责任链', group: '世界' },
  { id: 'chapters', label: '章节消费链', group: '待数据' },
  { id: 'clues', label: '线索生命周期', group: '待数据' },
]

function relationshipModel(): { nodes: ViewNode[]; edges: ViewEdge[] } {
  const names = new Set(data.relationships.flatMap((edge) => [edge.source, edge.target]))
  const degrees = new Map<string, number>()
  data.relationships.forEach((edge) => {
    degrees.set(edge.source, (degrees.get(edge.source) || 0) + 1)
    degrees.set(edge.target, (degrees.get(edge.target) || 0) + 1)
  })
  const root = [...names].sort((a, b) => (degrees.get(b) || 0) - (degrees.get(a) || 0))[0]
  const direct = new Set(data.relationships.flatMap((edge) => edge.source === root ? [edge.target] : edge.target === root ? [edge.source] : []))
  const ordered = [...names].filter((name) => name !== root).sort((a, b) => Number(direct.has(b)) - Number(direct.has(a)) || (degrees.get(b) || 0) - (degrees.get(a) || 0) || a.localeCompare(b))
  const inner = ordered.filter((name) => direct.has(name))
  const outer = ordered.filter((name) => !direct.has(name))
  const positions = new Map<string, { x: number; y: number }>([[root, { x: 650, y: 520 }]])
  inner.forEach((name, index) => {
    const angle = (Math.PI * 2 * index) / inner.length - Math.PI / 2
    positions.set(name, { x: 650 + Math.cos(angle) * 430, y: 520 + Math.sin(angle) * 330 })
  })
  outer.forEach((name, index) => {
    const angle = (Math.PI * 2 * index) / outer.length - Math.PI / 2
    positions.set(name, { x: 650 + Math.cos(angle) * 610, y: 520 + Math.sin(angle) * 470 })
  })
  return {
    nodes: data.characters.filter((character) => names.has(character.name)).map((character) => ({ id: character.name, label: character.name, kind: 'character', description: character.role || character.identity, path: character.path, x: positions.get(character.name)?.x, y: positions.get(character.name)?.y, facts: [{ label: '编号', value: character.id }, { label: '身份', value: character.identity }, { label: '契约', value: character.contractStatus }] })),
    edges: data.relationships.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target, label: edge.relation, kind: 'relationship' })),
  }
}

function derivedModel(graph: StoryData['cases']): { nodes: ViewNode[]; edges: ViewEdge[] } {
  return {
    nodes: graph.nodes.map((node) => ({ ...node, description: node.description || '', facts: node.status ? [{ label: '状态', value: node.status }] : undefined })),
    edges: graph.edges.map((edge) => ({ ...edge, label: edge.relation })),
  }
}

function DeferredView({ kind }: { kind: 'chapters' | 'clues' }) {
  const state = data.deferred[kind]
  return <section className="empty-view"><div><span>数据门禁</span><h1>{kind === 'chapters' ? '章节消费链' : '线索生命周期'}</h1><p>{state.count ? `已发现 ${state.count} 条正式数据，可启用该视图。` : '当前没有正式数据，不从模板或施工层生成空图谱。'}</p></div></section>
}

export default function App() {
  const hash = window.location.hash.slice(1)
  const initial = (hash === 'dependencies' ? 'stages' : hash) as ViewId
  const [view, setView] = useState<ViewId>(nav.some((item) => item.id === initial) ? initial : 'stages')
  const relationships = useMemo(relationshipModel, [])
  const cases = useMemo(() => derivedModel(data.cases), [])
  let content
  if (view === 'stages') content = <StageFlowView graph={data.plotlines} />
  else if (view === 'relationships') content = <CytoscapeView {...relationships} layout="preset" title="人物关系图" subtitle="核心人物居中、直接关系在内圈；点击人物后才显示关系说明。" />
  else if (view === 'coverage') content = <CoverageView data={data} />
  else if (view === 'cases') content = <CytoscapeView {...cases} title="案件与责任链" subtitle="聚合案件／反派节点、正式参与人物及世界观依据。" />
  else content = <DeferredView kind={view} />

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span>STORY STARS</span><strong>剧情图谱</strong></div>
        {[...new Set(nav.map((item) => item.group))].map((group) => <div className="nav-group" key={group}><span>{group}</span>{nav.filter((item) => item.group === group).map((item) => { const deferred = item.id === 'chapters' ? data.deferred.chapters : item.id === 'clues' ? data.deferred.clues : null; return <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => { window.location.hash = item.id; setView(item.id) }}>{item.label}{deferred && !deferred.enabled && <small>待数据</small>}</button> })}</div>)}
        <div className="source-note"><span>派生数据</span><strong>{data.plotlines.meta.nodeCount} 剧情节点</strong><strong>{data.characters.length} 人物</strong><code>{data.plotlines.meta.fingerprint.slice(0, 12)}</code></div>
      </aside>
      <main className="content"><Suspense fallback={<div className="loading">正在加载图谱…</div>}>{content}</Suspense></main>
    </div>
  )
}
