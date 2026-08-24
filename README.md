# Li Zeng (Johnny) — Academic Homepage

这是 Li Zeng（Johnny，曾理）的个人学术主页仓库。网站由 GitHub Pages 托管：

- 线上地址：<https://johnnyzlee.github.io/>
- GitHub 仓库：<https://github.com/Johnnyzlee/Johnnyzlee.github.io>

站点是一个无后端、无数据库的静态网站。大部分页面以 jemdoc 源文件维护，再由仓库内的旧版 jemdoc 0.7.3 生成 HTML；GitHub Pages 直接发布已经提交到仓库的 HTML 文件。

## 技术栈与工作原理

- 内容源：jemdoc（`*.jemdoc`）
- 页面生成器：`jemdoc.py`，jemdoc 0.7.3，需要 Python 2.7
- 样式：原生 CSS（`jemdoc.css`）
- 交互增强：原生 JavaScript（Study 页章节、Research 页 Watchlist 及 Random 页 Listening 分组的展开/收起）
- 托管：GitHub Pages
- 构建系统：无
- 包管理器：无
- 自动化测试与 CI：无

页面的基本生成关系如下：

```text
根目录 *.jemdoc + MENU + jemdoc.py ──> 根目录同名 *.html
独立文章 *.jemdoc + 对应配置（如有）+ jemdoc.py ──> 同目录 *.html
                                                        │
                                                        └──> GitHub Pages

CSS / JavaScript / photos/ / gallery/ / files/ ──> 由 HTML 直接引用
```

重要：GitHub Pages 不会执行 `jemdoc.py`。仅提交 `.jemdoc` 源文件不会更新线上页面；对应的 `.html` 生成文件也必须提交。

## 仓库结构

| 路径 | 作用 | 维护方式 |
| --- | --- | --- |
| `index.jemdoc` / `index.html` | 首页、个人简介、研究兴趣与代表作 | 修改 jemdoc，再生成 HTML |
| `reading.jemdoc` / `reading.html` | 阅读资料与学术资源；当前保持完全展开 | 修改 jemdoc，再生成 HTML |
| `research.jemdoc` / `research.html` | 研究页面 | 修改 jemdoc，再生成 HTML |
| `research-watchlist/` | Research Watchlist 中项目与数据集的中文详情页 | 修改同目录 jemdoc，再使用 `detail.conf` 生成 HTML |
| `research-watchlist/research-watchlist-detail.css` | Research Watchlist 详情页专用样式 | 由各详情页通过相对路径加载 |
| `publication.jemdoc` / `publication.html` | 论文列表；导航标签为 Publications | 修改 jemdoc，再生成 HTML |
| `teaching.jemdoc` / `teaching.html` | 教学经历 | 修改 jemdoc，再生成 HTML |
| `study.jemdoc` / `study.html` | 学习笔记与参考书目 | 修改 jemdoc，再生成 HTML |
| `blog.jemdoc` / `blog.html` | 按栏目组织的博客入口 | 修改 jemdoc，再生成 HTML |
| `blogs/` | 独立 Blog 笔记；目录层级与 Blog 页面公开栏目及子栏目保持一致 | 按 `blogs/README.md` 维护，并从仓库根目录生成 |
| `scribbles.jemdoc` / `scribbles.html` | Scribbles 公开入口页 | 修改 jemdoc，再生成 HTML |
| `scribbles/` | 独立随笔及其同目录 jemdoc/HTML 配对文件 | 以 `S1-empty-note.jemdoc` 为模板维护 |
| `gallery.jemdoc` / `gallery.html` | Gallery 公开入口页 | 修改 jemdoc，再生成 HTML |
| `gallery/` | Gallery 的网页照片资源与维护说明 | 按 `gallery/README.md` 组织、优化和检查图片 |
| `gallery.css` | Gallery 照片网格与说明文字的页面专用样式 | 由 `gallery.jemdoc` 通过 `addcss{gallery}` 加载 |
| `random.jemdoc` / `random.html` | 随笔与链接收藏；Listening 下的 Music we go 默认展开，Music we freeze 默认收起 | 修改 jemdoc，再生成 HTML |
| `random.css` | Random 页专用样式 | 由 `random.jemdoc` 通过 `addcss` 加载 |
| `MENU` | 根目录 jemdoc 页面共享的侧边栏 | 修改后重新生成所有根目录、使用 `MENU` 的页面 |
| `jemdoc.css` | 全站公共样式 | 直接修改，不需要重新生成 HTML |
| `collapsible-sections.css` / `collapsible-sections.js` | Study 页顶层章节、Research 页 Watchlist 及 Random 页 Listening 分组的展开/收起增强 | 由 `study.jemdoc`、`research.jemdoc`、`random.jemdoc` 通过 `addcss` / `addjs` 加载 |
| `blogs/blog-note.css` | 独立 Blog 笔记的共享页面样式 | 由各 Blog 笔记通过相对路径加载 |
| `blogs/blog.conf` / `blogs/blog-zh.conf` | 英文与中文 Blog 笔记的 jemdoc 配置，包含移动端 viewport 和页面语言 | 生成 Blog 笔记时通过 `-c` 指定 |
| `blogs/blog-sidebar.js` | 根据二级标题自动生成独立 Blog 的响应式文章目录 | 每篇独立 Blog 都应加载 |
| `blogs/math-render.js` | 配置浏览器端 MathJax 并改善公式显示 | 需要公式的独立 Blog 配合 `noeqs` 加载 |
| `jemdoc.py` | 随仓库保存的 jemdoc 0.7.3 生成器 | 一般不要修改 |
| `photos/` | 头像等图片资源 | 保持被引用文件名与路径一致 |
| `files/` | CV、论文与参考资料 PDF | 保持被引用文件名与路径一致 |
| `_config.yml` | GitHub Pages/Jekyll 配置 | 当前静态 HTML 不依赖其中的主题渲染 |

