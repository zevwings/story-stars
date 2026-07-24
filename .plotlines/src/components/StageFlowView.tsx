import { Background, Controls, Position, ReactFlow, type Edge, type Node } from '@xyflow/react'
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
    const columnOf = (item: PlotlineNode) => item.stages.length ? Math.min(...item.stages.map((stage) => stageIndex.get(stage) ?? graph.stages.length)) : graph.stages.length
    const counts = new Map<number, number>()
    const ordered = [...graph.nodes].sort((a, b) => {
      const aColumn = columnOf(a)
      const bColumn = columnOf(b)
      return aColumn - bColumn || (groupIndex.get(a.group) || 0) - (groupIndex.get(b.group) || 0) || a.id.localeCompare(b.id)
    })
    const plotNodes: Node[] = ordered.map((item) => {
      const column = columnOf(item)
      const row = counts.get(column) || 0
      counts.set(column, row + 1)
      return {
        id: item.id,
        position: { x: column * 330 + 30 + (row % 2) * 14, y: row * 76 + 82 },
        data: { label: <div className="flow-card"><span>{item.id}</span><strong>{item.title}</strong></div> },
        style: { width: 260, minHeight: 54, borderColor: colors[item.kind] || colors.relation, background: `color-mix(in srgb, ${colors[item.kind] || colors.relation} 15%, var(--surface))`, color: 'var(--text)', borderRadius: 9, fontSize: 11 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        zIndex: 2,
      }
    })
    const canvasHeight = Math.max(920, ...plotNodes.map((node) => node.position.y + 120))
    const lanes = [...graph.stages, { id: 'unassigned', label: '未编排', title: '等待阶段调用' }]
    const stageNodes: Node[] = lanes.map((stage, column) => ({
      id: `stage:${stage.id}`,
      position: { x: column * 330, y: 0 },
      data: { label: <div className="stage-card"><strong>{stage.label}</strong><span>{stage.title}</span></div> },
      style: { width: 320, height: canvasHeight, border: '1px solid var(--line)', borderRadius: 12, background: 'color-mix(in srgb, var(--surface-2) 32%, transparent)', color: 'var(--text)', alignItems: 'flex-start', paddingTop: 14 },
      draggable: false,
      selectable: false,
      zIndex: 0,
    }))
    const ids = new Set(plotNodes.map((node) => node.id))
    const edges: Edge[] = graph.edges.filter((edge) => ids.has(edge.from) && ids.has(edge.to)).map((edge, index) => ({ id: `stage-edge-${index}`, source: edge.from, target: edge.to, type: 'smoothstep', style: { stroke: 'var(--line)' }, markerEnd: { type: 'arrowclosed' as const, color: 'var(--line)' } }))
    return { nodes: [...stageNodes, ...plotNodes], edges }
  }, [graph, groupIndex, stageIndex])
  const highlightedIds = useMemo(() => {
    if (!selected) return null
    const ids = new Set([selected.id])
    model.edges.forEach((edge) => {
      if (edge.source === selected.id) ids.add(edge.target)
      if (edge.target === selected.id) ids.add(edge.source)
    })
    return ids
  }, [model.edges, selected])
  const visibleNodes = useMemo(() => model.nodes.map((node) => {
    if (node.id.startsWith('stage:')) return node
    const plotline = graph.nodes.find((item) => item.id === node.id)
    const hidden = query.trim() ? !plotline?.title.toLowerCase().includes(query.toLowerCase()) && !node.id.toLowerCase().includes(query.toLowerCase()) : false
    const isSelected = selected?.id === node.id
    const isDimmed = highlightedIds != null && !highlightedIds.has(node.id)
    return {
      ...node,
      hidden,
      style: {
        ...node.style,
        opacity: isDimmed ? 0.12 : 1,
        borderWidth: isSelected ? 3 : 1,
        borderColor: isSelected ? 'var(--accent)' : node.style?.borderColor,
        boxShadow: isSelected ? '0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent)' : 'none',
      },
    }
  }), [graph.nodes, highlightedIds, model.nodes, query, selected])
  const visibleEdges = useMemo(() => model.edges.map((edge) => {
    const isNeighbor = selected != null && (edge.source === selected.id || edge.target === selected.id)
    return {
      ...edge,
      animated: isNeighbor,
      style: {
        ...edge.style,
        opacity: selected == null ? 0.48 : isNeighbor ? 1 : 0.06,
        stroke: isNeighbor ? 'var(--accent)' : 'var(--line)',
        strokeWidth: isNeighbor ? 2.2 : 1,
      },
      markerEnd: {
        type: 'arrowclosed' as const,
        color: isNeighbor ? 'var(--accent)' : 'var(--line)',
      },
    }
  }), [model.edges, selected])

  return (
    <section className="view">
      <div className="view-heading"><div><h1>剧情编排</h1><p>阶段泳道与正式上下游合并展示；节点按组排序并错开放置。</p></div><label className="search">搜索<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="剧情节点" /></label></div>
      <div className="graph-layout"><div className="flow-shell"><ReactFlow nodes={visibleNodes} edges={visibleEdges} onNodeClick={(_, node) => setSelected(graph.nodes.find((item) => item.id === node.id) || null)} onPaneClick={() => setSelected(null)} fitView minZoom={0.12} maxZoom={2}><Background gap={18} size={1} /><Controls /></ReactFlow></div><GraphDetail detail={selected ? { id: selected.id, label: selected.title, kind: selected.type, description: selected.position, path: selected.path, facts: [{ label: '阶段', value: selected.stages.map((id) => graph.stages.find((stage) => stage.id === id)?.label || id).join(' · ') }, { label: '上游', value: selected.upstream.join('、') }, { label: '下游', value: selected.downstream.join('、') }] } : null} /></div>
    </section>
  )
}
