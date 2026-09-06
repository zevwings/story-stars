# 写作模板

本目录保存当前项目实际消费的可组合写作模板。

- `*/library/` 由 story-writer 管理，项目不得直接修改。
- `*/exclusive/` 由写作项目管理，story-writer 不覆盖。
- 每个 ownership root 使用固定 `manifest.yaml` 声明 templates、supplements 与 bundles。
- `template.lock` 只校验 library manifests 和 library Markdown。
- Markdown 源文件使用语义明确的小写横线名，不使用泛化的 `template.md` 或 `_template.md`；最终生成路径仍由 manifest 的 `target` 独立声明。
- 模板通过 `sw template check/list/resolve/render` 访问，不直接扫描目录推断有效组合。
