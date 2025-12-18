# Deployment

Build your site for production:

```bash
npm run build
```

This generates a static site in the `dist/` folder.

## Vercel

### Option 1: CLI

```bash
npm i -g vercel
vercel
```

### Option 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Astro settings

### Error Pages

Create `vercel.json` for custom error pages:

```json
{
  "routes": [
    { "handle": "error" },
    { "status": 403, "src": "/(.*)", "dest": "/403" },
    { "status": 500, "src": "/(.*)", "dest": "/500" }
  ]
}
```

## Netlify

### Option 1: CLI

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 2: Git Integration

1. Connect repository in [Netlify Dashboard](https://app.netlify.com/)
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Netlify Forms

The contact form supports Netlify Forms out of the box:

```astro
<ContactForm netlify formName="contact" />
```

### Error Pages

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

## Cloudflare Pages

1. Connect repository in [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Deploy

### Error Pages

Create `public/_redirects`:

```
# 404 handling
/*    /404    404
```

For 403/500, configure in Cloudflare dashboard or use Workers.

## Static Hosting

Upload the `dist/` folder to any static host:

- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Surge
- Any web server

### Server Configuration

For Apache or Nginx, you'll need to configure:
- Error page routing (403, 404, 500)
- Gzip compression
- Static asset caching

<details>
<summary>Apache (.htaccess) example</summary>

Create `public/.htaccess`:

```apache
ErrorDocument 403 /403
ErrorDocument 404 /404
ErrorDocument 500 /500

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
</IfModule>
```
</details>

<details>
<summary>Nginx example</summary>

```nginx
server {
    listen 80;
    server_name yoursite.com;
    root /var/www/dist;

    error_page 404 /404.html;
    
    location / {
        try_files $uri $uri/ /404.html;
    }

    location ~* \.(png|jpg|svg|css|js)$ {
        expires 1y;
    }
}
```
</details>

## Environment Variables

Set these in your hosting provider's dashboard:

| Variable | Purpose |
|----------|---------|
| `SITE_URL` | Canonical URL for SEO |
| `PUBLIC_GA_ID` | Google Analytics (optional) |

## Pre-deployment Checklist

### Configuration
- [ ] Update `site` in `astro.config.mjs`
- [ ] Update all values in `src/config/site.ts` (name, description, url, author)
- [ ] Update `src/config/contact.ts` with your contact info
- [ ] Configure feature flags in `src/config/features.ts`

### Branding
- [ ] Replace `public/logo.svg` with your logo
- [ ] Replace `public/favicon.svg` with your favicon
- [ ] Replace `public/images/og-image.png` (1200x630px recommended)
- [ ] Update social links in `src/config/site.ts`

### Content
- [ ] Remove or replace sample blog posts
- [ ] Remove or replace sample testimonials
- [ ] Update documentation content
- [ ] Review and update legal pages (privacy, terms)

### Forms & Integrations
- [ ] Configure contact form backend (Netlify, Formspree, or custom)
- [ ] Set up newsletter endpoint if using newsletter feature
- [ ] Add Google Analytics ID if needed

### Testing
- [ ] Test all pages locally with `npm run preview`
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Test RSS feed at `/rss.xml`
- [ ] Check Open Graph with [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Validate JSON-LD with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test on mobile devices
- [ ] Verify dark mode works correctly

## Performance Tips

1. **Images**: Use WebP/AVIF formats, optimize with tools like Squoosh
2. **Fonts**: The theme uses system fonts by default (no external requests)
3. **JavaScript**: Minimal JS, only for essential interactions
4. **CSS**: Tailwind purges unused styles automatically
