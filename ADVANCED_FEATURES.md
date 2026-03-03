# Advanced Cinematic Features Documentation

## Overview

This document details the advanced cinematic features implemented in the portfolio, including performance strategies, accessibility support, and memory management.

---

## 🎬 Advanced Features

### 1. Multi-Layer Parallax

**What it does:**
Creates depth perception by moving different layers at different speeds during scroll.

**Implementation:**
```tsx
createParallaxLayers(
  timeline,
  [
    { selector: backgroundRef, speed: 0.5, direction: 'vertical' },
    { selector: midgroundRef, speed: 1.0, direction: 'vertical' },
    { selector: foregroundRef, speed: 1.5, direction: 'vertical' },
  ],
  { start: 0, duration: 1 }
);
```

**Performance:**
- Uses `translateY/X` for GPU acceleration
- Disabled on low-power devices
- Skipped when reduced motion is preferred

**Where used:**
- HeroScene: Background gradient + decorative elements

---

### 2. Background Color Interpolation

**What it does:**
Smoothly transitions background colors based on scroll position.

**Implementation:**
```tsx
createColorInterpolation(
  timeline,
  targetElement,
  ['#000000', '#2D1B69', '#1E3A8A'], // Black → Purple → Blue
  { start: 0, duration: 1 }
);
```

**Performance:**
- GSAP handles color interpolation efficiently
- Single property animation (background-color)
- GPU-accelerated on modern browsers

**Where used:**
- HeroScene: Dynamic background shifts
- ContactScene: Cinematic outro transition

---

### 3. SVG Mask Reveal Animation

**What it does:**
Creates cinematic reveal effects using clip-path.

**Types:**
- **Wipe**: Horizontal/vertical reveal
- **Iris**: Circular expand from center
- **Slide**: Directional reveal

**Implementation:**
```tsx
createMaskReveal(
  timeline,
  element,
  'wipe',
  { start: 0, duration: 1, direction: 'right' }
);
```

**Performance:**
- Uses CSS `clip-path` (GPU-accelerated)
- No additional DOM elements
- Works on all modern browsers

**Where used:**
- WorkScene: Heading reveal effect

---

### 4. Noise/Grain Overlay

**What it does:**
Adds cinematic film grain texture for visual depth.

**Implementation:**
```tsx
<NoiseOverlay opacity={0.03} animate={false} />
```

**Features:**
- SVG filter for grain texture
- Optional opacity animation
- Conditionally rendered based on device

**Performance:**
- Disabled on low-power devices
- Disabled when reduced motion preferred
- Uses `mix-blend-mode: overlay` (GPU)
- Single absolute positioned element

**Where used:**
- All scenes for consistent cinematic feel

---

### 5. Text Masking with Overflow Hidden

**What it does:**
Creates dramatic text reveals by masking text within containers.

**Implementation:**
```tsx
// Wrap text lines in overflow:hidden containers
<div className="overflow-hidden">
  <div data-text-line style={{ willChange: 'transform, opacity' }}>
    Text content
  </div>
</div>
```

**Animation pattern:**
```tsx
gsap.set('[data-text-line]', { opacity: 0, y: 50 });
timeline.to('[data-text-line]', {
  opacity: 1,
  y: 0,
  stagger: 0.1,
  ease: 'power2.out',
});
```

**Where used:**
- AboutScene: Philosophy line reveals

---

### 6. Responsive Animation Adjustments

**What it does:**
Adapts animation timing and complexity based on device capabilities.

**Detection:**
```tsx
const capabilities = useDeviceCapabilities();
// Returns: { isLowPower, isMobile, prefersReducedMotion, isTouch }
```

**Adjustments:**
```tsx
// Responsive stagger timing
const staggerDelay = capabilities.isLowPower 
  ? 0.05   // Fast on low-power
  : capabilities.isMobile 
    ? 0.08 // Moderate on mobile
    : 0.1; // Full on desktop

// Responsive animation distance
const slideDistance = capabilities.isMobile ? -50 : -100;
```

