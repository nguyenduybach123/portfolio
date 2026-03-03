/**
 * ExperienceScene Component
 * 
 * Career timeline with pinned section and card animations.
 * 
 * Advanced Features:
 * - Responsive animation timing
 * - Device-based stagger adjustments
 * - Reduced motion support
 * 
 * Timeline breakdown:
 * - 0-20%: Fade in heading
 * - 20-80%: Cards fade and slide in sequentially
 * - 80-100%: Fade out for transition
 * 
 * Technical notes:
 * - Pinned for 300vh scroll duration
 * - Timeline-style vertical layout
 * - Staggered card animations
 * - GPU-accelerated (transform + opacity)
 */

'use client';

import { StoryScene } from '../StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
}

const experiences: Experience[] = [
  {
    year: '2024 - Present',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Leading development of scalable web applications with modern tech stack.',
  },
  {
    year: '2022 - 2024',
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    description: 'Built complex web applications with React, Node.js, and cloud services.',
  },
  {
    year: '2020 - 2022',
    title: 'Frontend Developer',
    company: 'Creative Studio',
    description: 'Crafted beautiful user interfaces with focus on animation and interaction.',
  },
  {
    year: '2018 - 2020',
    title: 'Junior Developer',
    company: 'StartUp Labs',
    description: 'Started journey in web development, learning modern frameworks and tools.',
  },
];

export function ExperienceScene() {
  return (
    <StoryScene
      id="experience-scene"
      className="relative h-screen w-full bg-gradient-to-b from-black via-blue-950 to-black"
      pinned
      scrollDuration="300vh"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Responsive stagger timing
        const staggerDelay = capabilities.isLowPower ? 0.1 : capabilities.isMobile ? 0.12 : 0.15;
        
        // Set initial states
        gsap.set(refs.heading, {
          opacity: 0,
          y: -50,
        });

        gsap.set(refs.timeline, {
          opacity: 0.3,
        });

        gsap.set('[data-experience-card]', {
          opacity: 0,
          x: capabilities.isMobile ? -50 : -100, // Less distance on mobile
          scale: 0.9,
        });

        // Build timeline
        tl
          // Phase 1: Heading fade in (0 - 0.2)
          .to(refs.heading, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, 0)
          .to(refs.timeline, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          }, 0)
          
          // Phase 2: Stagger cards (0.2 - 0.8)
          .to('[data-experience-card]', {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: staggerDelay, // Responsive stagger
            ease: 'power3.out',
          }, 0.2)
          
          // Phase 3: Subtle fade for transition (0.8 - 1.0)
          .to([refs.heading, '[data-experience-card]'], {
            opacity: 0.3,
            duration: 0.2,
            ease: 'power2.in',
          }, 0.8);
      }}
    >
      {(refs) => (
        <div className="relative h-full w-full flex items-center justify-center px-6">
          {/* Noise overlay */}
          <NoiseOverlay opacity={0.02} animate={false} />
          
          <div className="max-w-4xl w-full relative z-10">
            {/* Section heading */}
            <h2
              ref={refs.heading}
              className="text-4xl font-bold text-white md:text-6xl lg:text-7xl mb-16 text-center"
            >
              Experience
            </h2>

            {/* Timeline container */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div
                ref={refs.timeline}
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500"
                aria-hidden="true"
              />

              {/* Experience cards */}
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    data-experience-card
                    className="relative pl-20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-purple-500 border-4 border-black" />

                    {/* Card content */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-950/40 to-blue-950/40 border border-purple-500/20 backdrop-blur-sm">
                      <div className="text-sm text-purple-400 font-semibold mb-2">
                        {exp.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <div className="text-lg text-blue-300 mb-3">
                        {exp.company}
                      </div>
                      <p className="text-gray-400">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </StoryScene>
  );
}
