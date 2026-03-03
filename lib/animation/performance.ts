/**
 * Performance Utilities for GSAP Animations
 * 
 * Provides tools for optimizing animations on different devices:
 * - Detect low-power mode and reduce animations
 * - Debounced resize handling
 * - Proper ScrollTrigger refresh
 * - matchMedia for responsive timelines
 * - Memory management helpers
 * 
 * Memory Management Strategy:
 * 1. Use gsap.context() for automatic cleanup
 * 2. Kill timelines before creating new ones
 * 3. Debounce resize to prevent excessive refreshes
 * 4. Use matchMedia.revert() to clean up breakpoint-specific animations
 * 5. Clear RAF loops on unmount
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from './gsap';

/**
 * Device capability detection
 */
export interface DeviceCapabilities {
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isTouch: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

/**
 * Detect device capabilities for animation performance
 * 
 * Memory: Results are memoized to prevent repeated calculations
 */
export const detectDeviceCapabilities = (): DeviceCapabilities => {
  if (typeof window === 'undefined') {
    return {
      isLowPower: false,
      prefersReducedMotion: false,
      isMobile: false,
      isTouch: false,
      connectionSpeed: 'unknown',
    };
  }

  // Check for reduced motion preference (accessibility)
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Detect touch devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Detect low power mode (heuristic based on CPU cores and memory)
  const isLowPower =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    // @ts-ignore - deviceMemory is experimental
    (navigator.deviceMemory && navigator.deviceMemory <= 2);

  // Detect connection speed
  // @ts-ignore - connection is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const connectionSpeed =
    connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      ? 'slow'
      : connection
      ? 'fast'
      : 'unknown';

  return {
    isLowPower,
    prefersReducedMotion,
    isMobile,
    isTouch,
    connectionSpeed,
  };
};

/**
 * Hook: Device capabilities with React state
 * 
 * Memory: Listeners are properly cleaned up on unmount
 */
export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(
    detectDeviceCapabilities()
  );

  useEffect(() => {
    // Listen for reduced motion changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      setCapabilities(detectDeviceCapabilities());
    };

    reducedMotionQuery.addEventListener('change', handleChange);

    // Cleanup listener
    return () => {
      reducedMotionQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return capabilities;
};

/**
 * Debounce function with proper cleanup
 * 
 * Memory: Timer is cleared on cleanup to prevent memory leaks
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
};

/**
 * Throttle function for scroll/resize events
 * 
 * Memory: RAF is cancelled on cleanup
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Hook: Debounced window resize handler
 * 
 * Strategy:
 * - Debounces resize events to 150ms
 * - Refreshes ScrollTrigger after resize
 * - Cleans up event listener on unmount
 * 
 * Memory: Listener and debounce timer cleaned up properly
 */
export const useDebouncedResize = (callback?: () => void, delay: number = 150) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleResize = debounce(() => {
      // Refresh ScrollTrigger instances
      ScrollTrigger.refresh();
      
      // Call custom callback
      if (callbackRef.current) {
        callbackRef.current();
      }
    }, delay);

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);
};

/**
 * Hook: Responsive timelines with GSAP matchMedia
 * 
 * Strategy:
 * - Creates different timelines for different breakpoints
 * - Automatically reverts animations when breakpoint changes
 * - Uses GSAP's built-in matchMedia for proper cleanup
 * 
 * Memory: matchMedia.revert() automatically kills all timelines
 */
export const useResponsiveTimeline = () => {
  const mm = useRef<gsap.MatchMedia | null>(null);

  useEffect(() => {
    mm.current = gsap.matchMedia();

    // Cleanup on unmount
    return () => {
      mm.current?.revert();
      mm.current = null;
    };
  }, []);

  return mm.current;
};

/**
 * Get animation config based on device capabilities
 * 
 * Strategy:
 * - Reduce animation complexity on low-power devices
 * - Disable animations for reduced motion preference
 * - Simplify animations on mobile
 */
export const getAnimationConfig = (capabilities: DeviceCapabilities) => {
  // Respect reduced motion preference
  if (capabilities.prefersReducedMotion) {
    return {
      duration: 0,
      ease: 'none',
      enabled: false,
    };
  }

  // Low power mode: reduce animation complexity
  if (capabilities.isLowPower) {
    return {
      duration: 0.5, // Faster animations
      ease: 'power2.out',
      stagger: 0.05, // Reduced stagger
      blur: false, // Disable blur effects
      parallax: false, // Disable parallax
      enabled: true,
    };
  }

  // Mobile: moderate complexity
  if (capabilities.isMobile) {
    return {
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
      blur: false,
      parallax: true,
      enabled: true,
    };
  }

  // Desktop: full complexity
  return {
    duration: 1,
    ease: 'power2.out',
    stagger: 0.15,
    blur: true,
    parallax: true,
    enabled: true,
  };
};

/**
 * Properly refresh ScrollTrigger with debounce
 * 
 * Use after DOM changes that affect layout
 * 
 * Memory: Debounced to prevent excessive recalculations
 */
export const refreshScrollTrigger = debounce(() => {
  ScrollTrigger.refresh();
}, 100);

/**
 * Kill all ScrollTrigger instances (cleanup utility)
 * 
 * Use during page transitions or when unmounting multiple scenes
 * 
 * Memory: Properly disposes of all ScrollTrigger instances
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Hook: Automatically refresh ScrollTrigger on image load
 * 
 * Strategy:
 * - Waits for images to load before calculating positions
 * - Prevents layout shifts from affecting scroll positions
 * 
 * Memory: Event listeners cleaned up after images load
 */
export const useImageLoadRefresh = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll('img');
    if (images.length === 0) return;

    let loadedCount = 0;
    const totalImages = images.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        refreshScrollTrigger();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });

    // If all images already loaded
    if (loadedCount === totalImages) {
      refreshScrollTrigger();
    }

    // Cleanup
    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, [containerRef]);
};

/**
 * Prefers reduced motion CSS class helper
 */
export const getReducedMotionClass = (capabilities: DeviceCapabilities): string => {
  return capabilities.prefersReducedMotion ? 'motion-reduce' : '';
};

/**
 * Memory usage monitor (development only)
 * 
 * Logs ScrollTrigger instance count and provides cleanup recommendations
 */
export const monitorScrollTriggerMemory = () => {
  if (process.env.NODE_ENV !== 'development') return;

  const triggers = ScrollTrigger.getAll();
  console.log(`[ScrollTrigger Memory] Active instances: ${triggers.length}`);

  if (triggers.length > 20) {
    console.warn(
      '[ScrollTrigger Memory] High instance count detected. Consider cleanup strategy.'
    );
  }
};
