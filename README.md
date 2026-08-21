# Story Project

本仓库保存具体写作项目真源。公共写作规则、skills、工具和参考资料由 story-writer runtime 提供。本文面向项目维护者，只作概览和导航，不定义故事事实或写作规则。

## 固定入口

- `zen/entry.md`: 读取顺序与任务路由的唯一入口。
- `zen/bible.md`: 故事事实与作品级承诺的最高真源。
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
- 剧情线 Preview：使用 `story-writer plotline preview` 从正式剧情线直接打开，临时产物不写入本仓。
- `.prewrite/`: 分章节写前上下文包。

完整真源层级见 `zen/bible.md`；施工、执行门禁与派生目录的规范边界见 `zen/policy.md`。

## 项目配置

- `.story.config.toml` 保存稳定项目身份及 RAG / GraphRAG 路由配置，不是故事正典。
- `.story.config.toml` 只声明当前项目实际使用的检索入口、Feature 与 Specialty，不保存故事事实。
- 工具字段和运行时目录的通用语义由 story-writer 自身文档管理，不在本项目重复定义。

## 边界

- 项目事实优先写项目内固定相对路径。
- 公共规则和参考资料使用 story-writer runtime 路由。
- 读取顺序与任务路由以 `zen/entry.md` 为准；故事真源层级以 `zen/bible.md` 为准；目录权限和派生层边界以 `zen/policy.md` 为准。
