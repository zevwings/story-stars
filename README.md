# Story Project

本仓库保存具体写作项目真源。公共写作规则、skills、工具和参考资料由 story-writer runtime 提供。

## 固定入口

- `ENTRY.md`: 项目入口和读取导航。
- `BIBLE.md`: 项目最高真源。
- `STYLE.md`: 项目文风真源。
- `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`: 不同 Agent 的入口文件。

## 故事目录

- `chapters/`
- `characters/`
- `clues/`
- `context/`
- `story/`
- `worldbuilding/`
- 已启用专项目录: 由 `.story.config.toml` 的 `[[specialties]]` 声明。

## RAG 配置

- `.story.config.toml` 是 RAG / GraphRAG 的检索与路由配置, 不是故事正典。
- `project.truth_roots` 和各模块 `roots` 声明基础扫描入口, 用来定位章节、人物动态上下文、线索、故事规划和世界观目录。
- `characters.roots[].static_cards` 声明静态角色档案包含哪些卡片; 默认是 `主卡.md`、`形象.md`、`衣装.md`。
- `context.roots` 默认只声明必然存在的 `context/characters`; 器物、武器等动态目录需要启用时再按项目实际目录追加。
- `context.boundary_terms` 用于把命中的边界词加入 `.prewrite/<chapter>/context/` 上下文包候选查询; 默认空数组。
- `worldbuilding.type_map` 与 `group_output_map` 是索引分组规则, 不代表世界观事实本身。
- `context.timeline.required_characters` 声明开写前状态卡必读的角色；未确定必读角色时不声明。
- 若某些文件或目录不应进入 GraphRAG, 写入 `.graphragignore`。
- `[[specialties]]` 只声明可选写作专项模块; 专项资料仍写入对应目录, 例如 `intimacy/`, 不写进 `.story.config.toml`。

## 边界

- 项目事实优先写项目内固定相对路径。
- 公共规则和参考资料使用 story-writer runtime 路由。
- `.rag/`, `.analysis/`, `.prewrite/` 属于运行、分析、上下文包和施工内容, 不作为正式正典。
