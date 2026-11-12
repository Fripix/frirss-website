import type { APIRoute } from 'astro';
import { languages, route } from '../i18n';
import { pageIds } from '../config/routes';
export const GET: APIRoute = ({ site }) => {
  const url = (lang: string, page: (typeof pageIds)[number]) =>
    new URL(route(lang, page), site).href;
  const body = languages
    .flatMap((l) =>
      pageIds.map(
        (page) =>
          `<url><loc>${url(l.code, page)}</loc>${languages.map((other) => `<xhtml:link rel="alternate" hreflang="${other.code}" href="${url(other.code, page)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}"/></url>`,
      ),
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
