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
Disallow: /api/
Disallow: /403
Disallow: /500

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
