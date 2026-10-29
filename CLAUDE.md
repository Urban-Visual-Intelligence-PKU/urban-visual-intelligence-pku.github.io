# Lab website

Astro static site, bilingual (zh at `/`, en at `/en/`), deployed to GitHub Pages via `.github/workflows/deploy.yml`.

- Content lives in `src/content/` and is validated by `src/content.config.ts`. Field rules for contributors are in `CONTRIBUTING.md`; keep that file, `docs/TUTORIAL.md`, the schema and `.claude/skills/add-lab-content/SKILL.md` in sync when fields change.
- Every user-facing text field is `{ en, zh }` with `en` required. UI strings go in `src/i18n/index.ts`, never hard-coded in components.
- Colors and fonts come only from the tokens in `src/styles/global.css`, which also define dark mode.
- Before committing: `npm run check && npm run build`.
