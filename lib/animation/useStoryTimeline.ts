/**
 * useStoryTimeline Hook
 * 
 * Reusable timeline animation patterns for storytelling scenes.
 * Provides common animation utilities to avoid repetition across scenes.
 * 
 * Architecture:
 * - Pure functions that return GSAP animation configs
 * - Composable animation builders
 * - Type-safe with proper TypeScript support
 * 
 * Performance:
 * - Returns config objects (doesn't create timelines directly)
 * - Can be memoized if needed
 * - No side effects
 */

import { gsap } from './gsap';

/**
 * Animation config type for composability
 */
export interface AnimationConfig {
  targets: any;
  vars: gsap.TweenVars;
  position?: string | number;
}

/**
 * Fade in animation with optional slide
 */
export const fadeIn = (
  target: any,
  options: {
    duration?: number;
    y?: number;
    x?: number;
    scale?: number;
    delay?: number;
    stagger?: number;
  } = {}
): AnimationConfig => ({
  targets: target,
  vars: {
    opacity: 1,
    y: options.y ?? 0,
    x: options.x ?? 0,
    scale: options.scale ?? 1,
    duration: options.duration ?? 1,
    delay: options.delay ?? 0,
    stagger: options.stagger ?? 0,
    ease: 'power2.out',
  },
});

/**
 * Fade out animation with optional slide
 */
export const fadeOut = (
  target: any,
  options: {
    duration?: number;
    y?: number;
    x?: number;
    scale?: number;
    delay?: number;
  } = {}
): AnimationConfig => ({
  targets: target,
  vars: {
    opacity: 0,
    y: options.y ?? 0,
    x: options.x ?? 0,
    scale: options.scale ?? 1,
    duration: options.duration ?? 1,
    delay: options.delay ?? 0,
    ease: 'power2.in',
  },
});

/**
 * Slide in from direction
 */
export const slideIn = (
  target: any,
  direction: 'left' | 'right' | 'up' | 'down',
  options: {
    duration?: number;
    distance?: number;
    stagger?: number;
  } = {}
): AnimationConfig => {
  const distance = options.distance ?? 100;
  const initial = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
  }[direction];

  return {
    targets: target,
    vars: {
      opacity: 1,
      x: 0,
      y: 0,
      duration: options.duration ?? 1,
      stagger: options.stagger ?? 0,
      ease: 'power3.out',
    },
  };
};

/**
 * Scale animation
 */
export const scale = (
  target: any,
  options: {
    from?: number;
    to: number;
    duration?: number;
    ease?: string;
  }
): AnimationConfig => ({
  targets: target,
  vars: {
    scale: options.to,
    duration: options.duration ?? 1,
    ease: options.ease ?? 'power2.inOut',
  },
});

/**
 * Parallax effect (element moves at different speed than scroll)
 */
export const parallax = (
  target: any,
  options: {
    y?: number;
    x?: number;
    duration?: number;
  }
): AnimationConfig => ({
  targets: target,
  vars: {
    y: options.y ?? 0,
    x: options.x ?? 0,
    duration: options.duration ?? 1,
    ease: 'none', // Linear for parallax
  },
});

/**
 * Stagger animation helper
 * Animates multiple elements with delay between each
 */
export const staggerAnimation = (
  target: any,
  options: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
  } = {}
): AnimationConfig => ({
  targets: target,
  vars: {
    opacity: options.opacity ?? 1,
    y: options.y ?? 0,
    x: options.x ?? 0,
    scale: options.scale ?? 1,
    duration: options.duration ?? 0.8,
    stagger: options.stagger ?? 0.15,
    ease: options.ease ?? 'power3.out',
  },
});

/**
 * Color transition
 */
export const colorTransition = (
  target: any,
  options: {
    color?: string;
    backgroundColor?: string;
    duration?: number;
  }
): AnimationConfig => ({
  targets: target,
  vars: {
    color: options.color,
    backgroundColor: options.backgroundColor,
    duration: options.duration ?? 1,
    ease: 'power2.inOut',
  },
});

/**
 * Apply animation config to timeline
 */
export const applyAnimation = (
  timeline: gsap.core.Timeline,
  config: AnimationConfig
) => {
  timeline.to(config.targets, config.vars, config.position);
};

/**
 * Set initial state for animations
 */
export const setInitialState = (
  target: any,
  options: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    [key: string]: any;
  }
) => {
  gsap.set(target, options);
};

/**
 * Split text utility for character/word/line animation
 * Note: Requires SplitText plugin (GSAP premium) or alternative solution
 * This is a placeholder that works with CSS
 */
export const prepareSplitText = (element: HTMLElement | null) => {
  if (!element) return { lines: [], words: [], chars: [] };
  
  // Basic implementation: splits by line breaks and spaces
  // For production, use GSAP SplitText or similar library
  const text = element.textContent || '';
  const words = text.split(' ');
  
  return {
    lines: [element], // Simplified: treat whole element as one line
    words: words.map(() => element), // Simplified
    chars: text.split('').map(() => element), // Simplified
  };
};

/**
 * Timeline preset: Fade in with stagger
 */
export const fadeInStagger = (
  timeline: gsap.core.Timeline,
  targets: any,
  options: {
    duration?: number;
    stagger?: number;
    position?: string | number;
  } = {}
) => {
  gsap.set(targets, { opacity: 0, y: 30 });
  timeline.to(
    targets,
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      stagger: options.stagger ?? 0.15,
      ease: 'power3.out',
    },
    options.position ?? 0
  );
};

/**
 * Timeline preset: Reveal text line by line
 */
export const revealTextLines = (
  timeline: gsap.core.Timeline,
  targets: any,
  options: {
    duration?: number;
    stagger?: number;
    position?: string | number;
  } = {}
) => {
  gsap.set(targets, { opacity: 0, y: 50 });
  timeline.to(
    targets,
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 1,
      stagger: options.stagger ?? 0.2,
      ease: 'power2.out',
    },
    options.position ?? 0
  );
};