## 本地预览

预览已经生成的页面不需要安装任何项目依赖。在仓库根目录启动一个静态文件服务器：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000/>。也可以使用 Python 2：

```bash
python2 -m SimpleHTTPServer 8000
```

停止服务器时按 `Ctrl+C`。

## 修改与生成页面

### 1. 修改单个 jemdoc 页面

以首页为例：

```bash
# 编辑源文件
$EDITOR index.jemdoc

# 生成同名 index.html
python2 jemdoc.py index.jemdoc
```

提交时应同时包含 `index.jemdoc` 和 `index.html`。

### 2. 修改共享菜单

`MENU` 只由根目录的菜单页面读取。修改菜单后必须重建所有根目录、使用 `MENU` 的页面：

```bash
python2 jemdoc.py *.jemdoc
```

这条命令不会递归处理子目录。`blogs/`、`research-watchlist/` 和 `scribbles/` 中的独立文章不加载根目录菜单，因此不需要仅因 `MENU` 改动而重建。

### 3. 修改独立 Blog 笔记

Blog 目前包含 Quantitative Career Resources（下分 `study-guides/` 和 `problem-sets/`）、Technical Notes、Arsenal 与 World Models。完整分类、文章模板和相对路径约定见 `blogs/README.md`。

独立 Blog 使用英文或中文配置生成；命令应从仓库根目录运行：

```bash
# 英文页面
python2 jemdoc.py -c blogs/blog.conf blogs/technical-notes/hkust-hpc4-personal-playbook.jemdoc

# 中文或中文优先页面
python2 jemdoc.py -c blogs/blog-zh.conf blogs/technical-notes/optimal-quota-allocation-under-random-resets.jemdoc

# 新增、删除或改名文章后同步重建公开索引
python2 jemdoc.py blog.jemdoc
```

每篇独立 Blog 都加载 `blog-sidebar.js`。需要公式时还应在 jemdoc 头部使用 `noeqs` 并加载 `math-render.js`，由浏览器端 MathJax 渲染公式。

### 4. 修改 Research Watchlist 详情页

详情页位于 `research-watchlist/`，不加载根目录 `MENU`，并使用独立配置补充中文页面语言和移动端 viewport：

```bash
python2 jemdoc.py -c research-watchlist/detail.conf research-watchlist/paseos.jemdoc
python2 jemdoc.py research.jemdoc
```

新增或删除详情页时，还要同步修改 `research.jemdoc` 中的 Projects 或 Datasets 索引，并一起生成、提交 `research.html`。

### 5. 修改 Scribbles

`scribbles.jemdoc` 是公开索引，独立随笔位于 `scribbles/`。以 `scribbles/S1-empty-note.jemdoc` 为当前模板；独立随笔复用英文 Blog 配置，以保留英文页面语言和移动端 viewport。命令应从仓库根目录运行：

```bash
python2 jemdoc.py -c blogs/blog.conf scribbles/S1-empty-note.jemdoc
python2 jemdoc.py scribbles.jemdoc
```

独立随笔不加载 `MENU`，但应保留返回 `scribbles.html` 的链接，并复用 `blogs/blog-note.css`。

### 6. 修改 Gallery

`gallery.jemdoc` / `gallery.html` 是公开入口页，网页照片资源位于 `gallery/`。添加照片前先阅读 `gallery/README.md`；仓库只保存经过优化、适合公开访问的网页版本，不保存 HEIC、RAW 或其他原始母版。

```bash
python2 jemdoc.py gallery.jemdoc
```

新增、删除、改名或重新排序照片时，应同步修改 `gallery.jemdoc`，重新生成 `gallery.html`，并检查每个资源路径、桌面与窄屏布局。照片默认按拍摄日期从新到旧展示；若日期或地点不明确，不要自行推断。

### 7. 一次重建全部根目录 jemdoc 页面

```bash
python2 jemdoc.py *.jemdoc
```

当前生成器是 Python 2 程序，不能直接使用 Python 3 运行。若出现与 `print`、`StringIO` 或语法有关的错误，先确认命令使用的是 Python 2.7：

```bash
python2 --version
```

普通页面生成不需要本地 LaTeX。现有数学 Blog 使用 `noeqs` 禁用 jemdoc 的旧式公式图片生成，再由 `blogs/math-render.js` 在浏览器端加载 MathJax。只有未来重新启用 jemdoc 自带的公式图片生成时，才需要本地安装 `latex` 和 `dvipng`。

