# Quick Reference Guide - Advanced Features

## 🚀 Quick Start

### Using Device Capabilities

```tsx
import { useDeviceCapabilities } from '@/lib/animation';

const capabilities = useDeviceCapabilities();

// Check capabilities
if (capabilities.isLowPower) { /* reduce complexity */ }
if (capabilities.isMobile) { /* mobile optimizations */ }
if (capabilities.prefersReducedMotion) { /* disable animations */ }
```

### Adding Parallax

```tsx
import { createParallaxLayers } from '@/lib/animation';

onBuildTimeline={(tl, refs, capabilities) => {
  createParallaxLayers(
    tl,
    [
      { selector: refs.background, speed: 0.5 },
      { selector: refs.foreground, speed: 1.5 },
    ],
    { start: 0, duration: 1 }
  );
}
```

### Color Interpolation

```tsx
import { createColorInterpolation } from '@/lib/animation';

createColorInterpolation(
  timeline,
  refs.element,
  ['#000000', '#2D1B69', '#1E3A8A'],
  { start: 0, duration: 1 }
);
```

### SVG Mask Reveal

```tsx
import { createMaskReveal } from '@/lib/animation';

createMaskReveal(
  timeline,
  refs.element,
  'wipe', // or 'iris', 'slide'
  { start: 0, duration: 0.5, direction: 'right' }
);
```

### Noise Overlay

```tsx
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

<NoiseOverlay opacity={0.03} animate={false} />
```

### Text Masking

```tsx
// Wrap text in overflow container
<div className="overflow-hidden">
  <div data-text-line style={{ willChange: 'transform, opacity' }}>
    Your text here
  </div>
</div>

// Animate
gsap.set('[data-text-line]', { opacity: 0, y: 50 });
timeline.to('[data-text-line]', {
  opacity: 1,
  y: 0,
  stagger: 0.1,
});
```

## ⚡ Performance Hooks

### Debounced Resize

```tsx
import { useDebouncedResize } from '@/lib/animation';

useDebouncedResize(() => {
  // Custom resize logic
}, 150);
```

### Responsive Timelines

```tsx
import { useResponsiveTimeline } from '@/lib/animation';

const mm = useResponsiveTimeline();

useEffect(() => {
  if (!mm) return;

  mm.add("(min-width: 768px)", () => {
    // Desktop animations
  });

  mm.add("(max-width: 767px)", () => {
    // Mobile animations
  });
}, [mm]);
```

### Image Load Refresh

```tsx
import { useImageLoadRefresh } from '@/lib/animation';

const containerRef = useRef(null);
useImageLoadRefresh(containerRef);
```

## 🎯 Responsive Patterns

### Adjust Based on Device

```tsx
onBuildTimeline={(tl, refs, capabilities) => {
  // Responsive timing
  const stagger = capabilities.isLowPower 
    ? 0.05 
    : capabilities.isMobile 
      ? 0.08 
      : 0.15;

  // Responsive distance
  const distance = capabilities.isMobile ? 50 : 100;

  // Conditional effects
  if (!capabilities.isLowPower && !capabilities.prefersReducedMotion) {
    // Heavy animations
  }

  // Build timeline with responsive values
  timeline.to(element, { 
    x: distance, 
    stagger,
    duration: capabilities.isLowPower ? 0.5 : 1 
  });
}
```

## 🧹 Memory Management

### UseEffect Pattern

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
  }, containerRef);

  return () => ctx.revert(); // Automatic cleanup
}, [dependencies]);
```

### RAF Loop Pattern

```tsx
useEffect(() => {
  let rafId: number;

  const loop = (time: number) => {
    // Do work
    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
  };
}, []);
```

### Manual Cleanup

```tsx
import { killAllScrollTriggers } from '@/lib/animation';

// Use sparingly (page transitions, full resets)
killAllScrollTriggers();
```

## 🎨 Animation Utilities

### Common Animations

```tsx
import {
  fadeIn,
  fadeOut,
  slideIn,
  scale,
  staggerAnimation,
} from '@/lib/animation';

// Fade in with slide
const config = fadeIn(element, {
  duration: 1,
  y: 30,
  stagger: 0.1,
});

