# 亲密专项规则索引

> 公共写作库只提供题材中立的流程、边界和校验。项目采用什么机制、素材和表达方式, 由项目自己的题材层与亲密专项决定。

## 项目门禁

进入项目亲密专项前, 先运行 `sw project resolve --root "$STORY_PROJECT_ROOT"`，将 `project_files.bible` 与 `project_files.style` 分别设为 `$PROJECT_BIBLE` 与 `$PROJECT_STYLE`；再运行 `sw specialty resolve intimacy --root "$STORY_PROJECT_ROOT"`。仅当 `activation=enabled`、`ready=true` 且无 blocking diagnostic 时, 才将 `$STORY_PROJECT_ROOT/<specialty.target>` 设为 `$SPECIALTY_ROOT` 并读取本协议。目录或 `$SPECIALTY_ROOT/_index.md` 存在不构成启用证据; 其他状态立即停止, 不创建、补齐或写入专项目录。

## 必读顺序

1. `$PROJECT_BIBLE`
2. `$PROJECT_STYLE`
3. `$STORY_PROJECT_ROOT/story/genres/_index.md` 与命中的题材页
4. 当前场景事实、人物卡、关系状态和已有设计卡
5. 命中专项机制时读取 `$SPECIALTY_ROOT/mechanisms/_index.md` 与具体机制页
6. 读取正式大纲或作者已经指定的 A / B / dark；公共规则和下游 skill 不重新判定
7. [亲密边界与红线](./亲密边界与红线.md) 与对应公共施工规则
8. 需要 package 通用写法素材时读取 `$SPECIALTY_ROOT/references/library/_index.md`; 需要项目补充素材时再读 `$SPECIALTY_ROOT/references/supplements/_index.md`

本页是公共层唯一的场型定性委托入口：正向 / dark 的最终定性只服从 `$PROJECT_BIBLE`、项目题材页与当场正式事实。其余公共规则、参考页与 skill 只处理已经完成定性的施工流程，不得另立判据，也不得根据机制名称、尺度强弱、身份落差、题材标签或单项风险自行改判。

## 场型路由

- 红线一站式回查入口: [HD约束总览](./HD约束总览.md)
- 项目判定为正向后，正文非 HD、留白或过渡亲密: [正文亲密写法](./正文亲密写法.md)
- 项目判定为正向后，完整 HD 兑现: [B场HD总纲](./B场HD总纲.md)
- 正向 B 场细化: [B场HD四维细则](./B场HD四维细则.md)、[B场HD节奏镜头](./B场HD节奏镜头.md)、[B场HD模式红线](./B场HD模式红线.md)、[B场HD微观感官与才艺解构](./B场HD微观感官与才艺解构.md)
- 项目判定为 dark / 黑暗 HD: [黑暗HD流程](./黑暗HD流程.md)、[B场黑暗HD微观感官与双声部规则](./B场黑暗HD微观感官与双声部规则.md)
- A 场设计卡: 按[亲密设计规划协议](./亲密设计规划协议.md)与[项目内模板](./templates/intimacy.md)承接大纲指定场型；B/dark 场执行编排另见对应 planner
- 写前写后检查: [亲密写前写后校验](./亲密写前写后校验.md)
- 正向 B 场写后质量核对: [正向亲密质量检查清单](./正向亲密质量检查清单.md)

## 项目专项读取

命中项目专项机制或需要具体素材时, 按需读取:

1. `$STORY_PROJECT_ROOT/story/genres/_index.md`
2. `$SPECIALTY_ROOT/mechanisms/_index.md`
3. 机制页指向的 `worldbuilding/`、人物卡、亲密档案和场景设计卡
4. `$SPECIALTY_ROOT/references/_index.md`

缺失具体机制或参考时, 跳过该层或列出缺口；不得读取 `packs/`, 不得由公共 skill 或规则临场补出。
