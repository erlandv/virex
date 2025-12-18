# Configuration

All configuration is centralized in `src/config/`. Import from `@/config` to access settings.

## Site Configuration

Edit `src/config/site.ts` to set your site's identity:

```typescript
// Site name displayed in header, footer, and meta tags
export const name = 'Your Product';

// Site description for SEO
export const description = 'Your product description';

// Production URL (used for sitemap, RSS, canonical URLs)
export const url = 'https://yoursite.com';

// Author name for meta tags
export const author = 'Your Name';

// Logo path (relative to /public), set to "" to show site name instead
export const logo = '/logo.svg';

// Open Graph image path
export const ogImage = '/images/og-image.png';

// Social media links
export const social = {
  twitter: 'https://twitter.com/yourhandle',
  github: 'https://github.com/yourrepo',
  discord: 'https://discord.gg/yourinvite',
};
```

## Contact Information

Configure contact details in `src/config/contact.ts`:

```typescript
export const contact = {
  email: 'hello@yoursite.com',
  supportEmail: 'support@yoursite.com',
  salesEmail: 'sales@yoursite.com',
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'United States',
  },
};

// Contact methods displayed on the contact page
export const contactMethods = [
  {
    icon: 'lucide:mail',
    label: 'Email',
    value: 'hello@yoursite.com',
    href: 'mailto:hello@yoursite.com',
  },
  {
    icon: 'simple-icons:discord',
    label: 'Discord',
    value: 'Join Discord',
    href: 'https://discord.gg/yourserver',
  },
  // Add more contact methods...
];

// FAQ items displayed on the contact page
export const contactFAQs = [
  {
    question: "What's your typical response time?",
    answer: 'We respond within 24 hours during business days.',
  },
  // Add more FAQs...
];
```

## Legal Configuration

For privacy policy and terms pages:

```typescript
export const legal = {
  privacyEmail: 'privacy@yoursite.com',
  legalEmail: 'legal@yoursite.com',
  lastUpdated: 'January 1, 2025',
};
```

## Navigation

Edit `src/config/navigation.ts` to customize the navbar:

```typescript
export const mainNavigation = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

## Feature Flags

Toggle features in `src/config/features.ts`:

```typescript
export const features = {
  blog: true,        // /blog routes
  docs: true,        // /docs routes
  changelog: true,   // /changelog page
  testimonials: true,// /testimonials page
  roadmap: true,     // /roadmap page
};
```

Feature flags control:
- **Navigation**: Disabled features are hidden from navbar and footer
- **Sitemap**: Disabled features are excluded from `sitemap.xml`
- **RSS**: Only enabled blog posts appear in the feed
- **Pages**: Pages remain accessible via direct URL (not deleted)

## Announcement Bar

Configure in `src/config/content.ts`:

```typescript
export const announcement = {
  enabled: true,
  id: 'launch-2025',        // Change ID to reset dismissal
  text: '🚀 Version 2.0 is here!',
  href: '/changelog',       // Optional link
  linkText: "See what's new",
  variant: 'primary',       // 'primary' | 'secondary' | 'gradient'
  dismissible: true,        // Allow users to close
};
```

When users dismiss the banner, their preference is saved in localStorage. Change the `id` to show a new announcement.

## Newsletter Strings

Customize newsletter section text in `src/config/content.ts`:

```typescript
export const content = {
  newsletter: {
    title: 'Stay in the loop',
    description: 'Get the latest updates delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    successMessage: 'Thanks for subscribing!',
    errorMessage: 'Something went wrong. Please try again.',
    privacyNote: 'We respect your privacy. Unsubscribe at any time.',
  },
};
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required: Your production URL
SITE_URL=https://your-domain.com

# Optional: Google Analytics 4
PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Form endpoints
CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
NEWSLETTER_ENDPOINT=https://api.convertkit.com/v3/forms/your-form-id/subscribe
```

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_URL` | Yes | Canonical URL for SEO, sitemap, and RSS |
| `PUBLIC_GA_ID` | No | Google Analytics 4 Measurement ID |
| `CONTACT_FORM_ENDPOINT` | No | Contact form submission URL |
| `NEWSLETTER_ENDPOINT` | No | Newsletter subscription API URL |

Variables prefixed with `PUBLIC_` are exposed to client-side code.

## Astro Configuration

The `astro.config.mjs` includes:
- MDX support for rich content
- Icon support via `astro-icon` (Lucide + Simple Icons)
- Sitemap generation with feature flag filtering
- Tailwind CSS v4 via Vite plugin

```javascript
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yoursite.com', // Update this!
  integrations: [mdx(), icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## RSS Feed

The RSS feed is automatically generated at `/rss.xml` for blog posts. The feed respects the `draft` field - draft posts are excluded.

To customize the feed, edit `src/pages/rss.xml.ts`.

## Internationalization (i18n)

The theme currently uses `en-US` locale. To change the language:

1. Update the `lang` attribute in `src/layouts/BaseLayout.astro`:
   ```html
   <html lang="id">  <!-- Change to your locale -->
   ```

2. Update date formatting in `src/lib/utils.ts`:
   ```typescript
   return new Intl.DateTimeFormat('id-ID', options).format(date);
   ```

## Next Steps

- [Customization](./03-customization.md) - Customize the site's appearance and behavior.
