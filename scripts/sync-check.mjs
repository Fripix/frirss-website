// Does the site still match FriRSS? Run at each FriRSS release (see docs/RELEASES.md).
//
//   node scripts/sync-check.mjs [--frirss <dir>] [--ref <tag>] [--accept] [--write-languages]
//
// --frirss  FriRSS checkout (default: ../FriRSS next to this site). Read only.
// --ref     a git ref of that checkout (v1.9.2…); default: its working tree, as it is before tagging.
// --accept  after the site was brought up to date: record this FriRSS state as the reviewed one
//           (src/data/frirss-sync.json). Never touches the texts.
// --write-languages  re-copy the interface labels into src/data/interface-languages.json.
//
// Exact checks (the site copies these): the ten interface languages and their labels, the list of
// environment variables. Review checks (the site rewrites these in its own words): every section
// of docs/FEATURES.md and README.md, the theme colours, the FriRSS labels quoted in the HTML
// renderings, compared with the state recorded by the last --accept.
// Exit code: 0 nothing to do, 1 something to review, 2 the check could not run.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/config/site.ts';
import { variables } from '../src/config/installation.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const frirss = resolve(option('--frirss') ?? join(root, '..', 'FriRSS'));
const ref = option('--ref');
const accept = args.includes('--accept');
const writeLanguages = args.includes('--write-languages');

const fail = (message) => {
  console.error(`sync-check : ${message}`);
  process.exit(2);
};
if (!existsSync(join(frirss, 'package.json')))
  fail(`FriRSS introuvable dans ${frirss} (--frirss).`);

// A file of FriRSS, from the working tree or from a git ref.
const source = (path) => {
  try {
    return ref
      ? execFileSync('git', ['-C', frirss, 'show', `${ref}:${path}`], {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          maxBuffer: 64 * 1024 * 1024,
        })
      : readFileSync(join(frirss, path), 'utf8');
  } catch {
    return fail(`${path} illisible dans FriRSS${ref ? ` (${ref})` : ''}.`);
  }
};
const local = (path) => readFileSync(join(root, path), 'utf8');
const hash = (text) =>
  createHash('sha256').update(text.replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 12);

const version = JSON.parse(source('package.json')).version;
const snapshotPath = join(root, 'src/data/frirss-sync.json');
const snapshot = existsSync(snapshotPath) ? JSON.parse(readFileSync(snapshotPath, 'utf8')) : null;
const report = [];
const section = (title, lines) => lines.length && report.push({ title, lines });

