/**
 * IntroScene Component
 * 
 * Content section with staggered entrance animations.
 * Demonstrates overlapping, sequential animations for multiple elements.
 * 
 * Timeline breakdown:
 * 1. Fade in heading (0% - 30% scroll)
 * 2. Stagger in cards with slide + fade (20% - 80% scroll)
 * 3. Fade in footer text (70% - 100% scroll)
 * 
 * Technical notes:
 * - Non-pinned (scrolls naturally)
 * - Stagger pattern for multiple elements
 * - Overlapping animations for smooth flow
 * - GPU-accelerated (translate + opacity)
 */

'use client';

import { StoryScene } from './StoryScene';
import { gsap } from '@/lib/animation/gsap';

interface Card {
  id: string;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    id: 'card-1',
    title: 'Performance First',
    description: 'GPU-accelerated animations with zero layout thrashing.',
  },
  {
    id: 'card-2',
    title: 'Type Safe',
    description: 'Full TypeScript support with strict mode enabled.',
  },
  {
    id: 'card-3',
    title: 'Production Ready',
    description: 'Proper cleanup, no memory leaks, optimized for scale.',
  },
];

export function IntroScene() {
  return (
    <StoryScene
      id="intro-scene"
      className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black py-32"
      pinned={false} // Scrolls naturally
      onBuildTimeline={(tl, refs) => {
        // Set initial states
        gsap.set(refs.heading, {
          opacity: 0,
          y: -50,
        });

        gsap.set(refs.footer, {
          opacity: 0,
          y: 30,
        });

        // Set card initial states using class selector
        gsap.set('[data-card]', {
          opacity: 0,
          y: 100,
          scale: 0.9,
        });

        // Timeline with overlapping animations
        tl
          // Phase 1: Fade in heading (0 - 0.3)
          .to(refs.heading, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0)
          
          // Phase 2: Stagger cards (0.2 - 0.8)
          // Note: Starts at 0.2 (overlaps with heading animation)
          .to('[data-card]', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.15, // Delay between each card
            ease: 'power3.out',
          }, 0.2)
          
          // Phase 3: Fade in footer (0.7 - 1.0)
          // Overlaps with last cards
          .to(refs.footer, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.7);
      }}
    >
      {(refs) => (
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="mb-16 text-center">
            <h2
              ref={refs.heading}
              className="text-5xl font-bold text-white md:text-6xl lg:text-7xl"
            >
              Built for Scale
            </h2>
          </div>

          {/* Cards grid */}
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.id}
                data-card
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-gray-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer text */}
          <div className="text-center">
            <p
              ref={refs.footer}
              className="text-lg text-gray-500 md:text-xl"
            >
              Scroll-controlled animations powered by GSAP + Lenis
            </p>
          </div>
        </div>
      )}
    </StoryScene>
  );
}
