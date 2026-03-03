/**
 * StoryScene Component
 * 
 * Reusable scroll-triggered animation scene with pinning support.
 * Core building block for cinematic storytelling experiences.
 * 
 * Architecture:
 * - Uses gsap.context for automatic cleanup (prevents memory leaks)
 * - Accepts timeline builder function for composable animations
 * - Supports pinning with customizable scroll duration
 * - Type-safe ref management for animation targets
 * - All animations run outside React render cycle
 * - Responsive timeline support via GSAP matchMedia
 * - Accessibility: respects reduced motion preferences
 * 
 * Performance:
 * - Only animates transform and opacity (GPU-accelerated)
 * - scrub: true links animation to scroll position
 * - No re-renders during animation
 * - Automatic cleanup on unmount
 * - Debounced resize handling
 * - Conditional animation based on device capabilities
 * 
 * Usage:
 * ```tsx
 * <StoryScene
 *   id="hero"
 *   className="h-screen"
 *   pinned
 *   scrollDuration="300vh"
 *   onBuildTimeline={(tl, refs, capabilities) => {
 *     tl.to(refs.title, { opacity: 1, scale: 1.2 })
 *       .to(refs.title, { opacity: 0 });
 *   }}
 * >
 *   {(refs) => (
 *     <h1 ref={refs.title}>Hero Title</h1>
 *   )}
 * </StoryScene>
 * ```
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animation/gsap';
import { 
  useDeviceCapabilities, 
  useDebouncedResize,
  type DeviceCapabilities 
} from '@/lib/animation/performance';

interface StorySceneProps {
  /** Unique identifier for the scene */
  id: string;
  
  /** Scene className (use for height, layout, etc.) */
  className?: string;
  
  /** Pin the scene during scroll */
  pinned?: boolean;
  
  /** 
   * Scroll duration (e.g., "200vh", "300vh")
   * Determines how long the scene is pinned/animates
   */
  scrollDuration?: string;
  
  /**
   * Timeline builder function
   * Receives GSAP timeline, typed refs, and device capabilities
   */
  onBuildTimeline?: (
    timeline: gsap.core.Timeline,
    elements: Record<string, HTMLElement | null>,
    capabilities: DeviceCapabilities
  ) => void;
  
  /**
   * Children as render prop
   * Receives ref callbacks for animation targets
   */
  children: (refs: Record<string, (el: HTMLElement | null) => void>) => ReactNode;
  
  /** 
   * ScrollTrigger start position
   * Default: "top top" (scene top hits viewport top)
   */
  start?: string;
  
  /**
   * ScrollTrigger end position
   * Auto-calculated from scrollDuration if pinned
   */
  end?: string;
  
  /**
   * Additional ScrollTrigger config
   */
  scrollTriggerConfig?: Partial<ScrollTrigger.Vars>;
}

export function StoryScene({
  id,
  className = '',
  pinned = false,
  scrollDuration = '100vh',
  onBuildTimeline,
  children,
  start = 'top top',
  end,
  scrollTriggerConfig = {},
}: StorySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<Record<string, HTMLElement | null>>({});
  const contextRef = useRef<gsap.Context | null>(null);
  
  // Get device capabilities for performance optimization
  const capabilities = useDeviceCapabilities();
  
  // Debounced resize handling for ScrollTrigger refresh
  useDebouncedResize();
  useDebouncedResize();

  useEffect(() => {
    if (!containerRef.current || !onBuildTimeline) return;

    const ctx = gsap.context(() => {
      // Skip animations if reduced motion preferred
      if (capabilities.prefersReducedMotion) {
        // Set final state immediately
        return;
      }

      // Create timeline with scrub (scroll-controlled)
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current!,
          start,
          end: end ?? (pinned ? `+=${scrollDuration}` : 'bottom top'),
          pin: pinned,
          scrub: true, // Links animation progress to scroll position
          anticipatePin: 1, // Prevents flashing on pin
          invalidateOnRefresh: true, // Recalculates on window resize
          ...scrollTriggerConfig,
        },
      });

      // Build the timeline with user-defined animations
      onBuildTimeline(timeline, elementsRef.current, capabilities);
    }, containerRef);

    contextRef.current = ctx;

    // Cleanup: kills all animations and ScrollTriggers in this context
    return () => {
      ctx.revert();
      contextRef.current = null;
    };
  }, [id, pinned, scrollDuration, start, end, onBuildTimeline, scrollTriggerConfig, capabilities.prefersReducedMotion]);

  // Ref callback factory
  // Stores element refs for use in timeline builder
  const createRefCallback = (key: string) => (el: HTMLElement | null) => {
    elementsRef.current[key] = el;
  };

  // Create ref callbacks object
  const refs = new Proxy({} as Record<string, (el: HTMLElement | null) => void>, {
    get: (_, prop: string) => {
      return createRefCallback(prop);
    },
  });

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      data-story-scene
      data-reduced-motion={capabilities.prefersReducedMotion}
    >
      {children(refs)}
    </div>
  );
}

/**
 * Typed version for better DX
 * Ensures ref keys match expected element names
 */
export function createStoryScene<T extends string>() {
  return StoryScene as unknown as (
    props: Omit<StorySceneProps, 'children'> & {
      children: (refs: Record<T, (el: HTMLElement | null) => void>) => ReactNode;
      onBuildTimeline?: (
        timeline: gsap.core.Timeline,
        elements: Record<T, HTMLElement | null>,
        capabilities: DeviceCapabilities
      ) => void;
    }
  ) => ReactNode;
}
