import { Background, Controls, MiniMap, ReactFlow, type Edge, type Node } from '@xyflow/react'
import { useMemo, useState } from 'react'
import type { PlotlineGraph, PlotlineNode } from '../types'
import { GraphDetail } from './GraphDetail'

const colors: Record<string, string> = { main: '#b88a0a', villain: '#c7504a', intimacy: '#c85d8b', relation: '#4f83b9', case: '#349284', retired: '#858585' }

export function StageFlowView({ graph }: { graph: PlotlineGraph }) {
  const [selected, setSelected] = useState<PlotlineNode | null>(null)
  const [query, setQuery] = useState('')
  const stageIndex = useMemo(() => new Map(graph.stages.map((stage, index) => [stage.id, index])), [graph.stages])
  const groupIndex = useMemo(() => new Map(graph.groups.map((group, index) => [group.id, index])), [graph.groups])
  const model = useMemo(() => {
    const counts = new Map<string, number>()
    const plotNodes: Node[] = graph.nodes.filter((item) => item.stages.length).map((item) => {
      const column = Math.min(...item.stages.map((stage) => stageIndex.get(stage) ?? 0))
      const key = `${column}:${item.group}`
      const row = counts.get(key) || 0
      counts.set(key, row + 1)
      return {
        id: item.id,
        position: { x: column * 310 + 28, y: (groupIndex.get(item.group) || 0) * 112 + row * 64 + 78 },
        data: { label: <div className="flow-card"><span>{item.id}</span><strong>{item.title}</strong></div> },
        style: { width: 250, minHeight: 50, borderColor: colors[item.kind] || colors.relation, background: `color-mix(in srgb, ${colors[item.kind] || colors.relation} 15%, var(--surface))`, color: 'var(--text)', borderRadius: 9, fontSize: 11 },
        zIndex: 2,
      }
    })
    const canvasHeight = Math.max(920, ...plotNodes.map((node) => node.position.y + 120))
    const stageNodes: Node[] = graph.stages.map((stage, column) => ({
      id: `stage:${stage.id}`,
      position: { x: column * 310, y: 0 },
      data: { label: <div className="stage-card"><strong>{stage.label}</strong><span>{stage.title}</span></div> },
      style: { width: 300, height: canvasHeight, border: '1px solid var(--line)', borderRadius: 12, background: 'color-mix(in srgb, var(--surface-2) 32%, transparent)', color: 'var(--text)', alignItems: 'flex-start', paddingTop: 14 },
      draggable: false,
      selectable: false,
      zIndex: 0,
    }))
    const ids = new Set(plotNodes.map((node) => node.id))
    const edges: Edge[] = graph.edges.filter((edge) => ids.has(edge.from) && ids.has(edge.to)).map((edge, index) => ({ id: `stage-edge-${index}`, source: edge.from, target: edge.to, type: 'smoothstep', style: { stroke: 'var(--line)' }, markerEnd: { type: 'arrowclosed' as const, color: 'var(--line)' } }))
    return { nodes: [...stageNodes, ...plotNodes], edges }
  }, [graph, groupIndex, stageIndex])
  const visibleNodes = useMemo(() => query.trim() ? model.nodes.map((node) => node.id.startsWith('stage:') ? node : ({ ...node, hidden: !graph.nodes.find((item) => item.id === node.id)?.title.toLowerCase().includes(query.toLowerCase()) && !node.id.toLowerCase().includes(query.toLowerCase()) })) : model.nodes, [graph.nodes, model.nodes, query])

  return (
    <section className="view">
      <div className="view-heading"><div><h1>阶段—剧情节点编排</h1><p>横向六阶段泳道；节点只按首次调用放置，连线保留正式上下游。</p></div><label className="search">搜索<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="剧情节点" /></label></div>
      <div className="graph-layout"><div className="flow-shell"><ReactFlow nodes={visibleNodes} edges={model.edges} onNodeClick={(_, node) => setSelected(graph.nodes.find((item) => item.id === node.id) || null)} fitView minZoom={0.12} maxZoom={2}><Background gap={18} size={1} /><MiniMap pannable zoomable nodeColor={(node) => node.id.startsWith('stage:') ? 'var(--surface-2)' : colors[graph.nodes.find((item) => item.id === node.id)?.kind || 'relation']} /><Controls /></ReactFlow></div><GraphDetail detail={selected ? { id: selected.id, label: selected.title, kind: selected.type, description: selected.position, path: selected.path, facts: [{ label: '阶段', value: selected.stages.map((id) => graph.stages.find((stage) => stage.id === id)?.label || id).join(' · ') }, { label: '上游', value: selected.upstream.join('、') }, { label: '下游', value: selected.downstream.join('、') }] } : null} /></div>
    </section>
  )
}
