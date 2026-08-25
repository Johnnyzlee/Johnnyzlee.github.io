# Gallery 维护说明

`gallery/` 保存公开 Gallery 使用的网页照片资源。Gallery 的页面内容源是根目录的 `gallery.jemdoc`，生成文件是 `gallery.html`；本目录不保存独立页面，也不加载根目录 `MENU`。

## 目录结构

照片按年份和地点或事件分组：

```text
gallery/
├── README.md
├── 2026/
│   ├── westminster-bridge-london/
│   │   ├── 2026-05-28-westminster-bridge-london.jpg
│   │   └── 2026-05-28-westminster-bridge-london-thumb.jpg
│   ├── edinburgh-scotland/
│   │   ├── 2026-05-26-edinburgh-scotland.jpg
│   │   └── 2026-05-26-edinburgh-scotland-thumb.jpg
│   ├── icc-2026-glasgow/
│   │   ├── 2026-05-24-icc-2026-glasgow.jpg
│   │   └── 2026-05-24-icc-2026-glasgow-thumb.jpg
│   ├── wcnc-2026-kuala-lumpur/
│   │   ├── 2026-04-14-wcnc-2026-kuala-lumpur.jpg
│   │   └── 2026-04-14-wcnc-2026-kuala-lumpur-thumb.jpg
│   └── panglao-island/
│       ├── 2026-04-05-panglao-island.jpg
│       └── 2026-04-05-panglao-island-thumb.jpg
├── 2025/
│   ├── ieee-hong-kong-6g-wireless-summit/
│   │   ├── 2025-09-11-ieee-hong-kong-6g-wireless-summit.jpg
│   │   └── 2025-09-11-ieee-hong-kong-6g-wireless-summit-thumb.jpg
│   └── huaihai-middle-road-shanghai/
│       ├── 2025-08-23-huaihai-middle-road-shanghai.jpg
│       └── 2025-08-23-huaihai-middle-road-shanghai-thumb.jpg
├── 2024/
│   ├── jiagedaqi-beishan-forest-park/
│   │   ├── 2024-10-04-beishan-forest-park.jpg
│   │   └── 2024-10-04-beishan-forest-park-thumb.jpg
│   ├── ieee-hong-kong-6g-wireless-summit/
│   │   ├── 2024-09-12-ieee-hong-kong-6g-wireless-summit.jpg
│   │   └── 2024-09-12-ieee-hong-kong-6g-wireless-summit-thumb.jpg
│   ├── xujiahui-shanghai/
│   │   ├── 2024-03-16-xujiahui-shanghai.jpg
│   │   └── 2024-03-16-xujiahui-shanghai-thumb.jpg
│   └── windsor-ktv-lujiazui/
│       ├── 2024-02-05-windsor-ktv-lujiazui.jpg
│       └── 2024-02-05-windsor-ktv-lujiazui-thumb.jpg
├── 2023/
│   └── alan-tam-concert-shanghai/
│       ├── 2023-05-20-alan-tam-concert-shanghai.jpg
│       └── 2023-05-20-alan-tam-concert-shanghai-thumb.jpg
├── 2022/
│   └── donghu-road-shanghai/
│       ├── 2022-11-20-donghu-road-shanghai.jpg
│       └── 2022-11-20-donghu-road-shanghai-thumb.jpg
├── 2021/
│   ├── tongji-university-siping-road-campus/
│   │   ├── 2021-10-25-tongji-siping-road-campus.jpg
│   │   └── 2021-10-25-tongji-siping-road-campus-thumb.jpg
│   ├── hulunbuir-grassland/
│   │   ├── 2021-07-hulunbuir-grassland.jpg
│   │   └── 2021-07-hulunbuir-grassland-thumb.jpg
│   ├── daxingtun-village-qiqihar/
│   │   ├── 2021-07-daxingtun-village-qiqihar.jpg
│   │   └── 2021-07-daxingtun-village-qiqihar-thumb.jpg
│   ├── baiyunyuan-tonglu/
│   │   ├── 2021-06-23-baiyunyuan-tonglu.jpg
│   │   └── 2021-06-23-baiyunyuan-tonglu-thumb.jpg
│   ├── apple-store-nanjing-east-road/
│   │   ├── 2021-05-25-apple-store-nanjing-east-road.jpg
│   │   └── 2021-05-25-apple-store-nanjing-east-road-thumb.jpg
│   └── changsha-hunan/
│       ├── 2021-04-26-changsha-hunan.jpg
│       └── 2021-04-26-changsha-hunan-thumb.jpg
└── 2017/
    └── oriental-land-military-training/
        ├── 2017-09-12-oriental-land-military-training.jpg
        └── 2017-09-12-oriental-land-military-training-thumb.jpg
```

- 目录名和文件名使用小写英文、数字及连字符。
- 照片文件名通常以 `YYYY-MM-DD-` 开头；具体日期未知时保留已知精度（如 `YYYY-MM-`），后接简短的地点或场景描述，不虚构具体日期。
- 缩略图与网页大图放在同一目录，并使用 `-thumb` 后缀。
- 网页路径一律使用 `/`，并严格保持文件名大小写一致。

## 图片规格

- 原始 HEIC、RAW 或相机原片保存在 Nutstore、iCloud 或其他仓库外备份中，不提交到 GitHub。
- 网页大图建议保留长边 1600–2000 px，转换为 sRGB JPEG；通常以质量 88–95、单张约 300–800 KB 为目标。
- 缩略图建议保留长边 480–640 px，单张约 50–150 KB。
- 保持原始长宽比；除非站点所有者明确要求，不拉伸人物、不裁切构图，也不进行生成式修图。
- 整个发布站点建议控制在约 500 MiB 以内；单张网页图片一般不应超过 1 MiB，确有必要时需单独评估。

## 排序与页面内容

- Gallery 默认按拍摄日期从新到旧展示，同一天的照片按页面中的人工顺序排列。
- 日期、地点、人物或说明文字必须来自站点所有者或可验证的照片信息；不确定时不要推断。
- 添加、删除、改名或重新排序照片时，同步修改根目录的 `gallery.jemdoc` 并重新生成 `gallery.html`。
- Gallery 的照片网格与说明文字样式位于根目录 `gallery.css`，由 `gallery.jemdoc` 通过 `addcss{gallery}` 加载。
- Gallery 形成多图网格后，优先加载缩略图，并为非首屏图片使用原生延迟加载；点击后再查看网页大图。

## 隐私与发布检查

- 导出网页版本时清除 GPS、精确位置、设备序列号等不必要的 EXIF 元数据。
- 检查照片中是否包含未授权的人脸、未成年人、住宅、证件、票据、屏幕内容或其他敏感信息。
- 只发布站点所有者有权公开的照片；第三方照片必须确认版权和公开授权。
- Git 历史会保留已提交的二进制文件。误传私人照片时，不应只删除工作树文件，应停止发布并评估历史清理。

## 添加照片流程

1. 在仓库外确认原片已有可靠备份。
2. 生成 sRGB 网页大图和缩略图，放入对应的 `gallery/<year>/<event>/` 目录。
3. 检查尺寸、文件体积、方向、色彩空间和元数据。
4. 在 `gallery.jemdoc` 中加入图片、日期和必要说明。
5. 从仓库根目录生成页面：

   ```bash
   python2 jemdoc.py gallery.jemdoc
   ```

6. 使用本地 HTTP 服务器预览桌面和窄屏页面，检查缩略图、大图、替代文本和资源路径。
7. 运行 `git diff --check` 和 `git status --short`，确认每张新增图片都被引用且只有预期文件发生变化。
