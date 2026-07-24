type Detail = {
  id: string
  label: string
  kind?: string
  description?: string
  path?: string
  facts?: { label: string; value: string }[]
}

export function GraphDetail({ detail, empty = '选择一个节点查看详情。' }: { detail: Detail | null; empty?: string }) {
  if (!detail) return <aside className="detail-panel"><p className="muted">{empty}</p></aside>
  return (
    <aside className="detail-panel">
      <div className="eyebrow">{detail.kind || detail.id}</div>
      <h2>{detail.label}</h2>
      {detail.description && <p>{detail.description}</p>}
      {detail.facts && <dl>{detail.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value || '无'}</dd></div>)}</dl>}
      {detail.path && <div className="source-path"><span>正式来源</span><code>{detail.path}</code></div>}
    </aside>
  )
}
