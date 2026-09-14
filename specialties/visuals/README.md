# 视觉资料

本目录由 visuals Specialty 首次建立，保存公共视觉提示词、人物长期视觉偏好、图片与生产记录，不提供故事正典。

## 读取与创建

1. 运行 `sw specialty visuals resolve --root <项目根>`，以匹配 visuals 依赖的 `project_root` 定位本目录，并运行 `sw specialty visuals validate --root <项目根>` 校验业务就绪，不猜测路径。生成、采纳及写入要求 enabled=true、ready=true；关闭后仍可只读经校验的保留资料，具体条件见下文。
2. 读取本文件和 [_index.md](_index.md)，按任务进入目标分类索引。
3. 只读取选定条目及其明确引用；预设读取所引用的基础模块，角色目录从 characters/_index.md 按正式角色 ID 定位，按登记链接读取可选 README.md 和图片。
4. 新建角色资料时读取 角色创建模板（由 `sw specialty visuals resolve` 返回的 `resources.template-character.path` 读取），按任务填入实际内容并更新角色索引；复用已有资料不必读取模板。公共提示词仍按对应分类索引创建。
5. 将选定模块、适用的人物偏好和当次要求整理为完整 Prompt；生产记录保留偏好来源及快照、当次覆盖项、模块 ID、文件引用和实际提交文本。

## 目录与所有权

```text
specialties/visuals/
├── prompts/                         # 公共提示词模块与预设
└── characters/
    ├── _index.md                    # 角色导航与当前面容注册表
    └── <角色ID>-<角色名>/
        ├── README.md              # 角色视觉说明、长期偏好与参考资料
        ├── images/
        │   ├── sources/
        │   │   ├── identity/        # 身份参考池：{nn}-{view}
        │   │   └── renders/         # 衣装、场景等呈现参考池
        │   └── approved/            # 已获批 identity / renders 图片
        └── records/                 # identity / renders 的请求、Prompt、manifest
```

来源按用途放在角色 images/sources/identity/ 或 images/sources/renders/，不按版本或批次建目录。参考图片的用途和状态统一记入角色 README.md 的参考资料段；收录参考本身不表示建立长期表现偏好，图片目录不另建 README 或参考 manifest。身份参考命名为 `{nn}-{view}.{ext}`，场景参考命名为 `{nn}-{description}.{ext}`。各参考池独立从 01 递增编号，至少两位，编号不绑定视角，删除后不重排；ext 保持真实格式。视角使用 front、front-oblique、oblique、left、right、left-profile、right-profile，可追加 -tilted 表示偏头；left/right 指鼻尖朝画面左/右，oblique 表示侧转但未确定左右。无法可靠判断视角时使用 `{nn}.{ext}`，不猜测角度。只保存实际已有参考，不要求凑齐视角，不创建占位文件。

已归档源文件保持路径和内容稳定；重复文件校验 hash 后直接引用，新内容使用新编号，不覆盖旧件。实际生成记录保存所用路径和 hash。只有 approved/identity 与对应生产记录使用身份版本。

README 与索引首次创建后由项目维护；角色创建模板从锁定 visuals 包的 `resources.template-character.path` 读取。再次 enable 只补缺失文件，不覆盖已填写内容。模板只提供空结构；人物、预设、请求与图像按实际任务创建，不预建个人 profile、looks 或另一套批准指针。

## 谁在什么时候创建

`sw specialty visuals enable` 建立缺失的基础骨架。角色资料由 Agent 执行对应 Skill 时，依据明确任务按需创建；`skills.md` 是调用手册，`_template.md` 是内容模板，它们本身不执行目录创建。生成、收录和偏好写入均先核对 Specialty 已启用且就绪。

下表路径相对视觉根，`<角色目录>` 由 `characters/_index.md` 按正式角色 ID 定位；首次建立时采用安全的 `<角色ID>-<角色名>` 名称。

