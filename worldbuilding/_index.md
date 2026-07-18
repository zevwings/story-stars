# 世界观索引

本目录存放已确认的世界观正式真源。讨论稿、待定方案、施工计划不写入本目录。工具不预设题材分类; 条目按项目题材自建子目录, GraphRAG 会自动遍历 `worldbuilding/` 下的目录并按路径推断类型。

## 说明

- 子目录按项目题材自定义 (例如 `factions/` 势力、`regions/` 地域、`history/` 历史、`systems/` 底层机制, 或题材专属分类)。
- 每个子目录内应有 `_index.md` 说明该分类范围。
- 若某分类需要专属的 RAG 类型名或输出分组, 在项目根 `.story.config.toml` 的 `worldbuilding.type_map` / `group_output_map` 声明。
- 主目录只维护索引, 不直接写条目。

## 分类登记

| 分类目录 | 用途 | 备注 |
| --- | --- | --- |
| [systems](systems/_index.md) | 星契体系的时代起源、成立条件与基础机制, 及星辰权柄、能力边界、精神结构、星辰控制、战斗与黑暗行为 | 已升格的正式设定 |
| [factions](factions/_index.md) | 星契官方机构、传统权贵、地下生态与黑暗契约者类型 | 已升格的正式设定 |
| [technology](technology/_index.md) | 肉体兴奋药剂，以及针对星辰异变的催化与研究性净化药剂 | 已升格的正式设定 |
| [society](society/_index.md) | 星契社会的公开性、登记制度与关系形态 | 已升格的正式设定 |
| [regions](regions/_index.md) | 影射式架空的地理映射、城市命名与主城空间结构 | 已升格的正式设定 |
