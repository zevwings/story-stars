---
schema: template.domain-index@1
domain: prewrite
templates:
  - id: prewrite.continuity
    source: library
    path: library/continuity.md
    summary: 补充本章不可缺失的最简连续性记忆
    target: .prewrite/{chapter}/continuity.md
    required: false
  - id: prewrite.expanded-outline
    source: library
    path: library/expanded-outline.md
    summary: 扩写正式章纲中需要施工的场景
    target: .prewrite/{chapter}/expanded-outline.md
    required: false
  - id: prewrite.beat-sheet
    source: library
    path: library/beat-sheet.md
    summary: 建立场景节拍
    target: .prewrite/{chapter}/beat-sheet.md
    required: false
  - id: prewrite.risks
    source: library
    path: library/risks.md
    summary: 记录写前风险与处置
    target: .prewrite/{chapter}/risks.md
    required: false
  - id: prewrite.dialogue-design
    source: library
    path: library/dialogue-design.md
    summary: 校准本章对话承重与人物声线
    target: .prewrite/{chapter}/dialogue-design.md
    required: false
bundles:
  - id: prewrite.chapter
    required: []
    optional: [prewrite.continuity, prewrite.expanded-outline, prewrite.beat-sheet, prewrite.risks, prewrite.dialogue-design]
---

# 写前施工模板

只解析本轮实际需要的施工件；空施工件不应为了凑齐 bundle 而创建。
