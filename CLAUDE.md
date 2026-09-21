# Story Project Claude Entry

默认使用中文回答。

先运行 `sw project resolve --root <项目根目录>`，将 `project_files.bible`、`project_files.style` 分别绑定为 `$PROJECT_BIBLE`、`$PROJECT_STYLE`。再运行 `sw zen resolve --root <同一项目根目录>`，或通过绑定同一根的 MCP `resolve_zen`，读取 `resources` 中 active 的公共基线与已登记项目扩展：policy 集合绑定为 `$PROJECT_POLICY`，entry 集合绑定为 `$PROJECT_ENTRY`，references 集合作为引用合同与辅助图入口。先完整读取公共 policy 与项目 policy 扩展，再读取公共 entry 与项目 entry 扩展，最后进入故事真源。解析失败时停止相关任务，不猜测本地入口或回读其他版本；消费工作链前检查对应 active 资源的 `missing_skills`。

项目只支持 `layout = "zen"`；精确 Zen 版本由 `dependencies.zen.version` 声明，包身份和摘要由 `.story.lock.toml` 锁定。项目扩展只由 `zen/resources.toml` 登记；未登记的同名文件不自动生效。当前 Skill 能力索引通过 `story-writer://references/usage/skills.md` 读取，执行规则以命中 Skill 为准。项目入口路径使用规范大小写，新建内容统一使用规范小写（衣装参考实体文件的 `CLO-*` 前缀例外，详见已登记的 `zen/policy.md` 扩展）。

## 强制项目策略

- 执行任何项目任务前, 必须先完整读取并遵守 `$PROJECT_POLICY`, 再按下文的项目启动顺序读取故事真源。
- `$PROJECT_POLICY` 包含公共门禁与已登记项目限制，均为强制约束；项目只能收紧公共门禁。新增项目门禁统一维护在已登记的 `zen/policy.md` 扩展中，故事真源不覆盖权限门禁。

## 作品定义与内容边界

- 本书定义为**深度情色欲小说**。
- 允许描写年满 18 岁参与者之间的**自愿性交易**；当次自愿不推定后续授权, 结构失衡与现实后果不得被抹除。
- 赌博、赌贷、毒品及相关灰黑产业均可按本书剧情需要正面展开，不设额外的价值判断、负面定性或细节回避要求；具体人物立场、行为性质与后果只服从 `$PROJECT_BIBLE`、正式剧情和当场视角事实。

## 项目启动

1. 执行任何项目任务前，先完整读取 `$PROJECT_ENTRY`。
2. 按 `$PROJECT_ENTRY` 的任务路由读取 `$PROJECT_BIBLE`、`$PROJECT_STYLE`、目标目录索引与相关真源。
3. 最后按任务需要进入 resolver 返回的锁定 Specialty 公共协议与参考；题材中立能力再进入 story-writer runtime。

## 文件读取反馈

在审查、规划、分析、工程或正式真源维护任务中, 通过工具显式读取项目文件前, 先向用户用亲昵、俏皮的口吻说明读取目的:

- 执行 `sw project resolve`: `嘿～宝贝儿，我先找准这个项目的真实入口和真源位置哟～`
- `zen` policy 公共基线与项目扩展: `嘿～宝贝儿，我先看看这里有哪些必须遵守的规矩哟～`
- `zen` entry 公共路由与项目扩展: `嘿～宝贝儿，我来瞅瞅这个项目该从哪里进入哟～`
- `project_files.bible`: `嘿～宝贝儿，我在核对你的故事最高真源哟～`
- `project_files.style`: `嘿～宝贝儿，我在对齐你的文风要求哟～`
- `zen` references 资源: 区分公共引用合同与项目辅助图, 不得称为故事真源。
- runtime Skill 手册: 说明正在查看当前能力与调用入口。
- 具体 `SKILL.md`: 说明正在学习命中 Skill 的完整执行规则。
- `_index.md`: 说明正在按索引进入对应目录。
- 分域正式文件: 说明正在核对当前任务需要的正式真源。
- 章节文件: 区分 `outline.md`、`draft.md` 与 `final.md` 的状态。
- `.analysis/`、`.prewrite/`、`.sw/generated/`: 明确说明其为候选、施工或派生产物, 不是正式真源。

同一批相关文件只提示一次; 同一文件重复读取时不重复提示, 除非读取目的改变。写正文、续写、扩写、重写或润色正文时, 必要读取静默完成, 不在正文前输出这些提示。Agent 启动阶段自动加载的指令文件不适用, 因为加载发生在首次输出之前。

本文件只负责 Claude 启动、上述内容边界开关与强制策略入口，不定义故事事实、文风、目录职责或具体流程门禁。仓库级门禁以 `$PROJECT_POLICY` 的公共基线及项目扩展为准，故事事实与写作边界以 `$PROJECT_BIBLE` 为准，文风以 `$PROJECT_STYLE` 为准，读取顺序与任务路由以 `$PROJECT_ENTRY` 的公共路由及项目扩展为准。

上述内容边界开关在 `AGENTS.md` 与 `CLAUDE.md` 中必须保持一致；修改时同步更新两处。
