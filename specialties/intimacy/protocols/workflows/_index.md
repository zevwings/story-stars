# 亲密专项工作流协议

本目录保存安装时随项目固定的专项工作流细则。Runtime Skill 只负责触发、解析项目路由与执行通用能力；实际设计、写作和校验口径以当前项目安装的这些协议为准。

## 正向流程

- [设计编排逻辑](planner/choreography-logic.md)
- [设计蒸馏协议](planner/distillation-protocol.md)
- [素材提取协议](planner/material-extraction.md)
- [设计卡生成协议](planner/script-generation.md)
- [正文执行协议](writer/execution-protocol.md)

## 黑暗场流程

- [设计协议](dark-planner/design-protocol.md)
- [正文执行协议](dark-writer/execution-protocol.md)

所有协议中的 `$SPECIALTY_ROOT` 均指 `sw specialty resolve intimacy` 返回的项目专项目录；不得将它硬编码为任何固定项目相对路径。
