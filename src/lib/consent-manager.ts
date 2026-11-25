/**
 * MarkChat Centralized Privacy & Cookie Consent Manager
 *
 * Implements strict privacy-by-design, prevents race conditions,
 * enforces affirmative opt-in consent for non-essential categories,
 * and manages user preference revocation.
 */

export type ConsentCategory = 'necessary' | 'preferences' | 'analytics' | 'marketing';

export interface ConsentCategories {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentRecord {
  version: string;
  status: 'accepted_all' | 'rejected_non_essential' | 'custom';
  timestamp: string;
  categories: ConsentCategories;
}

export const CONSENT_POLICY_VERSION = '2026.1';
export const CONSENT_STORAGE_KEY = 'markchat_cookie_consent_v1';

/**
 * Retrieves the currently saved consent record from localStorage, or null if none exists.
 */
export function getConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: ConsentRecord = JSON.parse(raw);
    if (parsed && parsed.categories && typeof parsed.categories.necessary === 'boolean') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Saves or updates user consent preferences and broadcasts an event.
 */
export function saveConsent(
  categories: Partial<ConsentCategories>,
  status: ConsentRecord['status'] = 'custom'
): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_POLICY_VERSION,
    status,
    timestamp: new Date().toISOString(),
    categories: {
      necessary: true,
      preferences: Boolean(categories.preferences),
      analytics: Boolean(categories.analytics),
      marketing: Boolean(categories.marketing),
    },
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
      window.dispatchEvent(
        new CustomEvent('markchat:consent-updated', {
          detail: { consent: record },
        })
      );
    } catch (e) {
      console.warn('[ConsentManager] Storage write failed', e);
    }
  }

  return record;
}

/**
 * Accepts all categories (necessary, preferences, analytics, marketing).
 */
export function acceptAll(): ConsentRecord {
  return saveConsent(
    {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    },
    'accepted_all'
  );
}

/**
 * Rejects non-essential categories (retaining strictly necessary only).
 */
export function rejectNonEssential(): ConsentRecord {
  return saveConsent(
    {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    },
    'rejected_non_essential'
  );
}

/**
 * Checks whether affirmative consent has been granted for a specific category.
 */
export function hasConsentFor(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  const record = getConsent();
  if (!record) return false;
  return Boolean(record.categories[category]);
}

/**
 * Resets user consent to unconfigured state (re-prompting the banner).
 */
export function resetConsent(): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      window.dispatchEvent(
        new CustomEvent('markchat:consent-updated', {
          detail: { consent: null },
        })
      );
    } catch (e) {
      console.warn('[ConsentManager] Reset failed', e);
    }
  }
}

/**
 * Triggers opening the cookie preferences modal.
 */
export function openConsentSettings(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('markchat:open-cookie-settings'));
  }
}
