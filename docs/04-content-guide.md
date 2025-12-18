# Content Guide

Content is managed through Astro's Content Collections. All content lives in `src/content/` as Markdown or MDX files.

## Blog Posts

Create files in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description for SEO and previews"
publishedDate: 2025-01-15
author: "Your Name"
image: "/images/blog/post-image.jpg"  # Optional
tags: ["product", "update"]
draft: false
---

Your content here...
```

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | SEO description |
| `publishedDate` | date | ✅ | Publication date |
| `author` | string | ✅ | Author name |
| `image` | string | ❌ | Cover image path |
| `tags` | string[] | ❌ | Post tags (default: []) |
| `draft` | boolean | ❌ | Hide from listings (default: false) |

### Features

- **Pagination**: Posts are paginated at `/blog/page/2`, `/blog/page/3`, etc.
- **Tag filtering**: Filter by tag at `/blog/tag/[tag-name]`
- **Reading time**: Automatically calculated based on word count
- **RSS feed**: Published posts appear in `/rss.xml`

## Documentation

Create files in `src/content/docs/`:

```markdown
---
title: "Page Title"
description: "Page description for SEO"
section: "Getting Started"
order: 1
draft: false
---

Your documentation content...
```

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Page title |
| `description` | string | ✅ | SEO description |
| `section` | string | ✅ | Sidebar section name |
| `order` | number | ❌ | Sort order within section (default: 0) |
| `draft` | boolean | ❌ | Hide from sidebar (default: false) |

The sidebar is auto-generated from `section` and `order` fields. Pages with the same `section` are grouped together.

## Changelog

Create files in `src/content/changelog/`:

```markdown
---
version: "2.0.0"
date: 2025-01-15
title: "Major Release"
type: "major"
draft: false
---

## What's New

- New feature one
- New feature two

## Bug Fixes

- Fixed issue with...
```

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ | Version number |
| `date` | date | ✅ | Release date |
| `title` | string | ✅ | Release title |
| `type` | enum | ✅ | `major`, `minor`, or `patch` |
| `draft` | boolean | ❌ | Hide from listing (default: false) |

## Testimonials

Create files in `src/content/testimonials/`:

```markdown
---
quote: "This product changed everything for us."
author: "Jane Doe"
role: "CTO"
company: "Acme Inc"
avatar: "/images/testimonials/jane.jpg"  # Optional
featured: true
order: 1
draft: false
---
```

### Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `quote` | string | ✅ | Testimonial text |
| `author` | string | ✅ | Person's name |
| `role` | string | ✅ | Job title |
| `company` | string | ✅ | Company name |
| `avatar` | string | ❌ | Avatar image path |
| `featured` | boolean | ❌ | Mark as featured testimonial (default: false) |
| `order` | number | ❌ | Sort order (default: 0) |
| `draft` | boolean | ❌ | Hide from listings (default: false) |

## Draft Content

Set `draft: true` in any content file to hide it from:
- Listing pages
- Navigation/sidebar
- RSS feed
- Sitemap

Draft content is still accessible via direct URL during development.

## Images

Store images in `public/images/`:

```
public/images/
├── blog/           # Blog post images
├── team/           # Team member photos
├── testimonials/   # Testimonial avatars
└── og-image.png    # Default Open Graph image
```

Reference images with absolute paths:

```markdown
![Alt text](/images/blog/my-image.jpg)
```

## MDX Support

All content collections support MDX. You can import and use components:

```mdx
---
title: "Interactive Post"
---

import { Chart } from '@/components/Chart';

Here's an interactive chart:

<Chart data={[1, 2, 3, 4, 5]} />
```

## Content Tips

### Organizing Blog Posts

- Use descriptive filenames: `my-post-title.md` becomes `/blog/my-post-title`
- Tags are case-sensitive: `React` and `react` are different tags
- Future-dated posts are still published (no scheduling)

### Documentation Structure

The sidebar is auto-generated based on `section` and `order` fields:
- Pages with the same `section` are grouped together
- Lower `order` values appear first
- Sections are sorted by the minimum `order` of their pages

### Testimonials Display

Testimonials are sorted by `order` field (ascending). The `featured` field can be used for custom filtering in your pages if needed.

## Next Steps

- [Components](./05-components.md) - Learn how to create reusable components.
