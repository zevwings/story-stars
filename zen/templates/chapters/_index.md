---
schema: template.domain-index@1
domain: chapters
templates:
  - id: chapters.outline
    source: library
    path: library/outline.md
    summary: 建立章节正式大纲
    target: chapters/{chapter}/outline.md
    required: true
  - id: chapters.draft
    source: library
    path: library/draft.md
    summary: 建立章节正文草稿
    target: chapters/{chapter}/draft.md
    required: false
  - id: chapters.revision
    source: library
    path: library/revision.md
    summary: 记录章节修订目标与结果
    target: chapters/{chapter}/revision.md
    required: false
  - id: chapters.summary
    source: library
    path: library/summary.md
    output_schema: chapter.summary@3
    summary: 建立与定稿正文绑定的章节摘要
    target: chapters/{chapter}/summary.md
    required: false
bundles:
  - id: chapters.create
    required: [chapters.outline]
    optional: [chapters.draft, chapters.revision, chapters.summary]
---

# 章节模板

章节模板只提供空结构，不代表任何章节已经建立或定稿。