**Where applied:**
- All scenes adjust stagger timing
- Mobile gets reduced animation distances
- Low-power devices skip expensive effects

---

### 7. Reduced Motion Support

**What it does:**
Respects user's accessibility preference for reduced motion.

**Detection:**
```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

**Strategy:**
```tsx
if (capabilities.prefersReducedMotion) {
  // Skip all animations
  // Elements shown in final state immediately
  return;
}
```

**CSS Support:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  [data-story-scene][data-reduced-motion="true"] * {
    transform: none !important;
    opacity: 1 !important;
  }
}
```

**What's disabled:**
- All GSAP animations
- Parallax effects
- Grain overlay animation
- CSS transitions

---

## ⚡ Performance Strategies

### 1. Debounced Resize Handling

**Problem:**
Window resize events fire rapidly, causing excessive ScrollTrigger refreshes.

**Solution:**
```tsx
useDebouncedResize(() => {
  // Custom resize logic
}, 150); // 150ms debounce
```

**How it works:**
- Waits 150ms after last resize event
- Calls `ScrollTrigger.refresh()` once
- Prevents layout thrashing

**Memory:**
- Timer cleared on unmount
- Event listener removed properly

---

### 2. ScrollTrigger Refresh Strategy

**When to refresh:**
- Window resize (debounced)
- Image load complete
- Font loaded
- DOM content changes

**Manual refresh:**
```tsx
import { refreshScrollTrigger } from '@/lib/animation/performance';

// After DOM changes
refreshScrollTrigger(); // Debounced automatically
```

**Automatic refresh:**
```tsx
useImageLoadRefresh(containerRef);
// Refreshes when all images in container load
```

---

### 3. GSAP matchMedia for Responsive Timelines

**What it does:**
Creates different animations for different breakpoints with automatic cleanup.

**Usage:**
```tsx
const mm = useResponsiveTimeline();

useEffect(() => {
  if (!mm) return;

  // Desktop animations
  mm.add("(min-width: 768px)", () => {
    gsap.to(element, { x: 100, duration: 1 });
  });

  // Mobile animations
  mm.add("(max-width: 767px)", () => {
    gsap.to(element, { x: 50, duration: 0.5 });
  });

  // Cleanup happens automatically
}, [mm]);
```

**Benefits:**
- Automatic cleanup when breakpoint changes
- No manual timeline killing needed
- Prevents memory leaks

**Memory strategy:**
- `mm.revert()` kills all timelines
- Called automatically on unmount
- No orphaned animations

---

### 4. Memory Management Decisions

#### **gsap.context() Strategy**

**Why:**
- Automatically cleans up all animations created within context
- Prevents memory leaks from orphaned tweens
- Simplifies component lifecycle

**Pattern:**
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here...
  }, containerRef);

  return () => ctx.revert(); // Cleanup
}, [...dependencies]);
```

**What gets cleaned up:**
- All timelines created in context
- All ScrollTrigger instances
- All event listeners
- All RAF loops

#### **Ref Management**

**Strategy:**
- Store refs in `useRef` (doesn't cause re-renders)
- Use Proxy for dynamic ref creation
- Clear refs on unmount

```tsx
const elementsRef = useRef<Record<string, HTMLElement | null>>({});

// Refs stored here don't trigger re-renders
elementsRef.current[key] = element;
```

**Benefits:**
- No re-renders during animation setup
- Refs accessible in timeline builder
- Automatic garbage collection

#### **Timeline Reuse**

**Don't do this:**
```tsx
// ❌ Creates new timeline on every render
const timeline = gsap.timeline();
```

**Do this:**
```tsx
// ✅ Timeline created once in useEffect
useEffect(() => {
  const ctx = gsap.context(() => {
    const timeline = gsap.timeline({ ... });
    // Use timeline...
  });
  return () => ctx.revert();
}, [dependencies]);
```

#### **ScrollTrigger Instance Monitoring**

**Development helper:**
```tsx
import { monitorScrollTriggerMemory } from '@/lib/animation/performance';

