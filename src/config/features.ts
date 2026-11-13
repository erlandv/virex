/**
 * Feature Flags Configuration for MarkChat
 */

import type { FeatureFlags } from '../lib/types';

export const features: FeatureFlags = {
  /** Enable blog section and /blog routes */
  blog: true,

  /** Enable documentation section and /docs routes */
  docs: true,

  /** Changelog page pruned in MarkChat */
  changelog: false,

  /** Testimonials handled in homepage and social proof sections */
  testimonials: true,

  /** Roadmap page pruned in MarkChat */
  roadmap: false,
};
