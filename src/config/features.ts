/**
 * Feature Flags Configuration
 *
 * @description
 * Toggle features on/off to customize which sections are enabled.
 * These flags control navigation visibility and section rendering.
 */

import type { FeatureFlags } from '../lib/types';

/** Feature flags to enable/disable site sections */
export const features: FeatureFlags = {
  /** Enable blog section and /blog routes */
  blog: true,

  /** Enable documentation section and /docs routes */
  docs: true,

  /** Enable changelog section and /changelog route */
  changelog: true,

  /** Enable testimonials section and /testimonials route */
  testimonials: true,

  /** Enable roadmap section and /roadmap route */
  roadmap: true,
};
