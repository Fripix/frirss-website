import { readFile, readdir } from 'node:fs/promises';
import { compare } from './i18n-lib.mjs';
const root = new URL('../src/', import.meta.url);
const config = JSON.parse(await readFile(new URL('config/locales.json', root), 'utf8'));
const domains = (await readdir(new URL(`i18n/${config.source}/`, root))).filter((f) =>
  f.endsWith('.json'),
);
const errors = [];
const codes = new Set();
for (const language of config.languages) {
  if (codes.has(language.code)) errors.push(`Duplicate locale ${language.code}`);
  codes.add(language.code);
  if (!['ltr', 'rtl'].includes(language.dir)) errors.push(`Invalid direction: ${language.code}`);
  if (language.active && !language.ready)
    errors.push(`Active language not ready: ${language.code}`);
  if (!language.active) continue;
  let names;
  try {
    names = await readdir(new URL(`i18n/${language.code}/`, root));
  } catch {
    errors.push(`Missing locale directory: ${language.code}`);
    continue;
  }
  for (const file of names)
    if (file.endsWith('.json') && !domains.includes(file))
      errors.push(`Unknown domain ${language.code}/${file}`);
  for (const domain of domains) {
    try {
      const reference = JSON.parse(
        await readFile(new URL(`i18n/${config.source}/${domain}`, root), 'utf8'),
      );
      const candidate = JSON.parse(
        await readFile(new URL(`i18n/${language.code}/${domain}`, root), 'utf8'),
      );
      errors.push(...compare(reference, candidate, `${language.code}/${domain}`));
      if (domain === 'seo.json') {
        const slugs = new Set(),
          titles = new Set();
        for (const [key, meta] of Object.entries(candidate)) {
          if (slugs.has(meta.slug) || titles.has(meta.title))
            errors.push(`Duplicate slug/title: ${language.code}/${key}`);
          slugs.add(meta.slug);
          titles.add(meta.title);
          if (!/^[a-z0-9-]*$/.test(meta.slug)) errors.push(`Invalid slug: ${language.code}/${key}`);
          if (meta.title.length > 75 || meta.description.length > 185)
            errors.push(`Overlong metadata: ${language.code}/${key}`);
        }
      }
    } catch (error) {
      errors.push(`${language.code}/${domain}: ${error.message}`);
    }
  }
}
// Domains are consumed structurally; reject top-level messages no component reads.
async function sources(dir) {
  let result = '';
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) result += await sources(path);
    else if (/\.(astro|ts)$/.test(entry.name)) result += await readFile(path, 'utf8');
  }
  return result;
}
const source =
  (await sources(new URL('components/', root))) +
  (await sources(new URL('layouts/', root))) +
  (await sources(new URL('pages/', root)));
for (const domain of domains) {
  const name = domain.replace('.json', '');
  if (name === 'seo') continue;
  const dict = JSON.parse(await readFile(new URL(`i18n/en/${domain}`, root), 'utf8'));
  for (const key of Object.keys(dict)) {
    if (!source.includes(`t.${name}.${key}`)) errors.push(`Unused message group: ${name}.${key}`);
  }
}
if (!config.languages.some((l) => l.code === config.source && l.active && l.ready))
  errors.push('Source language must be ready and active');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `Translations: ${codes.size} locales, ${domains.length} domains; keys, placeholders, completeness, slugs and message usage valid.`,
);
