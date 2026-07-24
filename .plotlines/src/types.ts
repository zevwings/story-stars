export type PlotlineNode = {
  id: string
  title: string
  type: string
  status: string
  position: string
  path: string
  upstream: string[]
  downstream: string[]
  stages: string[]
  group: string
  kind: string
}

export type PlotlineGraph = {
  meta: { nodeCount: number; edgeCount: number; fingerprint: string }
  stages: { id: string; label: string; title?: string }[]
  groups: { id: string; label: string; kind: string; order: number; nodes: string[] }[]
  nodes: PlotlineNode[]
  edges: { from: string; to: string }[]
}

export type Character = {
  id: string
  name: string
  status: string
  role: string
  identity: string
  contractStatus: string
  path: string
}

export type Relationship = {
  id: string
  source: string
  target: string
  relation: string
  boundary: string
  sourcePath: string
}

export type DerivedNode = {
  id: string
  label: string
  kind: string
  path?: string
  status?: string
  description?: string
}

export type DerivedEdge = { id: string; source: string; target: string; relation: string }

export type StoryData = {
  sources: string[]
  plotlines: PlotlineGraph
  characters: Character[]
  relationships: Relationship[]
  coverage: { id: string; character: string; plotline: string }[]
  cases: { nodes: DerivedNode[]; edges: DerivedEdge[] }
  deferred: {
    chapters: { enabled: boolean; count: number }
    clues: { enabled: boolean; count: number }
  }
}
