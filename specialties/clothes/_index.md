# Clothes Specialty

本专项提供外部衣装拆解、项目参考收录、人物衣装组合和正式转写方法。它只管理方法与项目参考，不拥有角色衣装、场景衣装或正文事实。

进入本目录前必须运行：

```bash
sw specialty resolve clothes --root "$STORY_PROJECT_ROOT"
```

只有返回 `activation=enabled`、`ready=true` 且没有 blocking diagnostic 时，才将 `$STORY_PROJECT_ROOT/<specialty.target>` 作为 `$CLOTHES_ROOT`。目录存在本身不表示 Specialty 已启用或可用。

## 所有权

- `protocols/`、本 `_index.md`、`references/_index.md` 与 `references/library/` 由 package 管理。
- `references/catalog/` 由 scaffold 首次种下并交给当前项目管理；具体用途或单件类型目录只在出现真实 `CLO-*` 时创建。
- `references/components/` 由当前项目管理，只在启用项目分类覆盖或形成真实组件内容时创建。
- `references/supplements/` 由当前项目管理，只保存不属于 catalog 或 components 的补充参考。
- 跨场景稳定审美与组合语法归人物 `衣装/_GRAMMAR.md`，具体衣装归同目录子档并由 `衣装/_index.md` 登记；单场衣装规格归对应 `CON-*`；正文事实归章节正文。
- 正式 owner 必须自足；可以列出实际采用的 `CLO-*` 导航用于双向追溯，但不得只写编号或反向依赖本专项参考档案才能成立。

## 入口

- [协议索引](protocols/_index.md)
- [参考层索引](references/_index.md)
- `references/catalog/`：项目衣装参考库；fresh enable 时种下，旧安装按需创建
- `references/supplements/`：项目补充参考；fresh enable 时种下，旧安装按需创建

公开 Skill 分工：`clothes-decomposer` 负责外部素材到 catalog；`clothes-designer` 负责 catalog 到人物衣装 owner。
