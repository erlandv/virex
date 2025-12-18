---
title: "Customization"
description: "Customize Virex to fit your workflow. Learn about themes, plugins, and advanced configuration options."
section: "Configuration"
order: 4
draft: false
---

Virex is designed to be flexible. This guide covers how to customize the platform to fit your team's workflow.

## Dashboard Themes

Personalize your Virex dashboard experience:

```javascript
export default {
  name: 'my-project',
  
  dashboard: {
    theme: 'dark', // 'light', 'dark', or 'system'
    accentColor: '#6366f1',
  },
};
```

## Custom Domains

Connect your own domain to your deployments:

### Via CLI

```bash
virex domains add myapp.com --environment production
```

### Via Configuration

```javascript
environments: {
  production: {
    domains: ['myapp.com', 'www.myapp.com'],
  },
},
```

Virex automatically provisions SSL certificates for custom domains.

## Build Plugins

Extend the build process with plugins:

```javascript
export default {
  name: 'my-project',
  
  plugins: [
    '@virex/plugin-analytics',
    '@virex/plugin-sentry',
    ['@virex/plugin-custom', { option: 'value' }],
  ],
};
```

### Popular Plugins

| Plugin | Description |
|--------|-------------|
| `@virex/plugin-analytics` | Built-in analytics dashboard |
| `@virex/plugin-sentry` | Error tracking integration |
| `@virex/plugin-lighthouse` | Automated performance audits |
| `@virex/plugin-preview` | Enhanced preview deployments |

## Notifications

Configure where deployment notifications are sent:

```javascript
export default {
  name: 'my-project',
  
  notifications: {
    slack: {
      webhook: process.env.SLACK_WEBHOOK,
      events: ['deployment.success', 'deployment.failure'],
    },
    email: {
      recipients: ['team@example.com'],
      events: ['deployment.failure'],
    },
  },
};
```

## Team Permissions

Control who can do what in your project:

```javascript
export default {
  name: 'my-project',
  
  team: {
    roles: {
      developer: {
        deploy: ['staging'],
        viewLogs: true,
      },
      admin: {
        deploy: ['staging', 'production'],
        manageTeam: true,
        viewLogs: true,
      },
    },
  },
};
```

## Monorepo Support

For monorepo setups, specify the root directory:

```javascript
export default {
  name: 'frontend-app',
  rootDirectory: 'apps/frontend',
};
```

Or use workspace detection:

```bash
virex init --workspace apps/frontend
```

## CI/CD Integration

Integrate Virex into your existing CI/CD pipeline:

### GitHub Actions

```yaml
- name: Deploy to Virex
  uses: virex/deploy-action@v2
  with:
    token: ${{ secrets.VIREX_TOKEN }}
    environment: production
```

### Generic CI

```bash
VIREX_TOKEN=$TOKEN virex deploy --environment production
```

## Advanced: Custom Build Image

For specialized build requirements:

```javascript
export default {
  name: 'my-project',
  
  build: {
    image: 'node:20-alpine',
    commands: [
      'apk add --no-cache python3',
      'npm ci',
      'npm run build',
    ],
  },
};
```

## Next Steps

- Check the [FAQ](/docs/faq) for common questions
- Join our [Discord](https://discord.gg/virex) for community support