// 1. Interface languages: names from the Preferences language picker, labels from src/locales.
const languagesPath = 'src/data/interface-languages.json';
const current = JSON.parse(local(languagesPath));
const keys = Object.keys(current.languages[0].labels);
const picker = [
  ...source('src/components/Preferences/GeneralTab.tsx').matchAll(
    /\{\s*code:\s*'([a-z-]+)',\s*flag:\s*'[^']*',\s*name:\s*'([^']+)'\s*\}/g,
  ),
];
if (!picker.length) fail('liste des langues introuvable dans GeneralTab.tsx.');
const lookup = (obj, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const expected = {
  source: current.source,
  languages: picker.map(([, code, name]) => {
    const locale = JSON.parse(source(`src/locales/${code}.json`));
    const labels = Object.fromEntries(keys.map((k) => [k, lookup(locale, k)]));
    return { code, name, labels };
  }),
};
const languageLines = [];
const was = new Map(current.languages.map((l) => [l.code, l]));
const now = new Map(expected.languages.map((l) => [l.code, l]));
for (const l of expected.languages) {
  const old = was.get(l.code);
  if (!old) languageLines.push(`nouvelle langue : ${l.name} (${l.code})`);
  else {
    if (old.name !== l.name) languageLines.push(`${l.code} : nom « ${old.name} » → « ${l.name} »`);
    for (const k of keys) {
      if (l.labels[k] === undefined) languageLines.push(`${l.code} : clé ${k} disparue`);
      else if (old.labels[k] !== l.labels[k])
        languageLines.push(`${l.code} : ${k} « ${old.labels[k]} » → « ${l.labels[k]} »`);
    }
  }
}
for (const l of current.languages)
  if (!now.has(l.code)) languageLines.push(`langue retirée : ${l.name} (${l.code})`);
if (languageLines.length && writeLanguages) {
  writeFileSync(join(root, languagesPath), JSON.stringify(expected, null, 2) + '\n');
  languageLines.push(`→ ${languagesPath} recopié (--write-languages).`);
} else if (languageLines.length)
  languageLines.push(
    `→ recopier avec --write-languages ; si le nombre de langues change, revoir les textes « dix langues » (home.json, features.json).`,
  );
section('Langues de l’interface (bande « Dans votre langue »)', languageLines);

// 2. Environment variables: README › Configuration against src/config/installation.ts.
const readme = source('README.md');
const config = readme.split(/^## Configuration\s*$/m)[1]?.split(/^## /m)[0] ?? '';
const documented = [...config.matchAll(/^\|\s*`([A-Z0-9_]+)`\s*\|/gm)].map((m) => m[1]);
if (!documented.length) fail('tableau « Configuration » introuvable dans README.md.');
const shown = variables.flat().map((v) => v.name);
const variableLines = [
  ...documented.filter((n) => !shown.includes(n)).map((n) => `nouvelle variable : ${n}`),
  ...shown.filter((n) => !documented.includes(n)).map((n) => `variable retirée : ${n}`),
];
if (variableLines.length)
  variableLines.push(
    '→ src/config/installation.ts (`variables`) et le tableau `vars` de src/i18n/*/installation.json.',
  );
section('Variables d’environnement (page Installer)', variableLines);

// 3. Review state: sections of the documents, theme colours, labels quoted in the renderings.
const sections = (text) => {
  const out = {};
  let h2 = '';
  let key = null;
  let body = [];
  let fence = false;
  const flush = () => key && (out[key] = hash(body.join('\n')));
  for (const line of text.split('\n')) {
    if (/^\s*```/.test(line)) fence = !fence;
    const m = !fence && line.match(/^(##|###) (.+?)\s*$/);
    if (m) {
      flush();
      if (m[1] === '##') h2 = m[2];
      key = m[1] === '##' ? m[2] : `${h2} › ${m[2]}`;
      body = [];
    } else body.push(line);
  }
  flush();
  return out;
};
const readerValues = new Set(
  ['fr', 'en'].flatMap((l) => {
    const walk = (v) =>
      typeof v === 'string'
        ? [v]
        : v && typeof v === 'object'
          ? Object.values(v).flatMap(walk)
          : [];
    return walk(JSON.parse(local(`src/i18n/${l}/reader.json`)));
  }),
);
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]],
  );
const state = {
  version,
  ref: ref ?? 'working tree',
  sections: {
    'docs/FEATURES.md': sections(source('docs/FEATURES.md')),
    'README.md': sections(readme),
  },
  files: { 'src/stores/themeStore.ts': hash(source('src/stores/themeStore.ts')) },
  labels: Object.fromEntries(
    ['fr', 'en'].map((l) => {
      const all = Object.fromEntries(flatten(JSON.parse(source(`src/locales/${l}.json`))));
      // Labels the renderings quote: the ones whose wording appears in reader.json; once
      // recorded, they are followed even if the site's copy was since changed.
      const followed = new Set([
        ...Object.keys(snapshot?.labels?.[l] ?? {}),
        ...Object.keys(all).filter((k) => readerValues.has(all[k])),
      ]);
      return [l, Object.fromEntries([...followed].sort().map((k) => [k, all[k] ?? null]))];
    }),
  ),
};

if (!snapshot)
  section('État de référence', [
    'aucun état enregistré : relancer avec --accept une fois le site vérifié.',
  ]);
else {
  for (const [file, now] of Object.entries(state.sections)) {
    const before = snapshot.sections[file] ?? {};
    const lines = [
      ...Object.keys(now)
        .filter((k) => !(k in before))
        .map((k) => `nouvelle : ${k}`),
      ...Object.keys(now)
        .filter((k) => k in before && before[k] !== now[k])
        .map((k) => `modifiée : ${k}`),
      ...Object.keys(before)
        .filter((k) => !(k in now))
        .map((k) => `retirée : ${k}`),
    ];
    if (lines.length && file === 'docs/FEATURES.md')
      lines.push(
        '→ src/i18n/*/features.json, l’accueil, la FAQ ; ne présenter que ce qui est livré.',
      );
    if (lines.length && file === 'README.md')
      lines.push('→ page Installer (src/config/installation.ts, src/i18n/*/installation.json).');
    section(`${file} depuis ${snapshot.version}`, lines);
  }
  const themeLines =
    snapshot.files['src/stores/themeStore.ts'] !== state.files['src/stores/themeStore.ts']
      ? [
          'src/stores/themeStore.ts a changé : régénérer les couleurs des rendus (src/styles/reader.css) si les thèmes livrés ont changé.',
        ]
      : [];
  section('Thèmes', themeLines);
  const labelLines = [];
  for (const l of ['fr', 'en'])
    for (const [k, v] of Object.entries(state.labels[l])) {
      const old = snapshot.labels?.[l]?.[k];
      if (old !== undefined && old !== v)
        labelLines.push(`${l} : ${k} « ${old} » → « ${v ?? '(supprimé)'} »`);
    }
  if (labelLines.length) labelLines.push('→ src/i18n/*/reader.json (libellés des rendus).');
  section('Libellés repris dans les rendus FriRSS', labelLines);
}

// 4. Version: the site states which FriRSS it was reviewed on (src/config/site.ts).
if (version !== site.verifiedVersion) {
  const changelog = source('CHANGELOG.md');
  // Newest first in the changelog: every entry above the reviewed version.
  const releases = [...changelog.matchAll(/^## \[(\d+\.\d+\.\d+)\][^\n]*$/gm)].map((m) => m[1]);
  const newer = [];
  for (const v of releases.slice(0, 20)) {
    if (v === site.verifiedVersion) break;
    newer.push(v);
  }
  // At release time the new version's entry may still be in docs/RELEASE-NEXT.md.
  if (!newer.includes(version)) newer.unshift(`${version} (docs/RELEASE-NEXT.md)`);
  section('Version', [
    `site vérifié sur ${site.verifiedVersion}, FriRSS en ${version}${ref ? ` (${ref})` : ''}.`,
    `notes à lire dans CHANGELOG.md : ${newer.join(', ') || '(aucune entrée trouvée)'}.`,
    '→ une fois le site à jour : verifiedVersion et verifiedOn dans src/config/site.ts, puis --accept.',
  ]);
}

if (accept) {
  writeFileSync(
    snapshotPath,
    JSON.stringify(
      {
        note: 'FriRSS state the site was last reviewed against. Written by scripts/sync-check.mjs --accept; do not edit by hand.',
        ...state,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    `sync-check : état de FriRSS ${version} (${state.ref}) enregistré dans src/data/frirss-sync.json.`,
  );
  process.exit(0);
}

if (!report.length) {
  console.log(`sync-check : le site est à jour avec FriRSS ${version}${ref ? ` (${ref})` : ''}.`);
  process.exit(0);
}
console.log(`sync-check : FriRSS ${version}${ref ? ` (${ref})` : ''} — à revoir sur le site :\n`);
for (const { title, lines } of report) {
  console.log(`■ ${title}`);
  for (const line of lines) console.log(`  ${line}`);
  console.log('');
}
console.log('Méthode : docs/RELEASES.md.');
process.exit(1);
