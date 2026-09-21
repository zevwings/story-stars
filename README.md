# Story Project

本仓库保存具体写作项目真源。公共写作规则、skills、工具和参考资料由 story-writer runtime 提供。本文面向项目维护者，只作概览和导航，不定义故事事实或写作规则。

## 固定入口

- `sw zen resolve --root <项目根目录>`：解析锁定公共基线及 active 项目扩展。
- `zen/resources.toml`：登记项目扩展；未登记文件不自动生效。
- `zen/entry.md`: 追加到公共 entry 的项目路由。
- `zen/bible.md`: 故事事实与作品级承诺的最高真源。
- `zen/policy.md`: 追加到公共 policy 的项目流程、引用、施工与派生层门禁。
- `zen/style.md`: 项目文风真源。
- `zen/references.md`: 目录引用方向的辅助图解。
- `story-writer://references/usage/skills.md`: 当前 runtime 的 Skill 选择与调用手册。
- `AGENTS.md`、`CLAUDE.md`: 不同 Agent 的启动文件与内容边界开关。

## 故事目录

- `chapters/`
- `characters/`
- `clues/`
- `context/`
- `story/`
- `worldbuilding/`
- 已启用专项目录: 由 `.story.config.toml` 的 `[dependencies.specialties.<name>]` 声明。

## 施工、参考与派生目录

- `specialties/plotlines/_construction/`: 普通 `CON-*` 保存已确认执行规格并由 `_status/` 五态管理；`_gates/` 保存临时执行门禁，不提供故事事实。
- `.prototypes/`: 人工维护、默认不读取的持久原型参考层。
- `.analysis/`: 候选、推演、缺口、方案比较与历史过程。
- 剧情线 Preview：使用 `sw specialty plotlines preview` 从正式剧情线直接打开，临时产物不写入本仓。
- `.prewrite/`: 分章节写前上下文包。

完整真源层级见 `zen/bible.md`；施工、执行门禁与派生目录的规范边界见 `zen/policy.md`。

## 项目配置

- `.story.config.toml` 保存稳定项目身份及 RAG / GraphRAG 路由配置，不是故事正典。
- `.story.config.toml` 只声明当前项目实际使用的检索入口、Feature 与 Specialty，不保存故事事实。
- 工具字段和运行时目录的通用语义由 story-writer 自身文档管理，不在本项目重复定义。

## 边界

- 项目事实优先写项目内固定相对路径。
- 公共规则和参考资料使用 story-writer runtime 路由。
- 读取顺序与任务路由服从公共 entry 与已登记的 `zen/entry.md` 扩展；故事真源层级以 `zen/bible.md` 为准；目录权限和派生层边界服从公共 policy 与已登记的 `zen/policy.md` 扩展。
