import lighthouse from 'lighthouse';
import { createServer } from 'node:net';

import { mkdir, writeFile } from 'node:fs/promises';
process.env.PLAYWRIGHT_BROWSERS_PATH = '.cache/ms-playwright';
const { chromium } = await import('@playwright/test');
const origin = process.env.AUDIT_URL || 'http://127.0.0.1:4322';
await mkdir('reports', { recursive: true });
const probe = createServer();
await new Promise((resolve) => probe.listen(0, '127.0.0.1', resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const browser = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });
const summary = [];
try {
  for (const mode of ['mobile', 'desktop'])
    for (const path of ['/en/', '/fr/', '/en/features/', '/fr/installation/', '/fr/ressources/']) {
      const key = path.replaceAll('/', '-').replace(/^-|-$/g, '') || 'home';
      const options = {
        port,
        output: ['json', 'html'],
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        ...(mode === 'desktop'
          ? {
              formFactor: 'desktop',
              screenEmulation: {
                mobile: false,
                width: 1350,
                height: 940,
                deviceScaleFactor: 1,
                disabled: false,
              },
              throttling: {
                rttMs: 40,
                throughputKbps: 10240,
                cpuSlowdownMultiplier: 1,
                requestLatencyMs: 0,
                downloadThroughputKbps: 0,
                uploadThroughputKbps: 0,
              },
            }
          : {}),
      };
      const result = await lighthouse(origin + path, options);
      await writeFile(`reports/lighthouse-${key}-${mode}.json`, result.report[0]);
      await writeFile(`reports/lighthouse-${key}-${mode}.html`, result.report[1]);
      const row = {
        path,
        mode,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]),
        ),
        metrics: {
          LCP: result.lhr.audits['largest-contentful-paint'].displayValue,
          CLS: result.lhr.audits['cumulative-layout-shift'].displayValue,
          TBT: result.lhr.audits['total-blocking-time'].displayValue,
        },
        failures: Object.values(result.lhr.audits)
          .filter((a) => a.score !== null && a.score < 0.9)
          .map((a) => ({ id: a.id, title: a.title, description: a.displayValue })),
      };
      summary.push(row);
      console.log(JSON.stringify(row));
    }
  await writeFile('reports/performance-summary.json', JSON.stringify(summary, null, 2) + '\n');
} finally {
  await browser.close();
}
