---
name: add-lab-content
description: Add or update a lab member, project (paper, dataset, code, demo) or news item on the Urban Visual Intelligence Lab website. Use when a lab member says things like "把我的论文加到主页", "add my paper to the lab website", "添加我自己到成员页", "更新我的头像/简介", "发一条实验室动态", or pastes a paper link and asks to put it on the site.
---

# Add content to the lab website

The site is an Astro static site. Lab members contribute by adding files under `src/content/` and opening a PR. `CONTRIBUTING.md` is the source of truth for every field; read it first and follow it exactly. This skill is the interactive procedure around it.

Talk to the user in the language they use (usually Chinese).

## Ground rules

- Only create or edit files under `src/content/`. Never touch `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/i18n/`, `astro.config.mjs` or workflows. If the user wants a layout change, tell them to open an issue for the site admin.
- Never edit another member's person file or project unless the user is a listed member of that project and only adds themselves to `members`.
- Never invent facts. Authors, venue, year, date and links must come from the user or from the paper's official page (DOI, arXiv, publisher page). If you look something up, show it to the user and get confirmation before writing it.
- Do not guess Chinese names, years of study or roles. Ask.
- Do not change `themes.yaml` or set `featured: true`; those are admin decisions.

## 1. Find out what to add

Ask which of these the user wants (can be several):

- **Themselves as a member** (first contribution): needs a file in `src/content/people/`.
- **A project**: a folder in `src/content/projects/`.
- **A news item**: an entry appended to `src/content/news.yaml`.

Check whether the user already has a person file: `ls src/content/people/`. Every project needs at least one existing member id, so add the person first if missing.

## 2. Collect the information

### Person

Ask for: English name, Chinese name (optional), role (`pi | postdoc | phd | master | undergrad | alumni`), start year, research interests in English and Chinese, avatar image path, and optional links (GitHub, homepage, Google Scholar, ORCID) and email.

Id = lowercase `given-family`, e.g. `ruizhe-ou`. Confirm it with the user: it appears in URLs and cannot change later.

### Project

Ask for a paper link (DOI, arXiv, IEEE, GitHub) first. If one is given, fetch the official metadata (title, full author list, venue, date). For arXiv use `https://arxiv.org/abs/<id>` and read the `citation_*` meta tags; for a DOI use `https://api.crossref.org/works/<doi>`. Show what you found and ask the user to confirm.

Then collect:

- `theme`: show the options from `src/content/themes.yaml` (id + Chinese name) and let the user pick one.
- `type`: paper, dataset, code or demo.
- `members`: lab members among the authors, as person ids. Every id must exist in `src/content/people/`. If a co-author from the lab has no person file yet, list them in `authors` only and tell the user that person can add themselves later.
- `summary` in English and Chinese: 2–3 sentences, plain language, not the full abstract. Offer to draft both from the abstract, then let the user edit.
- Cover image: the paper's teaser or framework figure, landscape, ideally about 16:10.
- Links: paper, arxiv, code, dataset, demo, project, video (only those that exist).

Project id = short lowercase hyphenated name, usually the method name (`geopix`) or a few keywords (`street-view-safety`). Confirm with the user.

### News

Collect date, English and Chinese text (one sentence each), optional link. Id = `YYYY-MM-keyword`, unique in the file.

## 3. Prepare images

Images must be under 2 MB and at most about 2000 px wide. Check size with `ls -la`. If too large, resize with whatever is available (`sips -Z 2000` on macOS, `magick input -resize 2000x2000\> output`, or `ffmpeg -i in.png -vf scale='min(2000,iw)':-1 out.jpg`). If no tool is available, ask the user to export a smaller version.

Copy images into place:

- Avatar: `src/content/people/avatars/<person-id>.jpg`
- Cover: `src/content/projects/<project-id>/cover.<ext>`

## 4. Write the files

Use the exact templates in `CONTRIBUTING.md`. Requirements:

- Every user-facing text field is `{ en, zh }`; `en` is required, `zh` optional.
- Quote titles that contain a colon.
- `date` is `YYYY-MM` or `YYYY-MM-DD`.
- Use `(at)` instead of `@` in emails.
- Look at an existing project such as `src/content/projects/geopix/index.md` as a reference for formatting.

## 5. Validate

If Node.js 22+ is available:

```bash
npm install        # first time only
npm run check      # schema, member ids, image sizes, file names
npm run build      # must finish without errors
```

Fix every error and rerun until both pass. Then offer `npm run dev` so the user can look at `http://localhost:4321/` (zh) and `http://localhost:4321/en/` (en), including the new project page `/projects/<id>/` and their person page `/people/<id>/`.

If Node is not available, say so; CI runs the same checks on the PR.

## 6. Open the PR

Only after the user confirms the content:

1. Create a branch from `main`: `add/<person-id>-<project-id>` (or `update/<person-id>-profile`, `news/<id>`).
2. Stage only the files you created or changed under `src/content/`. Run `git status` and make sure nothing else is included.
3. Commit with a message such as `Add project: GeoPix` or `Add member: Ruizhe Ou`.
4. Push and open a PR with `gh pr create`. In the description list what was added and the pages to look at. Do not merge it yourself.

Tell the user the PR link and that the site updates automatically a few minutes after an admin merges it.
