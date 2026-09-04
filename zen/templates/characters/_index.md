---
schema: template.domain-index@1
domain: characters
templates:
  - id: characters.profile
    source: library
    path: library/主卡.md
    output_schema: character.profile@1
    summary: 建立人物静态身份、行为逻辑与写作边界
    target: characters/{tier}/{character}/主卡.md
    required: true
  - id: characters.appearance
    source: library
    path: library/形象.md
    summary: 建立人物静态形象档案
    target: characters/{tier}/{character}/形象.md
    required: false
  - id: characters.outfit-grammar
    source: library
    path: library/衣装/_GRAMMAR.md
    summary: 建立人物稳定衣装语法
    target: characters/{tier}/{character}/衣装/_GRAMMAR.md
    required: false
  - id: characters.outfit-index
    source: library
    path: library/衣装/_index.md
    output_schema: character.outfit-index@1
    summary: 建立人物衣装入口
    target: characters/{tier}/{character}/衣装/_index.md
    required: false
  - id: characters.outfit
    source: library
    path: library/衣装/具体衣装.md
    summary: 建立一套可跨场复用的具体衣装
    target: characters/{tier}/{character}/衣装/{outfit}.md
    required: false
  - id: characters.relationship-index
    source: library
    path: library/关系/_index.md
    summary: 建立人物关系摘要入口
    target: characters/{tier}/{character}/关系/_index.md
    required: false
  - id: characters.relationship
    source: library
    path: library/关系/_template.md
    output_schema: character.relationship@1
    summary: 建立重要配对的静态关系档
    target: characters/{tier}/{character}/关系/{other}.md
    required: false
  - id: characters.contract
    source: supplement
    path: supplements/契约.md
    output_schema: project.character.contract@1
    summary: 为本项目人物建立星辰契约专属档案
    target: characters/{tier}/{character}/契约.md
    required: false
bundles:
  - id: characters.create
    required: [characters.profile]
    optional: [characters.appearance, characters.outfit-grammar, characters.outfit-index, characters.relationship-index, characters.contract]
overrides:
  - id: characters.profile
    source: supplement
    path: supplements/主卡.md
    output_schema: character.profile@1
    based_on_zen_version: "0.0.1"
    based_on_sha256: "96a88e6ade0b7313995d33f5afe5aa7c79bd3ab961ca705cc8a1c9acc7a71642"
  - id: characters.appearance
    source: supplement
    path: supplements/形象.md
    based_on_zen_version: "0.0.1"
    based_on_sha256: "376067dd2b6497c9a4f80d0c3b85e29a2756260723729e4128f37696fdfec231"
  - id: characters.outfit-grammar
    source: supplement
    path: supplements/衣装/_GRAMMAR.md
    based_on_zen_version: "0.0.1"
    based_on_sha256: "31cd38d52efce9461b2bf1bfd9490b85fcc33cfe30af357ff34edaad3ac08ca0"
  - id: characters.outfit-index
    source: supplement
    path: supplements/衣装/_index.md
    output_schema: character.outfit-index@1
    based_on_zen_version: "0.0.1"
    based_on_sha256: "8eeeeafe12180dfe1a3785f9ffa56e967ffe5b7fc6b117935b94d0b897f8693c"
  - id: characters.relationship-index
    source: supplement
    path: supplements/关系/_index.md
    based_on_zen_version: "0.0.1"
    based_on_sha256: "92ea6e485f636cb9c4ffe3b6be48f262aa57dc860cf06d098d8c9ccb3eb5ba08"
  - id: characters.relationship
    source: supplement
    path: supplements/关系/_template.md
    output_schema: character.relationship@1
    based_on_zen_version: "0.0.1"
    based_on_sha256: "9e89fcf6ae926860aae22098082cbef3434b83adb2a1caed1dcf792e896ffb2d"
---

# 人物模板

普通人物只要求主卡；其它静态卡由项目事实和本轮任务决定是否创建。
