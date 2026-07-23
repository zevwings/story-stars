# 剧情线图谱展示层

> 本目录是可重建的图谱展示层，不是正式正典。节点事实以 `story/plotlines/` 为准，阶段调用以 `story/arcs/` 为准。

## 文件

- `graph-layout.yml`：项目专属的展示分组、顺序与阶段展示覆盖；不复制节点事实。
- `generated/graph-data.js`：由 story-writer 生成的派生数据，可随时重建。
- `剧情线关系图.html`：由 X6 按阶段／卷与剧情线组织全部正式节点，并绘制节点间的真实上下游关系。
- `vendor/x6.min.js`：由构建命令复制的固定版本 X6 运行资源，支持离线打开图谱。

## 更新

在项目根目录执行：

```bash
story-writer plotline graph build
```

命令只识别当前工作目录，不接受 `--root`，也不向父目录查找项目。
