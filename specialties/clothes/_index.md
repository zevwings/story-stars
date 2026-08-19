# Clothes Specialty

本专项提供衣装分析、设计、项目参考收录和正式转写方法。它只管理方法与项目参考，不拥有角色衣装、场景衣装或正文事实。

进入本目录前必须运行：

```bash
sw specialty resolve clothes --root "$STORY_PROJECT_ROOT"
```

只有返回 `activation=enabled`、`ready=true` 且没有 blocking diagnostic 时，才将 `$STORY_PROJECT_ROOT/<specialty.target>` 作为 `$CLOTHES_ROOT`。目录存在本身不表示 Specialty 已启用或可用。

## 所有权

- `protocols/`、本 `_index.md`、`references/_index.md` 与 `references/library/` 由 package 管理。
- `references/components/` 与 `references/catalog/` 由当前项目管理，只在出现真实内容时创建。
- 跨场景稳定审美与组合语法归人物 `衣装/_GRAMMAR.md`，具体衣装归同目录子档并由 `衣装/_index.md` 登记；单场衣装规格归对应 `CON-*`；正文事实归章节正文。
- 正式 owner 必须自足，不得只写 `CLO-*` 或反向依赖本专项参考档案。

## 入口

- [协议索引](protocols/_index.md)
- [参考层索引](references/_index.md)