| 任务入口与时机 | 创建位置 | 保存内容 |
| --- | --- | --- |
| `character-identity-builder collect`，明确收录身份参考 | `characters/<角色目录>/images/sources/identity/` | 图片；用途和状态写入角色 README.md |
| `character-image-generator collect`，明确收录衣装或场景参考 | `characters/<角色目录>/images/sources/renders/` | 图片；用途和状态写入角色 README.md |
| `preferences`，明确保存长期偏好 | `characters/<角色目录>/README.md` | 角色表现偏好、公共模块引用及适用范围 |
| 定脸或场景生成，开始产生候选 | 项目根下 `.sw/visuals/<任务>/`，位于视觉根之外 | 候选与中间文件；先确认 Git 忽略覆盖 |
| 作者批准主脸或补充角度 | 角色 `images/approved/identity/vN/` 与 `records/identity/vN/` | 获批图片，以及 request、prompt、manifest |
| 身份版本完整并校验通过 | `characters/<角色目录>/records/identity/current.json` | 当前批准版本指针 |
| 作者接受场景图 | 角色 `images/approved/renders/<scene-name>/vN/` 与 `records/renders/<scene-name>/vN/` | 获批场景图及对应生产记录 |

表中标注“角色”的路径均相对 `characters/<角色目录>/`。首次保存角色资料时登记角色索引；已有目录沿用登记路径，不因改名自动移动。只保存参考或偏好时，无需创建 approved、身份版本或 current。

## 场景候选与获批版本

场景按稳定的 `scene_name` 组织，采用小写英文和连字符（如 cafe-reading），作为安全的单路径段。同一场景调整 Prompt、衣装、姿态或光线时沿用场景名；新的场景另建名称。图片与记录分别使用 `images/approved/renders/<scene-name>/vN/` 和 `records/renders/<scene-name>/vN/`。

默认先在项目 `.sw/visuals/<任务>/` 修改 Prompt、生成和比较候选。修改、重生成和未批准候选不创建正式版本，也不预占版本号。每次生成保留与输出对应的实际 Prompt、请求、输入图及生成信息；后续编辑只更新工作稿，不覆盖仍可被选中候选的生成文本。

只有作者明确 approve（批准选中图片）后，才为该角色该场景创建下一个获批版本，从 v1 起递增。归档前核对图片与记录两侧已有版本及完整性；正常情况下使用最高完整获批版本加一，无已有版本则用 v1。遇到同名冲突、孤立目录或中断归档，先核对并报告，不覆盖、不跳号掩盖异常。归档重试先检查同一次批准是否已经完整落盘，避免重复增版。

每个版本归档选中的图片及其实际请求、Prompt 与 manifest；同批多张获批图片共用版本，图片从 image-01 开始编号，各图关联自身实际 Prompt。生成时间按图记录，approved_at 记录本次批准时间，时间使用带时区的 ISO 8601。正式版本不可修改；后续修改从已有版本派生候选，下一次批准才增加版本号。场景版本与 identity_version 独立，manifest 绑定实际使用的不可变身份版本。复用时明确场景和版本，场景不另设 current.json。

## 参考、批准图片和生产记录

- **sources**：可供选择的外部或上游参考。收录只表示保存素材；是否批准为主脸是另一项决定。普通参考的用途和状态集中在角色 README.md，完整内容模板见 角色创建模板（由 `sw specialty visuals resolve` 返回的 `resources.template-character.path` 读取）。
- **approved**：作者明确接受的图片。定脸版本按 `vN` 保存，场景按 `<scene-name>/vN` 保存，已有版本不覆盖。
- **records**：实际生产的请求、完整 Prompt 与 manifest。真正用于生成时才登记实际输入路径和 hash；普通参考收集不创建 manifest。
- **current.json**：唯一当前身份入口。先保存并校验图片与记录，最后更新指针；历史场景绑定当时使用的不可变身份版本。
- **characters/_index.md**：角色导航与可重建面容摘要，不代替 current，也不保存另一份人物事实。

