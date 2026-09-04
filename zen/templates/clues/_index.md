---
schema: template.domain-index@1
domain: clues
templates:
  - id: clues.lifecycle
    source: library
    path: library/clue.md
    summary: 建立单条线索生命周期
    target: clues/{status}/{clue}.md
    required: true
bundles: []
overrides:
  - id: clues.lifecycle
    source: supplement
    path: supplements/clue.md
    based_on_zen_version: "0.0.1"
    based_on_sha256: "7f8e73b69032893302fa0de3ebdf226be7088a0e6290f9383067e7df397f22ca"
---

# 线索模板

复制模板并登记到对应状态目录后，线索才进入项目事实层。
