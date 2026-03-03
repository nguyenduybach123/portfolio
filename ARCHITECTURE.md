# Cinematic Storytelling Portfolio - Architecture Documentation

## Overview

This portfolio website uses a cinematic storytelling approach with scroll-triggered animations. The architecture is modular, performant, and built for extensibility.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Animations**: GSAP 3 with ScrollTrigger
- **Smooth Scroll**: Lenis (@studio-freight/lenis)
- **Styling**: TailwindCSS
- **Language**: TypeScript (strict mode)

## Architecture Principles

### 1. **Separation of Concerns**
- Scene components handle rendering (JSX)
- Timeline builders handle animation logic
- All GSAP code lives in `useLayoutEffect` with `gsap.context`
- No inline animations in JSX

### 2. **Reusability**
- `StoryScene` component is the foundation for all scenes
- Animation utilities in `lib/animation/useStoryTimeline.ts`
- Common patterns extracted into composable functions

### 3. **Performance First**
- Only animate `transform` and `opacity` (GPU-accelerated)
- Use `will-change` sparingly and only on animated elements
- Proper cleanup with `gsap.context().revert()`
- Lenis RAF loop synced with ScrollTrigger

### 4. **Type Safety**
- Full TypeScript support
- Typed timeline builders
- Typed ref callbacks
- No `any` types in production code

## Project Structure

```
components/
  storytelling/
    StoryScene.tsx          # Reusable scene wrapper
    scenes/
      index.ts              # Scene exports
      HeroScene.tsx         # Identity statement
      AboutScene.tsx        # Text reveal animation
      ExperienceScene.tsx   # Timeline cards
      WorkScene.tsx         # Horizontal scroll
      ContactScene.tsx      # Cinematic outro

lib/
  animation/
    index.ts                # Centralized exports
    gsap.ts                 # GSAP configuration
    lenis.ts                # Smooth scroll setup
    useStoryTimeline.ts     # Animation utilities

app/
  layout.tsx              # Root layout with Lenis
  page.tsx                # Main page with all scenes
```

## Scene Architecture

Each scene follows this pattern:

```tsx
export function MyScene() {
  return (
    <StoryScene
      id="my-scene"
      className="h-screen bg-black"
      pinned={true}
      scrollDuration="300vh"
      onBuildTimeline={(tl, refs) => {
        // 1. Set initial states with gsap.set()
        gsap.set(refs.element, { opacity: 0, y: 50 });
        
        // 2. Build timeline with normalized time (0-1)
        tl.to(refs.element, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, 0);
      }}
    >
      {(refs) => (
        <div ref={refs.element}>Content</div>
      )}
    </StoryScene>
  );
}
```

## Key Components

### StoryScene

The foundation of all storytelling scenes. Handles:
- ScrollTrigger setup
- Timeline creation with `scrub: true`
- Automatic cleanup
- Ref management via render props

**Props:**
- `id`: Unique scene identifier
- `className`: Tailwind classes for styling
- `pinned`: Whether to pin during scroll
- `scrollDuration`: How long to pin (e.g., "300vh")
- `onBuildTimeline`: Function to define animations
- `children`: Render prop receiving ref callbacks

### Animation Timeline

Timelines use normalized time (0 to 1):
- `duration: 0.25` = 25% of scroll duration
- Position parameter controls when animation starts
- Use `stagger` for sequential animations
- Use `ease: 'none'` for scroll-linked animations (parallax)

## Scene Breakdown

### 1. HeroScene
- **Duration**: 200vh pinned
- **Animations**:
  - Fade in name/title (0-25%)
  - Scale up dramatically (25-50%)
  - Background parallax (25-75%)
  - Fade out (75-100%)

### 2. AboutScene
- **Duration**: Natural scroll (not pinned)
- **Animations**:
  - Heading fade in (0-30%)
  - Line-by-line text reveal with stagger (20-70%)
  - Philosophy statement fade in (60-100%)

### 3. ExperienceScene
- **Duration**: 300vh pinned
- **Animations**:
  - Heading fade in (0-20%)
  - Timeline cards stagger (20-80%)
  - Fade transition (80-100%)

### 4. WorkScene
- **Duration**: 400vh pinned
- **Animations**:
  - Heading fade in (0-15%)
  - Horizontal scroll (15-85%)
  - Fade out (85-100%)
