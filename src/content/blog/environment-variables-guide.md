---
title: "The Complete Guide to Environment Variables in Modern Applications"
description: "Everything you need to know about managing environment variables—from local development to production deployments. Includes best practices and common mistakes to avoid."
publishedDate: 2025-12-01
author: "David Kim"
image: "/images/blog/env-variables.webp"
tags: ["deployment", "tutorial"]
draft: false
---

Environment variables are one of those things every developer uses but few truly master. Done right, they make your application flexible and secure. Done wrong, they become a source of bugs and security vulnerabilities.

This guide covers everything you need to know about environment variables in modern web development.

## What Are Environment Variables?

Environment variables are key-value pairs that exist outside your application code. They allow you to:

- Configure behavior without changing code
- Keep secrets out of version control
- Use different settings for different environments

A simple example:

```bash
DATABASE_URL=postgres://localhost:5432/myapp
API_KEY=sk_live_abc123
DEBUG=true
```

## Why Environment Variables Matter

### Security

Hardcoding secrets in your code is dangerous:

```javascript
// ❌ Never do this
const apiKey = "sk_live_abc123";

// ✅ Do this instead
const apiKey = process.env.API_KEY;
```

If secrets are in code, they end up in:
- Version control history (forever)
- Build artifacts
- Error logs and stack traces

Environment variables keep secrets separate from code.

### Flexibility

The same codebase should work in multiple environments:

- **Development**: Local database, debug logging
- **Staging**: Test database, production-like settings
- **Production**: Real database, optimized settings

Environment variables make this possible without code changes.

### Twelve-Factor App Methodology

The [Twelve-Factor App](https://12factor.net/) methodology recommends storing config in environment variables. This approach is now industry standard for good reason.

## Best Practices

### 1. Use a .env File for Local Development

Create a `.env` file in your project root:

```bash
# .env
DATABASE_URL=postgres://localhost:5432/myapp_dev
API_KEY=sk_test_development
DEBUG=true
```

Load it with a library like `dotenv`:

```javascript
import 'dotenv/config';
console.log(process.env.DATABASE_URL);
```

**Important**: Add `.env` to your `.gitignore`!

### 2. Provide a Template

Create a `.env.example` file that documents required variables:

```bash
# .env.example
# Copy this file to .env and fill in the values

# Database connection string
DATABASE_URL=

# API key for external service
API_KEY=

# Enable debug mode (true/false)
DEBUG=false
```

This helps new team members get started quickly.

### 3. Validate Early

Don't wait until runtime to discover missing variables:

```javascript
const required = ['DATABASE_URL', 'API_KEY'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
```

Better yet, use a validation library like `envalid` or `zod`.

### 4. Use Descriptive Names

Good naming makes configuration self-documenting:

```bash
# ❌ Unclear
URL=https://api.example.com
KEY=abc123

# ✅ Clear
PAYMENT_API_URL=https://api.stripe.com
STRIPE_SECRET_KEY=sk_live_abc123
```

### 5. Prefix Framework-Specific Variables

Many frameworks have conventions:

- **Next.js**: `NEXT_PUBLIC_` for client-side variables
- **Vite**: `VITE_` for client-side variables
- **Create React App**: `REACT_APP_` for client-side variables

Follow these conventions to avoid confusion.

## Common Mistakes

### Mistake 1: Committing Secrets

Even if you delete a secret from code, it remains in git history. If you accidentally commit a secret:

1. Rotate the secret immediately
2. Use tools like `git-filter-repo` to remove from history
3. Consider the secret compromised

### Mistake 2: Using Production Secrets Locally

Never use production credentials in development. Create separate credentials for each environment.

### Mistake 3: Exposing Server Variables to Clients

In frontend frameworks, only variables with specific prefixes are exposed to the browser. Don't work around this—it exists for security.

### Mistake 4: Not Having Defaults

For non-sensitive configuration, provide sensible defaults:

```javascript
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'info';
```

## Environment Variables in Virex

Virex makes environment variable management simple:

### Setting Variables

Add variables through the dashboard or CLI:

```bash
virex env set DATABASE_URL="postgres://..."
virex env set API_KEY="sk_live_..." --secret
```

The `--secret` flag encrypts the value and hides it in logs.

### Environment-Specific Values

Set different values for different environments:

```bash
virex env set API_URL="https://api.example.com" --production
virex env set API_URL="https://staging-api.example.com" --preview
```

### Preview Deployments

Preview deployments automatically inherit from your preview environment, so you can test with appropriate (non-production) credentials.

## Wrapping Up

Environment variables are a fundamental tool for building secure, flexible applications. The key principles:

1. Never commit secrets to version control
2. Use different values for different environments
3. Validate configuration at startup
4. Document required variables

Have questions about environment variables in Virex? Check our [documentation](/docs/configuration) or reach out to support.
