# Entry Guide

## 工程定位与真源层级

本仓库是具体写作项目, 不保存 story-writer 插件源码。故事事实、目录权限、写作边界和重大设定判断, 以项目根目录 `BIBLE.md` 为最高真源。项目文风、作者腔、叙述口径和表达限制, 以项目根目录 `STYLE.md` 为文风真源。

若本文、Agent 入口、工具说明或 story-writer 公共规则与 `BIBLE.md` 冲突, 以 `BIBLE.md` 为准。若公共写作方法与 `STYLE.md` 冲突, 以 `STYLE.md` 为准。

## 读取顺序

1. 先读 `BIBLE.md`。
2. 写正文、续写、润色、审读、对白优化或亲密正文回写时, 再读 `STYLE.md`。
3. 再按任务进入 `chapters/`, `characters/`, `context/`, `clues/`, `story/`, `worldbuilding/` 或已启用专项目录。
4. 若任务涉及已登记施工包，先读 `story/construction/_index.md` 与 `_status/`，沿状态表中的施工单元链接读取当前任务命中的 `active` 或目标匹配的 `bound` 单元，并核对其正式剧情节点接口。
5. 公共规则与参考材料通过 story-writer runtime 读取, 例如 `story-writer://rules/...` 与 `story-writer://references/...`。
6. `.rag/`, `.prewrite/`, `.analysis/` 不作为故事事实来源；剧情线 Preview 的临时产物位于系统临时目录。

## 项目目录

- `BIBLE.md`: 项目最高真源。
- `STYLE.md`: 项目文风真源。
- `chapters/`: 章节大纲、草稿、定稿和摘要。
- `characters/`: 静态人物卡。
- `context/`: 动态上下文、人物状态、摘要和时间线。
- `clues/`: 线索生命周期。
- `story/`: 故事结构、题材口径、分卷弧线和长期规划。
- `worldbuilding/`: 世界观正式设定。
- 已启用专项目录: 由 `.story.config.toml` 的 `[[specialties]]` 声明。

## 施工与派生目录

- `story/construction/`: 只服务正式剧情节点的已确认执行规格；入口为 `story/construction/_index.md`，生命周期、施工源文件、主要剧情线归属与正式节点接口以 `story/construction/_status/` 为准。
- 剧情线 Preview：由 `story-writer plotline preview` 从正式剧情线直接生成，不在项目内维护工作台副本。
- `.prewrite/`: 按章节生成的写前上下文包。

完整职责与边界见 `BIBLE.md`「十一、施工与派生目录」。

## 写作边界

- 默认按任务闭包读取, 不全量扫库。
- 进入正式内容目录时, 先读对应 `_index.md`, 再按索引进入具体文件。
- 信息不足或可能冲突时, 先指出缺口, 不把推测补成正典。
- 当前人物与世界观待确认项已清空；后续新增未确认设定、角色关系、线索真相和世界观改动时, 剧情线内部缺口写入对应 `.analysis/plotlines/`, 跨线或正式设定级问题再按需新建 `.analysis/blueprints/待确认/`。不得以占位字段或缺口清单进入正式真源。
- 拍板时间、更新时间、更新原因、方案比较与废案过程属于分析或历史记录, 不进入正式真源或施工真源。
- 普通修文默认只改目标草稿; 只有作者明确触发定稿、补录摘要或状态维护时, 才同步长期状态文件。

## story-writer 边界

story-writer runtime 提供 skills、rules、references、templates 和 tools。它是方法层, 不保存本项目故事事实。

`packs/` 是 story-writer 源码仓内的离线参考库, 不是本项目依赖。项目题材口径写在 `story/genres/`。

## 工具

工具说明和运行命令以 story-writer runtime 为准。入口文件只作路由提醒。
