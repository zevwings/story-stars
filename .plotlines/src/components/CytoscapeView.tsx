import cytoscape, { type Core, type ElementDefinition, type NodeSingular } from 'cytoscape'
import { useEffect, useMemo, useRef, useState } from 'react'
import { GraphDetail } from './GraphDetail'
import './CytoscapeView.css'

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
  character: '#4f83b9', plotline: '#c85d8b', faction: '#c7504a', place: '#349284', mechanism: '#b88a0a', star: '#8c6bc1', authority: '#c85d8b', system: '#349284',
}

export function CytoscapeView({ nodes, edges, layout = 'cose', title, subtitle, readableStart = false, directed = false }: { nodes: ViewNode[]; edges: ViewEdge[]; layout?: 'preset' | 'cose' | 'breadthfirst'; title: string; subtitle: string; readableStart?: boolean; directed?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<Core | null>(null)
  const [detail, setDetail] = useState<ViewNode | null>(null)
  const [query, setQuery] = useState('')
  const elements = useMemo<ElementDefinition[]>(() => [
    ...nodes.map((node) => ({ data: node, position: node.x == null ? undefined : { x: node.x, y: node.y || 0 } })),
    ...edges.map((edge) => ({ data: { id: edge.id, source: edge.source, target: edge.target, label: edge.label || '', kind: edge.kind || '' } })),
  ], [nodes, edges])

  useEffect(() => {
    if (!containerRef.current) return
    const theme = getComputedStyle(document.documentElement)
    const themeColor = (name: string) => theme.getPropertyValue(name).trim()
    const text = themeColor('--text')
    const muted = themeColor('--muted')
    const line = themeColor('--line')
    const surface = themeColor('--surface')
    const surface2 = themeColor('--surface-2')
    const accent = themeColor('--accent')
    const cy = cytoscape({
      container: containerRef.current,
      elements,
      layout: layout === 'preset' ? { name: 'preset', fit: true, padding: 70 } : layout === 'breadthfirst' ? { name: 'breadthfirst', directed: true, spacingFactor: 1.35, padding: 60 } : { name: 'cose', animate: false, nodeRepulsion: () => 9000, idealEdgeLength: () => 130, padding: 60 },
      minZoom: 0.12,
      maxZoom: 2.6,
      wheelSensitivity: 0.2,
      style: [
        { selector: 'node', style: { width: 230, height: 60, shape: 'round-rectangle', label: 'data(label)', 'font-family': 'system-ui, PingFang SC, Microsoft YaHei, sans-serif', 'font-size': '12px', 'font-weight': 500, color: text, 'text-wrap': 'wrap', 'text-max-width': '204px', 'text-valign': 'center', 'background-color': surface, 'background-opacity': 1, 'border-color': (element: NodeSingular) => palette[element.data('kind')] || '#4f83b9', 'border-width': 1.8, 'overlay-opacity': 0, 'z-index': 10 } },
        { selector: 'node[kind = "stage"]', style: { width: 214, height: 34, 'background-opacity': 0, 'border-width': 0, color: muted, 'font-size': '13px', 'font-weight': 500 } },
        { selector: 'edge', style: { width: 1.15, 'curve-style': directed ? 'taxi' : 'bezier', 'taxi-direction': directed ? 'rightward' : 'auto', 'taxi-turn-min-distance': directed ? '22px' : '12px', 'line-color': muted, 'target-arrow-color': muted, 'target-arrow-shape': 'triangle', 'arrow-scale': 0.7, opacity: 0.26, label: 'data(label)', 'font-size': '9px', color: muted, 'text-background-color': surface, 'text-background-opacity': 0.88, 'text-background-padding': '2px', 'overlay-opacity': 0, 'z-index': 0 } },
        { selector: '.dim', style: { opacity: 0.08 } },
        { selector: 'node.neighbor', style: { 'background-color': surface2, 'background-opacity': 1, 'border-width': 2.2 } },
        { selector: 'node.focus', style: { 'background-color': surface2, 'background-opacity': 1, 'border-color': accent, 'border-width': 3 } },
        { selector: 'edge.neighbor', style: { opacity: 0.95, width: 2.4, 'line-color': accent, 'target-arrow-color': accent } },
      ],
    })
    coreRef.current = cy
    const resetViewport = () => {
      if (readableStart && layout === 'preset') cy.viewport({ zoom: 0.82, pan: { x: 38, y: 42 } })
      else cy.fit(cy.elements(), 60)
    }
    requestAnimationFrame(resetViewport)
    cy.on('tap', 'node', (event) => {
      const selected = event.target
      const neighborhood = selected.closedNeighborhood()
      cy.elements().removeClass('dim neighbor focus')
      cy.elements().difference(neighborhood).addClass('dim')
      neighborhood.addClass('neighbor')
      selected.addClass('focus')
      setDetail(nodes.find((node) => node.id === selected.id()) || null)
    })
    cy.on('tap', (event) => {
      if (event.target === cy) {
        cy.elements().removeClass('dim neighbor focus')
        setDetail(null)
      }
    })
    return () => cy.destroy()
  }, [directed, elements, layout, nodes, readableStart])

  useEffect(() => {
    const cy = coreRef.current
    if (!cy) return
    const value = query.trim().toLowerCase()
    cy.elements().removeClass('dim neighbor focus')
    if (!value) {
      if (readableStart && layout === 'preset') cy.animate({ zoom: 0.82, pan: { x: 38, y: 42 }, duration: 220 })
      else cy.fit(cy.elements(), 60)
      return
    }
    const matches = cy.nodes().filter((node) => `${node.id()} ${node.data('label')}`.toLowerCase().includes(value))
    cy.nodes().difference(matches).addClass('dim')
    if (matches.length) cy.animate({ fit: { eles: matches, padding: 100 }, duration: 240 })
  }, [layout, query, readableStart])

  const fitGraph = () => coreRef.current?.animate({ fit: { eles: coreRef.current.elements(), padding: 60 }, duration: 240 })
  const readableGraph = () => coreRef.current?.animate({ zoom: 0.82, pan: { x: 38, y: 42 }, duration: 220 })

  return (
    <section className="view">
      <div className="view-heading"><div><h1>{title}</h1><p>{subtitle}</p></div><div className="graph-tools"><label className="search">搜索<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ID 或名称" /></label>{readableStart && <button type="button" onClick={readableGraph}>可读视图</button>}<button type="button" onClick={fitGraph}>适应全图</button></div></div>
      <div className="graph-layout"><div className="graph-canvas" ref={containerRef} role="img" aria-label={title} /><GraphDetail detail={detail} /></div>
    </section>
  )
}
