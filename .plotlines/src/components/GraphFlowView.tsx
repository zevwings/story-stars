import { Background, Controls, MarkerType, Position, ReactFlow, type Edge, type Node } from '@xyflow/react'
import { useMemo, useState, type ReactNode } from 'react'
import { GraphDetail } from './GraphDetail'
import './GraphFlowView.css'

export type ViewNode = {
  id: string
  label: string
  kind: string
  description?: string
  path?: string
  x?: number
  y?: number
  facts?: { label: string; value: string }[]
}

export type ViewEdge = { id: string; source: string; target: string; label?: string; kind?: string }

const palette: Record<string, string> = {
  main: '#b88a0a', villain: '#c7504a', intimacy: '#c85d8b', relation: '#4f83b9', case: '#349284', retired: '#858585',
  character: '#4f83b9', plotline: '#c85d8b', faction: '#c7504a', place: '#349284', mechanism: '#b88a0a',
}

function automaticPositions(nodes: ViewNode[]): Map<string, { x: number; y: number }> {
  const columns = new Map<string, ViewNode[]>()
  nodes.forEach((node) => {
    const column = node.kind === 'character' ? 'character' : node.kind === 'plotline' ? 'plotline' : 'source'
    columns.set(column, [...(columns.get(column) || []), node])
  })
  const result = new Map<string, { x: number; y: number }>()
  const x = { character: 80, plotline: 480, source: 880 }
  for (const [column, items] of columns) {
    items.sort((a, b) => a.id.localeCompare(b.id)).forEach((node, index) => {
      result.set(node.id, { x: x[column as keyof typeof x], y: 70 + index * 86 })
    })
  }
  return result
}

export function GraphFlowView({ nodes, edges, layout = 'network', title, subtitle, readableStart = false, toolbar }: {
  nodes: ViewNode[]
  edges: ViewEdge[]
  layout?: 'preset' | 'network'
  title: string
  subtitle: string
  readableStart?: boolean
  toolbar?: ReactNode
}) {
  const [detail, setDetail] = useState<ViewNode | null>(null)
  const [query, setQuery] = useState('')
  const positions = useMemo(() => layout === 'network' ? automaticPositions(nodes) : new Map<string, { x: number; y: number }>(), [layout, nodes])
  const neighborIds = useMemo(() => {
    if (!detail) return null
    const ids = new Set([detail.id])
    edges.forEach((edge) => {
      if (edge.source === detail.id) ids.add(edge.target)
      if (edge.target === detail.id) ids.add(edge.source)
    })
    return ids
  }, [detail, edges])
  const flowNodes = useMemo<Node[]>(() => nodes.map((node) => {
    const position = node.x == null ? positions.get(node.id) || { x: 0, y: 0 } : { x: node.x, y: node.y || 0 }
    const matches = !query.trim() || `${node.id} ${node.label}`.toLowerCase().includes(query.trim().toLowerCase())
    const selected = detail?.id === node.id
    const dimmed = !matches || (neighborIds != null && !neighborIds.has(node.id))
    const color = palette[node.kind] || palette.relation
    return {
      id: node.id,
      position,
      data: { label: <div className="graph-flow-card">{node.label.split('\n').map((line) => <span key={line}>{line}</span>)}</div> },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        width: 230,
        minHeight: 58,
        border: `${selected ? 3 : 1.6}px solid ${selected ? 'var(--accent)' : color}`,
        borderRadius: 9,
        background: `color-mix(in srgb, ${color} 13%, var(--surface))`,
        color: 'var(--text)',
        opacity: dimmed ? 0.1 : 1,
        boxShadow: selected ? '0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent)' : 'none',
      },
      zIndex: selected ? 3 : 2,
    }
  }), [detail, neighborIds, nodes, positions, query])
  const flowEdges = useMemo<Edge[]>(() => edges.map((edge) => {
    const active = detail != null && (edge.source === detail.id || edge.target === detail.id)
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: active ? edge.label : '',
      type: 'smoothstep',
      animated: active,
      style: { stroke: active ? 'var(--accent)' : 'var(--line)', strokeWidth: active ? 2.2 : 1, opacity: detail == null ? 0.38 : active ? 1 : 0.05 },
      labelStyle: { fill: 'var(--muted)', fontSize: 10 },
      labelBgStyle: { fill: 'var(--surface)', fillOpacity: 0.96 },
      markerEnd: { type: MarkerType.ArrowClosed, color: active ? 'var(--accent)' : 'var(--line)' },
    }
  }), [detail, edges])

  return (
    <section className="view">
      <div className="view-heading"><div><h1>{title}</h1><p>{subtitle}</p></div><div className="graph-tools">{toolbar}<label className="search">搜索<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ID 或名称" /></label></div></div>
      <div className="graph-layout">
        <div className="flow-shell">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodeClick={(_, node) => setDetail(nodes.find((item) => item.id === node.id) || null)}
            onPaneClick={() => setDetail(null)}
            fitView={!readableStart}
            defaultViewport={readableStart ? { x: 34, y: 34, zoom: 0.8 } : undefined}
            minZoom={0.12}
            maxZoom={2.6}
          >
            <Background gap={18} size={1} />
            <Controls />
          </ReactFlow>
        </div>
        <GraphDetail detail={detail} />
      </div>
    </section>
  )
}
