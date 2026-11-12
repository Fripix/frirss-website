import { test, expect } from '@playwright/test';
import { axeViolations } from './a11y';
import { readFileSync } from 'node:fs';
import locales from '../src/config/locales.json' with { type: 'json' };
const paths = locales.languages
  .filter((l) => l.active)
  .flatMap((l) => {
    const seo = JSON.parse(readFileSync(`src/i18n/${l.code}/seo.json`, 'utf8')) as Record<
      string,
      { slug: string; title: string }
    >;
    return Object.entries(seo).map(([id, meta]) => ({
      lang: l.code,
      id,
      title: meta.title,
      url: `/${l.code}/${meta.slug ? meta.slug + '/' : ''}`,
    }));
  });
for (const pageInfo of paths) {
  test(`${pageInfo.lang} ${pageInfo.id}: accessible, local, complete`, async ({
    page,
    context,
  }) => {
    const errors: string[] = [];
    const external: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (!['127.0.0.1', 'localhost'].includes(url.hostname)) {
        external.push(url.href);
        return route.abort();
      }
      return route.continue();
    });
    const response = await page.goto(pageInfo.url);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(pageInfo.title);
    await expect(page.locator('html')).toHaveAttribute('lang', pageInfo.lang);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      new RegExp(pageInfo.url + '$'),
    );
    expect(await page.locator('link[hreflang]').count()).toBe(3);
    expect(
      await axeViolations(page, [
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa',
      ]),
    ).toEqual([]);
    expect(external).toEqual([]);
    expect(errors).toEqual([]);
    expect(await context.cookies()).toEqual([]);
    expect(
      await page.evaluate(async () => ({
        local: localStorage.length,
        session: sessionStorage.length,
        db: (await indexedDB.databases()).length,
        sw: (await navigator.serviceWorker.getRegistrations()).length,
      })),
    ).toEqual({ local: 0, session: 0, db: 0, sw: 0 });
  });
}
test('all routes fit phone, tablet, laptop and large display', async ({ page }, info) => {
  test.setTimeout(180000);
  for (const width of [320, 375, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    for (const entry of paths) {
      await page.goto(entry.url);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${entry.url} at ${width}`,
      ).toBe(true);
      if (info.project.name === 'chromium' && [390, 1440].includes(width)) {
        await page.evaluate(async () => {
          document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
            img.loading = 'eager';
          });
          await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
        });
        await page.screenshot({
          path: `reports/${entry.lang}-${entry.id}-${width}.png`,
          fullPage: true,
          animations: 'disabled',
        });
      }
    }
  }
});
test('language selector retains the corresponding page', async ({ page }) => {
  for (const [en, fr] of [
    ['features', 'fonctionnalites'],
    ['get-started', 'installation'],
    ['resources', 'ressources'],
  ]) {
    await page.goto(`/en/${en}/`);
    await page.locator('.lang summary').click();
    await page.getByRole('link', { name: 'Français', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/fr/${fr}/$`));
  }
});
test('mobile menu works with keyboard and closes on escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.click();
  await expect(page.locator('#nav-sheet')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#nav-sheet')).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await page.locator('#nav-sheet').getByRole('link', { name: 'Installer' }).click();
  await expect(page).toHaveURL(/\/fr\/installation\/$/);
});
test('copy commands and FAQ', async ({ page, browserName, context }) => {
  if (browserName === 'chromium')
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/get-started/');
  await page.getByRole('button', { name: 'Copy — Docker', exact: true }).click();
  await expect(page.locator('.copy-status').first()).toHaveText('Copied!');
  if (browserName === 'chromium')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      'ghcr.io/fripix/frirss:latest',
    );
  // The home hero carries no command any more: installing is the Installer page's job.
  await page.goto('/fr/');
  await expect(page.locator('.hero .code-block')).toHaveCount(0);
  await expect(page.locator('.hero h1')).toHaveText('Une interface modernepour votre FreshRSS');
  // From 640 px every question and its answer are visible at once; a click changes nothing.
  await expect(page.locator('#faq .faq-q')).toHaveCount(8);
  const item = page.locator('#faq .faq-item').filter({ hasText: 'L’IA est-elle obligatoire ?' });
  await expect(item.locator('p')).toBeVisible();
  await expect(item.locator('p')).toContainText('désactivée');
  await item.locator('summary').click();
  await expect(item.locator('p')).toBeVisible();
});
test('reduced motion and content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/fr/installation/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('pre').first()).toContainText('docker run');
  await expect(page.locator('#compose')).toBeVisible();
  await expect(page.locator('#unraid')).toBeVisible();
  await page.goto('http://127.0.0.1:4322/fr/');
  await expect(page.locator('#layout-columns .fr')).toBeVisible();
  await expect(page.locator('#layouts .segmented')).not.toBeVisible();
  await expect(page.locator('.theme-picker')).not.toBeVisible();
  await expect(
    page.locator('#faq .faq-item').filter({ hasText: 'Faut-il une instance FreshRSS ?' }),
  ).toContainText('API');
  await context.close();
});
