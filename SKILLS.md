<!-- story-writer-managed: skills-guide/v1 sha256=14e311aca4e468ac53a1740c1816581586ec30295f7e6c9240f44ba250f5a706 -->
# Story-writer Skills 使用手册

> 本文件由 story-writer runtime 生成并由 `sw setup sync` 安装。它只说明公开写作 Skills 的选择和调用，不保存故事事实，也不替代项目 `POLICY.md`、`ENTRY.md`、`BIBLE.md`、`STYLE.md` 或各 Skill 的完整执行规则。

## 如何使用

- 可以直接描述任务，由 Agent 根据 Skill 的 `description` 和项目规则选择入口。
- 需要固定入口时，使用显式调用：`$skill-name <目标或参数>`。
- 先阅读每张 Skill 卡的触发语、模式、条件依赖和写入范围；实际停止条件以 runtime 中对应 `SKILL.md` 为准。
- `Feature / Specialty` 是条件依赖，不代表每次调用都会读取或启用对应能力。
- 本页是安装快照。当 runtime 更新后，使用 `sw setup sync` 安全刷新。

## 常用工作链

```text
$story-planner 规划后续 3-5 章
$outline-generator 生成第12章大纲
$chapter-prewrite 预展开第12章
$chapter-writer 写第12章
$chapter-reviewer 完整审读第12章
$chapter-finalizer 定稿第12章
```

待合入内容审查使用 `$story-review staged`；已实现故事和群像健康审计使用 `$story-auditor comprehensive`；提交前工程检查使用 `$precommit-checker 提交前检查`。三者不能互相替代。

其他常用示例：

```text
$plotline-visualizer 生成阶段总览图
$session-resume <record-id>
$character-builder 新增角色李青
$world-builder 检查能力体系冲突
$create-pull-request 创建 PR
```

## 字段说明

- `read-only`：只读诊断，不写入项目文件。
- `project-write`：可以写入 Skill contract 声明的项目范围。
- `delegated-write`：由编排或恢复流程调用受约束的领域 Skill 继续实施。
- `analysis`：诊断或候选方案层，不是故事正典。
- `rag`：GraphRAG 索引或派生检索产物，不是故事正典。
- `derived`：可重建的派生视图，不能反向覆盖真源。
- `delegated`：实际写入范围由被调用的领域 Skill 合同决定。
- `repository`：当前 Git 仓库的协作规则、目录与验证入口。
- `git`：工作树、index、分支、提交、远端引用或 Pull Request 状态。
- `条件依赖`：只有项目启用对应 Feature / Specialty 或流程需要前置 Skill 时才生效。

<!-- BEGIN GENERATED: project-skill-guide -->
## 全部公开 Skills

> 本节由 `sw skills generate` 从已发布 Skill contract 生成；请勿手工编辑。

### `$chapter-finalizer`

章节定稿与摘要记录。触发词: 定稿第X章、补录摘要、补录第X章。仅在作者明确触发后执行。

- 调用格式：`$chapter-finalizer <任务目标>`
- 典型触发语：`定稿第X章`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`
- 写入范围：`chapters`, `characters`, `context`, `clues`, `story`, `worldbuilding`, `construction`, `plotlines`, `rag`

### `$chapter-prewrite`

章节写前施工统一入口。支持基础预展开、对话专项、社会关系专项、亲密 A 场专项与综合模式。触发词: 预展开第X章、对话设计、设计对话、对白设计、设计第X章对话、关键对白、对话议程、这场戏怎么谈、设计办事链、人情世故链、人情事故链、真人反应链、真人反射链、重设计第X场对话、更新对话设计。基于正式 outline.md 写入 .prewrite/chXXX，不改正式大纲或正文。

- 调用格式：`$chapter-prewrite <任务目标>`
- 典型触发语：`预展开第X章`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`, `specialty:sociology`
- 写入范围：`prewrite`

### `$chapter-reviewer`

章节诊断统一入口。支持 reader、editor、consistency 与组合模式。触发词: 审读第X章、读者审读、编辑审稿、检查AI味、检查AI腔、检查模板化、机械感、人味不足、检查矛盾、检查世界观、检查命名、检查时间线、检查知情边界、检查人情世故链、检查人情事故链、检查办事链、检查真人反应链、检查真人反射链、完整审读。只诊断，不改文；针对待合入内容变更的问题归因使用 story-review。

