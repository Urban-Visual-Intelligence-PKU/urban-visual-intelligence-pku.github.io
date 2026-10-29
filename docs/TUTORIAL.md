# 修改教程：添加个人和项目

这份教程一步步演示怎么把自己和自己的成果加到实验室主页。字段的完整说明和规则见 [CONTRIBUTING.md](../CONTRIBUTING.md)，本教程只讲操作流程。

改完提交一个 Pull Request（PR）。PR 通过自动检查、管理员合并后，几分钟内 [网站](https://urban-visual-intelligence-pku.github.io/) 自动更新。

有三种做法，任选一种：

| 做法 | 需要准备 | 适合 |
| --- | --- | --- |
| A. 让 Claude Code 帮你做 | Claude Code、本地 clone | 推荐，最省事 |
| B. 在 GitHub 网页上直接改 | 只要一个 GitHub 账号 | 不想装环境 |
| C. 本地手动改 | Git、Node.js 22+ | 想先在本地预览 |

## A. 让 Claude Code 帮你做

```bash
git clone git@github.com:Urban-Visual-Intelligence-PKU/urban-visual-intelligence-pku.github.io.git
cd urban-visual-intelligence-pku.github.io
claude
```

然后直接说需求，例如：

- 「把我加到实验室主页，我叫 Ruizhe Ou，博士生，2024 年入组，GitHub 是 https://github.com/Norman-Ou」
- 「把这篇论文加到实验室主页：https://arxiv.org/abs/xxxx.xxxxx」

仓库自带的 `add-lab-content` skill 会问你缺的信息，建好文件、跑检查、帮你提 PR。头像和封面图请提前准备好文件路径。

## B. 在 GitHub 网页上直接改

不用装任何东西。没有仓库写权限也可以，GitHub 会自动帮你 Fork 并提 PR。

### B1. 添加个人

1. 打开仓库，进入 `src/content/people/` 目录，点右上角 **Add file → Create new file**。
2. 文件名填 `<名-姓>.yaml`，全小写拼音，例如 `ruizhe-ou.yaml`。这就是你的 id，以后不要改。
3. 粘贴下面的模板，按自己的情况修改（`#` 后面是注释，不需要的行可以删掉）：

    ```yaml
    name:
      en: Ruizhe Ou
      zh: 区睿哲
    role: phd               # pi | postdoc | phd | master | undergrad | alumni
    since: 2024             # 入组年份
    interests:
      en: Multimodal LLMs for remote sensing
      zh: 面向遥感的多模态大模型
    avatar: ./avatars/ruizhe-ou.jpg   # 没有头像就删掉这一行
    links:
      github: https://github.com/Norman-Ou
      # homepage / huggingface / scholar / orcid 也可以填，会显示在成员卡片上
    ```

4. 点 **Commit changes…**，选择 **Create a new branch**（分支名例如 `add/ruizhe-ou`），然后点 **Propose changes**。
5. 上传头像：切换到刚建的分支，进入 `src/content/people/avatars/`，点 **Add file → Upload files**，上传 `ruizhe-ou.jpg`，提交到同一个分支。头像要求：接近正方形，至少 400×400 像素，小于 2 MB，文件名与 `avatar` 一致。
6. 点 **Create pull request**，标题写「添加成员：Ruizhe Ou」。

成员卡片上，研究领域和外链合起来最多两行，成果标签最多两行，超出的部分会被截掉。卡片每一部分对应哪个字段、好坏例子，见 [CONTRIBUTING.md 的「成员卡片规范」](../CONTRIBUTING.md#成员卡片规范)。

### B2. 添加项目

1. 进入 `src/content/projects/`，点 **Add file → Create new file**。
2. 文件名填 `<项目-id>/index.md`，例如 `geopix/index.md`。输入 `/` 时 GitHub 会自动建出文件夹。项目 id 用小写英文加连字符，以后不要改。
3. 粘贴模板并修改：

    ```md
    ---
    title:
      en: "GeoPix: A Multimodal Large Language Model for Pixel-level Image Understanding in Remote Sensing"
    short: GeoPix            # 简称，显示在成员卡片上，最多 24 个字符
    theme: foundation        # perception | foundation | fusion | sustainability
    type: paper              # paper | dataset | code | demo
    year: 2025
    date: 2025-05            # 发表日期，用于排序
    venue: IEEE Geoscience and Remote Sensing Magazine
    authors: Ruizhe Ou, Yuan Hu, Fan Zhang, Jiaxin Chen, Yu Liu
    members: [ruizhe-ou, fan-zhang]   # 实验室成员的 id，必须已经在 people/ 里
    summary:
      en: >-
        Two or three sentences on what the work does and why it matters.
      zh: >-
        两三句话说明做了什么、为什么重要。
    cover: ./cover.jpg
    links:
      paper: https://ieeexplore.ieee.org/document/10994415
      code: https://github.com/Norman-Ou/GeoPix
    featured: false
    ---

    （正文选填，可以用 Markdown 写更详细的介绍。）
    ```

4. 提交到新分支（例如 `add/geopix`）。
5. 在同一分支进入 `src/content/projects/geopix/`，**Upload files** 上传 `cover.jpg`。封面用论文主图或效果图，横向，宽 1200 到 2000 像素，小于 2 MB。
6. 创建 PR，标题写「添加项目：GeoPix」。

如果你还不在成员列表里，先完成 B1，或者把 B1 和 B2 的文件提交到同一个分支、同一个 PR。

## C. 本地手动改

```bash
git clone git@github.com:Urban-Visual-Intelligence-PKU/urban-visual-intelligence-pku.github.io.git
cd urban-visual-intelligence-pku.github.io
npm ci
git checkout -b add/ruizhe-ou-geopix
npm run dev        # 打开 http://localhost:4321 预览，改文件会自动刷新
```

### C1. 添加个人

1. 新建 `src/content/people/ruizhe-ou.yaml`，内容同 B1 的模板。
2. 把头像放到 `src/content/people/avatars/ruizhe-ou.jpg`。
3. 在预览里打开 `http://localhost:4321/people/ruizhe-ou/` 检查。

### C2. 添加项目

1. 新建文件夹 `src/content/projects/geopix/`。
2. 在里面新建 `index.md`，内容同 B2 的模板；封面图放成同目录的 `cover.jpg`。
3. 在预览里打开 `http://localhost:4321/projects/geopix/` 检查，英文页是 `/en/projects/geopix/`。

### C3. 检查并提交

```bash
npm run check && npm run build     # 两个都通过再提交
git add src/content
git commit -m "Add Ruizhe Ou and GeoPix"
git push -u origin add/ruizhe-ou-geopix
```

然后在 GitHub 上打开 PR。

## 提交之后

- PR 页面会自动运行检查（Checks）。显示红叉时点 **Details** 看原因，按提示修改后再提交到同一个分支即可，不用新开 PR。
- 管理员审核合并后，网站几分钟内更新。

## 常见报错

| 报错里出现 | 原因 | 怎么改 |
| --- | --- | --- |
| `Project "xxx" lists members [yyy], but there is no src/content/people/<id>.yaml for them` | `members` 里的 id 写错了，或那位成员还没建文件 | 对照 `src/content/people/` 下的文件名修改 |
| `Invalid content reference ... (field: theme)`，后面通常还跟着 `Cannot read properties of undefined` | `theme` 不是四个方向 id 之一 | 改成 `perception`、`foundation`、`fusion`、`sustainability` 之一 |
| `images must be under 2 MB` | 图片太大 | 把宽度缩到 2000 像素以内再上传 |
| `folder names must be lowercase words joined by hyphens` | 文件夹或文件名有大写、空格、下划线 | 改成 `street-view-safety` 这样的形式 |
| `title.en: Required`（或其他字段的 `.en`） | 该文字字段缺英文 | 每个文字字段都要有 `en` |
| `Could not find requested image` | `avatar` 或 `cover` 的路径和实际文件名不一致 | 检查大小写和扩展名（`.jpg` 和 `.jpeg` 不同） |

## 注意

- 只改自己的文件。多位实验室成员合作的项目，由一个人建项目，其他人的 id 写进 `members`。
- 不要改 `src/components/`、`src/layouts/`、`src/pages/`、`src/styles/`、`src/i18n/`。页面外观有意见请提 issue。
- `featured` 保持 `false`，由管理员决定。
- 内容以正式发表版本为准，未公开的工作不要放。
