# Story Stars · 剧情图谱工作台

> 本目录是 React + Vite 构建的可重建派生工具，不是正式正典。剧情事实以 `story/plotlines/` 为准，阶段调用以 `story/arcs/` 为准，人物与世界事实分别以 `characters/` 和 `worldbuilding/` 为准。

## 已启用视图

- **剧情编排**：React Flow 按六阶段泳道合并展示节点首次调用与正式上下游。
- **人物关系**：React Flow 从人物主卡的「关系定调」表生成。
- **人物×剧情**：React Flow 按所选人物展示正式节点覆盖。
- **案件责任链**：React Flow 聚合案件／反派节点、参与人物与正式世界观引用。

## 数据门禁

- **章节消费链**：只在存在正式 `final.md` 后启用。
- **线索生命周期**：只在 `clues/` 存在正式线索条目后启用。
- 模板、`.analysis/` 与 `.rag/` 不用于伪造空图数据。

## 命令

在 `.plotlines/` 中执行：

```bash
yarn install
yarn dev
```

常用操作：

```bash
yarn gen      # 生成正式剧情数据及其他派生图谱数据
yarn check    # 数据生成 + TypeScript 检查 + 生产构建
yarn build    # 生成 dist/
yarn preview  # 预览生产构建
```

## 目录边界

- 图谱分组直接来自 `story/plotlines/` 的正式目录，阶段覆盖来自 `story/arcs/`，不维护第二份布局配置。
- `generated/story-graph.json`：`story-writer plotline graph build` 生成的完整中立图谱数据，前端直接读取。
- `src/`：应用与视图实现。
- `generated/`、`dist/`、`node_modules/`：本地派生产物，不纳入版本控制。
