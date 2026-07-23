import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const toolRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectRoot = path.resolve(toolRoot, '..')
const rel = (...parts) => path.join(projectRoot, ...parts)
const read = (file) => fs.readFileSync(file, 'utf8')
const normalize = (file) => path.relative(projectRoot, file).split(path.sep).join('/')
const walk = (dir, name) => fs.existsSync(dir)
  ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name), name) : entry.name === name ? [path.join(dir, entry.name)] : [])
  : []

function parsePlotlineGraph() {
  const source = read(rel('.plotlines/generated/graph-data.js'))
  const prefix = 'window.PLOTLINE_GRAPH = '
  const start = source.indexOf(prefix)
  if (start < 0) throw new Error('invalid .plotlines/generated/graph-data.js')
  return JSON.parse(source.slice(start + prefix.length).replace(/;\s*$/, ''))
}

function heading(text) {
  return text.match(/^#\s+([^｜\n]+)/m)?.[1]?.trim() || ''
}

function tableField(text, field) {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.match(new RegExp(`^\\|\\s*${escaped}\\s*\\|\\s*([^|]+)`, 'm'))?.[1]?.trim() || ''
}

function section(text, title) {
  const start = text.search(new RegExp(`^##\\s+${title}\\s*$`, 'm'))
  if (start < 0) return ''
  const body = text.slice(start).replace(/^##[^\n]*\n/, '')
  const end = body.search(/^##\s+/m)
  return end < 0 ? body : body.slice(0, end)
}

function parseTableRows(markdown) {
  return markdown.split('\n').filter((line) => /^\|.+\|\s*$/.test(line)).map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim())).filter((cells) => cells.length && !cells.every((cell) => /^:?-+:?$/.test(cell)))
}

function characterIndex() {
  const text = read(rel('characters/_index.md'))
  const records = new Map()
  for (const line of text.split('\n')) {
    const match = line.match(/^\|\s*([MF]-\d+)\s*\|\s*([^|]+?)\s*\|\s*\[.*?\]\(([^)]+\/\u4e3b\u5361\.md)\)\s*\|\s*([^|]+?)\s*\|/)
    if (match) records.set(`characters/${match[3]}`, { id: match[1], name: match[2].trim(), status: match[4].trim() })
  }
  return records
}

function parseCharacters() {
  const index = characterIndex()
  const cards = walk(rel('characters'), '\u4e3b\u5361.md').filter((file) => !file.includes(`${path.sep}_template${path.sep}`))
  const characters = cards.map((file) => {
    const text = read(file)
    const pathName = normalize(file)
    const indexed = index.get(pathName) || {}
    return {
      id: indexed.id || `CHAR-${heading(text)}`,
      name: indexed.name || heading(text),
      status: indexed.status || '',
      role: tableField(text, '\u5b9a\u4f4d') || tableField(text, '\u4eba\u7269\u529f\u80fd'),
      identity: tableField(text, '\u5f53\u524d\u8eab\u4efd'),
      contractStatus: tableField(text, '\u5951\u7ea6\u72b6\u6001'),
      path: pathName,
      source: text,
    }
  }).filter((item) => item.name)
  const names = new Set(characters.map((item) => item.name))
  const relationships = []
  const seen = new Set()
  for (const character of characters) {
    const rows = parseTableRows(section(character.source, '\u5173\u7cfb\u5b9a\u8c03')).slice(1)
    for (const row of rows) {
      const target = row[0]?.replace(/\*\*/g, '').trim()
      if (!names.has(target) || target === character.name) continue
      const pair = [character.name, target].sort().join('\0')
      const relation = row[1] || '\u5df2\u786e\u8ba4\u5173\u7cfb'
      const key = `${pair}\0${relation}`
      if (seen.has(key)) continue
      seen.add(key)
      relationships.push({ id: `rel-${relationships.length + 1}`, source: character.name, target, relation, boundary: row[2] || '', sourcePath: character.path })
    }
  }
  return { characters: characters.map(({ source, ...item }) => item), characterSources: new Map(characters.map((item) => [item.name, item.source])), relationships }
}

function extractLinks(markdown, sourcePath) {
  const links = []
  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)) {
    const target = path.resolve(path.dirname(rel(sourcePath)), decodeURI(match[1]))
    if (target.startsWith(projectRoot) && fs.existsSync(target)) links.push(normalize(target))
  }
  return [...new Set(links)]
}

function plotlineParticipants(graph, characters) {
  const edges = []
  for (const node of graph.nodes) {
    const text = read(rel(node.path))
    for (const character of characters) {
      if (text.includes(character.name)) edges.push({ id: `coverage-${edges.length + 1}`, character: character.name, plotline: node.id })
    }
  }
  return edges
}

