import { defineConfig } from 'astro/config';
import locales from './src/config/locales.json' with { type: 'json' };
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
  trailingSlash: 'always',
  // Each page's CSS is small (11 to 40 KB): inlining it removes the render-blocking requests.
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: locales.source,
    locales: locales.languages.filter((l) => l.active && l.ready).map((l) => l.code),
    routing: { prefixDefaultLocale: true },
  },
  devToolbar: { enabled: false },
});
