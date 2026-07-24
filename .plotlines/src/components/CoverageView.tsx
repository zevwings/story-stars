import { useMemo, useState } from 'react'
import type { StoryData } from '../types'
import { GraphFlowView, type ViewEdge, type ViewNode } from './GraphFlowView'
import './CoverageView.css'

export function CoverageView({ data }: { data: StoryData }) {
  const counts = useMemo(() => {
    const result = new Map<string, number>()
    data.coverage.forEach((edge) => result.set(edge.character, (result.get(edge.character) || 0) + 1))
    return result
  }, [data.coverage])
  const characters = useMemo(() => [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])), [counts])
  const [character, setCharacter] = useState(characters.find(([name]) => name !== '晏林')?.[0] || characters[0]?.[0] || '')
  const model = useMemo(() => {
    const characterData = data.characters.find((item) => item.name === character)
    const related = data.coverage.filter((edge) => edge.character === character)
    const plotlines = new Map(data.plotlines.nodes.map((item) => [item.id, item]))
    const columnCount = related.length > 36 ? 3 : related.length > 16 ? 2 : 1
    const rowCount = Math.ceil(related.length / columnCount)
    const nodes: ViewNode[] = [{
      id: `character:${character}`,
      label: `${character}\n${related.length} 个剧情节点`,
      kind: 'character',
      path: characterData?.path,
      description: characterData?.role,
      x: 130,
      y: 80,
    }]
    related.forEach((edge, index) => {
      const plotline = plotlines.get(edge.plotline)
      const column = Math.floor(index / rowCount)
      const row = index % rowCount
      nodes.push({
        id: `plotline:${edge.plotline}`,
        label: `${edge.plotline}\n${plotline?.title || ''}`,
        kind: plotline?.kind || 'plotline',
        path: plotline?.path,
        description: plotline?.position,
        x: 520 + column * 330,
        y: 80 + row * 82,
      })
    })
    const edges: ViewEdge[] = related.map((edge) => ({ id: edge.id, source: `character:${character}`, target: `plotline:${edge.plotline}` }))
    return { nodes, edges }
  }, [character, data.characters, data.coverage, data.plotlines.nodes])

  return (
    <GraphFlowView
      {...model}
      layout="preset"
      readableStart
      title="人物 × 剧情"
      subtitle="一次聚焦一位人物，只显示其正式剧情覆盖，避免全量关系互相遮挡。"
      toolbar={
        <label className="coverage-picker">
          人物
          <select value={character} onChange={(event) => setCharacter(event.target.value)}>
            {characters.map(([name, count]) => <option key={name} value={name}>{name} · {count}</option>)}
          </select>
        </label>
      }
    />
  )
}
