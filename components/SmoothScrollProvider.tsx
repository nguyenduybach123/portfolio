/**
 * Smooth Scroll Provider
 * 
 * Client-side wrapper that initializes Lenis smooth scroll.
 * Must be client component because Lenis uses window/document APIs.
 * 
 * Architecture:
 * - Wraps entire app in layout.tsx
 * - Initializes once per page load
 * - Automatically cleans up on unmount
 * - Syncs with GSAP ScrollTrigger via RAF loop
 */

'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/lib/animation/lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Initialize Lenis smooth scroll
  // RAF loop automatically syncs with ScrollTrigger
  useLenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smoothTouch: false, // Better performance on mobile
    touchMultiplier: 2,
  });

  return <>{children}</>;
}