- 调用格式：`$chapter-reviewer <任务目标>`
- 典型触发语：`读者审读`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:sociology`
- 写入范围：`analysis`

### `$chapter-writer`

章节正文写作与修订统一入口。支持 draft、revise、rewrite。用于写第X章、续写章节正文、写小说场景、润色正文、去AI味、去AI腔、人性化改写、修复正文模板腔、让章节文字更自然、开始修改章节、修复正文问题、重写第X章，以及处理对白生硬、开头太平、视角乱、呼吸感不够、半截词、断词、碎片词、功能词外露。默认只写 draft.md，不定稿；修改规则、Skill、配置或非小说文件时不触发。

- 调用格式：`$chapter-writer <任务目标>`
- 典型触发语：`续写章节正文`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`, `specialty:sociology`
- 写入范围：`chapters`

### `$character-builder`

角色卡创建、角色卡更新与关系网络管理。触发词: 新增角色、修改角色、角色卡、人物卡、生成关系图、人物关系、人情关系网、办事关系网、中间人网络。

- 调用格式：`$character-builder <任务目标>`
- 典型触发语：`新增角色`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `specialty:intimacy`, `specialty:sociology`
- 写入范围：`analysis`, `characters`, `context`, `rag`

### `$clue-manager`

线索全生命周期管理。触发词: 埋线索、查线索、推进线索、检查线索一致性、收束线索。

- 调用格式：`$clue-manager <任务目标>`
- 典型触发语：`埋线索`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:plotlines`
- 写入范围：`clues`

### `$construction-gate-manager`

Construction Gate 创建、查询、更新与关闭。只有明确要求创建施工门禁、处理 GATE-*、完成施工门禁或迁移旧 DEC-* 时使用；普通规划和写作只做 frontmatter 门禁查询，不调用本 Skill 读取候选正文。

- 调用格式：`$construction-gate-manager <任务目标>`
- 典型触发语：`处理 GATE`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`
- 写入范围：`chapters`, `construction`, `decisions`, `plotlines`

### `$create-pull-request`

为已接入 story-writer 的正式写作项目安全创建或更新 GitHub Pull Request：要求项目根存在 ENTRY.md 与 BIBLE.md，按 feature/fix/refactor/docs/chore 约定建分支，执行 precommit-checker 与必要的 story-review，精确暂存、提交和普通推送， 并核对远端 branch 与 PR head OID。用户明确要求在写作项目中创建 Pull Request、创建 PR、提交并发 PR 或更新当前 PR 时使用；不用于 story-writer 工具仓或缺少正式项目入口的资料仓，不负责修改故事内容、merge、rebase、amend、 force-push、合并后清理或切回主分支。

- 调用格式：`$create-pull-request <任务目标>`
- 典型触发语：`创建 Pull Request`, `创建 PR`
- 模式：`project-write`
- 条件依赖：`skill:precommit-checker`
- 写入范围：`git`

### `$grilling`

小说重大创作决策的单问单答压力测试。读取当前项目真源，动态拷问核心命题、人物、世界观、剧情线、章节方案和关键场景，在作者确认达成共同理解后把决策摘要写入 .analysis/grilling/。仅在作者明确要求拷问、追问、问透、压力测试、grill 或通过问答分析小说设计时使用；普通的帮我看看、讨论、深度分析、具体分析、润色、审读或写作不触发。

- 调用格式：`$grilling <任务目标>`
- 典型触发语：`压力测试`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`
- 写入范围：`analysis`

### `$intimacy-hd-dark-planner`

黑暗 HD / 压迫场设计。仅作者手动触发。基于 A 场基线产出 design.b.dark.md (本场无 design.a.md 时第一步就地生成); 不写正文, 不回写主文, 不处理正向 B 场。触发词: 黑暗HD设计、压迫场设计、反派强制设计、双声部黑暗设计、失衡后果设计。

- 调用格式：`$intimacy-hd-dark-planner <任务目标>`
- 典型触发语：`黑暗HD设计`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`
- 写入范围：`specialty`

### `$intimacy-hd-dark-writer`

黑暗 HD / 压迫场正文写作。仅作者手动触发。输入 design.b.dark.md, 默认输出 intimacy 场景 draft.md; 不回写主文, 不处理正向 B 场。触发词: 写黑暗HD正文、压迫场正文、反派强制正文、双声部黑暗、失衡后果正文。

- 调用格式：`$intimacy-hd-dark-writer <任务目标>`
- 典型触发语：`写黑暗HD正文`
- 模式：`project-write`
- 条件依赖：`skill:intimacy-hd-dark-planner`, `feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`
- 写入范围：`specialty`

### `$intimacy-hd-planner`

