// Same commands as the official README (the :latest image). No version is pinned or shown on the site.
// Not executed by this site.
export const installation = {
  docker: `mkdir -p frirss-data
docker run -d --name frirss \\
  --restart unless-stopped \\
  -p 8080:80 \\
  -v "$PWD/frirss-data:/app/data" \\
  -e TZ=Europe/Zurich \\
  ghcr.io/fripix/frirss:latest`,
  composeStart: 'mkdir -p frirss-data\ndocker compose up -d',
  privateHost: 'PROXY_INTERNAL_HOSTS=192.168.1.20',
};

// Every variable of FriRSS's README (Configuration), in the order of the table on the Installer page.
// `value` is what the compose file shows, commented out; the table's texts are in installation.json
// (`vars`), one group per entry here, in the same order.
export const variables: { name: string; value: string }[][] = [
  [
    { name: 'PUID', value: '"1000"' },
    { name: 'PGID', value: '"1000"' },
  ],
  [
    { name: 'FRIRSS_BASE_URL', value: 'https://frirss.example.com' },
    { name: 'PROXY_INTERNAL_HOSTS', value: '192.168.1.20' },
    { name: 'PROXY_REWRITES', value: 'https://rss.example.com=http://freshrss:80' },
    { name: 'CORS_ORIGIN', value: 'https://frirss.example.com' },
  ],
  [
    { name: 'REDIS_URL', value: 'redis://redis:6379' },
    { name: 'CACHE_ARTICLES_PER_FEED', value: '"50"' },
    { name: 'CACHE_TTL', value: '"86400"' },
    { name: 'CACHE_SYNC_INTERVAL', value: '"0"' },
    { name: 'CACHE_SYNC_ACTIVE_DAYS', value: '"7"' },
    { name: 'CACHE_SYNC_PARALLEL_USERS', value: '"3"' },
  ],
  [
    { name: 'FRIRSS_REFRESH_MAX_FEEDS', value: '"1000"' },
    { name: 'FRIRSS_PROXY_RATE_LIMIT', value: '"600"' },
    { name: 'FRIRSS_DATA_DIR', value: '/app/data' },
  ],
];

// The compose file: what a first start needs is active, every other variable is listed commented
// out under its group's title, in the page's language.
export function compose(note: string, groups: string[]): string {
  const lines = [
    'services:',
    '  frirss:',
    '    image: ghcr.io/fripix/frirss:latest',
    '    container_name: frirss',
    '    ports:',
    '      - "8080:80"',
    '    volumes:',
    '      - ./frirss-data:/app/data',
    '    restart: unless-stopped',
    '    environment:',
    '      TZ: Europe/Zurich',
    `      # ${note}`,
  ];
  variables.forEach((group, i) => {
    lines.push('', `      # ${groups[i]}`);
    for (const v of group) lines.push(`      # ${v.name}: ${v.value}`);
  });
  return lines.join('\n');
}
