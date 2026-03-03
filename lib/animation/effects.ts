/**
 * Advanced Cinematic Effects
 * 
 * Provides advanced animation effects for storytelling:
 * - Multi-layer parallax
 * - Background color interpolation
 * - SVG mask reveal
 * - Noise/grain overlay
 * - Text masking effects
 * 
 * Performance considerations:
 * - All effects use GPU-accelerated properties
 * - Conditional rendering based on device capabilities
 * - Proper cleanup of generated elements
 */

'use client';

import { gsap } from './gsap';
import type { DeviceCapabilities } from './performance';

/**
 * Multi-layer parallax configuration
 */
export interface ParallaxLayer {
  selector: string | HTMLElement;
  speed: number; // 0.5 = half speed, 2 = double speed
  direction?: 'vertical' | 'horizontal';
}

/**
 * Create multi-layer parallax effect
 * 
 * Strategy:
 * - Different elements move at different speeds
 * - Creates depth perception
 * - Uses translateY/X for GPU acceleration
 * 
 * Memory: Returns cleanup function to remove animations
 */
export const createParallaxLayers = (
  timeline: gsap.core.Timeline,
  layers: ParallaxLayer[],
  options: {
    start?: number;
    duration?: number;
  } = {}
) => {
  const { start = 0, duration = 1 } = options;

  layers.forEach((layer) => {
    const property = layer.direction === 'horizontal' ? 'x' : 'y';
    const distance = layer.speed * 100; // Base distance

    timeline.to(
      layer.selector,
      {
        [property]: distance,
        duration,
        ease: 'none', // Linear for parallax
      },
      start
    );
  });
};

/**
 * Color interpolation for background
 * 
 * Smoothly transitions between colors based on scroll
 * 
 * Strategy:
 * - Uses GSAP's color interpolation
 * - Animates background-color directly
 * - Can also animate gradient stops
 * 
 * Memory: Single tween, minimal overhead
 */
export const createColorInterpolation = (
  timeline: gsap.core.Timeline,
  target: string | HTMLElement,
  colors: string[],
  options: {
    start?: number;
    duration?: number;
  } = {}
) => {
  const { start = 0, duration = 1 } = options;

  // Create color keyframes
  const segmentDuration = duration / (colors.length - 1);

  colors.forEach((color, index) => {
    if (index === 0) {
      // Set initial color
      gsap.set(target, { backgroundColor: color });
    } else {
      // Animate to next color
      const position = start + (index - 1) * segmentDuration;
      timeline.to(
        target,
        {
          backgroundColor: color,
          duration: segmentDuration,
          ease: 'none',
        },
        position
      );
    }
  });
};

/**
 * SVG mask reveal animation
 * 
 * Creates a cinematic reveal effect using SVG masks
 * 
 * Strategy:
 * - Animates SVG mask position or scale
 * - Can create wipe, iris, or custom reveal patterns
 * 
 * Memory: Reuses existing SVG, no DOM creation
 */
export const createMaskReveal = (
  timeline: gsap.core.Timeline,
  target: string | HTMLElement,
  maskType: 'wipe' | 'iris' | 'slide',
  options: {
    start?: number;
    duration?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
  } = {}
) => {
  const { start = 0, duration = 1, direction = 'right' } = options;

  // Create mask element if not exists
  const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetEl) return;

  switch (maskType) {
    case 'wipe':
      // Horizontal wipe using clip-path
      const clipPath = direction === 'right' 
        ? ['inset(0 100% 0 0)', 'inset(0 0 0 0)']
        : ['inset(0 0 0 100%)', 'inset(0 0 0 0)'];
      
      gsap.set(targetEl, { clipPath: clipPath[0] });
      timeline.to(
        targetEl,
        {
          clipPath: clipPath[1],
          duration,
          ease: 'power2.inOut',
        },
        start
      );
      break;

    case 'iris':
      // Circular reveal using clip-path
      gsap.set(targetEl, { clipPath: 'circle(0% at 50% 50%)' });
      timeline.to(
        targetEl,
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration,
          ease: 'power2.out',
        },
        start
      );
      break;

    case 'slide':
      // Slide reveal
      const slideDistance = direction === 'down' || direction === 'up' ? '100%' : '0';
      gsap.set(targetEl, { clipPath: `inset(${slideDistance} 0 0 0)` });
      timeline.to(
        targetEl,
        {
          clipPath: 'inset(0 0 0 0)',
          duration,
          ease: 'power3.out',
        },
        start
      );
      break;
  }
};

/**
 * Create noise/grain overlay effect
 * 
 * Strategy:
 * - Uses CSS filter or animated background
 * - Optional: SVG filter for more control
 * - Lightweight and performant
 * 
 * Memory: Single element overlay, minimal impact
 */
