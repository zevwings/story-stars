---
schema: template.domain-index@1
domain: context
templates:
  - id: context.artifact
    source: supplement
    path: supplements/artifact.md
    summary: 建立本项目的器物动态状态
    target: context/artifacts/{artifact}.md
    required: false
  - id: context.character
    source: library
    path: library/character.md
    output_schema: character.context@1
    summary: 建立人物动态状态
    target: context/characters/{character}.md
    required: false
  - id: context.segment-summary
    source: library
    path: library/segment-summary.md
    summary: 建立连续章节分段摘要
    target: context/summaries/{range}.md
    required: false
bundles: []
overrides:
  - id: context.character
    source: supplement
    path: supplements/character.md
    output_schema: character.context@1
    based_on_zen_version: "0.0.1"
    based_on_sha256: "427a9d82852377af80d527da461b07e773bc8763e73c11ee53e591b7cb5ef865"
---

# 动态上下文模板

本领域模板只承载会随章节变化的状态，不复制静态真源。
