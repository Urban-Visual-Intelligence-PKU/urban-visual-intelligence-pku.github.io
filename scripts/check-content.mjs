// Content rules that the Astro schema cannot express. Run with `npm run check`.
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (IMAGE_EXT.has(extname(name).toLowerCase()) && st.size > MAX_IMAGE_BYTES) {
      errors.push(`${p} is ${(st.size / 1048576).toFixed(1)} MB; images must be under 2 MB. Resize it to at most 2000 px wide.`);
    }
  }
}
walk('src/content');

for (const name of readdirSync('src/content/projects')) {
  if (statSync(join('src/content/projects', name)).isDirectory() && !SLUG.test(name)) {
    errors.push(`src/content/projects/${name}: folder names must be lowercase words joined by hyphens, e.g. "street-view-safety".`);
  }
}
for (const name of readdirSync('src/content/people')) {
  if (name.endsWith('.yaml') && !SLUG.test(name.replace(/\.yaml$/, ''))) {
    errors.push(`src/content/people/${name}: file names must look like "given-family.yaml", e.g. "ruizhe-ou.yaml".`);
  }
}

if (errors.length) {
  console.error(`Content check failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Content check passed.');
