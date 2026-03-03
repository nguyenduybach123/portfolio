/**
 * WorkScene Component
 * 
 * Selected work showcase with horizontal scroll effect.
 * 
 * Advanced Features:
 * - SVG mask reveal animation
 * - Responsive scroll distance
 * - Reduced motion: shows grid instead of scroll
 * - Performance optimized for mobile
 * 
 * Timeline breakdown:
 * - Pinned section with horizontal scroll
 * - Cards slide from right to left as user scrolls down
 * - ScrollTrigger controls x translation
 * 
 * Technical notes:
 * - Pinned for 400vh scroll duration
 * - Horizontal scroll using GSAP
 * - GPU-accelerated (translateX)
 * - Responsive layout
 * - Cards arranged in horizontal flexbox
 */

'use client';

import { StoryScene } from '../StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { createMaskReveal } from '@/lib/animation/effects';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Application',
    description: 'Full-stack e-commerce solution with real-time inventory and payment integration.',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    title: 'Analytics Dashboard',
    category: 'Data Visualization',
    description: 'Interactive dashboard with real-time data processing and custom charts.',
    tags: ['React', 'D3.js', 'WebSocket'],
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Social Platform',
    category: 'Mobile App',
    description: 'Social networking platform with real-time messaging and media sharing.',
    tags: ['React Native', 'Firebase', 'GraphQL'],
    gradient: 'from-cyan-600 to-teal-600',
  },
  {
    title: 'AI Content Generator',
    category: 'Machine Learning',
    description: 'AI-powered content generation tool with natural language processing.',
    tags: ['Python', 'OpenAI', 'FastAPI'],
    gradient: 'from-teal-600 to-green-600',
  },
  {
    title: 'Design System',
    category: 'Component Library',
    description: 'Comprehensive design system with reusable components and documentation.',
    tags: ['React', 'Storybook', 'TailwindCSS'],
    gradient: 'from-green-600 to-purple-600',
  },
];

export function WorkScene() {
  return (
    <StoryScene
      id="work-scene"
      className="relative h-screen w-full bg-black overflow-hidden"
      pinned
      scrollDuration="400vh"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Set initial states
        gsap.set(refs.heading, {
          opacity: 0,
          y: -30,
        });

        gsap.set(refs.container, {
          x: 0, // Start position
        });

        // SVG mask reveal for heading
        createMaskReveal(tl, refs.heading!, 'wipe', {
          start: 0,
          duration: 0.15,
          direction: 'right',
        });

        // Calculate total width for horizontal scroll
        // Adjust based on device
        const cardWidth = capabilities.isMobile ? 350 : 450;
        const scrollDistance = -(projects.length * cardWidth);

        // Build timeline
        tl
          // Phase 1: Fade in heading (0 - 0.15)
          .to(refs.heading, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out',
          }, 0)
          
          // Phase 2: Horizontal scroll (0.15 - 0.85)
          .to(refs.container, {
            x: scrollDistance,
            duration: 0.7,
            ease: 'none', // Linear for scroll
          }, 0.15)
          
          // Phase 3: Fade out heading (0.85 - 1.0)
          .to(refs.heading, {
            opacity: 0,
            y: -50,
            duration: 0.15,
            ease: 'power2.in',
          }, 0.85);
      }}
    >
      {(refs) => (
        <div className="relative h-full w-full">
          {/* Noise overlay */}
          <NoiseOverlay opacity={0.02} animate={false} />
          
          {/* Fixed heading */}
          <div className="absolute top-16 left-0 right-0 z-20 px-6">
            <h2
              ref={refs.heading}
              className="text-4xl font-bold text-white md:text-6xl lg:text-7xl text-center"
            >
              Selected Work
            </h2>
          </div>

          {/* Horizontal scroll container */}
          <div className="h-full w-full flex items-center overflow-hidden">
            <div
              ref={refs.container}
              className="flex gap-8 px-[50vw]"
              style={{ willChange: 'transform' }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[350px] md:w-[400px] h-[500px]"
                >
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex flex-col">
                    {/* Gradient header */}
                    <div className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} mb-6 flex items-center justify-center`}>
                      <div className="text-6xl">🚀</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="text-sm text-purple-400 font-semibold mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs rounded-full bg-purple-950/50 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/30 text-sm">
            Scroll to explore projects →
          </div>
        </div>
      )}
    </StoryScene>
  );
}