## 添加新页面

1. 新建 `example.jemdoc`，首行使用共享菜单并指定当前页面：

   ```text
   # jemdoc: menu{MENU}{example.html}, nofooter
   = Page Title
   ```

2. 在 `MENU` 中加入指向 `example.html` 的条目。
3. 重建所有根目录、使用 `MENU` 的页面，使共享侧边栏保持一致：

   ```bash
   python2 jemdoc.py *.jemdoc
   ```

4. 本地预览并检查新页面、侧边栏和资源链接。
5. 提交新 `.jemdoc`、新 `.html`、`MENU`，以及因共享菜单变化而重建的其他根目录 HTML。

## 推荐维护流程

```bash
# 1. 确认现有工作区，避免覆盖尚未提交的修改
git status --short

# 2. 修改 jemdoc、MENU、CSS 或静态资源

# 3. 按修改范围生成页面
python2 jemdoc.py index.jemdoc   # 单页内容变化
# 或
python2 jemdoc.py *.jemdoc       # MENU 变化或根目录页面全量生成

# 4. 本地预览
python3 -m http.server 8000

# 5. 检查变更
git diff --check
git status --short
git diff -- index.jemdoc index.html

# 6. 明确选择文件后再提交和推送
git add index.jemdoc index.html
git commit -m "Update homepage"
git push origin main
```

推送到用于 GitHub Pages 的分支后，线上更新通常还会受到 Pages 构建和 CDN 缓存影响，短时间内看不到变化时可以稍候并强制刷新。发布前应确认 HTML 确实已经生成并提交。

## 发布前检查清单

- 个人身份、职称、单位、邮箱和办公地址准确。
- 论文题目、作者顺序、期刊/会议、年份和外部链接准确。
- 修改 jemdoc 后，对应 HTML 已重新生成。
- 修改 `MENU` 后，所有根目录、使用 `MENU` 的 jemdoc 页面已重新生成。
- 页面可以通过本地 HTTP 服务器打开。
- 新增图片和 PDF 的相对路径使用 `/`，大小写与磁盘文件名完全一致。
- Gallery 照片已经过网页优化、转换为 sRGB，并清除了 GPS 等不应公开的元数据；原始母版保存在仓库之外。
- 首页、导航、CV、头像和本次修改涉及的外部链接可访问。
- 没有把临时文件、编辑器文件、凭据或不应公开的个人信息加入 Git。
- `git diff --check` 无报错，`git status` 中只有预期文件。

## 常见问题

### 修改了 `.jemdoc`，线上内容没有变化

重新运行 `python2 jemdoc.py <页面>.jemdoc`，提交生成的同名 HTML，并确认该提交已经推送到远端。

### 修改了菜单，但只有一个页面的菜单更新

`MENU` 是生成时嵌入根目录菜单页面 HTML 的共享输入。运行 `python2 jemdoc.py *.jemdoc`，并提交所有重新生成的根目录 HTML；独立 Blog、Watchlist 详情页和 Scribbles 文章不受这次菜单变化影响。

### Python 报语法错误或找不到 `StringIO`

误用了 Python 3。当前 `jemdoc.py` 是 Python 2.7 代码，请使用 `python2`。如需取消 Python 2 依赖，应作为一次独立的迁移工作完成并对全部页面做回归检查。

### 重建后出现大量看似相同的 HTML diff

仓库中的历史文件混有 CRLF 和 LF 换行符，而当前生成器通常写出 LF。先确认差异是否仅为换行符，再决定是否在单独提交中统一行尾，避免把无关的整文件变化混入内容更新。

### 图片或 PDF 在线上 404，但本地能打开

GitHub Pages 路径区分大小写。检查相对路径、文件名大小写以及文件是否已经提交；网页路径应使用 `/`，不要使用 Windows 风格的 `\`。

## 已知限制与后续改进方向

- jemdoc 0.7.3 和 Python 2.7 均已停止维护，是当前最主要的技术债。
- 网站没有自动生成、链接检查、HTML 校验或部署检查。
- 经典 jemdoc 表格布局对窄屏和移动端的适配有限。
- 部分页面包含很长的外部链接，后续可以做可读性与失效链接治理。
- 仓库包含体积较大的参考书和论文 PDF。新增文件前应检查版权、公开传播许可和 GitHub 文件大小限制；更适合外链的资料不要直接放入仓库。
- Gallery 图片会计入仓库和 GitHub Pages 的总体积；应优先使用缩略图、延迟加载和优化后的网页图片，并避免把这个仓库当作原片备份。
- 主页可能包含联系方式、办公地址等个人信息；所有提交都会公开，发布前需做隐私检查。

若未来现代化，建议把“迁移生成器/框架”“视觉与移动端改版”“自动部署与链接检查”拆成独立任务，以便保留现有内容和 URL，并降低一次性改动风险。

## 许可说明

本仓库当前没有声明统一的开源许可证。除非版权所有者另行授权，不应默认复制、再分发其中的个人内容、照片、CV、论文或参考资料；第三方材料仍受其各自许可与版权条款约束。
