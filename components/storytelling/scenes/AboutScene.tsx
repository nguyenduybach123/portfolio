/**
 * AboutScene Component
 * 
 * Personal philosophy section with animated line-by-line text reveal.
 * 
 * Advanced Features:
 * - Text masking with overflow hidden
 * - Staggered reveal animation
 * - Responsive animation speed
 * - Reduced motion support
 * 
 * Timeline breakdown:
 * - 0-30%: Fade in section heading
 * - 20-70%: Staggered line-by-line text reveal (opacity + translateY)
 * - 60-100%: Fade in philosophy statement
 * 
 * Technical notes:
 * - Non-pinned (scrolls naturally)
 * - Stagger animation for text lines
 * - GPU-accelerated (opacity + translateY only)
 * - Overlapping animations for smooth flow
 */

'use client';

import { StoryScene } from '../StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

const philosophyLines = [
  "Design is not just what it looks like.",
  "Design is how it works.",
  "Every interaction tells a story.",
  "Every detail matters.",
];

export function AboutScene() {
  return (
    <StoryScene
      id="about-scene"
      className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-950 to-black py-32"
      pinned={false}
      start="top bottom"
      end="bottom top"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Adjust animation speed based on device
        const staggerDelay = capabilities.isLowPower ? 0.05 : capabilities.isMobile ? 0.08 : 0.1;
        
        // Set initial states
        gsap.set(refs.heading, {
          opacity: 0,
          y: -30,
        });

        gsap.set(refs.subheading, {
          opacity: 0,
          y: 20,
        });

        // Text masking: wrap with overflow hidden
        gsap.set('[data-philosophy-line]', {
          opacity: 0,
          y: 50,
        });

        gsap.set(refs.statement, {
          opacity: 0,
          y: 30,
          scale: 0.95,
        });

        // Build timeline
        tl
          // Phase 1: Heading fade in (0 - 0.3)
          .to(refs.heading, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0)
          .to(refs.subheading, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.1)
          
          // Phase 2: Staggered line reveal (0.2 - 0.7)
          .to('[data-philosophy-line]', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: staggerDelay, // Responsive stagger delay
            ease: 'power2.out',
          }, 0.2)
          
          // Phase 3: Statement fade in (0.6 - 1.0)
          .to(refs.statement, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
          }, 0.6);
      }}
    >
      {(refs) => (
        <div className="container mx-auto px-6">
          {/* Noise overlay */}
          <NoiseOverlay opacity={0.02} animate={false} />
          <div className="max-w-4xl mx-auto">
            {/* Section heading */}
            <div className="mb-16 text-center">
              <h2
                ref={refs.heading}
                className="text-4xl font-bold text-white md:text-6xl lg:text-7xl mb-4"
              >
                About Me
              </h2>
              <p
                ref={refs.subheading}
                className="text-xl text-gray-400 md:text-2xl"
              >
                Personal Philosophy
              </p>
            </div>

            {/* Philosophy lines with text masking */}
            <div className="space-y-8 mb-16">
              {philosophyLines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <div
                    data-philosophy-line
                    className="text-2xl md:text-4xl lg:text-5xl font-light text-purple-200 text-center"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {line}
                  </div>
                </div>
              ))}
            </div>

            {/* Philosophy statement */}
            <div
              ref={refs.statement}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-500/20"
            >
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                I believe in creating experiences that are not only visually stunning but also 
                deeply functional. Every line of code, every animation, every interaction is crafted 
                with intention. My work sits at the intersection of art and engineering, where 
                creativity meets performance, and where users find delight in the details.
              </p>
            </div>
          </div>
        </div>
      )}
    </StoryScene>
  );
}
