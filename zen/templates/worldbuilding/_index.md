---
schema: template.domain-index@1
domain: worldbuilding
templates:
  - id: worldbuilding.category-index
    source: library
    path: library/category-index.md
    summary: 建立世界观分类入口
    target: worldbuilding/{category}/_index.md
    required: false
  - id: worldbuilding.entry
    source: library
    path: library/entry.md
    output_schema: worldbuilding.entry@1
    summary: 建立普通世界观条目
    target: worldbuilding/{category}/{entry}.md
    required: false
  - id: worldbuilding.system
    source: library
    path: library/system.md
    output_schema: worldbuilding.entry@1
    summary: 建立机制类世界观专题
    target: worldbuilding/{category}/{system}.md
    required: false
bundles: []
overrides:
  - id: worldbuilding.entry
    source: supplement
    path: supplements/entry.md
    output_schema: worldbuilding.entry@1
    based_on_zen_version: "0.0.1"
    based_on_sha256: "b6dc3b262608121ca86e75804171faab8968e64eb64ca5c54c4694a764a5a9da"
  - id: worldbuilding.system
    source: supplement
    path: supplements/system.md
    output_schema: worldbuilding.entry@1
    based_on_zen_version: "0.0.1"
    based_on_sha256: "99dead652bf42e230e949548068ddbe8b06d72bae36934d782a587c9380e7b6d"
---

# 世界观模板

按条目性质选择普通条目或机制专题，不把一次性复杂条目自动抽象为项目模板。
