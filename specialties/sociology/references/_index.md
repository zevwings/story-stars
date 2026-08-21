# 应用社会学参考索引

本目录存放本专项的**写作参考素材**。本 `_index.md` 与 `library/` subtree 由 package 管理，其余内容属于当前项目自有参考；package 提供的版本化通用素材安装在 `library/`，`specialty.lock` 记录已安装基线，后续只由显式 `upgrade <name> --apply` 实际更新。

## 与其他目录的分工

- package 安装的 `protocols/` 是**方法规范层**: 定义社会关系场的建模、校验与写作边界；项目长期事实仍由人物关系卡、世界观、`story/genres/`、剧情、章节与动态状态等正式真源承载。
- 本目录是**参考层**: 除本 `_index.md` 与 `library/` managed subtree 外只放项目自有词条与写法素材，`library/` 只放 package-managed 通用素材；两者都**不构成任何事实，不规定任何人物的偏好与经历**。
- 参考与协议冲突时服从 `protocols/`；参考与项目事实冲突时服从对应正式真源。

## 读取规则

- 先按 `protocols/_index.md` 读取本任务命中的方法页，随后核对人物关系、组织制度、题材口径与其它正式真源，最后才来本目录取观察问题。
- 本目录的词条不得反向补出人物偏好、经历或关系事实。
- 本目录不参与一致性检查, 也不作为设定冲突的判据。
- 本目录按需查阅, 不进入默认读取包。
- 已安装 package 提供 `references/library/_index.md` 时, 从该索引按需进入; 不全量读取, 也不把 managed library 复制到项目自有位置。

## 建页建议

- 项目另存的研究或分析页应标注对应协议；若引用项目事实，再附对应正式真源路径。
- 参考页里的分类或强度提示只是指路，实际方法判定回到 `protocols/`，项目事实判定回到正式真源。
- 项目自有参考页只从项目真源、作者明确提供的材料或建库时人工选定的离线参考整理；`library/` 首次由 Specialty package 安装, 后续只由 `upgrade <name> --apply` 实际更新。运行时不从写作库公共参考补项目内容。

## 当前参考

- 项目自有参考: 待确认。
- Vendored 通用素材: package 提供 `references/library/_index.md` 时从该入口按需读取。
