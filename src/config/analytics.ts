export function analyticsConfig(env: Record<string, string | boolean | undefined>) {
  const enabled = env.PUBLIC_ANALYTICS_ENABLED === 'true';
  if (!enabled) return null;
  if (env.PUBLIC_ANALYTICS_REVIEWED !== 'true')
    throw new Error('Analytics requires an explicit legal and technical review.');
  const url = new URL(String(env.PUBLIC_MATOMO_URL || ''));
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash)
    throw new Error('Matomo needs a clean HTTPS URL.');
  const siteId = String(env.PUBLIC_MATOMO_SITE_ID || '');
  if (!/^[1-9]\d*$/.test(siteId)) throw new Error('Matomo site ID must be a positive integer.');
  return { url: url.href.replace(/\/$/, '') + '/', siteId };
}
