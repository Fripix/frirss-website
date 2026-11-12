import { test, expect } from '@playwright/test';
import { axeViolations } from './a11y';

test('reading layouts and theme preview respond to keyboard without navigating away', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/fr/');
    const stage = page.locator('#layouts .app-stage');
    const frame = (await stage.boundingBox())!.height;
    await page.getByRole('tab', { name: '2 colonnes', exact: true }).click();
    await expect(page.locator('#layout-list')).toBeVisible();
    await expect(page.locator('#layout-columns')).not.toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Grille', exact: true })).toBeFocused();
    await expect(page.locator('#layout-grid')).toBeVisible();
    expect(Math.abs((await stage.boundingBox())!.height - frame)).toBeLessThan(2);

    const themes = page.locator('#themes');
    const preview = themes.locator('.theme-window');
    const before = await preview
      .locator('.fr-read')
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    await themes.getByRole('button', { name: 'Night', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(themes.getByRole('button', { name: 'Night', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(preview).toHaveAttribute('data-fr-theme', 'night');
    await expect
      .poll(() =>
        preview.locator('.fr-read').evaluate((el) => getComputedStyle(el).backgroundColor),
      )
      .not.toBe(before);
    for (const theme of ['Night', 'Default', 'Paper', 'High Contrast']) {
      await themes.getByRole('button', { name: theme, exact: true }).click();
      await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
      // The band's ground eases to the new theme; WebKit does not always list that colour
      // transition in getAnimations(), so axe could sample a mid-way frame. Judge the settled state.
      await expect
        .poll(() => axeViolations(page, ['wcag2a', 'wcag2aa'], '#themes'), { timeout: 5000 })
        .toEqual([]);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page).toHaveURL(/\/fr\/$/);
  }
});

test('home motion respects reduced motion, has no pause button and yields to the visitor', async ({
  browser,
}) => {
  // Reduced motion: nothing moves, the tiles show their final state, the hero list stays as it is.
  const still = await browser.newContext({ reducedMotion: 'reduce' });
  const quiet = await still.newPage();
  await quiet.goto('http://127.0.0.1:4322/en/');
  const firstTitle = await quiet
    .locator('[data-live-window] .fr-row .fr-title')
    .first()
    .innerText();
  await quiet.waitForTimeout(3500);
  await expect(quiet.locator('html')).not.toHaveClass(/has-motion/);
  expect(await quiet.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(quiet.locator('.feature-panel--palette .frag-placeholder')).toBeVisible();
  await expect(quiet.locator('.feature-panel--palette .frag-query')).toBeHidden();
  await expect(quiet.locator('.feature-panel--palette .frag-item:visible')).toHaveCount(6);
  await expect(quiet.locator('.feature-panel--full .frag-fullbody')).toBeVisible();
  await quiet.locator('.feature--full').scrollIntoViewIfNeeded();
  await quiet.waitForTimeout(600);
  await expect(quiet.locator('[data-loop].is-playing')).toHaveCount(0);
  await expect(quiet.locator('[data-live-window] .fr-row .fr-title').first()).toHaveText(
    firstTitle,
  );
  await still.close();

  // Motion allowed: the hero receives two articles in under five seconds, then rests.
  const moving = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await moving.newPage();
  await page.goto('http://127.0.0.1:4322/en/');
  const unread = page.locator('[data-live-window] .fr-count-head');
  await expect(unread).toHaveText('48');
  await expect(unread).toHaveText('50', { timeout: 5000 });
  await page.waitForTimeout(6000);
  await expect(unread).toHaveText('50');
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.playState === 'running' &&
              document
                .querySelector('[data-live-window]')!
                .contains((animation.effect as KeyframeEffect).target),
          ).length,
    ),
  ).toBe(0);
  // Out of sight it goes back to its first state, and plays the same scene on return.
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await expect(unread).toHaveText('48');
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect(unread).toHaveText('50', { timeout: 5000 });

  // Layouts and themes never change by themselves: the visitor chooses.
  await page.locator('#layouts').scrollIntoViewIfNeeded();
  const themes = page.locator('#themes');
  await themes.scrollIntoViewIfNeeded();
  await page.waitForTimeout(8000);
  await expect(page.locator('#tab-layout-columns')).toHaveAttribute('aria-selected', 'true');
  await expect(themes).toHaveAttribute('data-ground', 'default');
  await themes.getByRole('button', { name: 'Desk', exact: true }).click();
  await expect(themes).toHaveAttribute('data-ground', 'desk');
  await expect(themes.locator('.theme-window')).toHaveAttribute('data-fr-theme', 'desk');
  await expect(themes).not.toHaveClass(/is-swapping/);
  await page.waitForTimeout(4500);
  await expect(themes).toHaveAttribute('data-ground', 'desk');
  await expect(page.locator('.back-to-top, .proof-strip')).toHaveCount(0);
  await moving.close();
});

test('no pause button anywhere: the kept loops end by themselves in under five seconds', async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const path of [
    '/en/',
    '/fr/',
    '/en/features/',
    '/fr/fonctionnalites/',
    '/en/get-started/',
    '/fr/installation/',
    '/en/resources/',
    '/fr/ressources/',
  ]) {
    await page.goto(path);
    await expect(page.locator('[data-motion-toggle], .motion-toggle')).toHaveCount(0);
  }

  // What plays inside a block: how many CSS animations, whether any is endless, when the last ends.
  const motion = (selector: string) =>
    page.evaluate((s) => {
      const block = document.querySelector(s)!;
      const running = document
        .getAnimations()
        .filter(
          (animation) =>
            animation.playState === 'running' &&
            block.contains((animation.effect as KeyframeEffect).target),
        );
      return {
        running: running.length,
        endless: running.filter((a) => a.effect!.getTiming().iterations === Infinity).length,
        end: Math.max(0, ...running.map((a) => Number(a.effect!.getComputedTiming().endTime))),
      };
    }, selector);

  await page.goto('/en/');
  await expect(page.locator('html')).toHaveClass(/has-motion/);
  for (const selector of ['.feature--full', '.feature--picker', '.close-support']) {
    const block = page.locator(selector);
    await page.evaluate(
      (s) => document.querySelector(s)!.scrollIntoView({ block: 'center', behavior: 'instant' }),
      selector,
    );
    // It starts when it comes on screen, with finite animations only…
    await expect(block, selector).toHaveClass(/is-playing/);
    const playing = await motion(selector);
    expect(playing.running, selector).toBeGreaterThan(0);
    expect(playing.endless, selector).toBe(0);
    expect(playing.end, selector).toBeLessThanOrEqual(5000);
    // …and rests by itself.
    await expect(block, selector).not.toHaveClass(/is-playing/, { timeout: 6500 });
    expect((await motion(selector)).running, selector).toBe(0);
  }

  // The resting state is the end of the demonstration.
  await page.locator('.feature--palette').scrollIntoViewIfNeeded();
  await expect(page.locator('.feature--palette')).not.toHaveClass(/is-playing/, { timeout: 6500 });
  // (For the palette: the whole palette, as it opens, never a half-empty tile.)
  await expect(page.locator('.feature-panel--palette .frag-placeholder')).toBeVisible();
  await expect(page.locator('.feature-panel--palette .frag-query')).toBeHidden();
  const palette = page.locator('.feature-panel--palette .frag-item');
  expect(
    await palette.evaluateAll(
      (rows) => rows.filter((row) => row.getBoundingClientRect().height >= 30).length,
    ),
  ).toBe(6);

  // Hover plays it again, then it rests again.
  const tile = page.locator('.feature--palette');
  await page.mouse.move(2, 2);
  await tile.hover({ position: { x: 24, y: 24 } });
  await expect(tile).toHaveClass(/is-playing/);
  expect((await motion('.feature--palette')).endless).toBe(0);
  await page.mouse.move(2, 2);
  await expect(tile).not.toHaveClass(/is-playing/, { timeout: 6500 });

  // Keyboard focus arriving in a section plays its demonstration again: here the star tile.
  const tile2 = page.locator('.close-support');
  await tile2.scrollIntoViewIfNeeded();
  await expect(tile2).not.toHaveClass(/is-playing/, { timeout: 6500 });
  await page.locator('.close-band .btn--secondary').focus();
  // Safari reaches links with Option+Tab.
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(tab);
  await expect(tile2.locator('.star-btn')).toBeFocused();
  await expect(tile2).toHaveClass(/is-playing/);
  await expect(tile2).not.toHaveClass(/is-playing/, { timeout: 6500 });
});
