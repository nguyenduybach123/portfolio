/**
 * HeroScene Component
 * 
 * Cinematic hero section with scroll-controlled identity statement.
 * 
 * Advanced Features:
 * - Multi-layer parallax (background, midground, foreground)
 * - Background color interpolation
 * - Noise/grain overlay
 * - Responsive animations based on device
 * - Accessibility: respects reduced motion
 * 
 * Timeline breakdown:
 * - 0-25%: Fade in name and title with scale
 * - 25-50%: Dramatic scale up
 * - 50-75%: Parallax background movement
 * - 75-100%: Fade out entire scene
 * 
 * Technical notes:
 * - 100vh viewport height
 * - Pinned for 200vh scroll duration
 * - GPU-accelerated transforms (scale, opacity, translateY)
 * - Background parallax effect
 * - Automatic cleanup via StoryScene
 */

'use client';

import { StoryScene } from '../StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { createParallaxLayers, createColorInterpolation } from '@/lib/animation/effects';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

export function HeroScene() {
  return (
    <StoryScene
      id="hero-scene"
      className="relative h-screen w-full overflow-hidden"
      pinned
      scrollDuration="200vh"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Set initial states
        gsap.set([refs.name, refs.title, refs.tagline], {
          opacity: 0,
          scale: 0.8,
          y: 30,
        });

        gsap.set(refs.background, {
          scale: 1,
        });

        gsap.set(refs.overlay, {
          opacity: 0.6,
        });

        // Multi-layer parallax (only on capable devices)
        if (!capabilities.isLowPower && !capabilities.prefersReducedMotion) {
          createParallaxLayers(
            tl,
            [
              { selector: refs.background!, speed: 0.5, direction: 'vertical' },
              { selector: refs.decorLeft!, speed: 0.3, direction: 'vertical' },
              { selector: refs.decorRight!, speed: 0.7, direction: 'vertical' },
            ],
            { start: 0.25, duration: 0.5 }
          );
        }

        // Background color interpolation
        createColorInterpolation(
          tl,
          refs.background!,
          ['#2D1B69', '#1E3A8A', '#000000'], // Purple -> Blue -> Black
          { start: 0, duration: 1 }
        );

        // Build timeline
        tl
          // Phase 1: Fade in identity (0 - 0.25)
          .to(refs.name, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          }, 0)
          .to(refs.title, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          }, 0.05)
          .to(refs.tagline, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          }, 0.1)
          
          // Phase 2: Dramatic scale up (0.25 - 0.5)
          .to([refs.name, refs.title], {
            scale: capabilities.isMobile ? 1.1 : 1.2, // Less scale on mobile
            duration: 0.25,
            ease: 'power1.inOut',
          }, 0.25)
          
          // Phase 4: Fade out (0.75 - 1.0)
          .to([refs.name, refs.title, refs.tagline], {
            opacity: 0,
            scale: 1.5,
            y: -100,
            duration: 0.25,
            ease: 'power2.in',
          }, 0.75)
          .to(refs.overlay, {
            opacity: 1,
            duration: 0.25,
            ease: 'power2.in',
          }, 0.75);
      }}
    >
      {(refs) => (
        <>
          {/* Background with parallax */}
          <div
            ref={refs.background}
            className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-black"
            style={{ willChange: 'transform, background-color' }}
            aria-hidden="true"
          />

          {/* Decorative parallax elements */}
          <div
            ref={refs.decorLeft}
            className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          />
          <div
            ref={refs.decorRight}
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            style={{ willChange: 'transform' }}
            aria-hidden="true"
          />

          {/* Noise overlay */}
          <NoiseOverlay opacity={0.03} animate={false} />

          {/* Dark overlay for fade out */}
          <div
            ref={refs.overlay}
            className="absolute inset-0 bg-black pointer-events-none"
            aria-hidden="true"
          />

          {/* Content container */}
          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <div className="text-center max-w-5xl">
              {/* Name */}
              <h1
                ref={refs.name}
                className="mb-4 text-5xl font-bold text-white md:text-7xl lg:text-8xl"
                style={{ willChange: 'transform, opacity' }}
              >
                Creative Developer
              </h1>

              {/* Title/Role */}
              <p
                ref={refs.title}
                className="mb-6 text-2xl font-light text-purple-300 md:text-4xl lg:text-5xl"
                style={{ willChange: 'transform, opacity' }}
              >
                Crafting Digital Experiences
              </p>

              {/* Tagline */}
              <p
                ref={refs.tagline}
                className="text-lg text-gray-400 md:text-xl lg:text-2xl max-w-3xl mx-auto"
                style={{ willChange: 'transform, opacity' }}
              >
                Where storytelling meets technology
              </p>
            </div>
          </div>

          {/* Scroll indicator (optional) */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
            <div className="flex flex-col items-center gap-2">
              <span>Scroll to explore</span>
              <svg
                className="w-6 h-6 animate-bounce"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </>
      )}
    </StoryScene>
  );
}