## 路径与职责边界

JSON 中的资产和记录路径相对视觉根；正式人物卡路径相对项目根；Markdown 导航链接相对所在文件。归档内容不依赖临时候选路径。

正式五官、年龄、身形和衣装事实仍维护在项目 `characters/`；视觉根下的 `characters/` 只组织视觉资产。角色 `README.md` 保存正式资料引用、跨任务表现选择、参考用途以及已有生产记录导航，单次姿态、衣装与场景要求进入当次生产记录。

## 启用与关闭

- `sw specialty visuals disable` 保留全部文件和安装信息，停止生成、采纳与归档；两个 Skill 仅查看已有资料或展示分析与 Prompt，不写视觉目录或候选工作区。
- 只读使用 resolver 返回的非空 `project_root`，并核对锁定包完整性、资源支持和项目路径；关闭后仅在保留资料通过校验时读取，不把 resolve 成功视为业务就绪。校验失败则报告，不猜测或自动修复目录；不依赖视觉目录的分析可继续。
- 图片调用、直接采用、归档及保存偏好前均重新确认 enabled=true、ready=true；作者批准候选不替代状态检查。关闭期间不自动启用。
- `sw specialty visuals enable` 重新启用后继续使用原有资料，只补缺失骨架。

## 组合规则

本项目默认采用现代都市风格化 3D，读取预设 [现代都市风格化 3D](prompts/presets/modern-urban-stylized-3d.md) 及其引用模块，再按正式角色 ID 读取已登记的人物长期偏好。默认预设提供中国都市环境与人物视觉参照；人物偏好和本次要求仅覆盖明确涉及的维度，其余维度继续继承默认。已有批准身份时保持同脸，默认参照不重塑已有身份。

合成实际 Prompt 时，显式写入适用的默认方向、人物差异与具体形象要求；纯背景定脸图仍采用人物视觉方向，但不为体现都市背景额外添加街景。生产记录沿用下述来源与快照规则，记录实际采用的默认预设及覆盖项。

实际 Prompt 按“身份依据 → 人物结构 → 公共渲染 → 本次任务 → 输出要求”编译。每张参考分别说明身份、画风、衣装或场景用途；首次定脸从正式资料提取轮廓、五官布局与软组织差异，批准后保持既有结构。缺少的关键结构留在候选比较中，不直接补为正式事实。

更换公共默认不自动重塑已有批准身份。人物仍有明确旧画风偏好时继续按该偏好复用；风格转换先做正脸候选，接受后再验证侧转与表情，随后验证全身和场景。分别检查同一角色的身份稳定性，以及不同角色在相近条件下的结构区分度。生图的 3D 效果不等于已有三维模型，验证结论只覆盖实际检查的图。

表现与渲染、时代环境、题材、用途可独立组合，项目扩展分类按实际索引进入。预设仅引用基础模块，不嵌套预设、不复制模块正文。公共模块不包含个人身份事实。

逐项使用“本次明确要求 → 适用的人物长期偏好 → 批准视觉基线与 Skill 默认值”补全画面；预设只覆盖其实际规定的维度。正式人物事实与批准身份始终是约束，不能被这条优先级隐式改写。同层级要求冲突时先明确冲突，不机械拼接。

只有明确要求“以后默认如此”时才保存人物偏好；单次场景、动作和临时造型只进入对应 request.md，批准一张图片不等于修改长期偏好。偏好只引用公共模块或预设，不复制正文；prompt.md 保留实际完整文本，历史记录不随偏好变化而改写。提示词使用具体正向描述，必要时补充限制；中文维护，翻译后的实际提交文本保留到生产记录。

具体生成、接受与归档遵循 story-writer 的角色视觉生产协议及相应任务 Skill。图片不自动回写人物卡或正文；Skill 不执行 Git commit、push 或远端配置。
