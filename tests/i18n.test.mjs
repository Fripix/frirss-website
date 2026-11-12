import test from 'node:test';
import assert from 'node:assert/strict';
import { compare } from '../scripts/i18n-lib.mjs';
import { analyticsConfig } from '../src/config/analytics.ts';
test('translation validator rejects missing, extra, empty and wrong parameters', () => {
  assert.deepEqual(compare({ a: 'Hello {name}' }, { a: 'Bonjour {name}' }, 'fr'), []);
  assert.match(
    compare({ a: 'Hello {name}' }, { a: 'Bonjour {user}', extra: 'test' }, 'fr').join(),
    /parameters differ/,
  );
  assert.match(compare({ a: 'ok' }, {}, 'fr').join(), /missing/);
  assert.match(compare({ a: 'ok' }, { a: '' }, 'fr').join(), /empty/);
  assert.match(compare({ a: 'ok' }, { a: 'ok', extra: 'x' }, 'fr').join(), /unknown/);
});
test('analytics is fail-closed with explicit review and safe endpoint', () => {
  assert.equal(analyticsConfig({}), null);
  assert.throws(() => analyticsConfig({ PUBLIC_ANALYTICS_ENABLED: 'true' }), /review/);
  const valid = {
    PUBLIC_ANALYTICS_ENABLED: 'true',
    PUBLIC_ANALYTICS_REVIEWED: 'true',
    PUBLIC_MATOMO_URL: 'https://stats.example.org',
    PUBLIC_MATOMO_SITE_ID: '1',
  };
  assert.deepEqual(analyticsConfig(valid), { url: 'https://stats.example.org/', siteId: '1' });
  assert.throws(
    () => analyticsConfig({ ...valid, PUBLIC_MATOMO_URL: 'http://stats.example.org' }),
    /HTTPS/,
  );
  assert.throws(() => analyticsConfig({ ...valid, PUBLIC_MATOMO_SITE_ID: 'oops' }), /integer/);
});
