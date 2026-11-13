/**
 * Dashboard Navigation Configuration for MarkChat Single-Admin Website CMS
 *
 * Defines the 6 core CMS routes:
 * 1. Overview / Command Center (/dashboard)
 * 2. Pricing & Plan Feature Matrix (/dashboard/pricing)
 * 3. Blog & Resources (/dashboard/blog)
 * 4. Careers & Applicants (/dashboard/careers)
 * 5. FAQs Manager (/dashboard/faqs)
 * 6. Inbound Leads & Demo Requests (/dashboard/leads)
 */

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string; // Lucide icon name without prefix
  children?: DashboardNavItem[];
}

export interface DashboardNavSection {
  title?: string;
  items: DashboardNavItem[];
}

export const dashboardNavigation: DashboardNavSection[] = [
  {
    title: 'CMS Administration',
    items: [
      {
        label: 'Command Center',
        href: '/dashboard',
        icon: 'layout-dashboard',
      },
      {
        label: 'Pricing & Plans',
        href: '/dashboard/pricing',
        icon: 'credit-card',
      },
      {
        label: 'Blog & Articles',
        href: '/dashboard/blog',
        icon: 'file-text',
      },
      {
        label: 'Careers & Jobs',
        href: '/dashboard/careers',
        icon: 'briefcase',
      },
      {
        label: 'Integrations',
        href: '/dashboard/integrations',
        icon: 'blocks',
      },
      {
        label: 'FAQs',
        href: '/dashboard/faqs',
        icon: 'help-circle',
      },
      {
        label: 'Inbound Leads',
        href: '/dashboard/leads',
        icon: 'inbox',
      },
    ],
  },
];
