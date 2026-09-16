# 组合预设

提供常用模块组合，只引用基础模块；不复制正文、不引用其他预设。每个维度最多选一个模块，未选维度由当次请求决定。相对路径以本预设文件为基准。

## 条目

| ID | 名称 | 文件 | 适用说明 |
| --- | --- | --- | --- |
| `presets.modern-urban-stylized-3d` | 现代都市风格化 3D | [modern-urban-stylized-3d.md](modern-urban-stylized-3d.md) | 本项目默认视觉基座；按需叠加用途与异能模块 |
| `presets.modern-urban-3d-realism` | 现代都市 3D 写实 | [modern-urban-3d-realism.md](modern-urban-3d-realism.md) | 可选写实预设，明确选用时采用 |

## 创建模板

```markdown
---
id: presets.<slug>
name: <中文名称>
---

# <中文名称>

## 使用目标
<组合适用的画面>

## 模块引用
<按需登记 rendering、settings、genres、purposes 模块的 ID 与 Markdown 相对链接>

## 组合调整
<只写组合特有调整，不复制基础提示词，不含个人事实>
```
