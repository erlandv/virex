---
title: "Configuration"
description: "Learn how to configure Virex for your project. Covers build settings, environment variables, and deployment options."
section: "Configuration"
order: 3
draft: false
---

Virex is configured through a `virex.config.js` file in your project root. This guide covers all available options.

## Basic Configuration

A minimal configuration looks like this:

```javascript
export default {
  name: 'my-project',
};
```

Virex auto-detects most settings, but you can override them as needed.

## Build Settings

Control how your project is built:

```javascript
export default {
  name: 'my-project',
  
  // Build configuration
  buildCommand: 'npm run build',
  installCommand: 'npm ci',
  outputDirectory: 'dist',
  
  // Node.js version
  nodeVersion: '20',
};
```

### Framework Detection

Virex automatically detects popular frameworks:

- Next.js
- Astro
- Remix
- SvelteKit
- Nuxt
- And many more

Override detection with the `framework` option:

```javascript
framework: 'astro',
```

## Environment Variables

Define environment variables for your deployments:

```javascript
export default {
  name: 'my-project',
  
  env: {
    PUBLIC_API_URL: 'https://api.example.com',
  },
};
```

### Sensitive Variables

For secrets, use the CLI or dashboard instead of committing to code:

```bash
virex env add DATABASE_URL "postgres://..." --environment production
```

### Environment-Specific Variables

Different values for different environments:

```javascript
environments: {
  staging: {
    env: {
      PUBLIC_API_URL: 'https://staging-api.example.com',
    },
  },
  production: {
    env: {
      PUBLIC_API_URL: 'https://api.example.com',
    },
  },
},
```

## Deployment Settings

Configure deployment behavior:

```javascript
export default {
  name: 'my-project',
  
  // Deployment settings
  regions: ['us-east-1', 'eu-west-1'],
  
  // Health checks
  healthCheck: {
    path: '/api/health',
    interval: 30,
  },
  
  // Automatic rollback on failure
  rollback: {
    automatic: true,
  },
};
```

## Headers and Redirects

Configure HTTP headers and redirects:

```javascript
export default {
  name: 'my-project',
  
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
      ],
    },
  ],
  
  redirects: [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true,
    },
  ],
};
```

## Full Example

Here's a complete configuration example:

```javascript
export default {
  name: 'my-saas-app',
  framework: 'astro',
  
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  nodeVersion: '20',
  
  env: {
    PUBLIC_SITE_URL: 'https://myapp.com',
  },
  
  environments: {
    staging: {
      env: {
        PUBLIC_SITE_URL: 'https://staging.myapp.com',
      },
    },
  },
  
  regions: ['us-east-1'],
  
  healthCheck: {
    path: '/api/health',
    interval: 30,
  },
};
```

## Next Steps

- Learn about [Customization](/docs/customization) options
- Check the [FAQ](/docs/faq) for common questions
