# Story Project

本仓库保存具体写作项目真源。公共写作规则、skills、工具和参考资料由 story-writer runtime 提供。本文面向项目维护者，只作概览和导航，不定义故事事实或写作规则。

## 固定入口

- `zen/entry.md`: 读取顺序与任务路由的唯一入口。
- `zen/bible.md`: 项目最高真源，保存作品级承诺、全局边界与真源层级。
- `zen/policy.md`: 仓库级流程、引用、施工与派生层门禁。
- `zen/style.md`: 项目文风真源。
- `zen/references.md`: 目录引用方向的辅助图解。
- `zen/skills.md`: story-writer 生成的 Skill 选择与调用手册。
- `AGENTS.md`、`CLAUDE.md`: 不同 Agent 的启动文件与内容边界开关。

## 故事目录

- `chapters/`
- `characters/`
- `clues/`
- `context/`
- `story/`
- `worldbuilding/`
- 已启用专项目录: 由 `.story.config.toml` 的 `[[specialties]]` 声明。

## 施工、参考与派生目录

- `story/construction/`: 普通 `CON-*` 保存已确认执行规格并由 `_status/` 五态管理；`_gates/` 保存临时执行门禁，不提供故事事实。
- `.prototypes/`: 人工维护、默认不读取的持久原型参考层。
- `.analysis/`: 候选、推演、缺口、方案比较与历史过程。
- `.sw/generated/plotlines.json`: `sw plotline export` 生成的可重建机器数据；不是剧情真源且不提交。
- 剧情线 Preview：使用 `story-writer plotline preview` 从正式剧情线直接打开，临时产物不写入本仓。
- `.prewrite/`: 分章节写前上下文包。

完整真源层级见 `zen/bible.md`；施工、执行门禁与派生目录的规范边界见 `zen/policy.md`。

## RAG 配置

- `.story.config.toml` 保存稳定项目身份及 RAG / GraphRAG 路由配置，不是故事正典。
- `construction` GraphRAG 域只索引 `_status/` 已登记单元，普通查询只返回 `active`，指定目标时补入匹配的 `bound`；`_gates/**` 明确排除。
- `project.truth_roots` 和各模块 `roots` 声明基础扫描入口, 用来定位章节、人物动态上下文、线索、故事规划和世界观目录。
- `characters.roots[].static_cards` 声明静态角色档案包含哪些卡片; 默认是 `主卡.md`、`形象.md`、`衣装/_GRAMMAR.md`。
- `context.roots` 默认只声明必然存在的 `context/characters`; 器物、武器等动态目录需要启用时再按项目实际目录追加。
- `context.boundary_terms` 用于把命中的边界词加入 `.prewrite/<chapter>/context/` 上下文包候选查询; 默认空数组。
- `worldbuilding.type_map` 与 `group_output_map` 是索引分组规则, 不代表世界观事实本身。
- `context.timeline.required_characters` 声明开写前状态卡必读的角色；未确定必读角色时不声明。
- 若某些文件或目录不应进入 GraphRAG（包括施工域）, 写入 `.graphragignore`。
- `[[specialties]]` 只声明可选写作专项模块; 专项资料仍写入对应目录, 例如 `specialties/intimacy/`, 不写进 `.story.config.toml`。

## 边界

- 项目事实优先写项目内固定相对路径。
- 公共规则和参考资料使用 story-writer runtime 路由。
- 读取顺序与任务路由以 `zen/entry.md` 为准；故事真源层级以 `zen/bible.md` 为准；目录权限和派生层边界以 `zen/policy.md` 为准。
