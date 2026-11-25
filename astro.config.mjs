import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config';

// Use the production origin for deterministic canonical and sitemap URLs.
const siteUrl = process.env.SITE_URL?.trim() || 'https://markchat.co.ke';

export default defineConfig({
  site: siteUrl,
  integrations: [
    react(),
    mdx(),
    icon(),
    sitemap({
      filter: (page) => {
        const { features } = siteConfig;

        // Strictly exclude internal administration, error, and preview routes
        if (page.includes('/dashboard') || page.includes('/dashboardMain')) return false;
        if (/\/(auth|billing)(\/|$)/.test(new URL(page).pathname)) return false;
        if (
          /\/(login|register|forgot-password|reset-password|faqs|dashboardMain)(\/|$)/.test(
            new URL(page).pathname
          )
        )
          return false;
        if (page.includes('/403') || page.includes('/404') || page.includes('/500')) return false;
        if (page.includes('/api/')) return false;

        // Filter out pages based on feature flags
        if (!features.blog && page.includes('/blog')) return false;
        if (!features.docs && page.includes('/docs')) return false;
        if (!features.changelog && page.includes('/changelog')) return false;
        if (!features.testimonials && page.includes('/testimonials')) return false;
        if (!features.roadmap && page.includes('/roadmap')) return false;

        return true;
      },
      serialize(item) {
        const route = new URL(item.url).pathname;
        const depth = route.split('/').filter(Boolean).length;
        return {
          ...item,
          changefreq: depth === 0 ? 'daily' : route.startsWith('/blog/') ? 'weekly' : 'monthly',
          priority: depth === 0 ? 1 : depth === 1 ? 0.8 : 0.6,
          // Do not invent a per-page lastmod date when no revision timestamp is available.
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
