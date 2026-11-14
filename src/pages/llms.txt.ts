import type { APIRoute } from 'astro';
import { route } from '../i18n';
import { site as config } from '../config/site';

// llms.txt (https://llmstxt.org): where an AI assistant finds what it needs to help install
// FriRSS. The install guide itself lives in the FriRSS repository and is served raw from main.
export const GET: APIRoute = ({ site }) => {
  const page = (lang: string) => new URL(route(lang, 'getStarted'), site).href;
  const body = `# FriRSS

> FriRSS is a self-hosted web interface for FreshRSS: FreshRSS fetches and stores the feeds, FriRSS is where they are read. It runs as one Docker image (amd64, arm64) and needs a running FreshRSS with its API enabled.

## Install

- [Install guide for AI assistants](https://raw.githubusercontent.com/Fripix/Frirss/main/docs/INSTALL-WITH-AI.md): step by step, questions to ask first, troubleshooting, and the full list of environment variables. Start here to help someone install FriRSS.
- [Installation guide](https://github.com/Fripix/Frirss/blob/main/docs/INSTALL.md): every way to install, reverse proxy, updating and backups. It is the reference if anything disagrees.
- [Configuration](${config.links.configuration}): every environment variable, grouped by need.
- [README](${config.links.docs}): what FriRSS is, and the quick start.
- [Installation page](${page('en')}) ([French](${page('fr')}))

## Optional

- [Release notes](${config.links.releases})
- [Feature reference](${config.links.features}) (in French)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
