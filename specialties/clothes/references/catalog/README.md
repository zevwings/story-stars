# 衣装参考库（Catalog）

本目录保存可复用衣装参考，不自动建立人物拥有物、稳定偏好或场景事实。保留 `pieces/` 与 `sets/` 两个入口，先判断实体粒度，再确定品类或主要用途。

## 文档分工

| 入口 | 职责 |
| --- | --- |
| 本页 | 解释基础单元与整体装束的双轨组织、组装关系和全库目录入口 |
| [pieces/README.md](pieces/README.md) | 九类基础单元的收录范围、易混边界、判定顺序和基础单元档案结构 |
| [sets/README.md](sets/README.md) | 八类用途的套组判定、部件组合与引用方式、套组档案结构 |

品类子目录通过 `_index.md` 检索实体，不另设 README 重复维护规则。

## 基础衣装单元与整体装束

- `piece`：可独立维护和复用的基础衣装单元。通常是一件衣物或穿戴配饰；原生配套内衣、泳装允许包含上下装等多个物理部件，仍只维护一个 CLO。
- `set`：至少两个核心基础衣装单元形成的稳定整体装束。可以包含主体服装、内衣单元、鞋履与配饰，不要求配齐每个穿着层。
- 临时搭配：基础单元为某个人物或场景临时组合，不因同色、同图或协调好看自动成为新实体。

原生紫色蕾丝文胸＋配套内裤作为一个 `bodysuit` Piece，原生比基尼上下装作为一个 `swimsuit` Piece；内部部件直接描述，不再分别建“上装、下装、套组”三份档案，也不为同一对象补建 Set。来源仅有独立文胸、内裤或泳裤时，可以按实际对象建档，不虚构配套件。

Set 可以直接描述尚未独立建档的基础单元；确实需要单独维护的单元才引用对应 Piece。链接负责定位，整体装束仍须自足描述本次核心组成。一个内衣单元内部有两个部件，不因此满足 Set 的两个单元门槛。

## 目录入口

### 基础衣装单元

| 目录 | 收录范围 |
| --- | --- |
| [top](pieces/top/_index.md) | 上身主体、外搭和罩衫；内衣单件与泳装单件分别归下列专类 |
| [bottom](pieces/bottom/_index.md) | 裤、半裙、围裹式下装；内裤与泳裤分别归下列专类 |
| [dress](pieces/dress/_index.md) | 连衣裙、旗袍、单件礼服、睡裙等一件式裙装 |
| [jumpsuit](pieces/jumpsuit/_index.md) | 上下身连续且有分离裤腿的连体裤装；紧身不等于内衣 |
| [bodysuit](pieces/bodysuit/_index.md) | 内衣、塑身衣、贴体连体衣及原生配套内衣，一个完整单元一份档案 |
| [swimsuit](pieces/swimsuit/_index.md) | 连体泳衣、独立泳装上衣或泳裤、原生配套比基尼，一个完整单元一份档案 |
| [hosiery](pieces/hosiery/_index.md) | 丝袜、连裤袜、长短袜与腿套 |
| [footwear](pieces/footwear/_index.md) | 鞋、靴、凉鞋与拖鞋 |
| [accessory](pieces/accessory/_index.md) | 包袋、腰带、首饰、手套、帽饰等独立穿戴配饰 |

详细边界见 [单件说明](pieces/README.md)。

### 稳定套组

套组按主要用途进入 [sets 索引](sets/_index.md)：

- [daily](sets/daily/_index.md)：日常、通勤等多个基础单元形成的稳定装束。
- [intimate](sets/intimate/_index.md)：以私密用途为主、由多个基础单元形成的稳定主题装束。
- [swimwear](sets/swimwear/_index.md)：泳装单元与专属外搭等形成的稳定整体装束；原生比基尼自身仍归 Piece。
- [sport](sets/sport/_index.md)：稳定运动套组。
- [cos](sets/cos/_index.md)：角色扮演与主题套组。
- [stage](sets/stage/_index.md)：舞台表演套组。
- [ceremonial](sets/ceremonial/_index.md)：礼仪与盛装套组。
- [action](sets/action/_index.md)：行动与战术套组。

详细准入见 [套组说明](sets/README.md)。单件婚纱、一件式泳衣等不因用途或造型完整而成为套组。

## 内衣与泳装归口

内衣与原生配套内衣进入 `pieces/bodysuit/`，泳装与原生配套泳装进入 `pieces/swimsuit/`。一件式或上下两件式不直接决定 `record_kind`；先判断是否属于一个完整基础单元。普通上装＋下装不得仅因同色或临时搭配合写为 Piece。

单件类型、主要用途和穿着层级分别判断。日常内衣不自动属于 `intimate`；普通罩衫、草帽或围裙不因出现在海边就成为泳装。贴身外穿服、运动连体裤也不因紧身就成为内衣。

## 规则入口与建档边界

- 项目分类权威：[衣装结构与穿着层级](../components/衣装结构与穿着层级.md)。
- 证据分层和内容要求：[衣装档案写作规范](../components/衣装档案写作规范.md)。
- 公共 schema、正文结构、ID 分配与正式转写规则：通过项目 resolver 定位锁定 clothes 包的协议入口。

分类表仍沿用 `单件类型` 字段，语义为基础单元品类；`record_kind` 与现有正文结构不变。

README 提供目录导航和判例，不取代分类权威或公共协议。分类权威、目录和说明不一致时，应先统一合同，再执行受影响的收录或迁移。

实体文件使用 `CLO-分类大写-五位序号_名称.md`，目录与引用大小写必须一致。新 ID 按公共协议使用 reservation 分配；每个分类从 `00001` 独立递增，不补洞、不复用；名称与展示排序不改 ID，跨分类迁移须预留目标分类新号并同步所有引用及图片归档，不自动合并记录。正式人物衣装或 Construction 必须自足保存实际采用内容，不能只引用 Catalog 代替正式事实。