B 场 HD 设计。仅作者手动触发。基于 A 场基线产出 design.b.md (本场无 design.a.md 时第一步就地生成); 不写正文。触发词: B场设计、B场HD设计、正向HD设计、HD设计卡、设计B场。

- 调用格式：`$intimacy-hd-planner <任务目标>`
- 典型触发语：`B场HD设计`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`
- 写入范围：`specialty`

### `$intimacy-hd-writer`

正向 B 场 HD 正文写作。仅作者手动触发。输入 design.b.md, 默认输出 intimacy 场景 draft.md; 不回写主文, 不处理黑暗 HD / 压迫场。触发词: 写B场正文、B场HD正文、正向HD正文、写HD正文、扩写B场。

- 调用格式：`$intimacy-hd-writer <任务目标>`
- 典型触发语：`写B场正文`
- 模式：`project-write`
- 条件依赖：`skill:intimacy-hd-planner`, `feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`
- 写入范围：`specialty`

### `$outline-generator`

总大纲/分章大纲生成、卡文情节建议、回路规划。触发词: 生成大纲、重做大纲、卡文、给情节思路、规划回路、设计办事链、人情世故链、关系动员路径。

- 调用格式：`$outline-generator <任务目标>`
- 典型触发语：`生成大纲`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:intimacy`, `specialty:sociology`
- 写入范围：`chapters`, `prewrite`, `story`

### `$plotline-manager`

正式剧情线与剧情节点管理。用于创建、修改、拆分、合并、移动、取消、替代或查询项目已登记的线路；同步 story/plotlines 索引与状态引用，不写正文、不把未确认方案写成正式节点。触发词: 创建剧情线、修改剧情线、增加剧情节点、拆分剧情线、合并剧情线、取消剧情线、替代剧情线、主线、副线、plotline。

- 调用格式：`$plotline-manager <任务目标>`
- 典型触发语：`创建剧情线`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:plotlines`
- 写入范围：`analysis`, `construction`, `plotlines`

### `$plotline-visualizer`

剧情线真源可视化。用于“生成剧情线图片、画剧情图、阶段总览图、节点上下游图、某条线路图、人物剧情覆盖图、导出 HTML、Mermaid、SVG 或机器可读 JSON”等请求；从任意已接入 story-writer 且启用 plotlines 的小说项目读取正式剧情节点与阶段真源，生成确定性派生视图，不修改剧情事实。

- 调用格式：`$plotline-visualizer <任务目标>`
- 典型触发语：`生成剧情线图片`
- 模式：`project-write`
- 条件依赖：`feature:plotlines`
- 写入范围：`derived`

### `$precommit-checker`

小说项目提交前检查。刷新并验证 GraphRAG，检查 Markdown 断链、正式剧情节点、Git 暂存范围、派生缓存误提交和真源层级错放；只输出终端结论，不生成报告文档、不修改小说正式内容、不暂存或提交。触发词: 预提交检查、提交前检查、检查小说项目、检查未同步、检查断链、precommit-checker。只执行工程门禁；小说内容变更审查使用 story-review。

- 调用格式：`$precommit-checker <任务目标>`
- 典型触发语：`预提交检查`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`
- 写入范围：`rag`

### `$session-checkpoint`

保存仍在进行中的小说任务断点。核验当前目标、目标文件、最近完成证据、工作区状态和下一步，通过 sw session 在项目内生成不提交、紧凑且可过期的 checkpoint。触发词: session checkpoint、小说任务断点、保存当前写作进度、暂停一下稍后继续、上下文快满了。不得用于跨任务完整交接、章节摘要、定稿或正式上下文维护。

- 调用格式：`$session-checkpoint <任务目标>`
- 典型触发语：`session checkpoint`
- 模式：`project-write`
- 条件依赖：—
- 写入范围：`sessions`

### `$session-handoff`

小说任务跨会话、跨任务或跨 Agent 交接。核验项目真源、目标文件、Git 工作区、已完成证据、未决决策和唯一下一步，通过 sw session 在项目内生成不提交的可恢复 handoff 记录。触发词: session handoff、小说任务交接、交接当前故事工作、把进度交给下个会话、换会话继续。不得用于普通章节摘要、定稿或仅需短暂停顿的 checkpoint。

- 调用格式：`$session-handoff <任务目标>`
- 典型触发语：`session handoff`
- 模式：`project-write`
- 条件依赖：—
- 写入范围：`sessions`

### `$session-manager`

