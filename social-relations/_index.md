# 专项索引

本目录存放项目写作专项的角色档案、章节场景、上下文、机制与参考。本 `_index.md` 是 package-managed 契约入口；其它项目内容仍归当前项目。目录或 `_index.md` 存在不表示该 Specialty 当前已启用；使用前必须运行 `sw specialty resolve <name> --root "$STORY_PROJECT_ROOT"`，仅在 `activation=enabled`、`ready=true` 且无 blocking diagnostic 时，才将 `$STORY_PROJECT_ROOT/<specialty.target>` 作为 `$SPECIALTY_ROOT`。

项目 `.story.config.toml` 的 `[[specialties]]` 条目只声明 `name`、`enabled`、`dir` 与 additive `overrides`; 版本化标签、关键词、规则入口、状态类别和 package 元数据由 Specialty package 定义, `specialty.lock` 记录已安装基线。`overrides.*_add` 只能追加项目差异, 不能替代 package 基线。公共模板不提供任何具体专项语义。

## 结构

- [角色专项档案](characters/_index.md)
- [章节专项场景](chapters/_index.md)
- [专项上下文](context/_index.md)
- [专项机制](mechanisms/_index.md)
- [专项参考](references/_index.md)
- `_template/`

## 边界

本专项的尺度、红线与必读规则, 以 `specialty.lock` 记录的已安装 package 规则入口为准; `overrides.rules_add` 只追加项目规则, 不替代 package 基线。

`mechanisms/` 只存放专项内部长期复用机制; 全书题材口径仍归 `story/genres/`, 正式世界观仍归 `worldbuilding/` 与 `BIBLE.md`。

`mechanisms/` 是规范层, 有事实约束力; `references/` 是参考层, 只提供词条与写法素材, 不构成事实, 冲突时以 `mechanisms/` 为准。
