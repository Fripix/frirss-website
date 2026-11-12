import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { productFilm } from '../src/config/media.ts';
// No legal notice: the site shows none and collects nothing (owner's decision, 11 November 2026).
const missing = [];
const origin = process.env.SITE_URL || '';
if (!/^https:\/\//.test(origin) || origin.includes('localhost'))
  missing.push('SITE_URL (public HTTPS origin)');
if (process.env.PUBLIC_SITE_READY !== 'true') missing.push('PUBLIC_SITE_READY=true after review');
// Content left to complete: markers in the texts, the stand-in still.
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
for (const file of files('src/i18n')) {
  const text = readFileSync(file, 'utf8');
  if (/\[(À COMPLÉTER|À VÉRIFIER|TO COMPLETE|TO CHECK)\b/.test(text))
    missing.push(`${file} (markers to complete)`);
}
if (productFilm.provisional) missing.push('src/config/media.ts (stand-in still)');
if (missing.length) {
  console.error('Not ready for publication. Complete and review: ' + missing.join(', '));
  process.exit(1);
}
console.log('Publication configuration complete. Review docs/LAUNCH.md before publishing.');
