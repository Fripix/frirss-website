import type { APIRoute } from 'astro';
import { asset } from '../i18n';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\n${import.meta.env.PUBLIC_SITE_READY === 'true' ? 'Allow: /' : 'Disallow: /'}\nSitemap: ${new URL(asset('sitemap.xml'), site)}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
