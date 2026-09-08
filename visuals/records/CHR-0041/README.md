# 杨柳 · 视觉复用入口

本页汇总批准资产与调用方式，不提供故事正典。身份版本始终从 [current](identity/current.json) 解析；以下是整理时的 v2 及获批场景记录，不另设批准指针。

## 获批资产

| 图片 | 生产记录 | 用途 |
| --- | --- | --- |
| [正脸](../../images/CHR-0041/approved/identity/v2/front.png) | [identity v2](identity/v2/manifest.json) | 主要身份参考，每次场景生成均使用 |
| [45°](../../images/CHR-0041/approved/identity/v2/left-45.png) | [identity v2](identity/v2/manifest.json) | 鼻尖朝画面左侧；对应侧转时辅助，不代表精确测量角度 |
| [咖啡馆读书](../../images/CHR-0041/approved/renders/20260908T124232-cafe-reading/image-01.png) | [场景记录](renders/20260908T124232-cafe-reading/manifest.json) | 日常衣装、环境、动作和构图参考 |
| [综艺候场全身](../../images/CHR-0041/approved/renders/20260908T125336-backstage-full-body/image-01.png) | [场景记录](renders/20260908T125336-backstage-full-body/manifest.json) | 职业衣装与候场构图参考；比例偏修长、背景偏写实的差异已记录 |

## 调用顺序

1. 解析 visuals feature，读取 current 指向的 manifest，核对资产 hash 与当前正式人物卡。上表历史版本不替代 current。
2. 使用批准 front；目标为对应侧转时再附 left-45。两张场景图仅按需提供衣装、环境或动作参考，明确各自用途。
3. 按 [复用 Prompt](reuse-prompt.md) 填写本次画面。使用 [杨柳表现偏好](../../characters/CHR-0041/preferences.md)，正式约束仍读取人物卡。
4. 全身图按正式形象卡的身体比例编译；候场图偏长的腿部不是身体标准。低头、另一侧及纯侧面不能宣称已全面验证。
5. 生成后检查身份、衣装、动作、比例与画风；候选进入 `.sw/visuals/`，作者接受后才归档新的 render。

## 维护

新增批准版本或场景时更新本页链接，不改写旧 manifest、request 或实际 Prompt。生成模型与尺寸以实际工具和文件记录为准。此处的汇总不将场景资产变成机器身份参考。
