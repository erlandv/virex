---
title: "FAQ"
description: "Frequently asked questions about Virex. Find answers to common questions about pricing, features, and troubleshooting."
section: "Resources"
order: 5
draft: false
---

Find answers to the most common questions about Virex.

## General

### What is Virex?

Virex is a modern development platform that helps teams build, deploy, and scale applications. We handle infrastructure complexity so you can focus on building great products.

### Who is Virex for?

Virex is designed for developers and teams of all sizes—from solo indie hackers to enterprise organizations. Our platform scales with your needs.

### What frameworks does Virex support?

Virex supports all major frameworks including:

- Astro
- Next.js
- Remix
- SvelteKit
- Nuxt
- Vue
- React
- And any static site generator

We auto-detect your framework and configure builds automatically.

## Pricing

### Is there a free tier?

Yes! Our Hobby plan is free forever and includes:

- Unlimited personal projects
- 100GB bandwidth per month
- Automatic HTTPS
- Preview deployments

### How does billing work?

We bill monthly based on usage. You only pay for what you use beyond the free tier limits. See our [pricing page](/pricing) for details.

### Can I change plans anytime?

Yes, you can upgrade or downgrade at any time. Changes take effect immediately, and we prorate charges.

## Deployments

### How fast are deployments?

Most deployments complete in under 30 seconds. Build times vary based on your project size and complexity.

### Can I rollback a deployment?

Yes! Every deployment is saved, and you can rollback to any previous version instantly from the dashboard or CLI:

```bash
virex rollback --to=abc123
```

### Do you support preview deployments?

Yes, every pull request automatically gets a unique preview URL. This is enabled by default for all projects.

## Security

### Is my code secure?

Absolutely. We take security seriously:

- All data is encrypted at rest and in transit
- SOC 2 Type II certified
- Regular security audits
- No access to your source code beyond build time

### Do you support SSO?

Yes, SSO is available on Team and Enterprise plans. We support SAML 2.0 and OIDC providers.

### Where is my data stored?

By default, data is stored in US regions. Enterprise customers can choose specific regions for compliance requirements.

## Troubleshooting

### My build is failing

Common causes:

1. **Missing dependencies** — Ensure all dependencies are in `package.json`
2. **Node version mismatch** — Specify your Node version in config
3. **Environment variables** — Check that required variables are set

Run your build locally first to debug:

```bash
npm run build
```

### My site is slow

Check these common issues:

1. **Large assets** — Optimize images and use lazy loading
2. **Too many requests** — Bundle and minify your code
3. **No caching** — Configure cache headers appropriately

Use our built-in analytics to identify bottlenecks.

### I'm getting 404 errors

For single-page applications, ensure you have a fallback configured:

```javascript
export default {
  rewrites: [
    { source: '/(.*)', destination: '/index.html' },
  ],
};
```

## Still Have Questions?

- **Documentation** — Browse our [docs](/docs) for detailed guides
- **Discord** — Join our [community](https://discord.gg/virex) for help
- **Support** — Enterprise customers can contact support directly
- **Twitter** — Follow [@virex](https://twitter.com/virex) for updates
