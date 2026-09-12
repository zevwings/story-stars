# 表现与渲染

收录线条、着色、体积与材质表现；按 2D、3D、摄影等形式组织实际所需条目。先查看条目表，再读取匹配文件。需要扩展时按下列模板创建小写横线命名的 Markdown 文件并登记。

## 条目

| ID | 名称 | 文件 | 适用说明 |
| --- | --- | --- | --- |
| `rendering.stylized-3d` | 风格化 3D | [stylized-3d.md](stylized-3d.md) | 项目默认渲染；可信骨相、自然软组织与个体辨识度 |
| `rendering.3d-cinematic-realism` | 电影级 3D 写实 | [3d-cinematic-realism.md](3d-cinematic-realism.md) | 可选电影级写实渲染，明确选用时采用 |

## 创建模板

```markdown
---
id: rendering.<slug>
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
