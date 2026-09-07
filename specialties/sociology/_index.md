# Sociology Specialty

本专项提供面向小说创作的应用社会学方法：把互动秩序、情绪劳动、印象管理、社会网络、中间人、制度与非正式规则、身份资源和中国语境中的人情面子，转译为可进入场景的行动、反应与后果链。当前协议重点覆盖社会关系场的建模、写前设计和写后校验；它只管理方法与参考，不拥有角色关系、组织制度、章节场景、动态上下文或其它项目事实。

进入本目录前必须运行：

```bash
sw specialty resolve sociology --root "$STORY_PROJECT_ROOT"
```

只有返回 `activation=enabled`、`ready=true` 且没有 blocking diagnostic 时，才将 `$STORY_PROJECT_ROOT/<specialty.target>` 作为 `$SOCIOLOGY_ROOT`。目录存在本身不表示 Specialty 已启用或可用。

## 所有权

- `protocols/`、本 `_index.md`、`references/_index.md` 与 `references/library/` 由 package 管理。
- `references/supplements/` 由 scaffold 首次种下并交给当前项目管理，只保存社会学补充参考。
- 稳定人物关系、中间人网络与称谓事实归人物关系卡；组织程序、资源边界与制度事实归对应世界观真源；题材级社会口径归 `story/genres/`；场景发生及其余波归剧情、章节与动态状态真源。
- 本专项不建立平行的 `characters/`、`chapters/`、`context/` 或 `mechanisms/`；设计卡属于具体章节施工时，写入该章节既有的 outline / prewrite / Construction 载体。
- 正式 owner 必须自足，不得只引用本专项协议或参考来代替项目事实。

## 入口

- [协议索引](protocols/_index.md)
- [参考层索引](references/_index.md)
- `references/supplements/`：项目补充参考；fresh enable 时种下，旧安装按需创建

## 当前覆盖面

- `interaction`：互动秩序、情绪劳动、印象管理与拒绝序列。
- `networks`：社会网络、中间人、递话失真与消息扩散。
- `institutions`：制度、组织、程序与非正式规则的共同作用。
- `stratification`：身份、资源、公开程度与权力差异。
- `guanxi`：人情、面子、办事链与关系余波。

这些名称是检索维度，不是必须复制到写作仓库的空目录。package 通用材料继续通过 `protocols/` 与 `references/library/` 的索引组织；当前小说追加的参考统一进入 `references/supplements/`，但不得建立平行事实库。
