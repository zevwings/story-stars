# Entry Guide

## 文件职责

本文件是项目**读取顺序与任务路由的唯一入口**，不保存故事事实、文风规则或候选结论。

- 故事事实、写作边界和作品级承诺，以 `BIBLE.md` 为最高真源；目录权限、候选落盘、施工和执行门禁以 `POLICY.md` 为准。
- 项目文风、作者腔、叙述口径和表达限制，以 `STYLE.md` 为文风真源。
- story-writer runtime 提供公共方法、题材中立规则、模板与工具；已启用专项的协议与参考 vendoring 在项目专项目录中。两者都不保存本项目故事事实。

若 Agent 入口、本文、工具说明或 story-writer 公共规则与 `BIBLE.md` 冲突，以 `BIBLE.md` 为准；若公共写作方法与 `STYLE.md` 冲突，以 `STYLE.md` 为准。

## 基础读取顺序

1. 先完整读取 `BIBLE.md`。
2. 写正文、续写、润色、审读、对白优化或亲密正文回写时，再完整读取 `STYLE.md`。
3. 按任务进入目标正式目录；先读该目录 `_index.md`，再沿索引读取任务闭包内的文件，不全量扫库。
4. 涉及已登记施工包时，先读 `story/construction/_index.md` 与 `_status/`，再沿状态登记的源文件链接读取目标单元。
5. 规划、章纲、预写、正文、亲密专项场景或定稿任务已经确定 operation 与命中的 `CON-*` 时，运行 `sw project gates --operation <operation> --target <CON-xxxx> --root <project>`；多目标重复 `--target`。普通任务只使用返回的 frontmatter，命中阻塞时停止对应写入，不读取 Gate 正文替作者决定。
6. 最后按任务需要进入项目已 vendoring 的专项协议与参考；题材中立能力再进入 story-writer runtime。

## 正式目录入口

- `chapters/`：章节大纲、草稿、定稿和摘要。
- `characters/`：静态人物档案。
- `context/`：动态上下文、人物状态、摘要和时间线。
- `clues/`：线索生命周期。
- `story/`：故事结构、题材口径、分卷弧线、剧情线和长期规划。
- `worldbuilding/`：世界观正式设定。
- 专项目录：由 `.story.config.toml` 的 `[[specialties]]` 声明，按对应 `_index.md` 进入。

按任务命中从下列正式入口继续读取，不在本文复制规则正文：

- 全书关系结构：`story/architecture.md`。
- 题材、场型与灰黑叙事：`story/genres/_index.md`。
- 世界机制与社会事实：`worldbuilding/_index.md`。
- 阶段推进与阶段边界：`story/arcs/_index.md`。

## 特殊任务入口

- `specialties/intimacy/项目路由.md`：已启用亲密专项的项目自有读取顺序、题材边界与参考入口；使用前仍必须以 `sw specialty resolve intimacy` 确认安装副本可用。
- `story/construction/`：已确认执行规格与临时 Construction Gate 的入口。普通 `CON-*` 的状态、继承范围和正式节点接口服从 `POLICY.md` 与本目录 `_status/`；`_gates/` 只控制命中的 operation，普通任务不得读取其正文。
- `.prototypes/`：持久原型参考层。仅在作者明确要求原型研究、人物形象修改、服装原型／定制设计、地区视觉设计、生图设计或撞型检查时，先读 `.prototypes/README.md`，再从对应分类 `_index.md` 进入；普通写作、规划和事实查询不读取。

## 非真源与落盘边界

- `.rag/`、`.prewrite/`、`.analysis/` 与剧情线 Preview 都不提供故事事实。
- 候选、缺口、延迟决定、Construction Gate 和已确认施工规格的具体落盘边界，统一服从 `POLICY.md`，本文不另行定义。
- 涉及正式事实且信息不足或可能冲突时，先指出缺口，不把推测补成正典。仅影响当前草稿表现、不会建立长期事实的局部动作、感官、停顿、空间、临时物件、语气和生活化对白，可以依据 `STYLE.md`、人物卡与前后文自行补足，无须逐项询问或登记。

## story-writer 边界

题材中立的公共规则与参考材料通过 story-writer runtime 读取，例如 `story-writer://rules/...` 与 `story-writer://references/...`。已启用专项不回退到 runtime 同名资源，而是从项目专项目录的 `_index.md` 进入 `protocols/`、`references/` 等入口。`packs/` 是 story-writer 源码仓内的离线参考库，不是本项目依赖；项目题材口径写在 `story/genres/`。

工具说明和运行命令以 story-writer runtime 为准，本文件只负责项目内读取路由。