useEffect(() => {
  monitorScrollTriggerMemory();
  // Logs active instance count
}, []);
```

**What to watch for:**
- Instance count growing over time
- Instances not cleaning up
- Duplicate triggers for same element

**Cleanup strategy:**
```tsx
// Manual cleanup if needed
import { killAllScrollTriggers } from '@/lib/animation/performance';

killAllScrollTriggers(); // Use sparingly
```

#### **RAF Loop Management**

**Lenis smooth scroll:**
```tsx
useEffect(() => {
  let rafId: number | null = null;

  function raf(time: number) {
    lenis.raf(time);
    ScrollTrigger.update();
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  return () => {
    if (rafId) cancelAnimationFrame(rafId); // Critical!
    lenis.destroy();
  };
}, []);
```

**Why important:**
- RAF loops run forever if not cancelled
- Causes CPU usage even when page inactive
- Memory leak if multiple loops created

---

## 🎯 Device-Specific Optimizations

### Low-Power Devices

**Detected by:**
- CPU cores ≤ 2
- Device memory ≤ 2GB
- Battery saver mode (experimental)

**Optimizations:**
- Faster animation durations (0.5s vs 1s)
- Reduced stagger delays (0.05s vs 0.15s)
- Disabled blur effects
- Disabled parallax
- No grain overlay animation

### Mobile Devices

**Detected by:**
- User agent string
- Touch capability
- Screen size

**Optimizations:**
- Moderate animation speeds (0.8s)
- Reduced animation distances (50px vs 100px)
- Simplified easing functions
- No blur effects (performance)
- Smaller scroll distances

### Touch Devices

**Optimizations:**
- Lenis smooth scroll disabled (native scroll)
- Faster animation responsiveness
- Larger touch targets

---

## 📊 Performance Metrics

### Animation Performance

**GPU-accelerated properties:**
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ✅ `clip-path`

**Avoid animating:**
- ❌ `width`, `height`
- ❌ `top`, `left`, `right`, `bottom`
- ❌ `margin`, `padding`
- ❌ `border-width`

### will-change Usage

**When to use:**
```tsx
style={{ willChange: 'transform, opacity' }}
```

**When NOT to use:**
- Elements that don't animate
- Too many elements (memory intensive)
- Static content

### Memory Footprint

**Per scene:**
- ScrollTrigger instance: ~2KB
- Timeline: ~1KB
- Refs: negligible
- Total: ~3-5KB per scene

**Total portfolio:**
- 5 scenes × 5KB = ~25KB
- Acceptable for modern devices

---

## 🧪 Testing Strategies

### Performance Testing

```tsx
// Enable performance monitoring
useEffect(() => {
  const start = performance.now();
  
  // Your animation code
  
  const end = performance.now();
  console.log(`Animation setup: ${end - start}ms`);
}, []);
```

### Memory Testing

```tsx
// Log active triggers
console.log('Active triggers:', ScrollTrigger.getAll().length);

// Monitor over time
setInterval(() => {
  monitorScrollTriggerMemory();
}, 5000);
```

### Accessibility Testing

1. Enable reduced motion in OS
2. Verify animations disabled
3. Check content still readable
4. Test keyboard navigation

---

## 🔧 Troubleshooting

### ScrollTrigger not refreshing

```tsx
// Manual refresh
ScrollTrigger.refresh();

// Force recalculation
ScrollTrigger.refresh(true);
```

### Memory leaks

1. Check `ctx.revert()` is called
2. Verify RAF loops cancelled
3. Monitor instance count
4. Check event listeners removed

### Animation jank

1. Use only transform/opacity
2. Check will-change usage
3. Reduce animation complexity
4. Test on low-end devices

---

## 📚 Resources

- [GSAP Performance Tips](https://greensock.com/docs/v3/GSAP/gsap.context())
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Web Animations Performance](https://web.dev/animations/)
- [Reduced Motion Guide](https://web.dev/prefers-reduced-motion/)

---

**Built with performance and accessibility in mind.**
