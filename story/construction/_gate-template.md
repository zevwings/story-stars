---
schema: story.gate@1
status: scheduled
question: >-
  写明作者需要决定的问题。
targets:
  - CON-xxxx
blocks:
  - construction.bind
deadline:
  operation: construction.bind
  note: 写明面向作者的最迟决定点
writeback_targets:
  - CON-xxxx
---

# GATE-xxxx｜施工门禁名称

## 可行方案

### 方案 A｜名称

说明执行方式、收益、代价与适用条件。

### 方案 B｜名称

说明执行方式、收益、代价与适用条件。

## 推荐方案

写明推荐与理由；没有可靠推荐时写“暂无推荐”。

## 影响范围

- 写明影响的施工单元、章节接口和验证项。
- 写明不得被决定改写的正式边界。

## 关闭步骤

1. 获得作者明确决定。
2. 更新全部 `writeback_targets`。
3. 完成相关校验。
4. 删除本 Gate 文件。
