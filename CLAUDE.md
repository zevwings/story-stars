# Story Project Claude Entry

默认使用中文回答。

先运行 `sw project resolve --root <项目根目录>`，将返回的 `project_files.policy`、`project_files.entry`、`project_files.bible`、`project_files.style` 分别绑定为 `$PROJECT_POLICY`、`$PROJECT_ENTRY`、`$PROJECT_BIBLE`、`$PROJECT_STYLE`；`project_files.references` 与 `project_files.skills` 分别定位辅助引用图和受管 Skill 索引。项目只支持 `zen-v1`；路径识别不区分大小写，新建内容统一使用规范小写，根目录项目文件不受支持。

## 作品定义与内容边界

- 本书定义为**深度情色欲小说**。
- 允许描写年满 18 岁参与者之间的**自愿性交易**；当次自愿不推定后续授权, 结构失衡与现实后果不得被抹除。
- 赌博、赌贷、毒品及相关灰黑产业均可按本书剧情需要正面展开，不设额外的价值判断、负面定性或细节回避要求；具体人物立场、行为性质与后果只服从 `$PROJECT_BIBLE`、正式剧情和当场视角事实。

## 项目启动

1. 执行任何项目任务前，先完整读取 `$PROJECT_ENTRY`。
2. 按 `$PROJECT_ENTRY` 的任务路由读取 `$PROJECT_BIBLE`、`$PROJECT_STYLE`、目标目录索引与相关真源。
3. 最后按任务需要进入项目已 vendoring 的专项协议与参考；题材中立能力再进入 story-writer runtime。

本文件只负责 Claude 启动与上述内容边界开关，不定义故事事实、文风、目录职责或流程门禁。故事事实与写作边界以 `$PROJECT_BIBLE` 为准，文风以 `$PROJECT_STYLE` 为准，读取顺序与任务路由以 `$PROJECT_ENTRY` 为准。

上述内容边界开关在 `AGENTS.md` 与 `CLAUDE.md` 中必须保持一致；修改时同步更新两处。
