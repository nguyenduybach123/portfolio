# Cinematic Scroll Storytelling - Technical Documentation

## 🎯 Overview

Production-ready scroll-based storytelling system built with:
- **Next.js App Router** (React 19)
- **TypeScript** (strict mode, no `any`)
- **GSAP + ScrollTrigger** (pinning, scrubbing, timelines)
- **Lenis** (smooth scroll)
- **TailwindCSS** (styling)

## 📦 Installation

```bash
pnpm add gsap @studio-freight/lenis
```

**Dependencies installed:**
- `gsap@3.14.2` - Animation library
- `@studio-freight/lenis@1.0.42` - Smooth scroll

## 🏗️ Architecture

### Core Principles

1. **Separation of Concerns**
   - Animation logic in `lib/animation/`
   - Reusable components in `components/storytelling/`
   - Scene composition in `app/page.tsx`

2. **Performance Optimization**
   - Only animate `transform` and `opacity` (GPU-accelerated)
   - `scrub: true` links scroll to animation (no RAF overhead)
   - `gsap.context()` for automatic cleanup (no memory leaks)
   - Animations run outside React render cycle

3. **Type Safety**
   - Strict TypeScript mode
   - Typed timeline builders
   - Type-safe ref management
   - No `any` types

## 📁 File Structure

```
lib/
  animation/
    gsap.ts           # GSAP + ScrollTrigger setup
    lenis.ts          # Lenis smooth scroll hooks

components/
  SmoothScrollProvider.tsx  # Lenis integration wrapper
  storytelling/
    StoryScene.tsx    # Reusable pinning container
    HeroScene.tsx     # Example: Pinned timeline
    IntroScene.tsx    # Example: Stagger animation

app/
  layout.tsx          # Root layout with Lenis
  page.tsx            # Scene composition
```

## 🎬 Component API

### StoryScene

Reusable scroll-triggered animation container.

**Props:**
```typescript
interface StorySceneProps {
  id: string;                    // Unique identifier
  className?: string;            // TailwindCSS classes
  pinned?: boolean;              // Pin during scroll
  scrollDuration?: string;       // e.g., "300vh"
  onBuildTimeline?: (
    timeline: gsap.core.Timeline,
    elements: Record<string, HTMLElement | null>
  ) => void;
  children: (refs: Record<string, (el: HTMLElement | null) => void>) => ReactNode;
  start?: string;                // ScrollTrigger start
  end?: string;                  // ScrollTrigger end
  scrollTriggerConfig?: Partial<ScrollTrigger.Vars>;
}
```

**Usage:**
```tsx
<StoryScene
  id="hero"
  className="h-screen"
  pinned
  scrollDuration="300vh"
  onBuildTimeline={(tl, refs) => {
    tl.to(refs.title, { opacity: 1, scale: 1.2 })
      .to(refs.title, { opacity: 0 });
  }}
>
  {(refs) => (
    <h1 ref={refs.title}>Title</h1>
  )}
</StoryScene>
```

## 🎨 Animation Patterns

### Pattern 1: Pinned Timeline (HeroScene)

**Characteristics:**
- Fixed viewport position
- Extended scroll duration (300vh)
- Multi-phase timeline

**Timeline breakdown:**
```typescript
// Phase 1: Fade in (0-25% scroll)
tl.to(refs.title, { opacity: 1, scale: 1, duration: 1 }, 0)

// Phase 2: Scale up (25-50% scroll)
.to(refs.title, { scale: 1.5, duration: 1 }, 1)

// Phase 3: Fade out (50-100% scroll)
.to(refs.title, { opacity: 0, scale: 2, duration: 2 }, 2)
```

**Key features:**
- `pinned: true` - Locks section in place
- `scrollDuration: "300vh"` - 3x viewport scroll length
- `scrub: true` - Scroll controls animation progress

### Pattern 2: Stagger Animation (IntroScene)

**Characteristics:**
- Natural scroll flow (not pinned)
- Sequential element entrance
- Overlapping animations

**Timeline breakdown:**
```typescript
// Overlapping animations for smooth flow
tl.to(refs.heading, { opacity: 1, y: 0, duration: 0.3 }, 0)
  .to('[data-card]', {
    opacity: 1,
    y: 0,
    stagger: 0.15,    // 150ms delay between cards
    duration: 0.4,
  }, 0.2)              // Starts before heading completes
  .to(refs.footer, { opacity: 1, y: 0, duration: 0.3 }, 0.7)
```

**Key features:**
- `stagger: 0.15` - Sequential delays
- Overlapping start times for smooth flow
- Class selectors for multiple elements

