import { test, expect } from '@playwright/test';

test('under 640 px the FAQ and the feature families fold; from 640 px nothing changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/fr/');
  for (const fold of ['#faq', '.features-more-groups']) {
    const details = page.locator(`${fold} details`);
    expect(await details.count()).toBeGreaterThan(2);
    for (const item of await details.all()) await expect(item).not.toHaveAttribute('open');
    const first = details.first();
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open');
    expect(
      await first.locator('summary').evaluate((el) => getComputedStyle(el, '::after').display),
    ).toBe('block');
  }
  await page.setViewportSize({ width: 1024, height: 900 });
  for (const item of await page.locator('[data-fold] > details').all())
    await expect(item).toHaveAttribute('open');
  expect(
    await page
      .locator('#faq summary')
      .first()
      .evaluate((el) => getComputedStyle(el, '::after').display),
  ).toBe('none');
  await expect(page.locator('#faq summary').first()).toHaveAttribute('tabindex', '-1');
});

test('at 768 px the FriRSS window of the hero starts in the first screen', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 768, height: 1024 });
  for (const path of ['/fr/', '/en/']) {
    await page.goto(path);
    const box = (await page.locator('.hero-window').boundingBox())!;
    expect(box.y, path).toBeLessThan(1024 - 200);
  }
});

test('the comparison says FriRSS is independent from FreshRSS', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.locator('.cmp-note')).toContainText('projet indépendant');
  await page.goto('/en/');
  await expect(page.locator('.cmp-note')).toContainText('independent project');
});

test('the footer shows the source code and the licence', async ({ page }) => {
  for (const lang of ['fr', 'en']) {
    await page.goto(`/${lang}/`);
    const footer = page.locator('footer');
    await expect(footer.locator('a[href$="/LICENSE"]')).toBeVisible();
    await expect(
      footer.locator('.vitals a[href="https://github.com/Fripix/Frirss"]'),
    ).toBeVisible();
    await expect(page.locator('link[type="application/rss+xml"]')).toHaveCount(0);
  }
});

test('privacy, who makes FriRSS and the film slot are in place', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/fr/installation/');
  await expect(page.locator('#privacy h2')).toContainText('Vie privée et sécurité');
  await expect(page.locator('.install-aside a[href="#privacy"]')).toBeVisible();
  await expect(page.locator('#privacy a[href$="/SECURITY.md"]')).toBeVisible();
  await page.goto('/en/resources/');
  await expect(page.locator('#about h2')).toHaveText('Who makes FriRSS');
  for (const path of ['/fr/fonctionnalites/', '/en/features/']) {
    await page.goto(path);
    const film = page.locator('.film');
    const media = film.locator('img, video').first();
    // The still loads lazily; a film loads nothing before the visitor presses play.
    if ((await media.evaluate((el) => el.tagName)) === 'IMG')
      await expect(media).toHaveAttribute('loading', 'lazy');
    else await expect(media).toHaveAttribute('preload', 'none');
    const box = (await media.boundingBox())!;
    expect(Math.abs(box.width / box.height - 16 / 9)).toBeLessThan(0.02);
    await expect(film.locator('figcaption')).not.toBeEmpty();
  }
});

test('the customization panel reshapes the FriRSS window, with or without JavaScript', async ({
  browser,
}) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({
      javaScriptEnabled,
      reducedMotion: 'reduce',
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4322/fr/');
    const band = page.locator('#custom');
    const win = band.locator('.custom-window');
    await expect(band.locator('input[type=checkbox]')).toHaveCount(18);
    // Density: Compact puts each article on one line, without thumbnail or summary.
    await band.getByText('Compact', { exact: true }).click();
    await expect(win.locator('.fr-thumb').first()).toBeHidden();
    await expect(win.locator('.fr-summary').first()).toBeHidden();
    await band.getByRole('checkbox', { name: 'À lire plus tard' }).first().uncheck();
    await expect(win.locator('.fr-row-actions > :nth-child(2)').first()).toBeHidden();
    // The other tabs (all panes are shown without JavaScript).
    if (javaScriptEnabled) await band.getByRole('tab', { name: 'Barres' }).click();
    await band.getByRole('checkbox', { name: 'Rechercher' }).uncheck();
    await expect(win.locator('[data-tb="search"]').first()).toBeHidden();
    await band.getByRole('checkbox', { name: 'Afficher la barre des raccourcis' }).uncheck();
    await expect(win.locator('[data-tb="shortcutBar"]')).toBeHidden();
    if (javaScriptEnabled) await band.getByRole('tab', { name: 'Lecture' }).click();
    await band.getByRole('checkbox', { name: 'Article complet' }).uncheck();
    await expect(win.locator('[data-tb="full"]')).toBeHidden();
    await band.getByRole('button', { name: 'Tout réafficher' }).click();
    await expect(win.locator('[data-tb="full"]')).toBeVisible();
    await expect(win.locator('.fr-thumb').first()).toBeVisible();
    await context.close();
  }
});

