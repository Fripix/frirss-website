// Localised 1200 × 630 social cards, rendered from the real home hero (title, sentence and the
// FriRSS interface in HTML), so they always match the site. Needs the production preview:
//   npm run build && npm run preview -- --port 4322
//   npm run social:images
import { readFile } from 'node:fs/promises';

// Same browser cache as the tests; set before Playwright loads.
process.env.PLAYWRIGHT_BROWSERS_PATH ??= '.cache/ms-playwright';
const { chromium } = await import('@playwright/test');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4322';
const locales = JSON.parse(await readFile('src/config/locales.json', 'utf8'));
const card = `
  .skip-link, .nav-links, .nav-actions { display: none !important; }
  .nav .brand { color: #eeede6 !important; }
  [data-reveal] { transform: none !important; clip-path: none !important; }
  .nav { position: absolute !important; height: 96px !important; background: none !important; border: 0 !important; }
  .nav > .wrap, .hero > .wrap { width: calc(100% - 128px) !important; }
  .brand { font-size: 26px !important; }
  .brand img { width: 38px !important; height: 38px !important; }
  .hero { min-height: 0 !important; height: 630px; padding: 120px 0 0 !important; overflow: hidden; }
  .hero-text { grid-column: 1 / span 6 !important; gap: 20px !important; padding-top: 0 !important; }
  .hero-visual { grid-column: 7 / -1 !important; height: 560px !important; min-height: 0 !important; max-height: none !important; }
  .hero .h1 { font-size: 54px !important; }
  .hero .lead { font-size: 19px !important; }
  .hero .btn-row, .hero .hero-install { display: none !important; }
`;

const browser = await chromium.launch();
try {
  // The card styles are injected for the capture only, so the page's CSP is bypassed here.
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, bypassCSP: true });
  for (const { code: lang } of locales.languages.filter((l) => l.active && l.ready)) {
    const response = await page.goto(`${base}/${lang}/`, { waitUntil: 'networkidle' });
    if (!response?.ok()) throw new Error(`Preview not reachable at ${base}/${lang}/`);
    await page.addStyleTag({ content: card });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `public/assets/og-${lang}.png`,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    });
  }
} finally {
  await browser.close();
}
console.log('Generated localised 1200 × 630 social cards from the home hero.');
