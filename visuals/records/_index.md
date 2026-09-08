# 视觉生产记录

沿用角色定脸与角色生图 Skill 的生产记录格式。按角色 ID 导航到实际请求、Prompt、manifest 和批准指针；不预建示例请求或空批准记录。

## 条目

| 角色 ID | 记录入口 | 说明 |
| --- | --- | --- |
| CHR-0041 | [杨柳视觉复用入口](CHR-0041/README.md) | 四张获批图、参考用途与复用 Prompt |
| CHR-0041 | [综艺候场全身图](CHR-0041/renders/20260908T125336-backstage-full-body/manifest.json) | 场景获批，引用 identity v2 |
| CHR-0041 | [杨柳 identity](CHR-0041/identity/current.json) | v2：动漫正脸与45°获批 |
| CHR-0041 | [咖啡馆读书](CHR-0041/renders/20260908T124232-cafe-reading/manifest.json) | 日常半身场景获批，引用 identity v2 |

## 记录规则

- 本目录下 `<id>/identity/current.json` 为现有批准身份入口，其余路径与字段按执行 Skill 创建。
- 图片、模块、request、prompt、manifest 引用均相对视觉根；正式人物资料路径相对项目根。
- request.md 保存当次要求、实际采用的长期偏好路径与 SHA-256、命中内容快照及当次覆盖项；未使用偏好时如实注明。
- 在实际 prompt.md 中记录选定模块 ID、路径和实际提交文本；后续修改公共模块不追改历史 Prompt。
- 仅作者明确接受的结果进入批准记录；归档前重新确认 feature 已启用且就绪，先验证图片和 hash，再写记录，最后更新指针。关闭后保留记录，只读查看，不更新 current 或注册表。
- Prompt-only 默认只展示；feature 就绪且明确要求保存时使用指定位置并注明未调用，不创建批准 manifest；关闭时仅展示。