// Stagger multiple elements
const staggerConfig = staggerAnimation(elements, {
  opacity: 1,
  y: 0,
  stagger: 0.15,
});
```

### Set Initial States

```tsx
import { setInitialState } from '@/lib/animation';

setInitialState(element, {
  opacity: 0,
  y: 50,
  scale: 0.9,
});
```

## 🔍 Debugging

### Monitor ScrollTrigger

```tsx
import { monitorScrollTriggerMemory } from '@/lib/animation';

useEffect(() => {
  monitorScrollTriggerMemory();
  // Logs: Active instances count
}, []);
```

### Enable Markers

```tsx
<StoryScene
  scrollTriggerConfig={{ markers: true }}
/>
```

### Slow Motion

```tsx
// In browser console
gsap.globalTimeline.timeScale(0.2);
```

## 🎭 Scene Template

```tsx
import { StoryScene } from '@/components/storytelling/StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';
import { createParallaxLayers } from '@/lib/animation/effects';

export function MyScene() {
  return (
    <StoryScene
      id="my-scene"
      className="relative h-screen bg-black"
      pinned
      scrollDuration="300vh"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Set initial states
        gsap.set(refs.content, {
          opacity: 0,
          y: 50,
        });

        // Responsive values
        const stagger = capabilities.isMobile ? 0.08 : 0.15;

        // Conditional effects
        if (!capabilities.isLowPower) {
          createParallaxLayers(tl, [...], {...});
        }

        // Build timeline
        tl
          .to(refs.content, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }, 0)
          .to(refs.content, {
            opacity: 0,
            duration: 0.3,
          }, 0.7);
      }}
    >
      {(refs) => (
        <>
          <NoiseOverlay opacity={0.03} />
          <div ref={refs.content}>
            Your content here
          </div>
        </>
      )}
    </StoryScene>
  );
}
```

## 📦 Import Cheatsheet

```tsx
// GSAP
import { gsap, ScrollTrigger } from '@/lib/animation/gsap';

// Performance
import {
  useDeviceCapabilities,
  useDebouncedResize,
  useResponsiveTimeline,
  refreshScrollTrigger,
  killAllScrollTriggers,
} from '@/lib/animation/performance';

// Effects
import {
  createParallaxLayers,
  createColorInterpolation,
  createMaskReveal,
  createStaggerReveal,
} from '@/lib/animation/effects';

// Components
import { StoryScene } from '@/components/storytelling/StoryScene';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

// Utilities
import {
  fadeIn,
  fadeOut,
  slideIn,
  staggerAnimation,
  setInitialState,
} from '@/lib/animation/useStoryTimeline';
```

## 🎯 Best Practices

1. **Always use gsap.context for cleanup**
2. **Set initial states with gsap.set()**
3. **Use normalized time (0-1) in timelines**
4. **Check capabilities before heavy effects**
5. **Respect prefersReducedMotion**
6. **Use will-change sparingly**
7. **Only animate transform + opacity**
8. **Debounce resize events**
9. **Cancel RAF loops on unmount**
10. **Test on low-end devices**

## 🐛 Common Issues

### ScrollTrigger not working
```tsx
// Make sure trigger element exists
if (!containerRef.current) return;

// Refresh after DOM changes
ScrollTrigger.refresh();
```

### Memory leak
```tsx
// Ensure cleanup is called
return () => {
  ctx.revert();        // Kill animations
  cancelAnimationFrame(rafId); // Cancel RAF
};
```

### Animations jank
```tsx
// Only use GPU-accelerated properties
transform: translate/scale/rotate ✅
opacity ✅
clip-path ✅

width/height ❌
top/left ❌
margin/padding ❌
```

## 📱 Testing

### Test Reduced Motion
1. Mac: System Preferences → Accessibility → Display → Reduce motion
2. Windows: Settings → Ease of Access → Display → Show animations
3. Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion

### Test Low Power
1. Open DevTools → Performance
2. CPU throttling → 4x slowdown
3. Test animations still smooth

### Test Mobile
1. Chrome DevTools → Device toolbar
2. Select mobile device
3. Test touch interactions

## 📚 Resources

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Performance Tips](https://web.dev/animations/)
- Full docs: `ADVANCED_FEATURES.md`

---

Keep this page bookmarked for quick reference! 📌
