# Urban Visual Intelligence Lab · PKU

Source for the lab website: https://urban-visual-intelligence-pku.github.io/

Built with [Astro](https://astro.build/) as a static, bilingual site (Chinese at `/`, English at `/en/`) and deployed to GitHub Pages by GitHub Actions on every push to `main`.

**Lab members adding papers, datasets or their own profile: follow the step-by-step [docs/TUTORIAL.md](docs/TUTORIAL.md) (Chinese); field rules are in [CONTRIBUTING.md](CONTRIBUTING.md).** If you use Claude Code, ask it to "把我的论文加到实验室主页" and the `add-lab-content` skill will guide you.

## Development

Requires Node.js 22 or later.

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type check + content rules
npm run build    # output in dist/
```

## Structure

```
src/content/          all site content (people, projects, themes, news)
src/content.config.ts content schemas; invalid content fails the build
src/i18n/             UI strings and locale helpers
src/pages/[...lang]/  pages, generated once per language
src/components/       shared components
src/styles/global.css design tokens (style C "Scholar")
scripts/              extra content checks
.github/workflows/    deploy (main) and PR checks
```
