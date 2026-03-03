/**
 * GSAP Configuration & ScrollTrigger Setup
 * 
 * Centralizes GSAP initialization to prevent multiple plugin registrations.
 * ScrollTrigger is registered once and configured for optimal performance.
 * 
 * Design decisions:
 * - Single source of truth for GSAP config
 * - Prevents memory leaks from duplicate registrations
 * - Configures ScrollTrigger for smooth performance
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Configure ScrollTrigger defaults for performance
  ScrollTrigger.config({
    // Improves performance by reducing ScrollTrigger checks
    limitCallbacks: true,
    // Sync with display refresh rate
    syncInterval: 0,
  });
  
  // Normalize scroll behavior across browsers
  ScrollTrigger.normalizeScroll(false);
}

// Export configured GSAP instance
export { gsap, ScrollTrigger };

/**
 * Type-safe timeline builder for StoryScene components
 * Ensures timeline functions receive properly typed refs
 */
export type TimelineBuilder = (
  timeline: gsap.core.Timeline,
  elements: Record<string, HTMLElement | null>
) => void;

/**
 * Utility: Create a matched timeline
 * Useful for overlapping animations across multiple scenes
 */
export const createMatchedTimeline = () => {
  return gsap.timeline({
    defaults: {
      ease: 'none', // Linear easing for scroll-controlled animations
    },
  });
};

/**
 * Utility: Kill all ScrollTriggers and animations
 * Use during cleanup or page transitions
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
};