## 🚀 Performance Considerations

### 1. GPU Acceleration

**Only animate these properties:**
- `transform: translate()` / `translateX()` / `translateY()`
- `transform: scale()`
- `opacity`

**Never animate:**
- `width`, `height`, `top`, `left` (causes layout thrashing)
- `margin`, `padding` (forces reflow)

### 2. Memory Management

**Automatic cleanup via `gsap.context()`:**
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here...
  }, containerRef);

  return () => ctx.revert(); // Kills all animations + ScrollTriggers
}, []);
```

### 3. Scroll Sync

**Lenis + ScrollTrigger integration:**
```typescript
function raf(time: number) {
  lenis?.raf(time);
  ScrollTrigger.update(); // Sync on every frame
  requestAnimationFrame(raf);
}
```

### 4. Initial State Management

**Set initial states with `gsap.set()`:**
```typescript
// Prevents FOUC (Flash of Unstyled Content)
gsap.set(refs.title, { opacity: 0, scale: 0.8 });
```

## 🔧 Customization

### Creating Custom Scenes

```typescript
export function CustomScene() {
  return (
    <StoryScene
      id="custom"
      className="min-h-screen"
      pinned={false}
      onBuildTimeline={(tl, refs) => {
        // Your custom timeline
        tl.to(refs.element, { /* ... */ });
      }}
    >
      {(refs) => (
        <div ref={refs.element}>Content</div>
      )}
    </StoryScene>
  );
}
```

### Advanced: Typed Scenes

```typescript
const TypedScene = createStoryScene<'title' | 'subtitle'>();

<TypedScene
  id="typed"
  onBuildTimeline={(tl, refs) => {
    refs.title    // ✅ TypeScript knows this exists
    refs.subtitle // ✅ TypeScript knows this exists
    refs.unknown  // ❌ TypeScript error
  }}
>
  {(refs) => (
    <>
      <h1 ref={refs.title}>Title</h1>
      <h2 ref={refs.subtitle}>Subtitle</h2>
    </>
  )}
</TypedScene>
```

## 🎯 Best Practices

### 1. Timeline Composition

**Structure timelines logically:**
```typescript
onBuildTimeline={(tl, refs) => {
  // Set initial states first
  gsap.set([refs.el1, refs.el2], { opacity: 0 });

  // Build timeline in phases
  tl
    .to(refs.el1, { /* phase 1 */ }, 0)
    .to(refs.el2, { /* phase 2 */ }, 0.5)
    .to(refs.el1, { /* phase 3 */ }, 1);
}
```

### 2. Scroll Duration

**Guidelines:**
- Hero/Intro: `200vh - 400vh`
- Content sections: `100vh - 200vh`
- Transitions: `50vh - 100vh`

### 3. Easing Functions

**For scroll-scrubbed timelines:**
- Use `ease: 'none'` (linear) for main ScrollTrigger
- Add easing to individual tweens for smoothness

```typescript
tl.to(refs.element, {
  opacity: 1,
  duration: 1,
  ease: 'power2.out', // Applied to this tween only
})
```

### 4. Debugging

**Enable ScrollTrigger markers:**
```typescript
scrollTriggerConfig={{
  markers: true, // Shows start/end positions
}}
```

## 🐛 Troubleshooting

### Issue: Animations don't trigger

**Solution:** Check ScrollTrigger start/end positions
```typescript
scrollTriggerConfig={{
  markers: true,  // Visualize triggers
}}
```

### Issue: Jerky scroll

**Solution:** Ensure RAF loop is running
```typescript
// Check in browser console:
ScrollTrigger.getAll() // Should show your triggers
```

### Issue: Memory leaks

**Solution:** Always use `gsap.context()`
```typescript
useEffect(() => {
  const ctx = gsap.context(() => { /* ... */ }, ref);
  return () => ctx.revert(); // REQUIRED
}, []);
```

## 📚 Additional Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Shane Sayers Portfolio](https://shanesayers.com/) (inspiration)

## 🚀 Next Steps

1. **Add more scenes:**
   - About scene with parallax
   - Projects scene with horizontal scroll
   - Contact scene with reveal

2. **Enhance animations:**
   - Add SVG path animations
   - Implement text split animations
   - Create custom easing functions

3. **Optimize:**
   - Lazy load heavy scenes
   - Add IntersectionObserver for off-screen scenes
   - Implement preloading strategy

## 📄 License

This implementation is production-ready and follows industry best practices for:
- Performance
- Type safety
- Maintainability
- Scalability

Built with ❤️ for cinematic web experiences.
