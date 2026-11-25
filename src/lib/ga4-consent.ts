/**
 * Consent-gated GA4. No Google tracking requests occur before explicit analytics opt-in.
 * Consent Mode v2 is denied by default. Advertising consent remains denied.
 */
import { getConsent } from './consent-manager';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID || '';
const validId = /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : '';
let loaded = false;

function initializeQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
}

function updateConsent() {
  if (!validId) return;
  const approved = getConsent()?.categories.analytics === true;
  Object.assign(window, { ['ga-disable-' + validId]: !approved });
  window.gtag('consent', 'update', {
    analytics_storage: approved ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  if (!approved || loaded) return;
  loaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(validId);
  document.head.appendChild(script);
  window.gtag('js', new Date());
  window.gtag('config', validId, { anonymize_ip: true, send_page_view: true });
}

if (typeof window !== 'undefined' && validId) {
  initializeQueue();
  updateConsent();
  window.addEventListener('markchat:consent-updated', updateConsent);
  window.addEventListener('storage', (event) => {
    if (event.key === 'markchat_cookie_consent_v1') updateConsent();
  });
}
