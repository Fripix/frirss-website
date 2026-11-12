import { test, expect } from '@playwright/test';

test('touch navigation stays usable on phones and tablets in both orientations', async ({
  browser,
}) => {
  for (const [width, height] of [
    [390, 844],
    [844, 390],
    [768, 1024],
    [1024, 768],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      hasTouch: true,
      reducedMotion: 'reduce',
    });
    try {
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4322/fr/');
      const toggle = page.locator('.menu-toggle');
      if (width < 1024) {
        await toggle.tap();
        const menu = page.locator('#nav-sheet');
        expect(
          (await menu.boundingBox())!.y + (await menu.boundingBox())!.height,
        ).toBeLessThanOrEqual(height);
        const lastLink = menu.locator('a').last();
        await lastLink.scrollIntoViewIfNeeded();
        expect(
          (await lastLink.boundingBox())!.y + (await lastLink.boundingBox())!.height,
        ).toBeLessThanOrEqual(height);
        await toggle.tap();
        await expect(menu).not.toBeVisible();
      } else {
        await expect(toggle).not.toBeVisible();
        await expect(page.locator('.nav-links')).toBeVisible();
      }
      await page.locator('#tab-layout-grid').tap();
      await expect(page.locator('#layout-grid')).toBeVisible();
      await page.locator('#tab-layout-list').tap();
      await expect(page.locator('#layout-list')).toBeVisible();
      await page.locator('#themes').getByRole('button', { name: 'Paper', exact: true }).tap();
      await expect(page.locator('.theme-window')).toHaveAttribute('data-fr-theme', 'paper');
      // Under 640 px the answers fold away; a tap on the question opens it.
      if (width < 640) await page.locator('#faq .faq-item summary').first().tap();
      await expect(page.locator('#faq .faq-item p').first()).toBeVisible();
    } finally {
      await context.close();
    }
  }
});

test('resources lead to hosting advice for the correct application', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [resources, installation] of [
    ['/fr/ressources/', '/fr/installation/'],
    ['/en/resources/', '/en/get-started/'],
  ]) {
    await page.goto(resources);
    await expect(page.locator('.resource-card')).toHaveCount(9);
    await page.locator(`a[href="${installation}#hosting"]`).click();
    await expect(page).toHaveURL(new RegExp(`${installation}#hosting$`));
    const hosting = page.locator('#hosting');
    const header = (await page.locator('header.nav').boundingBox())!;
    expect((await hosting.boundingBox())!.y).toBeGreaterThanOrEqual(header.height);
    await expect(hosting.locator('.hosting-options article').first()).toContainText('FriRSS');
    await expect(hosting.locator('.hosting-options article')).toHaveCount(1);
    await expect(hosting).not.toContainText('PostgreSQL');
    await expect(hosting.locator('a').last()).toHaveAttribute(
      'href',
      'https://github.com/Fripix/Frirss#configuration',
    );
  }
});

test('menus open the external demo directly and gallery pages are removed', async ({
  page,
  context,
}) => {
  await context.route('https://frirss.fripix.ch/**', (route) =>
    route.fulfill({ body: 'Demo destination' }),
  );
  for (const lang of ['fr', 'en']) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${lang}/`);
      await expect(page.locator('a[href*="/gallery/"], a[href*="/galerie/"]')).toHaveCount(0);
      if (width === 390) await page.locator('.menu-toggle').click();
      const nav = page.locator(width === 390 ? '#nav-sheet' : '.nav-actions');
      const link = nav.locator('a[href="https://frirss.fripix.ch/"]');
      await expect(link).toBeVisible();
      const popupPromise = page.waitForEvent('popup');
      await link.click();
      const popup = await popupPromise;
      await expect(popup).toHaveURL('https://frirss.fripix.ch/');
      await popup.close();
    }
    const response = await page.goto(lang === 'fr' ? '/fr/galerie/' : '/en/gallery/');
    expect(response?.status()).toBe(404);
  }
});

test('features index leads to each chapter with the real interface', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [path, label] of [
    ['/fr/fonctionnalites/', 'Personnalisation'],
    ['/en/features/', 'Personalization'],
  ]) {
    await page.goto(path);
    await expect(page.locator('.feat-index a')).toHaveCount(5);
    await expect(page.locator('.chapter')).toHaveCount(5);
    await expect(page.locator('.chapter-items article')).toHaveCount(22);
    await page.locator('.feat-index a', { hasText: label }).click();
    await expect(page).toHaveURL(/#group-3$/);
    const header = (await page.locator('header.nav').boundingBox())!;
    expect((await page.locator('#group-3').boundingBox())!.y).toBeGreaterThanOrEqual(
      header.height - 1,
    );
    await expect(page.locator('#group-3 .prefs')).toBeVisible();
    await expect(page.locator('#group-2 .fr-offline')).toBeVisible();
  }
});

test('inner pages fit small phones and tablets without overlapping feature titles', async ({
  page,
}) => {
  for (const width of [320, 375, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/fr/fonctionnalites/',
      '/fr/ressources/',
      '/fr/installation/',
      '/en/features/',
      '/en/resources/',
      '/en/get-started/',
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${path} at ${width}`,
      ).toBe(true);
    }
  }
});

test('private network installation help opens with the keyboard on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/installation/');
  const help = page.locator('#connect .network-help');
  await expect(help.locator('code')).not.toBeVisible();
  await help.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(help.locator('code')).toBeVisible();
  await expect(help.locator('code')).toContainText('PROXY_INTERNAL_HOSTS');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
  await page.keyboard.press('Enter');
  await expect(help.locator('code')).not.toBeVisible();
});

test('page styles override the shared system in the production build', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [path, intro] of [
    ['/fr/fonctionnalites/', '.feat-intro'],
    ['/fr/installation/', '.install-intro'],
    ['/fr/ressources/', '.res-intro'],
  ]) {
    await page.goto(path);
    // Inner introductions are short; a full-screen intro means the shared rules won the cascade.
    // On Features, the measure stops where the product film begins.
    const height = await page.locator(intro).evaluate((el) => {
      const film = el.querySelector('.feat-film');
      const top = el.getBoundingClientRect().top;
      return (film ? film.getBoundingClientRect().top : el.getBoundingClientRect().bottom) - top;
    });
    expect(height, path).toBeLessThan(720);
  }
  await page.goto('/fr/');
  expect((await page.locator('.hero').boundingBox())!.height).toBeLessThanOrEqual(900);
});
