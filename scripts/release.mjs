import { readFile, writeFile } from 'node:fs/promises';
import { site } from '../src/config/site.ts';
const path = new URL('../src/data/release.json', import.meta.url);
const cached = JSON.parse(await readFile(path, 'utf8'));
let latest = cached;
const refresh = process.argv.includes('--refresh') || process.env.REFRESH_RELEASE === 'true';
if (refresh) {
  try {
    const response = await fetch('https://api.github.com/repos/Fripix/Frirss/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const value = await response.json();
    if (
      value.draft ||
      value.prerelease ||
      !/^v?\d+\.\d+\.\d+$/.test(value.tag_name) ||
      !value.html_url.startsWith('https://github.com/Fripix/Frirss/releases/tag/')
    )
      throw new Error('Invalid stable release');
    await writeFile(
      path,
      JSON.stringify(
        {
          version: value.tag_name.replace(/^v/, ''),
          url: value.html_url,
          publishedAt: value.published_at,
        },
        null,
        2,
      ) + '\n',
    );
    console.log(`Release metadata: ${value.tag_name}`);
    latest = { version: value.tag_name.replace(/^v/, ''), url: value.html_url };
  } catch (error) {
    console.warn(
      `Release lookup unavailable (${error.message}); using verified fallback ${cached.version}.`,
    );
  }
} else
  console.log(
    `Release metadata: ${cached.version} (offline build; REFRESH_RELEASE=true to refresh at build time).`,
  );
if (latest.version !== site.verifiedVersion) {
  console.warn(
    `Content review needed: release ${latest.version}, website verified on ${site.verifiedVersion}.\n` +
      `Read ${latest.url} and follow docs/RELEASES.md before updating the verified version.`,
  );
}
