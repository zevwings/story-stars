# 专项索引

本目录是本项目亲密写作专项的完整入口，存放项目已 vendoring 的协议与参考，以及项目自有的角色档案、章节场景、上下文和专项机制。是否启用、目录位置及根安装锚点由项目根目录 `.story.config.toml` 声明；本地安装凭证记录在 `specialty.toml`，路由元数据与 package baseline 锁定在 `specialty.lock`。正文回写仍以 `../chapters/` 中对应草稿为承载文件。

## 结构

- [角色专项档案](characters/_index.md)
- [章节专项场景](chapters/_index.md)
- [专项上下文](context/_index.md)
- [专项协议](protocols/_index.md)
- [专项机制](mechanisms/_index.md)
- [专项参考](references/_index.md)
- `_template/`

## 边界

本专项的公共流程、尺度、红线与必读规则从 [专项协议索引](protocols/_index.md) 进入，不回退读取 story-writer runtime 的同名亲密规则。同时，所有敏感章节的成人亲密内容写作必须严格遵守 [18+HD纯肉题材口径](../story/genres/18+HD纯肉.md) 所规范的五感细节、性心理描写与禁用词避障要求。

`protocols/` 与 `references/library/` 是 package-managed baseline；项目修改会由 `sw specialty diff intimacy` 标识，并只通过显式 upgrade 处理。`mechanisms/` 只存放本项目专项内部长期复用机制；`references/` 根层文件只存放项目自有写作参考素材，不构成任何事实，与 `mechanisms/` 冲突时以后者为准；全书题材口径仍归 `story/genres/`，正式世界观仍归 `worldbuilding/` 与 `BIBLE.md`。

## 大纲承接与读取顺序

1. 先读项目 `BIBLE.md`、`STYLE.md`、`story/genres/_index.md` 与命中的题材页。
2. 从 `protocols/_index.md` 进入命中的公共专项协议。
3. 直接读取正式大纲或作者指定的 A／B／dark，不在专项层重新判断。
4. 命中道具、衣装、场域、影像或其他专项内容时，按需把对应机制页作为可选参考。
5. 需要具体素材时才读取 `references/_index.md`；参考不产生人物授权，不反向生成项目事实。
6. 写作者按大纲、人物卡和前后文自然处理；只有形成长期关系或剧情变化时，才按既有定稿流程同步正式状态。
