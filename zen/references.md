# 项目引用方向说明

> 本页是项目目录引用关系的辅助说明图，不保存故事事实，也不构成正式真源或新增规则。
> 引用类型与允许方向以 `policy.md` 与 `story-writer://rules/core/正式真源引用方向` 为准；若本页与正式真源或 runtime 规则冲突，以后者为准。

## 怎样读图

- `A --> B` 表示 A 引用并依赖 B，即 B 是 A 的上游真源。
- 实线表示 `depends_on`，参与依赖环检查。
- 虚线表示 `interface`、`evidence`、`construction_gate` 或派生层读取，不是事实依赖。
- `index`、`related` 和 `backlink` 只负责导航，不在主图中展开。

## 正式依赖

```mermaid
flowchart TB
    Bible["bible.md<br/>项目最高真源"]
    Policy["policy.md<br/>流程与目录门禁"]
    World["worldbuilding/<br/>世界观"]
    Character["characters/<br/>正式人物"]
    Architecture["story/architecture.md<br/>稳定关系结构"]
    Genre["story/genres/<br/>题材口径"]
    Specialty["已启用专项<br/>mechanisms / references / 专项档案"]
    Clue["clues/<br/>线索"]
    Plotline["story/plotlines/<br/>正式剧情节点"]
    Arc["story/arcs/<br/>阶段编排"]
    Context["context/<br/>当前动态上下文"]
    Chapter["chapters/<br/>定稿章节"]

    World -->|"depends_on"| Bible
    World -->|"内部设定"| World
    Policy -. "门禁" .-> Bible

    Character -->|"世界设定"| World
    Character -->|"静态人物事实"| Character

    Architecture -->|"作品级承诺"| Bible
    Architecture -->|"人物静态事实"| Character

    Specialty -->|"专项人物档案"| Character
    Specialty -->|"专项设定"| World

    Plotline -->|"最高口径"| Bible
    Plotline -->|"关系结构"| Architecture
    Plotline -->|"题材口径"| Genre
    Plotline -->|"人物事实"| Character
    Plotline -->|"世界设定"| World
    Plotline -->|"线索状态"| Clue
    Plotline -->|"已启用专项"| Specialty
    Plotline -->|"其他剧情节点"| Plotline

    Arc -->|"调用、编排"| Plotline

    Chapter -->|"消费剧情"| Plotline
    Chapter -->|"消费人物"| Character
    Chapter -->|"消费世界观"| World
    Chapter -->|"消费线索"| Clue
    Chapter -->|"消费专项"| Specialty
    Chapter -->|"消费当前上下文"| Context
```

## 接口、证据与派生读取

```mermaid
flowchart LR
    Plotline["story/plotlines/"]
    Construction["story/construction/ 或 .construction/"]
    Chapter["chapters/"]
    Clue["clues/"]
    Context["context/"]
    Gate["story/construction/_gates/<br/>临时流程门禁"]
    Formal["正式真源"]
    Derived[".analysis / .prewrite / .rag / Preview"]

    Plotline -. "interface" .-> Construction
    Construction -. "interface" .-> Plotline
    Clue -. "evidence" .-> Chapter
    Context -. "evidence" .-> Chapter
    Gate -. "construction_gate" .-> Plotline
    Gate -. "construction_gate" .-> Construction
    Gate -. "construction_gate" .-> Chapter
    Derived -. "只读" .-> Formal
```

剧情节点与施工单元之间的 `interface` 可以双向存在；`construction_gate` 只能从 `_gates/` 指向正式目标，正式目标和普通 `CON-*` 不得反向引用具体 Gate。

## 关键禁止方向

```mermaid
flowchart LR
    World["worldbuilding/"] -. "禁止 depends_on" .-> Character["characters/"]
    Character -. "禁止 depends_on" .-> Narrative["剧情节点 / 阶段页 / 施工单元<br/>专项人物档案 / 章节 / 动态上下文"]
    Plotline["story/plotlines/"] -. "禁止反向依赖" .-> Arc["story/arcs/"]
    Formal["任何正式真源"] -. "禁止反向引用" .-> Gate["story/construction/_gates/"]
    Formal -. "禁止依赖" .-> Derived[".analysis / .prewrite / .rag / Preview"]
```

## 工具检查

在写作项目根目录执行：

```bash
sw check references
```

从其他目录执行时，可选指定项目根：

```bash
sw check references --root <project>
```

该命令只把非模板文件 `## 正式真源引用` 小节中的路径视为 `depends_on`，并检查允许方向与依赖环；普通导航、证据和接口不会混入依赖图。

当前仍为 `report-only`，用于报告违规，不代替正式规则或 `sw check links`。
