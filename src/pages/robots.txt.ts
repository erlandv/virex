import type { APIRoute } from 'astro';
import { siteConfig } from '@/config';

export const GET: APIRoute = () => {
  const robotsTxt = `# robots.txt for ${siteConfig.name}
# Standard web crawlers compliance - https://www.robotstxt.org/

User-agent: *
Allow: /
# Ensure search engines can access CSS, JS bundles, and static assets for full visual rendering
Allow: /_astro/
Allow: /images/
Allow: /favicon.svg

# Disallow internal administrative CMS routes and non-indexable utility endpoints
Disallow: /dashboard/
Disallow: /dashboardMain
Disallow: /auth/
Disallow: /billing/
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /api/
Disallow: /403
Disallow: /404
Disallow: /500
Disallow: /faqs

# AI search and general search crawlers share public indexing rules.
# Googlebot, Bingbot, OAI-SearchBot, ClaudeBot and PerplexityBot
# inherit this User-agent: * policy.

# Canonical XML Sitemap Index
Sitemap: ${siteConfig.url}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
