/**
 * Lenis Smooth Scroll Integration
 * 
 * Provides smooth scroll with GSAP ScrollTrigger integration.
 * Uses RAF loop to sync Lenis with ScrollTrigger for buttery-smooth animations.
 * 
 * Architecture:
 * - Client-side only (uses window)
 * - Proper cleanup to prevent memory leaks
 * - Custom hooks for React integration
 * - Syncs with GSAP ScrollTrigger via RAF loop
 * 
 * Performance:
 * - RequestAnimationFrame loop for 60fps sync
 * - Automatic cleanup on unmount
 * - Touch device optimization
 */

'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from '@/lib/animation/gsap';

/**
 * Lenis configuration options
 */
export interface LenisOptions {
  /** Scroll duration multiplier (higher = smoother, slower) */
  duration?: number;
  /** Easing function for smooth scroll */
  easing?: (t: number) => number;
  /** Scroll direction (vertical | horizontal) */
  direction?: 'vertical' | 'horizontal';
  /** Enable smooth scroll on touch devices */
  smoothTouch?: boolean;
  /** Touch multiplier for mobile */
  touchMultiplier?: number;
}

/**
 * Default Lenis configuration
 * Optimized for cinematic scroll experiences
 */
const defaultLenisOptions: LenisOptions = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOut
  direction: 'vertical',
  smoothTouch: false, // Disable on mobile for better performance
  touchMultiplier: 2,
};

/**
 * Custom hook: Initialize Lenis smooth scroll
 * 
 * Automatically:
 * - Creates Lenis instance
 * - Syncs with ScrollTrigger
 * - Cleans up on unmount
 * 
 * Usage:
 * ```tsx
 * function Layout({ children }) {
 *   useLenis();
 *   return <div>{children}</div>;
 * }
 * ```
 */
export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      ...defaultLenisOptions,
      ...options,
    });

    // RAF loop to sync Lenis with ScrollTrigger
    function raf(time: number) {
      lenisRef.current?.raf(time);
      ScrollTrigger.update(); // Sync ScrollTrigger with Lenis scroll position
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef.current;
}

/**
 * Utility: Scroll to element smoothly
 * 
 * Usage:
 * ```tsx
 * const lenis = useLenis();
 * scrollToElement('#section-2', lenis);
 * ```
 */
export function scrollToElement(
  target: string | HTMLElement,
  lenis: Lenis | null,
  options?: { offset?: number; duration?: number }
) {
  if (!lenis) return;

  lenis.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.2,
  });
}

/**
 * Utility: Stop smooth scroll
 * Useful for modals or overlays
 */
export function stopScroll(lenis: Lenis | null) {
  lenis?.stop();
}

/**
 * Utility: Resume smooth scroll
 */
export function startScroll(lenis: Lenis | null) {
  lenis?.start();
}
