/**
 * Marketing asset manifest. Verified CMS media overrides bundled screenshots.
 * Never label conceptual fallbacks as actual Core captures.
 */
import capturedJson from './captured-product-assets.json';

interface CapturedManifest {
  verified: boolean;
  captureVersion: number;
  inbox: Record<'light' | 'dark', string | null>;
  mpesa: Record<'light' | 'dark', string | null>;
  markcopilot: Record<'light' | 'dark', string | null>;
}
const captured = capturedJson as CapturedManifest;

export type ProductWorkflow = 'inbox' | 'mpesa' | 'markcopilot';
export type ProductTheme = 'light' | 'dark';
export type ProductMediaSource = 'cms' | 'captured' | 'fallback';

export interface CmsProductMediaOverride {
  status?: string;
  mediaUrl?: string | null;
  mediaAlt?: string | null;
  theme?: ProductTheme;
}
export interface ProductMedia {
  workflow: ProductWorkflow;
  theme: ProductTheme;
  source: ProductMediaSource;
  src: string | null;
  alt: string;
}

export const productWorkflows: Record<ProductWorkflow, { title: string; description: string }> = {
  inbox: {
    title: 'Unified Inbox',
    description: 'One workspace for supported customer conversations and team collaboration.',
  },
  mpesa: {
    title: 'M-Pesa /stk Checkout',
    description: 'Illustrative merchant-verified payment workflow. No live transaction is shown.',
  },
  markcopilot: {
    title: 'Markcopilot AI',
    description: 'Human-reviewed suggested replies with English and Kiswahili examples.',
  },
};

export const communityIllustrations = [
  { id: 'unified-inbox', title: 'Unified Inbox', path: '/media/illustrations/unified-inbox.svg' },
  { id: 'mpesa-stk', title: 'In-Chat M-Pesa', path: '/media/illustrations/mpesa-stk.svg' },
  { id: 'markcopilot', title: 'Markcopilot AI', path: '/media/illustrations/markcopilot.svg' },
  {
    id: 'automation-routing',
    title: 'Automation & Routing',
    path: '/media/illustrations/automation-routing.svg',
  },
  { id: 'contact-crm', title: 'Contact CRM', path: '/media/illustrations/contact-crm.svg' },
  { id: 'help-center', title: 'Help Center', path: '/media/illustrations/help-center.svg' },
  {
    id: 'analytics-webhooks',
    title: 'Analytics & Webhooks',
    path: '/media/illustrations/analytics-webhooks.svg',
  },
] as const;

/**
 * Bound media URLs to our origin, or an explicitly approved HTTPS CMS media host.
 * The public asset layer does not fetch arbitrary remote media URLs.
 */
function safeMediaUrl(candidate: string | null | undefined): string | null {
  if (!candidate || typeof candidate !== 'string') return null;
  if (
    candidate.startsWith('/') &&
    !candidate.startsWith('//') &&
    !candidate.includes('\\') &&
    !candidate.includes('?')
  ) {
    return candidate;
  }
  try {
    const url = new URL(candidate);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    const approved = [new URL(import.meta.env.SITE_URL || 'https://markchat.co.ke').hostname];
    const mediaHost = import.meta.env.PUBLIC_CMS_MEDIA_HOST;
    if (mediaHost) {
      try {
        approved.push(new URL(mediaHost).hostname);
      } catch {
        /* ignore invalid host */
      }
    }
    return approved.includes(url.hostname) ? url.href : null;
  } catch {
    return null;
  }
}

export function resolveProductAsset(
  workflow: ProductWorkflow,
  theme: ProductTheme,
  cmsOverride?: CmsProductMediaOverride | null
): ProductMedia {
  const fallbackAlt =
    productWorkflows[workflow].title + ': product screenshot pending verification';
  if (cmsOverride?.status === 'published' && (!cmsOverride.theme || cmsOverride.theme === theme)) {
    const src = safeMediaUrl(cmsOverride.mediaUrl);
    if (src) {
      return {
        workflow,
        theme,
        src,
        source: 'cms',
        alt: cmsOverride.mediaAlt?.trim() || productWorkflows[workflow].title,
      };
    }
  }
  const bundle = captured[workflow][theme];
  if (captured.verified && bundle && safeMediaUrl(bundle)) {
    return {
      workflow,
      theme,
      src: bundle,
      source: 'captured',
      alt: productWorkflows[workflow].title + ' in ' + theme + ' mode (synthetic demo data)',
    };
  }
  return { workflow, theme, src: null, source: 'fallback', alt: fallbackAlt };
}
