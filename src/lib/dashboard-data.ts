/**
 * Dashboard Sample Data
 *
 * @description
 * Provides sample data functions for dashboard demonstration.
 * This data is fictional and should be replaced with real API calls.
 */

import type {
  Project,
  TeamMember,
  Metric,
  ChartData,
  BillingPlan,
  PaymentMethod,
  BillingHistoryItem,
} from './types';

/**
 * Get sample projects list
 */
export function getProjects(): Project[] {
  return [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-12-20'),
      owner: 'Sarah Mitchell',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'iOS and Android native applications',
      status: 'active',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-12-22'),
      owner: 'James Chen',
    },
    {
      id: '3',
      name: 'API Integration',
      description: 'Third-party service integrations',
      status: 'active',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-12-18'),
      owner: 'Maria Rodriguez',
    },
    {
      id: '4',
      name: 'Database Migration',
      description: 'Move to new database infrastructure',
      status: 'archived',
      createdAt: new Date('2023-11-01'),
      updatedAt: new Date('2024-11-30'),
      owner: 'David Kim',
    },
    {
      id: '5',
      name: 'Security Audit',
      description: 'Comprehensive security review',
      status: 'active',
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date('2024-12-23'),
      owner: 'Sarah Mitchell',
    },
    {
      id: '6',
      name: 'Performance Optimization',
      description: 'Improve application performance',
      status: 'active',
      createdAt: new Date('2024-05-12'),
      updatedAt: new Date('2024-12-21'),
      owner: 'James Chen',
    },
    {
      id: '7',
      name: 'Documentation Update',
      description: 'Update all technical documentation',
      status: 'draft',
      createdAt: new Date('2024-06-20'),
      updatedAt: new Date('2024-12-15'),
      owner: 'Maria Rodriguez',
    },
    {
      id: '8',
      name: 'User Analytics',
      description: 'Implement analytics tracking',
      status: 'active',
      createdAt: new Date('2024-07-08'),
      updatedAt: new Date('2024-12-19'),
      owner: 'David Kim',
    },
    {
      id: '9',
      name: 'Email Campaign',
      description: 'Marketing email automation',
      status: 'draft',
      createdAt: new Date('2024-08-14'),
      updatedAt: new Date('2024-12-10'),
      owner: 'Sarah Mitchell',
    },
    {
      id: '10',
      name: 'Customer Portal',
      description: 'Self-service customer portal',
      status: 'active',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-12-24'),
      owner: 'James Chen',
    },
    {
      id: '11',
      name: 'Payment Gateway',
      description: 'Integrate new payment provider',
      status: 'archived',
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2024-10-30'),
      owner: 'Maria Rodriguez',
    },
    {
      id: '12',
      name: 'Backup System',
      description: 'Automated backup solution',
      status: 'active',
      createdAt: new Date('2024-10-20'),
      updatedAt: new Date('2024-12-22'),
      owner: 'David Kim',
    },
  ];
}

/**
 * Get a single project by ID
 */
export function getProject(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}

/**
 * Get sample team members
 */
export function getTeamMembers(): TeamMember[] {
  return [
    {
      id: '1',
      name: 'Sarah Mitchell',
      email: 'sarah@markchat.co.ke',
      role: 'owner',
      joinedAt: new Date('2023-01-15'),
    },
    {
      id: '2',
      name: 'James Chen',
      email: 'james@markchat.co.ke',
      role: 'admin',
      joinedAt: new Date('2023-03-20'),
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'maria@markchat.co.ke',
      role: 'admin',
      joinedAt: new Date('2023-06-10'),
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@markchat.co.ke',
      role: 'member',
      joinedAt: new Date('2023-09-05'),
    },
    {
      id: '5',
      name: 'Alex Johnson',
      email: 'alex@markchat.co.ke',
      role: 'member',
      joinedAt: new Date('2024-02-14'),
    },
  ];
}

/**
 * Get dashboard metrics
 */
export function getMetrics(): Metric[] {
  return [
    {
      title: 'Total Projects',
      value: 24,
      trend: {
        value: 12,
        direction: 'up',
      },
      icon: 'folder',
      description: 'Active and archived projects',
    },
    {
      title: 'Active Users',
      value: '1,234',
      trend: {
        value: 8,
        direction: 'up',
      },
      icon: 'users',
      description: 'Monthly active users',
    },
    {
      title: 'Revenue',
      value: '$12,450',
      trend: {
        value: 15,
        direction: 'up',
      },
      icon: 'dollar-sign',
      description: 'Monthly recurring revenue',
    },
    {
      title: 'API Calls',
      value: '45.2K',
      trend: {
        value: 3,
        direction: 'down',
      },
      icon: 'activity',
      description: 'Total API requests this month',
    },
  ];
}

/**
 * Get chart data for overview page
 */
export function getChartData(): ChartData {
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Projects Created',
        data: [3, 5, 2, 8, 6, 4, 7],
        color: '#8b5cf6',
      },
    ],
  };
}

/**
 * Get current billing plan
 */
export function getBillingPlan(): BillingPlan {
  return {
    name: 'Professional',
    price: 49,
    interval: 'month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'Team collaboration',
      'API access',
    ],
    nextBillingDate: new Date('2025-01-25'),
  };
}

/**
 * Get payment method
 */
export function getPaymentMethod(): PaymentMethod {
  return {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2026,
  };
}

/**
 * Get billing history
 */
export function getBillingHistory(): BillingHistoryItem[] {
  return [
    {
      id: '1',
      date: new Date('2024-12-25'),
      description: 'Professional Plan - December 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      date: new Date('2024-11-25'),
      description: 'Professional Plan - November 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '3',
      date: new Date('2024-10-25'),
      description: 'Professional Plan - October 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '4',
      date: new Date('2024-09-25'),
      description: 'Professional Plan - September 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '5',
      date: new Date('2024-08-25'),
      description: 'Professional Plan - August 2024',
      amount: 49,
      status: 'paid',
      invoiceUrl: '#',
    },
  ];
}
