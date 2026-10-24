# 贡献指南：给实验室主页添加内容

这份文档写给实验室的每一位成员。你只需要新增或修改**自己的**几个文件，然后提交 Pull Request（PR）。PR 通过自动检查、经管理员合并后，网站会自动更新。

> 用 Claude Code 的同学可以直接说「帮我把这篇论文加到实验室主页」，项目自带的 `add-lab-content` skill 会按本文档一步步带你完成。

## 网站是怎么组织的

页面顺序是 **研究方向 → 项目与成果 → 成员**。每个项目属于一个研究方向，并列出参与的实验室成员；每个成员的页面会自动列出他参与的全部项目。所以你只需要：

1. 有一个自己的成员文件（第一次贡献时创建）；
2. 每个成果（论文、数据集、代码、演示）建一个项目文件夹。

```
src/content/
  themes.yaml                   研究方向（由管理员维护，不要随意修改）
  news.yaml                     动态（可以追加一条，不要改别人的）
  people/
    <你的-id>.yaml              你的成员信息
    avatars/<你的-id>.jpg       你的头像
  projects/
    <项目-id>/
      index.md                  项目信息
      cover.jpg                 封面图（论文主图或效果图）
```

网站是中英双语的：中文在 `/`，英文在 `/en/`。所有展示给读者的文字都写成 `{ en, zh }` 两种语言：**`en` 必填，`zh` 选填**，缺 `zh` 时中文页面会显示英文。

## 第一次：添加你自己

文件名就是你的 id，用「名-姓」的小写拼音并用连字符连接，例如 `ruizhe-ou.yaml`。这个 id 会出现在网址里（`/people/ruizhe-ou/`），项目也用它来引用你，**创建后不要再改**。

```yaml
# src/content/people/ruizhe-ou.yaml
name:
  en: Ruizhe Ou
  zh: 中文名            # 选填
role: phd               # pi | postdoc | phd | master | undergrad | alumni
since: 2024             # 入学或入组年份，选填
# until: 2028           # 毕业年份，毕业后再填，同时把 role 改成 alumni
interests:
  en: Multimodal large language models for remote sensing
  zh: 面向遥感的多模态大模型
# bio:                  # 一两句个人介绍，选填，同样是 en/zh
# now:                  # 已毕业成员的去向，选填，同样是 en/zh
avatar: ./avatars/ruizhe-ou.jpg   # 选填；不填会显示姓名首字母
# email: name(at)pku.edu.cn       # 选填，请用 (at) 代替 @ 防止垃圾邮件
links:                  # 都是选填
  github: https://github.com/Norman-Ou
  # homepage: https://...
  # scholar: https://scholar.google.com/citations?user=...
  # orcid: https://orcid.org/...
```

头像要求：正方形或接近正方形，至少 400×400 像素，小于 2 MB，放在 `src/content/people/avatars/`。

## 添加一个项目

项目文件夹名就是项目 id，用小写英文单词加连字符，例如 `geopix`、`street-view-safety`。它会出现在网址里（`/projects/geopix/`），**创建后不要再改**。

```md
---
# src/content/projects/geopix/index.md
title:
  en: "GeoPix: A Multimodal Large Language Model for Pixel-level Image Understanding in Remote Sensing"
  # zh: 中文标题，选填。论文一般只写英文标题
theme: foundation        # 必须是 themes.yaml 里的某个 id：perception | foundation | fusion | sustainability
type: paper              # paper | dataset | code | demo
year: 2025
date: 2025-05            # 发表或发布日期，用于排序；YYYY-MM 或 YYYY-MM-DD
venue: IEEE Geoscience and Remote Sensing Magazine   # 选填
authors: Ruizhe Ou, Yuan Hu, Fan Zhang, Jiaxin Chen, Yu Liu   # 完整作者列表，按论文原样，包括外单位作者
members: [ruizhe-ou, fan-zhang]   # 参与的实验室成员 id，必须在 people/ 下存在
summary:
  en: >-
    两到三句话，说清楚做了什么、为什么重要。不要直接粘贴整段摘要。
  zh: >-
    中文版本。
cover: ./cover.jpg
coverAlt:                # 选填，图片说明，会显示在项目页的图下方
  en: ...
  zh: ...
links:                   # 都是选填，有哪个填哪个
  paper: https://doi.org/...
  arxiv: https://arxiv.org/abs/...
  code: https://github.com/...
  # dataset / demo / project / video
featured: false          # 是否为重点项目，由管理员决定，请保持 false
---

（正文选填。可以用 Markdown 写更详细的介绍，会显示在项目页的摘要下方。）
```

封面图要求：

- 用论文的主图（teaser / framework 图）或效果图，横向，宽高比接近 16:10；
- 宽度 1200 到 2000 像素，**小于 2 MB**（网站会自动压缩成 webp，但仓库里也不要放大文件）；
- 格式 jpg、png 或 webp。

## 添加一条动态

在 `src/content/news.yaml` 末尾追加，`id` 用「日期-关键词」保证唯一：

```yaml
- id: 2026-11-geopix-accepted
  date: 2026-11-02
  text:
    en: GeoPix was accepted by IEEE GRSM.
    zh: GeoPix 被 IEEE GRSM 接收。
  link: /projects/geopix/   # 选填
```

## 本地预览（可选）

需要 Node.js 22 或更高版本：

```bash
npm install
npm run dev        # 打开 http://localhost:4321 预览，改文件会自动刷新
npm run check      # 提交前运行：检查字段、成员 id、图片大小
npm run build      # 完整构建一次，确认没有报错
```

不想装 Node 也可以：直接提交 PR，GitHub 会自动运行检查，失败时在 PR 页面的 Checks 里能看到具体原因。

## 提交流程

1. 从 `main` 新建分支，例如 `add/ruizhe-ou-geopix`；
2. 只新增或修改你自己的文件；
3. 提交 PR，标题写清楚，例如「添加项目：GeoPix」；
4. 等待自动检查通过，管理员审核后合并，几分钟后网站自动更新。

## 规则

- **不要修改** `src/components/`、`src/layouts/`、`src/pages/`、`src/styles/` 和 `src/i18n/`。页面外观需要调整时请提 issue，由管理员统一修改。
- **不要修改别人的** 成员文件和项目文件。项目有多位实验室作者时，由一位同学建项目，其他人的 id 写进 `members` 即可。
- 内容要真实：作者、期刊会议、年份以正式发表的版本为准；未公开的工作不要放。
- 不要提交大文件。单张图片小于 2 MB；数据集、视频、模型权重放在外部（GitHub Release、HuggingFace、B 站等），在 `links` 里给链接。

## 二期：项目可视化（草案）

二期会在每个项目页留出位置，放作者自己开发的交互可视化。规范还在讨论中，当前的方向是：

- 可视化放在项目自己的目录 `src/content/projects/<项目-id>/viz/` 里，作为一个 Astro 岛组件嵌入项目页，不允许修改公共代码；
- 推荐的技术栈：原生 JS / Canvas、D3、MapLibre GL、deck.gl、Three.js；
- 颜色和字体使用站点的 CSS 变量（`--ink`、`--muted`、`--accent`、`--line` 等），并同时适配浅色和深色模式；
- 页面加载时先显示静态的结果图，交互内容在滚动到可见时才加载；
- 单个项目的代码和数据合计控制在 5 MB 以内，更大的数据（瓦片、GeoJSON、视频）放到外部存储并按需加载。

正式规范定稿后会更新本节。
