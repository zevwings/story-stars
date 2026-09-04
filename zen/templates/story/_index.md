---
schema: template.domain-index@1
domain: story
templates:
  - id: story.genre
    source: library
    path: library/genre.md
    summary: 建立本项目采用的题材或机制口径
    target: story/genres/{genre}.md
    required: false
bundles: []
overrides:
  - id: story.genre
    source: supplement
    path: supplements/genre.md
    based_on_zen_version: "0.0.1"
    based_on_sha256: "e9e19adcd36393b81d81c90cccf927db2d6a99c36454994184387812236566df"
---

# 故事口径模板

模板提供口径结构；具体题材判断和项目事实由当前小说负责。
