# 衣装协议索引

本目录只提供跨项目稳定的方法，不保存项目人物偏好、具体套装或固定审美。

按任务读取：

- 从外部图片、视频或多角度素材拆解衣装：[视觉衣装拆解协议](视觉衣装拆解协议.md)。
- 创建／更新 `CLO-*`、组件词典或参考状态：[衣装收录与状态协议](衣装收录与状态协议.md)。
- 从 catalog 选择、组合并适配人物衣装：[衣装分析与设计协议](衣装分析与设计协议.md)。
- 将采用结果写入人物衣装 owner：[衣装正式转写协议](衣装正式转写协议.md)。

`clothes-decomposer` 负责外部素材到 catalog；`clothes-designer` 负责 catalog 到人物衣装。两个入口都要求 `$CLOTHES_ROOT` ready，不得用 `.analysis`、直接人物写入或 story-writer 源码包绕过未安装／未配置的 Specialty。

执行 catalog 读写时还必须读取项目 `references/components/_index.md` 声明的分类权威文件。通用协议决定 `clothes.catalog@1` frontmatter、Markdown 结构、默认分类与 owner 边界；项目组件可以替换 `单件类型` 的默认枚举、收窄 `组合形式` 的实际输出集合，并规定项目目录，但不得自造 `record_kind`、状态、用途、frontmatter 字段或正文结构。项目没有声明分类覆盖时，使用本协议的通用默认值。
