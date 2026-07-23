# Story Stars · 剧情图谱工作台

> 本目录是 React + Vite 构建的可重建派生工具，不是正式正典。剧情事实以 `story/plotlines/` 为准，阶段调用以 `story/arcs/` 为准，人物与世界事实分别以 `characters/` 和 `worldbuilding/` 为准。

## 已启用视图

- **剧情依赖**：Cytoscape.js 展示 67 个正式剧情节点的上下游。
- **阶段编排**：React Flow 按六阶段泳道展示节点首次调用与跨线依赖。
- **人物关系**：只从人物主卡的「关系定调」表生成。
- **人物×剧情**：从正式节点内的人物名引用生成覆盖边。
- **案件责任链**：聚合案件／反派节点、参与人物与正式世界观引用。
- **能力机制**：从人物契约卡生成「人物 → 星辰 → 权柄 → 公共机制」。

## 数据门禁

- **章节消费链**：只在存在正式 `final.md` 后启用。
- **线索生命周期**：只在 `clues/` 存在正式线索条目后启用。
- 模板、`.analysis/` 与 `.rag/` 不用于伪造空图数据。

## 命令

在 `.plotlines/` 中执行：

```bash
npm install
npm run dev
```

常用操作：

```bash
npm run refresh  # 刷新正式剧情数据及其他派生图谱数据
npm run check    # 数据生成 + TypeScript 检查 + 生产构建
npm run build    # 生成 dist/
npm run preview  # 预览生产构建
```

## 目录边界

- `graph-layout.yml`：项目展示分组和阶段覆盖，不复制剧情事实。
- `generated/graph-data.js`：`story-writer plotline graph build` 的正式剧情节点派生数据。
- `scripts/generate-data.mjs`：只读正式 Markdown 与上述剧情派生数据，写入 `src/generated/story-data.json`。
- `src/generated/story-data.json`：前端统一数据入口，可随时重建。
- `src/`：应用与视图实现。
- `dist/`、`node_modules/`：本地产物，不纳入版本控制。

`vendor/x6.min.js` 依然可能被上游 `story-writer plotline graph build` 复制，新工程不加载它。
