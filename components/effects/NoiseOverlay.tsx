/**
 * NoiseOverlay Component
 * 
 * Adds cinematic grain/noise effect to scenes
 * Conditionally rendered based on device capabilities
 * 
 * Performance:
 * - Disabled on low-power devices
 * - Respects reduced motion preference
 * - Uses mix-blend-mode for GPU acceleration
 * - Minimal performance impact
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animation/gsap';
import { useDeviceCapabilities } from '@/lib/animation/performance';

interface NoiseOverlayProps {
  opacity?: number;
  animate?: boolean;
  className?: string;
}

export function NoiseOverlay({ 
  opacity = 0.03, 
  animate = false,
  className = '' 
}: NoiseOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    if (!overlayRef.current || !animate) return;

    // Skip animation on low-power or reduced motion
    if (capabilities.isLowPower || capabilities.prefersReducedMotion) {
      return;
    }

    // Subtle opacity animation
    const tween = gsap.to(overlayRef.current, {
      opacity: opacity * 1.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tween.kill();
    };
  }, [animate, opacity, capabilities]);

  // Don't render on low-power devices or reduced motion
  if (capabilities.isLowPower || capabilities.prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      style={{
        opacity,
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        willChange: animate ? 'opacity' : 'auto',
      }}
      aria-hidden="true"
    />
  );
}
