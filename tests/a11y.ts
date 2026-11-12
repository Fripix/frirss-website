import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

// The FriRSS interface, and FreshRSS beside it in the comparison, are reproduced as pictures of the
// apps: a root with role="img" and a description, and `inert` content inside, with each app's own
// colours. axe leaves the text of inert content out of its contrast rule by itself (incidental
// text, WCAG 1.4.3), so nothing is excluded here: every rule runs on the whole page.
export async function axeViolations(page: Page, tags: string[], include?: string) {
  const all = new AxeBuilder({ page }).withTags(tags);
  if (include) all.include(include);
  return (await all.analyze()).violations;
}
