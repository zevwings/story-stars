# 项目写作模板

本目录仅保存项目自有模板和公共模板的补充片段；公共模板由 `.story.lock.toml` 锁定的 Zen 与已启用 Specialty 包持有。

- `characters/manifest.yaml` 声明人物补充、星辰契约模板及人物创建 bundle 扩展。
- `prototypes/manifest.yaml` 声明项目专属人物与地区原型模板。
- 每个 domain 的 manifest 与片段直接放在该目录下，不设置物理 library/exclusive 层；模板 ID 和 schema 身份保持稳定。
- 使用 `sw template validate/list/resolve/render --root <项目根>` 检查和消费有效模板组合，不手工拼接公共包路径。

- `plotlines/manifest.yaml` 为公共节点提供项目元数据 slot 与独立的尾部扩展接口；不复制节点和施工公共骨架。
- `intimacy/manifest.yaml` 注册四份项目独有模板；使用说明见 [亲密模板](intimacy/README.md)。
- 所有 manifest 使用 `schema_version: 2`，公共模板与项目补充共同校验。
