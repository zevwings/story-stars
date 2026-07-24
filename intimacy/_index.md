# 专项索引

本目录存放某一写作专项 (例如成人写法等敏感专项) 的角色档案、章节场景、上下文与专项机制。是否启用该专项、其关键词与规则边界, 由项目根目录 `.story.config.toml` 的 `[[specialties]]` 声明; 工具默认不含任何专项语义。正文回写仍以 `../chapters/` 中对应草稿为承载文件。

## 结构

- [角色专项档案](characters/_index.md)
- [章节专项场景](chapters/_index.md)
- [专项上下文](context/_index.md)
- [专项机制](mechanisms/_index.md)
- [专项参考](references/_index.md)
- `_template/`

## 边界

本专项的尺度、红线与必读规则, 以 `.story.config.toml` 中对应 `[[specialties]]` 的 `rules` 指向的规则文件为准。同时，所有敏感章节的成人亲密内容写作必须严格遵守 [18+HD纯肉题材口径](../story/genres/18+HD纯肉.md) 所规范的五感细节、性心理描写与禁用词避障要求。

`mechanisms/` 只存放专项内部长期复用机制; `references/` 只存放写作参考素材, 不构成任何事实, 与 `mechanisms/` 冲突时以后者为准; 全书题材口径仍归 `story/genres/`, 正式世界观仍归 `worldbuilding/` 与 `BIBLE.md`。

## 场型判定与读取顺序

1. 先读项目 `BIBLE.md`、`STYLE.md`、`story/genres/_index.md` 与命中的题材页。
2. 根据 `BIBLE.md` 三轴和当场人物事实先判正向 / dark；公共写作规则不得覆盖项目判据。
3. 正向场再按呈现方式分 A / B：非 HD、留白或过渡走 A，完整 HD 兑现走 B。尺度强弱、机制名称和身份落差都不能单独决定场型。
4. 命中道具、衣装、场域、影像或其他专项机制时，读取 `mechanisms/_index.md` 与对应机制页。
5. 需要具体素材时才读取 `references/_index.md`；参考不产生人物授权，不反向生成项目事实。
