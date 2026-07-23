import { lazy, Suspense, useMemo, useState } from 'react'
import rawData from './generated/story-data.json'
import type { ViewEdge, ViewNode } from './components/CytoscapeView'
import type { StoryData } from './types'

const CytoscapeView = lazy(() => import('./components/CytoscapeView').then((module) => ({ default: module.CytoscapeView })))
const StageFlowView = lazy(() => import('./components/StageFlowView').then((module) => ({ default: module.StageFlowView })))

const data = rawData as StoryData
type ViewId = 'dependencies' | 'stages' | 'relationships' | 'coverage' | 'cases' | 'abilities' | 'chapters' | 'clues'

const nav: { id: ViewId; label: string; group: string }[] = [
  { id: 'dependencies', label: '剧情依赖', group: '剧情' },
  { id: 'stages', label: '阶段编排', group: '剧情' },
  { id: 'relationships', label: '人物关系', group: '人物' },
  { id: 'coverage', label: '人物×剧情', group: '人物' },
  { id: 'cases', label: '案件责任链', group: '世界' },
  { id: 'abilities', label: '能力机制', group: '世界' },
  { id: 'chapters', label: '章节消费链', group: '待数据' },
  { id: 'clues', label: '线索生命周期', group: '待数据' },
]

function dependencyModel(): { nodes: ViewNode[]; edges: ViewEdge[] } {
  const stageIndex = new Map(data.plotlines.stages.map((stage, index) => [stage.id, index]))
  const groupIndex = new Map(data.plotlines.groups.map((group, index) => [group.id, index]))
  const positioned = data.plotlines.nodes.map((node) => {
    const columns = node.stages.map((stage) => stageIndex.get(stage)).filter((value): value is number => value != null)
    return { node, column: columns.length ? Math.min(...columns) : data.plotlines.stages.length - 1 }
  })
  const plotlineNodes = positioned.sort((a, b) => a.column - b.column || (groupIndex.get(a.node.group) || 0) - (groupIndex.get(b.node.group) || 0) || a.node.id.localeCompare(b.node.id)).map(({ node, column }, _, items) => {
    const row = items.slice(0, items.findIndex((item) => item.node.id === node.id)).filter((item) => item.column === column).length
    return { id: node.id, label: `${node.id}\n${node.title}`, kind: node.kind, description: node.position, path: node.path, x: 155 + column * 350, y: 122 + row * 86, facts: [{ label: '类型', value: node.type }, { label: '状态', value: node.status }, { label: '阶段', value: node.stages.map((id) => data.plotlines.stages.find((stage) => stage.id === id)?.label || id).join(' · ') || '未分配' }, { label: '上游', value: node.upstream.join('、') }, { label: '下游', value: node.downstream.join('、') }] }
  })
  const stageNodes = data.plotlines.stages.map((stage, column) => ({ id: `stage:${stage.id}`, label: `${stage.label} · ${stage.title || ''}`, kind: 'stage', x: 155 + column * 350, y: 54 }))
  const nodes = [...stageNodes, ...plotlineNodes]
  return { nodes, edges: data.plotlines.edges.map((edge, index) => ({ id: `dependency-${index}`, source: edge.from, target: edge.to })) }
}

function relationshipModel(): { nodes: ViewNode[]; edges: ViewEdge[] } {
  const names = new Set(data.relationships.flatMap((edge) => [edge.source, edge.target]))
  return {
    nodes: data.characters.filter((character) => names.has(character.name)).map((character) => ({ id: character.name, label: character.name, kind: 'character', description: character.role || character.identity, path: character.path, facts: [{ label: '编号', value: character.id }, { label: '身份', value: character.identity }, { label: '契约', value: character.contractStatus }] })),
    edges: data.relationships.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target, label: edge.relation, kind: 'relationship' })),
  }
}

function coverageModel(): { nodes: ViewNode[]; edges: ViewEdge[] } {
  const characterNames = [...new Set(data.coverage.map((edge) => edge.character))]
  const plotlineIds = [...new Set(data.coverage.map((edge) => edge.plotline))]
  const characters = new Map(data.characters.map((item) => [item.name, item]))
  const plotlines = new Map(data.plotlines.nodes.map((item) => [item.id, item]))
  return {
    nodes: [
      ...characterNames.map((name, index) => ({ id: `character:${name}`, label: name, kind: 'character', path: characters.get(name)?.path, description: characters.get(name)?.role, x: 100, y: 60 + index * 72 })),
      ...plotlineIds.map((id, index) => ({ id: `plotline:${id}`, label: `${id}  ${plotlines.get(id)?.title || ''}`, kind: 'plotline', path: plotlines.get(id)?.path, description: plotlines.get(id)?.position, x: 520, y: 50 + index * 58 })),
    ],
    edges: data.coverage.map((edge) => ({ id: edge.id, source: `character:${edge.character}`, target: `plotline:${edge.plotline}` })),
  }
}

function derivedModel(graph: StoryData['cases'] | StoryData['abilities']): { nodes: ViewNode[]; edges: ViewEdge[] } {
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
  const initial = window.location.hash.slice(1) as ViewId
  const [view, setView] = useState<ViewId>(nav.some((item) => item.id === initial) ? initial : 'dependencies')
  const dependency = useMemo(dependencyModel, [])
  const relationships = useMemo(relationshipModel, [])
  const coverage = useMemo(coverageModel, [])
  const cases = useMemo(() => derivedModel(data.cases), [])
  const abilities = useMemo(() => derivedModel(data.abilities), [])
  let content
  if (view === 'dependencies') content = <CytoscapeView {...dependency} layout="preset" readableStart directed title="剧情节点依赖图" subtitle="正式节点的上下游结构；默认保持文字可读，可切换到全图概览。" />
  else if (view === 'stages') content = <StageFlowView graph={data.plotlines} />
  else if (view === 'relationships') content = <CytoscapeView {...relationships} title="人物关系图" subtitle="仅从正式人物主卡的「关系定调」表生成。" />
  else if (view === 'coverage') content = <CytoscapeView {...coverage} layout="preset" title="人物—剧情节点覆盖" subtitle="人物名在正式节点中出现时建立参与边，用于查看戏份与线路分布。" />
  else if (view === 'cases') content = <CytoscapeView {...cases} title="案件与责任链" subtitle="聚合案件／反派节点、正式参与人物及世界观依据。" />
  else if (view === 'abilities') content = <CytoscapeView {...abilities} layout="breadthfirst" title="星辰契约能力机制" subtitle="人物 → 契约星辰 → 权柄 → 公共机制与边界。" />
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
