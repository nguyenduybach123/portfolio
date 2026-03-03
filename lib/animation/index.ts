/**
 * Animation Library Index
 * 
 * Central export point for all animation utilities.
 * Provides a clean API for importing GSAP, Lenis, and animation helpers.
 */

// Core GSAP exports
export { gsap, ScrollTrigger } from './gsap';
export type { TimelineBuilder } from './gsap';

// Lenis smooth scroll
export { useLenis, scrollToElement, stopScroll, startScroll } from './lenis';
export type { LenisOptions } from './lenis';

// Animation utilities and presets
export {
  fadeIn,
  fadeOut,
  slideIn,
  scale,
  parallax,
  staggerAnimation,
  colorTransition,
  applyAnimation,
  setInitialState,
  fadeInStagger,
  revealTextLines,
} from './useStoryTimeline';
export type { AnimationConfig } from './useStoryTimeline';

// Performance utilities
export {
  detectDeviceCapabilities,
  useDeviceCapabilities,
  debounce,
  throttle,
  useDebouncedResize,
  useResponsiveTimeline,
  getAnimationConfig,
  refreshScrollTrigger,
  killAllScrollTriggers,
  useImageLoadRefresh,
  getReducedMotionClass,
  monitorScrollTriggerMemory,
} from './performance';
export type { DeviceCapabilities } from './performance';

// Advanced cinematic effects
export {
  createParallaxLayers,
  createColorInterpolation,
  createMaskReveal,
  createNoiseOverlay,
  createTextMask,
  splitTextLines,
  createGradientShift,
  createStaggerReveal,
  createDepthLayers,
} from './effects';
export type { ParallaxLayer } from './effects';