- **Special**: Uses `translateX` for horizontal scroll effect

### 5. ContactScene
- **Duration**: 200vh pinned
- **Animations**:
  - Background color transition (0-30%)
  - Heading fade/scale (30-60%)
  - Contact links stagger (60-90%)
  - Footer fade in (85-100%)

## Smooth Scroll Integration

Lenis smooth scroll is initialized globally:

```tsx
// app/layout.tsx
<SmoothScrollProvider>
  <div className="relative flex min-h-screen flex-col">
    <main>{children}</main>
  </div>
</SmoothScrollProvider>
```

The RAF loop syncs Lenis with ScrollTrigger:

```ts
function raf(time: number) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
```

## Performance Optimization

### GPU Acceleration
Only animate these properties:
- `transform` (translate, scale, rotate)
- `opacity`

Avoid:
- `width`, `height`, `top`, `left`
- `margin`, `padding`
- `color` (unless necessary)

### Will-Change
Used sparingly on animated elements:
```tsx
<div style={{ willChange: 'transform' }}>
```

### Cleanup
All animations cleaned up automatically:
```ts
useEffect(() => {
  const ctx = gsap.context(() => {
    // Create animations
  });
  
  return () => ctx.revert(); // Cleanup
}, []);
```

## Adding New Scenes

1. Create new scene file in `components/storytelling/scenes/`
2. Follow the StoryScene pattern
3. Define timeline in `onBuildTimeline`
4. Export from `scenes/index.ts`
5. Import and add to `app/page.tsx`

Example:

```tsx
// components/storytelling/scenes/NewScene.tsx
export function NewScene() {
  return (
    <StoryScene
      id="new-scene"
      className="h-screen bg-gradient-to-b from-black to-blue-950"
      pinned
      scrollDuration="250vh"
      onBuildTimeline={(tl, refs) => {
        gsap.set(refs.content, { opacity: 0, scale: 0.8 });
        
        tl.to(refs.content, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, 0);
      }}
    >
      {(refs) => (
        <div ref={refs.content}>
          Your content here
        </div>
      )}
    </StoryScene>
  );
}
```

## Animation Utilities

Use pre-built animation helpers from `lib/animation/useStoryTimeline.ts`:

```ts
import { fadeIn, fadeOut, staggerAnimation } from '@/lib/animation';

// In timeline builder
const config = fadeIn(refs.element, {
  duration: 0.5,
  y: 30,
  stagger: 0.1,
});

applyAnimation(tl, config);
```

## Customization

### Colors
Update background gradients in scene components:
```tsx
className="bg-gradient-to-br from-purple-950 via-blue-950 to-black"
```

### Timing
Adjust scroll duration and animation timings:
```tsx
scrollDuration="350vh"  // Make scene longer
duration: 0.3           // Make animation faster
```

### Easing
Choose appropriate easing:
- `power2.out` - Smooth deceleration (entrances)
- `power2.in` - Smooth acceleration (exits)
- `power3.out` - Strong deceleration
- `none` - Linear (parallax, scroll-linked)

## Best Practices

1. **Always set initial states** with `gsap.set()`
2. **Use normalized time** (0-1) in timelines
3. **Overlap animations** for smooth flow
4. **Test on low-end devices** for performance
5. **Keep timelines simple** - complex logic in utilities
6. **Document animation phases** with comments
7. **Use data attributes** for selector queries
8. **Cleanup is automatic** - trust gsap.context

## Debugging

### ScrollTrigger Markers
Enable for development:
```ts
scrollTriggerConfig={{ markers: true }}
```

### Slow Motion
Test animations in slow motion:
```ts
gsap.globalTimeline.timeScale(0.2);
```

### Check RAF Loop
Verify Lenis is updating:
```ts
console.log(ScrollTrigger.getAll());
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Mobile: iOS Safari 12+, Chrome Android
- Smooth scroll disabled on mobile for performance

## Future Enhancements

Consider adding:
- Split text animation (requires SplitText plugin)
- 3D transforms (perspective, rotateX/Y)
- WebGL backgrounds (Three.js, Pixi.js)
- Mouse parallax effects
- Cursor animations
- Page transitions
- Sound design integration

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)
- [Lenis GitHub](https://github.com/studio-freight/lenis)
- [Performance Tips](https://web.dev/animations/)

---

**Built with precision. Crafted with passion.**
