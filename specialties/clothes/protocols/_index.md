# 衣装协议索引

本目录只提供跨项目稳定的方法，不保存项目人物偏好、具体套装或固定审美。

按任务读取：

- 分析图片、文字衣装或设计搭配：[衣装分析与设计协议](衣装分析与设计协议.md)。
- 创建／更新 `CLO-*`、组件词典或参考状态：[衣装收录与状态协议](衣装收录与状态协议.md)。
- 将候选写入人物衣装或 Construction：[衣装正式转写协议](衣装正式转写协议.md)。

普通分析与设计可以由 `clothes-designer` 在 Baseline mode 完成，不要求安装本专项。只有编号、收录、目录查重、状态维护或从项目 `CLO-*` 转写时，才要求 `$CLOTHES_ROOT` ready。

Managed mode 还必须读取项目 `references/components/_index.md` 声明的分类权威文件。通用协议决定 `clothes.catalog@1` frontmatter、Markdown 结构、默认分类与 owner 边界；项目组件可以替换 `单件类型` 的默认枚举、收窄 `组合形式` 的实际输出集合，并规定项目目录，但不得自造 `record_kind`、状态、用途、frontmatter 字段或正文结构。项目没有声明分类覆盖时，使用本协议的通用默认值。
