# 输出用途

收录人像、全身设计、场景等输出任务的结构要求，不固定人物与画风。先查看条目表，再读取匹配文件。初始无实际条目；需要时按下列模板创建小写横线命名的 Markdown 文件并登记。

## 条目

| ID | 名称 | 文件 | 适用说明 |
| --- | --- | --- | --- |
| `purposes.character-identity` | 角色定脸 | [character-identity.md](character-identity.md) | 建立或复核角色稳定身份表现 |
| `purposes.full-body-costume` | 全身造型 | [full-body-costume.md](full-body-costume.md) | 角色服装、体态与轮廓设计 |
| `purposes.narrative-scene` | 叙事场景 | [narrative-scene.md](narrative-scene.md) | 具有明确人物行动和空间关系的剧情配图 |
| `purposes.environment-establishing` | 场景设定 | [environment-establishing.md](environment-establishing.md) | 建立可复用于人物剧情图的都市空间 |

## 创建模板

```markdown
---
id: purposes.<slug>
name: <中文名称>
---

# <中文名称>

## 目标效果
<具体可见效果及适用范围>

## 基础提示词
<可复用的正向描述>

## 可选调整
<按需填写可调项>

## 组合说明
<与其他维度配合方式及必要边界>
```
