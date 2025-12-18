import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config';

export default defineConfig({
  site: 'https://virex.example.com',
  integrations: [
    mdx(),
    icon(),
    sitemap({
      filter: (page) => {
        const { features } = siteConfig;
        
        // Filter out pages based on feature flags
        if (!features.blog && page.includes('/blog')) return false;
        if (!features.docs && page.includes('/docs')) return false;
        if (!features.changelog && page.includes('/changelog')) return false;
        if (!features.testimonials && page.includes('/testimonials')) return false;
        if (!features.roadmap && page.includes('/roadmap')) return false;
        
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