扫描、判断、选择、软删除、恢复或永久清理小说任务续接记录。读取 `.sessions/` 中的 handoff/checkpoint，核验当前真源、目标文件、Git 与验证证据，区分 active、blocked、complete-candidate、complete-verified、conflicted 和 unverifiable。触发词: 扫描 sessions、检查会话完成状态、列出已完成的 sessions、删除已完成会话、清理续接记录、删除某个 session、恢复已删除 session、永久删除 session、清空 session 回收记录。只管理 story-writer 续接记录，不管理 Codex 聊天任务。

- 调用格式：`$session-manager <任务目标>`
- 典型触发语：`扫描 sessions`
- 模式：`project-write`
- 条件依赖：—
- 写入范围：`sessions`

### `$session-resume`

从 sw session 托管的 session-handoff、session-checkpoint、任务标识或明确路径恢复未完成的小说任务。校验记录 fingerprint，重新核验项目入口、BIBLE、目标文件、真源闭包和 Git 状态，识别过时前提后继续执行下一项安全动作。触发词: session resume、恢复上次小说任务、从交接继续、读取断点继续、继续上个 session。普通的续写正文或继续写本章应使用 chapter-writer。

- 调用格式：`$session-resume <任务目标>`
- 典型触发语：`session resume`
- 模式：`delegated-write`
- 条件依赖：—
- 写入范围：`delegated`

### `$story-auditor`

故事审计统一入口。支持 implementation、cast-health 与 comprehensive。检查已定稿实现、摘要与状态同步债，或人物群像健康。只诊断，不规划未来、不改真源；不用于审查待合入变更，此类任务使用 story-review。

- 调用格式：`$story-auditor <任务目标>`
- 典型触发语：`群像健康`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`
- 写入范围：`analysis`

### `$story-orchestration`

复杂小说任务的架构、实施、审查三阶段编排。用于作者明确要求多 Agent、多模型、架构后实施，或任务跨多个真源层、章节、剧情线、角色弧并需要独立复核时。触发词: 复杂任务编排、多模型协作、架构后实施、architect implementer reviewer。只规定编排与交接，不替代具体 story-writer 领域 Skill，不把模型名写进流程。

- 调用格式：`$story-orchestration <任务目标>`
- 典型触发语：`复杂任务编排`
- 模式：`delegated-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`
- 写入范围：`delegated`

### `$story-planner`

未来故事规划与冲突检查。对照已定稿章节、BIBLE、正式人物/世界观/线索、阶段弧线、剧情节点和施工规格, 梳理尚未实现的剧情依赖, 产出剧情规划线路图、决策清单和未来 3-5 章就绪队列。触发词: 规划后续剧情、梳理剧情线、生成剧情线路图、检查剧情规划冲突、检查人情世故链、关系网因果规划、阶段编排、章节分配、下一章写什么、把阶段整理到可写。

- 调用格式：`$story-planner <任务目标>`
- 典型触发语：`规划后续剧情`
- 模式：`project-write`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`, `specialty:sociology`
- 写入范围：`analysis`

### `$story-review`

小说内容变更审查。用于审查待合入的小说改动，定位本次变更新增或加重的事实冲突、连续性断裂、状态遗漏与真源回归。支持 PR、分支、commit range、staged 及本地候选变更。触发词: story review、小说变更审查、小说 PR review、审查故事改动、审查当前分支、审查 staged 小说变更、检查这个 PR 的故事问题。只读，不修改文件、不提交、不做泛文学审稿。

- 调用格式：`$story-review <任务目标>`
- 典型触发语：`story review`
- 模式：`read-only`
- 条件依赖：`feature:construction`, `feature:decisions`, `feature:plotlines`
- 写入范围：—

### `$world-builder`

世界观构建与设定冲突处理。触发词: 新建设定、补世界观、修改世界观、能力体系、组织、地理、特殊空间、物件、资源、社会规则、项目机制、设定冲突。

- 调用格式：`$world-builder <任务目标>`
- 典型触发语：`新建设定`
- 模式：`project-write`
- 条件依赖：—
- 写入范围：`bible`, `worldbuilding`

<!-- END GENERATED: project-skill-guide -->

## 安装与刷新

```bash
sw install --target codex
sw setup sync --root /path/to/story-project --sync-agent-links --agent-target agents
```

`sw install` 把 runtime Skills 接入用户的 Agent 平台；`sw setup sync` 把本手册安装或安全刷新到项目根，并可按显式参数创建项目侧 `.agents/skills/` 链接。不要手工修改受管的 `SKILLS.md`；需要项目专属用法时，写入项目自己的说明文档并链接到本页。
