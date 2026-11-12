import { test, expect } from '@playwright/test';
import { axeViolations } from './a11y';
import { site } from '../src/config/site';

test('installation tabs support direct links, keyboard selection and copying the selected method', async ({
  page,
  context,
  browserName,
}) => {
  if (browserName === 'chromium')
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/get-started/#compose');
  const compose = page.getByRole('tab', { name: 'Docker Compose', exact: true });
  await expect(compose).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#compose')).toBeVisible();
  await expect(page.locator('#docker')).not.toBeVisible();
  await expect(page.locator('#compose code').first()).toContainText('services:');
  await page.getByRole('button', { name: 'Copy — compose.yaml', exact: true }).click();
  await expect(page.locator('#compose .copy-status').first()).toHaveText('Copied!');
  await compose.focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Unraid', exact: true })).toBeFocused();
  await expect(page.locator('#unraid')).toBeVisible();
  await expect(page).toHaveURL(/#unraid$/);
  await page.reload();
  await expect(page.locator('#unraid')).toBeVisible();
  await page.getByRole('tab', { name: 'Docker', exact: true }).click();
  await expect(page.locator('#docker')).toBeVisible();
  await expect(page.locator('#account')).toBeVisible();
  await expect(page.locator('#connect')).toBeVisible();
});

test('fixed header and section markers keep long pages navigable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/fr/installation/');
  await page.locator('.install-aside a[href="#connect"]').click();
  await expect(page.locator('.install-aside a[href="#connect"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
  const header = (await page.locator('header.nav').boundingBox())!;
  expect(header.y).toBe(0);
  expect((await page.locator('#connect').boundingBox())!.y).toBeGreaterThanOrEqual(header.height);
});
test('small screens keep layouts and the menu usable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/en/');
  await page.getByRole('tab', { name: 'Grid', exact: true }).click();
  await expect(page.locator('#layout-grid .fr-card').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.locator('#nav-sheet')).toBeVisible();
  await page.locator('#nav-sheet').getByRole('link', { name: 'Resources' }).click();
  await expect(page).toHaveURL(/\/en\/resources\/$/);
});

test('the four layouts keep one frame and show distinct views', async ({ page }) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/fr/');
    const stage = page.locator('#layouts .app-stage');
    const initial = (await stage.boundingBox())!.height;
    for (const [name, id] of [
      ['3 colonnes', 'columns'],
      ['2 colonnes', 'list'],
      ['Grille', 'grid'],
      ['Plein écran', 'focus'],
    ]) {
      await page.getByRole('tab', { name, exact: true }).click();
      await expect(page.locator(`#layout-${id} .fr`)).toBeVisible();
      await expect(page.locator('#layouts .app-view:visible')).toHaveCount(1);
      expect(Math.abs((await stage.boundingBox())!.height - initial)).toBeLessThan(2);
    }
  }
});
test('at 375 px tabs and theme names keep one line and the hero shows the article list', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const lang of ['fr', 'en']) {
    await page.goto(`/${lang}/`);
    await page.evaluate(() => document.fonts.ready);
    const home = await page.evaluate(() => {
      const box = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const tabs = [...document.querySelectorAll<HTMLElement>('#layouts [role="tab"]')];
      const themes = [...document.querySelectorAll<HTMLElement>('.theme-picker button')];
      return {
        tabRows: new Set(tabs.map((tab) => Math.round(tab.getBoundingClientRect().top))).size,
        tabsCut: tabs.filter((tab) => tab.scrollWidth > tab.clientWidth + 1).length,
        tallestTheme: Math.max(...themes.map((theme) => theme.getBoundingClientRect().height)),
        themesCut: themes.filter((theme) => theme.scrollWidth > theme.clientWidth + 1).length,
        sidebar: box('.hero-window .fr-side').width,
        list: box('.hero-window .fr-list').width,
      };
    });
    expect(home, lang).toMatchObject({ tabRows: 1, tabsCut: 0, themesCut: 0, sidebar: 0 });
    // One line of text: 48 px, give or take sub-pixel rounding (48.0002 seen on CI).
    expect(home.tallestTheme, lang).toBeLessThanOrEqual(48.5);
    expect(home.list, lang).toBeGreaterThan(300);
  }
  await page.goto('/fr/installation/');
  await page.evaluate(() => document.fonts.ready);
  const methods = page.locator('[data-tablist] [role="tab"]');
  await expect(methods).toHaveCount(3);
  expect(
    await methods.evaluateAll(
      (tabs) => new Set(tabs.map((tab) => Math.round(tab.getBoundingClientRect().top))).size,
    ),
  ).toBe(1);
});