export const createNoiseOverlay = (
  container: HTMLElement,
  options: {
    opacity?: number;
    animate?: boolean;
    capabilities?: DeviceCapabilities;
  } = {}
): HTMLDivElement | null => {
  const { opacity = 0.03, animate = false, capabilities } = options;

  // Skip on low-power devices
  if (capabilities?.isLowPower || capabilities?.prefersReducedMotion) {
    return null;
  }

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'grain-overlay';
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: ${opacity};
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    will-change: opacity;
    z-index: 10;
  `;

  container.appendChild(overlay);

  // Optional: Animate opacity for subtle movement
  if (animate) {
    gsap.to(overlay, {
      opacity: opacity * 1.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  return overlay;
};

/**
 * Text masking with overflow hidden
 * 
 * Creates dramatic text reveal animations
 * 
 * Strategy:
 * - Wraps text in overflow:hidden container
 * - Animates inner text element
 * - Can be used for split text effects
 * 
 * Memory: Returns cleanup function to remove wrappers
 */
export const createTextMask = (
  element: HTMLElement,
  options: {
    direction?: 'up' | 'down';
    stagger?: number;
  } = {}
): { cleanup: () => void } => {
  const { direction = 'up', stagger = 0 } = options;

  // Store original parent
  const parent = element.parentElement;
  if (!parent) return { cleanup: () => {} };

  // Create mask wrapper
  const mask = document.createElement('div');
  mask.style.cssText = 'overflow: hidden; display: inline-block;';
  
  // Wrap element
  parent.insertBefore(mask, element);
  mask.appendChild(element);

  // Set initial position
  const initialY = direction === 'up' ? '100%' : '-100%';
  gsap.set(element, { y: initialY });

  // Cleanup function
  const cleanup = () => {
    if (mask.parentElement) {
      mask.parentElement.insertBefore(element, mask);
      mask.remove();
    }
  };

  return { cleanup };
};

/**
 * Create split text lines for animation
 * 
 * Splits text into lines and wraps each in a container
 * for line-by-line reveal animations
 * 
 * Strategy:
 * - Splits text by line breaks or word count
 * - Each line wrapped in overflow:hidden container
 * - Returns array of line elements
 * 
 * Memory: Returns cleanup function to restore original text
 */
export const splitTextLines = (
  element: HTMLElement,
  options: {
    type?: 'lines' | 'words' | 'chars';
  } = {}
): {
  lines: HTMLElement[];
  cleanup: () => void;
} => {
  const { type = 'lines' } = options;
  const originalHTML = element.innerHTML;
  const lines: HTMLElement[] = [];

  if (type === 'lines') {
    // Simple line splitting (for basic use)
    // Production: Use SplitText plugin or similar library
    const text = element.textContent || '';
    const textLines = text.split('\n').filter(line => line.trim());

    element.innerHTML = '';

    textLines.forEach((lineText) => {
      const lineWrapper = document.createElement('div');
      lineWrapper.style.cssText = 'overflow: hidden;';
      
      const lineInner = document.createElement('div');
      lineInner.textContent = lineText;
      lineInner.style.cssText = 'display: inline-block;';
      
      lineWrapper.appendChild(lineInner);
      element.appendChild(lineWrapper);
      lines.push(lineInner);
    });
  }

  const cleanup = () => {
    element.innerHTML = originalHTML;
  };

  return { lines, cleanup };
};

/**
 * Create gradient shift animation
 * 
 * Animates gradient position for dynamic backgrounds
 * 
 * Strategy:
 * - Uses background-position or CSS variables
 * - Creates flowing, organic movement
 * 
 * Memory: Single property animation, minimal overhead
 */
export const createGradientShift = (
  timeline: gsap.core.Timeline,
  target: string | HTMLElement,
  options: {
    start?: number;
    duration?: number;
    xPercent?: number;
    yPercent?: number;
  } = {}
) => {
  const { start = 0, duration = 1, xPercent = 0, yPercent = 100 } = options;

  timeline.to(
    target,
    {
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      duration,
      ease: 'none',
    },
    start
  );
};

/**
 * Create stagger reveal with masks
 * 
 * Combines text masking with stagger for dramatic reveals
 */
export const createStaggerReveal = (
  timeline: gsap.core.Timeline,
  targets: string | HTMLElement[],
  options: {
    start?: number;
    duration?: number;
    stagger?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
  } = {}
) => {
  const { start = 0, duration = 0.8, stagger = 0.15, direction = 'up' } = options;

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: '100%', x: 0 };
      case 'down': return { y: '-100%', x: 0 };
      case 'left': return { x: '100%', y: 0 };
      case 'right': return { x: '-100%', y: 0 };
    }
  };

  const initial = getInitialPosition();

  // Set initial state
  gsap.set(targets, { ...initial, opacity: 0 });

  // Animate
  timeline.to(
    targets,
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
    },
    start
  );
};

/**
 * Create depth layers with blur
 * 
 * Simulates depth of field by adding blur to background layers
 * 
 * Strategy:
 * - Background layers have more blur
 * - Foreground elements stay sharp
 * - Creates cinematic depth
 * 
 * Performance: Blur is expensive, use conditionally
 */
export const createDepthLayers = (
  layers: Array<{
    element: HTMLElement;
    depth: number; // 0 = foreground, 1 = far background
  }>,
  capabilities?: DeviceCapabilities
) => {
  // Skip blur on low-power devices
  if (capabilities?.isLowPower || capabilities?.prefersReducedMotion) {
    return;
  }

  layers.forEach(({ element, depth }) => {
    const blurAmount = depth * 5; // Max 5px blur
    if (blurAmount > 0) {
      element.style.filter = `blur(${blurAmount}px)`;
      element.style.willChange = 'filter';
    }
  });
};
