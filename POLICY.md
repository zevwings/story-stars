# story-stars Project Policy

本文件仅适用于当前 `story-stars` 仓库, 不作为其他项目的共享策略。

## 执行原则

- 本文件中的门禁均为强制约束。
- 无法确认是否满足门禁时, 按不满足处理。
- 不得通过更换工作目录、转交子 Agent 或改用等价入口绕过门禁。

## P-001: 禁止使用 GitNexus

- 本仓库禁止使用任何 GitNexus skill、MCP 工具、CLI 命令及其他等价入口。
- 禁止使用 GitNexus 执行索引、查询、调用关系追踪、影响分析、重构分析、PR review 或索引修复。
- 即使任务看起来符合某个 GitNexus skill 的触发条件, 仍以本门禁为准。
- 需要代码或文档检索时, 使用 `rg`、`git`、真源阅读和项目现有检查工具。

本门禁只针对 GitNexus, 不禁止 story-writer 提供的 GraphRAG 或本项目已配置的 `.rag/` 流程; 后两者仍须遵守 `ENTRY.md`、`BIBLE.md` 和相关项目规则。
