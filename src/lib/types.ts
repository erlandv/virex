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
  /** Feature flag key - item only shows if this feature is enabled */
  feature?: keyof FeatureFlags;
}

export interface NavigationCTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost';
}

export interface HeaderNavigation {
  /** Main navigation items */
  main: NavigationItem[];
  /** CTA buttons on the right side */
  cta: NavigationCTA[];
}

export interface FooterNavigation {
  /** Product-related links */
  product: NavigationItem[];
  /** Solutions/use-case links */
  solutions: NavigationItem[];
  /** Resources like docs, blog */
  resources: NavigationItem[];
  /** Company info links */
  company: NavigationItem[];
  /** Legal links */
  legal: NavigationItem[];
}

export interface Navigation {
  header: HeaderNavigation;
  footer: FooterNavigation;
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
  partnersEmail?: string;
  hours?: string;
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
  navigation: Navigation;
  features: FeatureFlags;
  announcement: AnnouncementConfig;
  content: ContentStrings;
}

/** Pricing plan configuration for PricingTable component */
export interface PricingPlan {
  /** Plan name (e.g., "Free", "Pro", "Enterprise") */
  name: string;
  /** Monthly price in dollars (null for custom pricing) */
  monthlyPrice: number | null;
  /** Custom price text for enterprise plans (e.g., "Custom", "Contact us") */
  customPrice?: string;
  /** Short description of the plan */
  description: string;
  /** List of features included in the plan */
  features: string[];
  /** Whether to highlight this plan as recommended */
  highlighted?: boolean;
  /** Badge text override (default: "Most Popular" for highlighted) */
  badge?: string;
  /** Call-to-action button configuration */
  cta: { label: string; href: string };
}

/** Dashboard-specific type definitions */

/** Project data model */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: Date;
  updatedAt: Date;
  owner: string;
}

/** Team member data model */
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar?: string;
  joinedAt: Date;
}

/** Dashboard metric data model */
export interface Metric {
  title: string;
  value: string | number;
  trend?: {
    value: number; // Percentage
    direction: 'up' | 'down';
  };
  icon: string; // Lucide icon name
  description?: string;
}

/** Chart data model for Chart.js */
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color?: string;
  }>;
}

/** User data model for dashboard */
export interface DashboardUser {
  name: string;
  email: string;
  avatar?: string;
}

/** Billing plan data model */
export interface BillingPlan {
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  nextBillingDate: Date;
}

/** Payment method data model */
export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

/** Billing history item data model */
export interface BillingHistoryItem {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}