function parseCaseGraph(graph, characters) {
  const caseNodes = graph.nodes.filter((node) => ['case', 'villain'].includes(node.kind))
  const ids = new Set(caseNodes.map((node) => node.id))
  const nodes = caseNodes.map((node) => ({ id: node.id, label: node.title, kind: 'plotline', path: node.path, status: node.status }))
  const edges = graph.edges.filter((edge) => ids.has(edge.from) && ids.has(edge.to)).map((edge, index) => ({ id: `case-dep-${index + 1}`, source: edge.from, target: edge.to, relation: '\u4e0a\u4e0b\u6e38' }))
  const entityPaths = new Set()
  for (const node of caseNodes) {
    const text = read(rel(node.path))
    for (const character of characters) if (text.includes(character.name)) {
      const id = `character:${character.name}`
      if (!nodes.some((item) => item.id === id)) nodes.push({ id, label: character.name, kind: 'character', path: character.path })
      edges.push({ id: `case-person-${edges.length + 1}`, source: id, target: node.id, relation: '\u53c2\u4e0e' })
    }
    for (const linked of extractLinks(text, node.path)) if (linked.startsWith('worldbuilding/')) entityPaths.add(linked)
  }
  for (const entityPath of entityPaths) {
    const id = `world:${entityPath}`
    const label = heading(read(rel(entityPath))) || path.basename(entityPath, '.md')
    nodes.push({ id, label, kind: entityPath.includes('/factions/') ? 'faction' : entityPath.includes('/regions/') ? 'place' : 'mechanism', path: entityPath })
    for (const node of caseNodes) if (extractLinks(read(rel(node.path)), node.path).includes(entityPath)) edges.push({ id: `case-world-${edges.length + 1}`, source: id, target: node.id, relation: '\u6b63\u5f0f\u4f9d\u636e' })
  }
  return { nodes, edges }
}

function parseAbilityGraph(characters) {
  const nodes = []
  const edges = []
  const addNode = (node) => { if (!nodes.some((item) => item.id === node.id)) nodes.push(node) }
  const addEdge = (source, target, relation) => edges.push({ id: `ability-${edges.length + 1}`, source, target, relation })
  const systemDocs = ['\u661f\u8fb0\u5951\u7ea6.md', '\u661f\u8fb0\u6743\u67c4.md', '\u80fd\u529b\u8fb9\u754c.md', '\u7cbe\u795e\u4e4b\u6d77.md', '\u661f\u8fb0\u5f02\u53d8.md']
  for (const file of systemDocs) {
    const sourcePath = `worldbuilding/systems/${file}`
    addNode({ id: `system:${file}`, label: heading(read(rel(sourcePath))), kind: 'system', path: sourcePath })
  }
  for (const character of characters) {
    const contractPath = character.path.replace(/\u4e3b\u5361\.md$/, '\u5951\u7ea6.md')
    if (!fs.existsSync(rel(contractPath))) continue
    const text = read(rel(contractPath))
    const personId = `character:${character.name}`
    addNode({ id: personId, label: character.name, kind: 'character', path: character.path })
    const star = tableField(text, '\u661f\u8fb0\u6307\u79f0') || `${character.name}\u7684\u5951\u7ea6\u661f\u8fb0`
    const starId = `star:${character.name}:${star}`
    addNode({ id: starId, label: star, kind: 'star', path: contractPath })
    addEdge(personId, starId, '\u7ed3\u5951')
    addEdge(starId, 'system:\u661f\u8fb0\u5951\u7ea6.md', '\u9075\u5faa')
    const rows = parseTableRows(section(text, '\u6743\u67c4\u603b\u89c8')).slice(1)
    for (const row of rows) {
      const authority = row[0]?.replace(/\*\*/g, '').trim()
      if (!authority) continue
      const authorityId = `authority:${authority}`
      addNode({ id: authorityId, label: authority, kind: 'authority', description: row[2] || '', path: contractPath })
      addEdge(starId, authorityId, '\u6301\u6709')
      addEdge(authorityId, 'system:\u661f\u8fb0\u6743\u67c4.md', '\u9075\u5faa')
      addEdge(authorityId, 'system:\u80fd\u529b\u8fb9\u754c.md', '\u53d7\u9650')
    }
    addEdge(personId, 'system:\u7cbe\u795e\u4e4b\u6d77.md', '\u627f\u8f7d')
    addEdge(personId, 'system:\u661f\u8fb0\u5f02\u53d8.md', '\u98ce\u9669')
  }
  return { nodes, edges }
}

const graph = parsePlotlineGraph()
const { characters, relationships } = parseCharacters()
const coverage = plotlineParticipants(graph, characters)
const payload = {
  sources: ['story/plotlines/', 'story/arcs/', 'characters/', 'worldbuilding/'],
  plotlines: graph,
  characters,
  relationships,
  coverage,
  cases: parseCaseGraph(graph, characters),
  abilities: parseAbilityGraph(characters),
  deferred: {
    chapters: { enabled: walk(rel('chapters'), 'final.md').length > 0, count: walk(rel('chapters'), 'final.md').length },
    clues: { enabled: ['planted', 'hinted', 'revealed', 'resolved'].flatMap((dir) => walk(rel('clues', dir), '.never')).length > 0, count: 0 },
  },
}

const clueFiles = ['planted', 'hinted', 'revealed', 'resolved'].flatMap((dir) => fs.existsSync(rel('clues', dir)) ? fs.readdirSync(rel('clues', dir)).filter((name) => name.endsWith('.md') && name !== '_index.md') : [])
payload.deferred.clues = { enabled: clueFiles.length > 0, count: clueFiles.length }

const output = path.join(toolRoot, 'src/generated/story-data.json')
fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(output, `${JSON.stringify(payload, null, 2)}\n`)
process.stdout.write(`generated ${normalize(output)}: ${graph.nodes.length} plotlines, ${characters.length} characters, ${relationships.length} relationships, ${coverage.length} coverage edges\n`)
