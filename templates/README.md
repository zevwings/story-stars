# 项目写作模板

本目录仅保存项目自有模板和公共模板的补充片段；公共模板由 `.story.lock.toml` 锁定的 Zen 包持有。

- `characters/manifest.yaml` 声明人物补充、星辰契约模板及人物创建 bundle 扩展。
- `prototypes/manifest.yaml` 声明项目专属人物与地区原型模板。
- 每个 domain 的 manifest 与片段直接放在该目录下，不设置物理 library/exclusive 层；模板 ID 和 schema 身份保持稳定。
- 使用 `sw zen template validate/list/resolve/render --root <项目根>` 检查和消费有效模板组合，不手工拼接公共包路径。
