/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL: string;
  readonly SITE_NAME: string;
  readonly SITE_DESCRIPTION: string;
  readonly SITE_AUTHOR: string;
  readonly PUBLIC_APP_URL: string;
  readonly PUBLIC_BRIDGE_API_URL: string;
  readonly ADMIN_CMS_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Shared editor hook used by existing dashboard save handlers. */
interface Window {
  markchatReadHeroMedia?: (
    page: import('./lib/types').HeroMediaPage
  ) => Partial<import('./lib/types').HeroMediaSettings>;
}
