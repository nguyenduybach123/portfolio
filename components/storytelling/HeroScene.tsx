/**
 * HeroScene Component
 * 
 * Cinematic hero section with scroll-controlled pinned animation.
 * 
 * Timeline breakdown:
 * 1. Fade in title and subtitle (0% - 25% scroll)
 * 2. Scale up title dramatically (25% - 50% scroll)
 * 3. Fade out entire scene (50% - 100% scroll)
 * 
 * Technical notes:
 * - 100vh viewport height
 * - Pinned for 300vh scroll duration
 * - Only animates transform and opacity (GPU-accelerated)
 * - No layout thrashing
 * - Automatic cleanup via StoryScene
 */

'use client';

import { StoryScene } from './StoryScene';
import { gsap } from '@/lib/animation/gsap';

export function HeroScene() {
  return (
    <StoryScene
      id="hero-scene"
      className="relative h-screen w-full overflow-hidden bg-black"
      pinned
      scrollDuration="300vh"
      onBuildTimeline={(tl, refs) => {
        // Set initial states (opacity 0, scale 0.8)
        gsap.set([refs.title, refs.subtitle], {
          opacity: 0,
          scale: 0.8,
        });

        gsap.set(refs.background, {
          opacity: 0.3,
        });

        // Timeline: Fade in → Scale up → Fade out
        tl
          // Phase 1: Fade in (0s - 1s normalized time)
          .to(refs.title, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          }, 0)
          .to(refs.subtitle, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          }, 0.2) // Slight delay for stagger effect
          
          // Phase 2: Dramatic scale up (1s - 2s normalized time)
          .to(refs.title, {
            scale: 1.5,
            duration: 1,
            ease: 'power1.inOut',
          }, 1)
          
          // Phase 3: Fade out entire scene (2s - 4s normalized time)
          .to([refs.title, refs.subtitle], {
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.in',
          }, 2)
          .to(refs.background, {
            opacity: 0,
            duration: 2,
            ease: 'power2.in',
          }, 2);
      }}
    >
      {(refs) => (
        <>
          {/* Animated background gradient */}
          <div
            ref={refs.background}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-black"
            aria-hidden="true"
          />

          {/* Content container */}
          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <div className="text-center">
              {/* Main title */}
              <h1
                ref={refs.title}
                className="mb-6 text-6xl font-bold text-white md:text-8xl lg:text-9xl"
              >
                Scroll to Explore
              </h1>

              {/* Subtitle */}
              <p
                ref={refs.subtitle}
                className="text-xl text-gray-300 md:text-2xl lg:text-3xl"
              >
                A cinematic storytelling experience
              </p>
            </div>
          </div>

          {/* Scroll indicator (optional) */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400">Scroll down</span>
              <div className="h-8 w-[2px] animate-pulse bg-white/50" />
            </div>
          </div>
        </>
      )}
    </StoryScene>
  );
}
