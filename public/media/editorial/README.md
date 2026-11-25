# MarkChat Editorial Hero Media

This folder is filled from the supplied `markchat-hero-media-package.zip` asset archive.

Desktop + mobile art-directed image variants:
- `social-ecosystem-hand-{desktop,mobile}.webp`: Homepage and Integrations; illustrated platform logos, not verified integrations or partnerships.
- `ai-whatsapp-bot-concept-{desktop,mobile}.webp`: Markcopilot; conceptual assistant artwork, not a screenshot.
- `questions-support-portrait-{desktop,mobile}.webp`: Features and Solutions; stock-style concept, not an identified customer or staff member.
- About: no default photo; warm Stone canvas until an approved organization photograph is uploaded.

The other supplied images are included in the archive for reference, NOT published by default. They show third-party identities, brands, social-media UI mockups or unverified performance claims.

Extract the archive into the repository so that `public/media/editorial/` exists, then rebuild and redeploy. The renderer checks bundled file existence and silently preserves the warm Stone/Charcoal background when files are missing. Do not treat personal browser-local CMS edits as published content unless the CMS bridge supports and persists the corresponding endpoint.

All CMS image URLs must pass `src/lib/hero-media.ts` sanitization. File upload expects authenticated CMS bridge POST `/api/admin/cms/media`; never add private credentials to the browser environment.
