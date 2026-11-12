import { readFile, readdir, access } from 'node:fs/promises';
import { join, sep } from 'node:path';
const output = process.argv[2] || 'dist';
const localeConfig = JSON.parse(await readFile('src/config/locales.json', 'utf8'));
const active = localeConfig.languages.filter((l) => l.active && l.ready);
const errors = [];
let pages = 0;
async function walk(dir) {
  for (const file of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, file.name);
    if (file.isDirectory()) await walk(p);
    else if (p.endsWith('.html')) {
      const html = await readFile(p, 'utf8');
      pages++;
      for (const match of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
        let target = match[1];
        if (!target.startsWith('/') || target.startsWith('//')) continue;
        const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
        if (base && target.startsWith(base + '/')) target = target.slice(base.length);
        const resolved = join(output, target, target.endsWith('/') ? 'index.html' : '');
        try {
          await access(resolved);
        } catch {
          errors.push(`${p}: broken local link ${match[1]}`);
        }
      }
      if (
        /<script[^>]+src="https?:\/\//.test(html) &&
        process.env.PUBLIC_ANALYTICS_ENABLED !== 'true'
      )
        errors.push(`${p}: third-party script`);
      if (active.some((l) => p.startsWith(join(output, l.code) + sep))) {
        if (!html.includes('rel="canonical"') || !html.includes('hreflang="x-default"'))
          errors.push(`${p}: missing canonical/hreflang`);
        if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${p}: expected one h1`);
      }
    }
  }
}
await walk(output);
for (const locale of active) {
  try {
    await access(join(output, 'assets', `og-${locale.code}.png`));
  } catch {
    errors.push(`Missing social image: ${locale.code}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Static build: ${pages} HTML files; internal links, images and metadata verified.`);
