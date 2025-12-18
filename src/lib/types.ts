/**
 * Type Definitions for Site Configuration
 *
 * @description
 * TypeScript interfaces used across the site configuration.
 * These types are separated from config values for better maintainability.
 */

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLinks {
  twitter?: string;
  github?: string;
  discord?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ContactInfo {
  email: string;
  supportEmail?: string;
  salesEmail?: string;
  address: Address;
}

export interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export interface ContactFAQ {
  question: string;
  answer: string;
}

export interface LegalConfig {
  privacyEmail: string;
  legalEmail: string;
  lastUpdated: string;
}

export interface FeatureFlags {
  blog: boolean;
  docs: boolean;
  changelog: boolean;
  testimonials: boolean;
  roadmap: boolean;
}

export interface AnnouncementConfig {
  enabled: boolean;
  id: string;
  text: string;
  href?: string;
  linkText?: string;
  variant: 'primary' | 'secondary' | 'gradient';
  dismissible: boolean;
}

export interface NewsletterStrings {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
  errorMessage: string;
  privacyNote: string;
}

export interface ContentStrings {
  newsletter: NewsletterStrings;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: string;
  logo: string;
  ogImage: string;
  contact: ContactInfo;
  legal: LegalConfig;
  social: SocialLinks;
  navigation: {
    main: NavigationItem[];
  };
  features: FeatureFlags;
  announcement: AnnouncementConfig;
  content: ContentStrings;
}
