# Pages

All pages are in `src/pages/`. Astro uses file-based routing.

## Available Pages

### Marketing Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.astro` | Landing page with hero, features, testimonials |
| `/features` | `features.astro` | Product features showcase |
| `/pricing` | `pricing.astro` | Pricing plans |
| `/about` | `about.astro` | About the company/team |
| `/contact` | `contact.astro` | Contact form and info |

### Content Pages

| Route | File | Description |
|-------|------|-------------|
| `/blog` | `blog/index.astro` | Blog listing with pagination |
| `/blog/[slug]` | `blog/[...slug].astro` | Individual blog posts |
| `/blog/page/[page]` | `blog/page/[page].astro` | Blog pagination |
| `/blog/tag/[tag]` | `blog/tag/[tag].astro` | Posts filtered by tag |
| `/docs` | `docs/index.astro` | Documentation index |
| `/docs/[slug]` | `docs/[...slug].astro` | Documentation pages |
| `/changelog` | `changelog.astro` | Version history |
| `/testimonials` | `testimonials.astro` | Customer testimonials |
| `/roadmap` | `roadmap.astro` | Product roadmap |

### Legal Pages

| Route | File | Description |
|-------|------|-------------|
| `/privacy` | `privacy.astro` | Privacy policy |
| `/terms` | `terms.astro` | Terms of service |

### Other Pages

| Route | File | Description |
|-------|------|-------------|
| `/careers` | `careers.astro` | Careers/jobs page |
| `/faq` | `faq.astro` | Frequently asked questions |
| `/status` | `status.astro` | Service status page |

### Error Pages

| Route | File | Description |
|-------|------|-------------|
| `/404` | `404.astro` | Not found (auto-handled by Astro) |
| `/403` | `403.astro` | Forbidden |
| `/500` | `500.astro` | Server error |

Error pages use `ErrorLayout` which provides a minimal design without navbar/footer. Customize the messaging and styling in each file as needed.

### Generated Files

| Route | File | Description |
|-------|------|-------------|
| `/sitemap.xml` | (auto-generated) | XML sitemap |
| `/rss.xml` | `rss.xml.ts` | RSS feed for blog |
| `/robots.txt` | `robots.txt.ts` | Robots.txt |

## Adding New Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
// src/pages/new-page.astro
import MarketingLayout from '../layouts/MarketingLayout.astro';
import { siteConfig } from '@/config';
---

<MarketingLayout
  title={`New Page - ${siteConfig.name}`}
  description="Description for SEO"
>
  <section class="py-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold">New Page</h1>
      <!-- Your content -->
    </div>
  </section>
</MarketingLayout>
```

## Layouts

Choose the appropriate layout for your page:

| Layout | Use For |
|--------|---------|
| `MarketingLayout` | Marketing pages (includes navbar + footer) |
| `BlogLayout` | Blog posts (includes metadata, reading time) |
| `DocsLayout` | Documentation (includes sidebar) |
| `ErrorLayout` | Error pages (minimal, no navbar/footer) |
| `BaseLayout` | Custom pages (HTML shell only) |

## Removing Pages

1. Delete the page file from `src/pages/`
2. Remove any navigation links in `src/config/navigation.ts`
3. Update feature flags if applicable in `src/config/features.ts`

## Dynamic Routes

### Blog Post

`src/pages/blog/[...slug].astro` handles individual posts:

```astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
---
```

### Documentation

`src/pages/docs/[...slug].astro` works similarly for docs pages.

## Feature Flag Integration

Pages controlled by feature flags remain accessible via direct URL but are hidden from:
- Navigation menus
- Sitemap
- Internal links

To fully disable a section, you can delete the page files or add redirect rules.

## Next Steps

- [Deployment](./07-deployment.md) - Deploy your site to hosting services.