test('FreshRSS comparison: tabs, divider from the keyboard, phones side by side', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [path, browse, read, phone] of [
    ['/fr/', 'Parcourir', 'Lire', 'Sur téléphone'],
    ['/en/', 'Browse', 'Read', 'On a phone'],
  ]) {
    await page.goto(path);
    const section = page.locator('#freshrss');
    const frame = section.locator('#cmp-browse .cmp');
    await frame.scrollIntoViewIfNeeded();
    await expect(section.getByRole('tab', { name: browse, exact: true })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(frame.locator('.frss')).toBeVisible();
    await expect(frame.locator('.fr')).toBeVisible();
    // The divider settles in the middle, then follows the keyboard through its range input.
    const position = () =>
      frame.evaluate((el) => getComputedStyle(el).getPropertyValue('--pos').trim());
    await expect.poll(position, { timeout: 6000 }).toBe('50%');
    const slider = frame.getByRole('slider');
    await slider.focus();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect.poll(position).toBe('48%');
    await expect(slider).toHaveAttribute('aria-valuetext', /FreshRSS 48 %/);
    // Each situation shows both interfaces.
    await section.getByRole('tab', { name: read, exact: true }).click();
    await expect(section.locator('#cmp-browse')).toBeHidden();
    await expect(section.locator('#cmp-read .frss-open')).toBeVisible();
    await expect(section.locator('#cmp-read .fr-read')).toBeVisible();
    await section.getByRole('tab', { name: phone, exact: true }).click();
    await expect(section.locator('#cmp-phone .phone')).toHaveCount(2);
    await expect(section.locator('#cmp-phone .frss--phone')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
  }
  // From 640 px there is no switch: the divider does the comparing.
  await expect(page.locator('#freshrss [data-compare-switch]')).toBeHidden();

  // Under 640 px the comparison opens on the phone view, one interface at full width, and a
  // two-button switch swaps it, from the keyboard too.
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/fr/');
  const section = page.locator('#freshrss');
  await expect(page.locator('#tab-cmp-phone')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#cmp-browse')).toBeHidden();
  const fresh = section.getByRole('button', { name: 'FreshRSS', exact: true });
  const fri = section.getByRole('button', { name: 'FriRSS', exact: true });
  await expect(fri).toHaveAttribute('aria-pressed', 'true');
  await expect(section.locator('#cmp-phone .phone:visible')).toHaveCount(1);
  await expect(section.locator('#cmp-phone .frss--phone')).toBeHidden();
  expect((await section.locator('#cmp-phone .phone:visible').boundingBox())!.width).toBeGreaterThan(
    250,
  );
  await fresh.focus();
  await page.keyboard.press('Enter');
  await expect(fresh).toHaveAttribute('aria-pressed', 'true');
  await expect(fri).toHaveAttribute('aria-pressed', 'false');
  await expect(section.locator('#cmp-phone .frss--phone')).toBeVisible();
  await expect(section.locator('#cmp-phone .phone:visible')).toHaveCount(1);
  // The other situations follow the same switch: one whole interface, no divider.
  await page.locator('#tab-cmp-browse').click();
  await expect(section.locator('#cmp-browse .frss')).toBeVisible();
  await expect(section.locator('#cmp-browse .fr')).toBeHidden();
  await expect(section.locator('#cmp-browse .cmp-handle')).toBeHidden();
  await fri.click();
  await expect(section.locator('#cmp-browse .fr')).toBeVisible();
  await expect(section.locator('#cmp-browse .frss')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
});

test('removed privacy and demo pages stay removed', async ({ page, request }) => {
  await page.goto('/fr/');
  for (const path of ['/fr/confidentialite/', '/en/privacy/', '/fr/demo/', '/en/demo/']) {
    expect((await request.get(path)).status()).toBe(404);
    await expect(page.locator(`a[href="${path}"]`)).toHaveCount(0);
  }
});
test('home demo opens directly without a credentials panel', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/fr/');
  const link = page.locator('.hero .btn--primary');
  await expect(link).toHaveAttribute('href', site.links.demo);
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(link).toHaveAccessibleName(/S’ouvre dans un nouvel onglet/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await axeViolations(page, ['wcag2a', 'wcag2aa'])).toEqual([]);
  await context.route('https://frirss.fripix.ch/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>Demo destination</title>',
    }),
  );
  const popupReady = page.waitForEvent('popup');
  await link.click();
  const popup = await popupReady;
  await popup.waitForLoadState();
  await expect(popup).toHaveURL(site.links.demo);
  await expect(page).toHaveURL(/\/fr\/$/);
  await popup.close();
});
