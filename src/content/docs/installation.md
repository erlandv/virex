---
title: "Installation"
description: "Get Virex set up in your project in under 5 minutes. This guide covers installation, authentication, and your first deployment."
section: "Getting Started"
order: 2
draft: false
---

Getting started with Virex takes just a few minutes. This guide will walk you through installation, authentication, and deploying your first project.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed on your machine
- A **Virex account** (sign up at [virex.example.com](https://virex.example.com))
- **Git** installed and configured

## Install the CLI

The Virex CLI is the primary way to interact with the platform. Install it globally:

```bash
npm install -g @virex/cli
```

Verify the installation:

```bash
virex --version
```

## Authenticate

Log in to your Virex account:

```bash
virex login
```

This opens your browser for authentication. Once complete, you're ready to create projects.

## Initialize Your Project

Navigate to your project directory and initialize Virex:

```bash
cd your-project
virex init
```

This creates a `virex.config.js` file with sensible defaults:

```javascript
export default {
  name: 'your-project',
  framework: 'auto', // Virex auto-detects your framework
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
};
```

## Deploy

Deploy your project with a single command:

```bash
virex deploy
```

That's it! Virex will:

1. Build your project
2. Upload the artifacts
3. Deploy to a preview URL
4. Return the live URL

## Next Steps

Now that you're set up:

- Learn about [Configuration](/docs/configuration) options
- Set up [environments](/docs/configuration#environments) for staging and production
- Explore [Customization](/docs/customization) options

## Troubleshooting

### "Command not found: virex"

Make sure npm's global bin directory is in your PATH. Run `npm bin -g` to find the location.

### Authentication Issues

Try logging out and back in:

```bash
virex logout
virex login
```

### Build Failures

Check that your build command works locally before deploying:

```bash
npm run build
```

Still stuck? Join our [Discord](https://discord.gg/virex) for help from the community.
