# Entry Guide

## 文件职责

本文件是项目**读取顺序与任务路由的唯一入口**，不保存故事事实、文风规则或候选结论。

- 故事事实、目录权限、写作边界和重大设定判断，以 `BIBLE.md` 为最高真源。
- 项目文风、作者腔、叙述口径和表达限制，以 `STYLE.md` 为文风真源。
- story-writer runtime 只提供公共方法、规则、参考、模板与工具，不保存本项目故事事实。

若 Agent 入口、本文、工具说明或 story-writer 公共规则与 `BIBLE.md` 冲突，以 `BIBLE.md` 为准；若公共写作方法与 `STYLE.md` 冲突，以 `STYLE.md` 为准。

## 基础读取顺序

1. 先完整读取 `BIBLE.md`。
2. 写正文、续写、润色、审读、对白优化或亲密正文回写时，再完整读取 `STYLE.md`。
3. 按任务进入目标正式目录；先读该目录 `_index.md`，再沿索引读取任务闭包内的文件，不全量扫库。
4. 涉及已登记施工包时，先读 `story/construction/_index.md` 与 `_status/`，再沿状态登记的源文件链接读取目标单元。
5. 规划、章纲、预写、正文、亲密专项场景或定稿任务已经确定目标章、`PL-*` 或 `CON-*` 时，检查 `story/decisions/_index.md`，只展开命中的决策文件。
6. 最后按任务需要进入 story-writer runtime 规则与参考材料。

## 正式目录入口

- `chapters/`：章节大纲、草稿、定稿和摘要。
- `characters/`：静态人物档案。
- `context/`：动态上下文、人物状态、摘要和时间线。
- `clues/`：线索生命周期。
- `story/`：故事结构、题材口径、分卷弧线、剧情线和长期规划。
- `worldbuilding/`：世界观正式设定。
- 专项目录：由 `.story.config.toml` 的 `[[specialties]]` 声明，按对应 `_index.md` 进入。

## 特殊任务入口

- `story/construction/`：已确认执行规格的入口。具体状态、继承范围和正式节点接口服从 `BIBLE.md`「十一、施工与派生目录」及本目录 `_status/`。
- `story/decisions/`：延迟决策门入口，只用于检查任务是否被到期决策阻塞，不提供故事事实。
- `.prototypes/`：持久原型参考层。仅在作者明确要求原型研究、人物形象修改、地区视觉设计、生图设计或撞型检查时，先读 `.prototypes/README.md`，再从对应分类 `_index.md` 进入；普通写作、规划和事实查询不读取。

## 非真源与落盘边界

- `.rag/`、`.prewrite/`、`.analysis/` 与剧情线 Preview 都不提供故事事实。
- 候选、缺口、延迟决策和已确认施工规格的具体落盘边界，统一服从 `BIBLE.md`「九、写作硬规则」与「十一、施工与派生目录」，本文不另行定义。
- 信息不足或可能冲突时，先指出缺口，不把推测补成正典。

## story-writer 边界

公共规则与参考材料通过 story-writer runtime 读取，例如 `story-writer://rules/...` 与 `story-writer://references/...`。`packs/` 是 story-writer 源码仓内的离线参考库，不是本项目依赖；项目题材口径写在 `story/genres/`。

工具说明和运行命令以 story-writer runtime 为准，本文件只负责项目内读取路由。