test('on a phone the panel offers only the settings that act there, on the list', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/en/');
  const band = page.locator('#custom');
  const win = band.locator('.custom-window');
  await expect(win.locator('.fr-list')).toBeVisible();
  await expect(win.locator('.fr-read')).toBeHidden();
  await expect(band.getByRole('tab', { name: 'Reading' })).toBeHidden();
  await band.getByText('Standard', { exact: true }).click();
  await expect(win.locator('.fr-thumb').first()).toBeHidden();
  await band.getByRole('tab', { name: 'Bars' }).click();
  await expect(band.getByRole('checkbox', { name: 'Show the shortcut bar' })).toBeHidden();
  await band.getByRole('checkbox', { name: 'All read' }).uncheck();
  await expect(win.locator('[data-tb="allRead"]').first()).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
});

test('the languages band switches the interface labels and translates the whole article', async ({
  browser,
}) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({
      javaScriptEnabled,
      reducedMotion: 'reduce',
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4322/fr/');
    const band = page.locator('#languages');
    const ui = band.locator('.langs-ui .fr');
    const read = band.locator('.langs-read');
    // Translation: the German source first, then the French translation, in CSS alone.
    await expect(read.locator('.fr-article-title:visible')).toHaveText(
      'Die Leoniden, vom Balkon mitten in der Stadt',
    );
    await band.getByText('Traduit en français', { exact: true }).click();
    await expect(read.locator('.fr-article-title:visible')).toHaveText(
      'Les Léonides, depuis un balcon en ville',
    );
    await expect(read.locator('[data-l="ai.showSource"]')).toBeVisible();
    if (!javaScriptEnabled) {
      // Without JavaScript the language choice is not offered; the window keeps the page's language.
      await expect(band.locator('.langs-pick')).toBeHidden();
      await expect(ui.locator('[data-l="sidebar.allFeeds"]')).toHaveText('Tous les flux');
    } else {
      await expect(band.locator('input[name=ui-lang]')).toHaveCount(10);
      await band.getByText('Deutsch', { exact: true }).click();
      await expect(ui.locator('[data-l="sidebar.allFeeds"]')).toHaveText('Alle Feeds');
      await expect(ui.locator('[data-l="dates.today"]')).toContainText('Heute · 6. November');
      await expect(read.locator('[data-l="ai.showSource"]')).toContainText('Originaltext');
      await band.getByText('简体中文', { exact: true }).click();
      await expect(ui.locator('[data-l="sidebar.allFeeds"]')).toHaveText('全部订阅源');
      // The feeds' own content is never relabelled.
      await expect(ui.locator('.fr-title').first()).toHaveText(
        'Les Léonides, depuis un balcon en ville',
      );
    }
    await context.close();
  }
});

test('the Installer variables table and the compose file list the same variables', async ({
  page,
}) => {
  await page.goto('/fr/installation/');
  const names = (await page.locator('.vars tbody th[scope=row] code').allTextContents()).flatMap(
    (n) => n.split(', '),
  );
  expect(names).toHaveLength(16);
  const compose = (await page.locator('#compose pre').first().textContent()) ?? '';
  for (const name of names.filter((n) => n !== 'TZ'))
    expect(compose, name).toContain(`# ${name}: `);
  expect(compose).toContain('      TZ: Europe/Zurich');
  await expect(page.locator('.vars-group')).toHaveCount(4);
});
