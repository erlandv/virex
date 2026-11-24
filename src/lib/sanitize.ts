/**
 * Allowlist-Based HTML Sanitizer & URL Validator
 *
 * Designed to prevent stored XSS, script injection, and invalid canonical URLs
 * in CMS-managed legal and policy pages without relying on insecure eval or unsafe parsers.
 */

// Permitted HTML tags in rich legal documents
const ALLOWED_TAGS = new Set([
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'strike',
  'ul',
  'ol',
  'li',
  'blockquote',
  'code',
  'pre',
  'hr',
  'br',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'a',
  'span',
  'div',
  'section',
]);

// Permitted attributes by tag
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'target', 'rel', 'class', 'id']),
  p: new Set(['class', 'id']),
  span: new Set(['class', 'id']),
  div: new Set(['class', 'id']),
  section: new Set(['class', 'id']),
  h1: new Set(['class', 'id']),
  h2: new Set(['class', 'id']),
  h3: new Set(['class', 'id']),
  h4: new Set(['class', 'id']),
  h5: new Set(['class', 'id']),
  h6: new Set(['class', 'id']),
  table: new Set(['class', 'id']),
  th: new Set(['class', 'id', 'scope', 'colspan', 'rowspan']),
  td: new Set(['class', 'id', 'colspan', 'rowspan']),
  tr: new Set(['class', 'id']),
  ul: new Set(['class', 'id']),
  ol: new Set(['class', 'id', 'start', 'type']),
  li: new Set(['class', 'id']),
  blockquote: new Set(['class', 'id', 'cite']),
  code: new Set(['class', 'id']),
  pre: new Set(['class', 'id']),
};

/**
 * Strips dangerous HTML, scripts, inline event handlers, and data/javascript URIs.
 */
export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return '';

  // 1. Remove script, style, iframe, object, embed, form, input tags and their contents
  let sanitized = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');

  // 2. Remove all on* event handlers (onclick, onerror, onload, onmouseover, etc.)
  sanitized = sanitized.replace(/\s+on[a-z]+\s*=\s*(['"]).*?\1/gi, '');
  sanitized = sanitized.replace(/\s+on[a-z]+\s*=\s*[^>\s]+/gi, '');

  // 3. Block javascript:, vbscript:, and data: URI schemes in href and src
  sanitized = sanitized.replace(
    /\s+(href|src)\s*=\s*(['"])\s*(?:javascript|vbscript|data):.*?\2/gi,
    ' href="#"'
  );
  sanitized = sanitized.replace(
    /\s+(href|src)\s*=\s*(?:javascript|vbscript|data):[^\s>]+/gi,
    ' href="#"'
  );

  // 4. Validate tags and sanitize attributes
  sanitized = sanitized.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, tag, attrString) => {
    const lowerTag = tag.toLowerCase();

    // If tag is not in allowlist, strip the tag but keep text
    if (!ALLOWED_TAGS.has(lowerTag)) {
      return '';
    }

    // Closing tags
    if (match.startsWith('</')) {
      return `</${lowerTag}>`;
    }

    // Process attributes
    const allowedForTag = ALLOWED_ATTRS[lowerTag] || new Set();
    const cleanAttrs: string[] = [];

    // Match attribute pairs: key="value" or key='value' or key=value
    const attrRegex = /([a-zA-Z0-9_-]+)(?:\s*=\s*(?:'([^']*)'|"([^"]*)"|([^\s>]+)))?/g;
    let attrMatch: RegExpExecArray | null;

    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';

      // Check if attribute is allowed
      if (allowedForTag.has(attrName)) {
        // Restrict link destinations before interpolating any CMS-supplied HTML.
        // Reject entity-encoded schemes, protocol-relative URLs and backslashes.
        let validatedValue = attrValue;
        if (lowerTag === 'a' && attrName === 'href') {
          const candidate = attrValue.trim();
          if (candidate === '#' || /^#[a-zA-Z0-9_-]+$/.test(candidate)) {
            validatedValue = candidate;
          } else if (/^\/(?!\/)/.test(candidate) && !candidate.includes('\\')) {
            validatedValue = candidate;
          } else if (/^https?:\/\//i.test(candidate) && !/[\\<>\u0000-\u001f]/.test(candidate)) {
            try {
              const parsedUrl = new URL(candidate);
              validatedValue = ['https:', 'http:'].includes(parsedUrl.protocol) ? parsedUrl.href : '#';
            } catch {
              validatedValue = '#';
            }
          } else {
            validatedValue = '#';
          }
        }
        // Additional check for <a> target and rel
        if (lowerTag === 'a' && attrName === 'target' && attrValue === '_blank') {
          cleanAttrs.push('target="_blank"');
          cleanAttrs.push('rel="noopener noreferrer"');
        } else if (attrName !== 'rel' || lowerTag !== 'a') {
          // Escape quotes in attribute value
          const safeVal = validatedValue.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          cleanAttrs.push(`${attrName}="${safeVal}"`);
        }
      }
    }

    const attrOutput = cleanAttrs.length > 0 ? ` ${cleanAttrs.join(' ')}` : '';
    return `<${lowerTag}${attrOutput}>`;
  });

  return sanitized;
}

/**
 * Validates slug format: lowercase, alphanumeric and hyphens only, no leading/trailing hyphen.
 */
export function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 2 && slug.length <= 100;
}

/**
 * Formats string into valid URL slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Safely validates canonical URL format
 */
export function validateCanonicalUrl(urlStr: string, allowedHost?: string): string | null {
  if (!urlStr || typeof urlStr !== 'string') return null;
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    if (allowedHost && parsed.hostname !== allowedHost && !parsed.hostname.endsWith('.' + allowedHost)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}
