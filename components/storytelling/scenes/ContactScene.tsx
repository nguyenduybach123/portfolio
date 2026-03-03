/**
 * ContactScene Component
 * 
 * Cinematic outro with call-to-action and background color transition.
 * 
 * Advanced Features:
 * - Background color interpolation using GSAP
 * - Noise/grain overlay for cinematic feel
 * - Responsive link sizing
 * - Accessibility support
 * 
 * Timeline breakdown:
 * - 0-30%: Background color transition from black to deep purple
 * - 30-60%: Fade in main heading with scale
 * - 60-100%: Fade in contact links with stagger
 * 
 * Technical notes:
 * - Pinned for 200vh scroll duration
 * - Background color animation using GSAP
 * - Centered call-to-action
 * - Final scene with strong visual impact
 */

'use client';

import { StoryScene } from '../StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

const contactLinks: ContactLink[] = [
  {
    label: 'Email Me',
    href: 'mailto:your.email@example.com',
    icon: '✉️',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: '💼',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: '🐙',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: '🐦',
  },
];

export function ContactScene() {
  return (
    <StoryScene
      id="contact-scene"
      className="relative h-screen w-full overflow-hidden"
      pinned
      scrollDuration="200vh"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Responsive stagger
        const staggerDelay = capabilities.isLowPower ? 0.05 : capabilities.isMobile ? 0.06 : 0.08;
        
        // Set initial states
        gsap.set(refs.background, {
          backgroundColor: '#000000', // Black
        });

        gsap.set([refs.heading, refs.subheading], {
          opacity: 0,
          scale: 0.8,
          y: 50,
        });

        gsap.set('[data-contact-link]', {
          opacity: 0,
          y: 30,
          scale: 0.9,
        });

        gsap.set(refs.footer, {
          opacity: 0,
        });

        // Build timeline
        tl
          // Phase 1: Background color transition (0 - 0.3)
          .to(refs.background, {
            backgroundColor: '#2D1B69', // Deep purple
            duration: 0.3,
            ease: 'power2.inOut',
          }, 0)
          
          // Phase 2: Heading fade in (0.3 - 0.6)
          .to(refs.heading, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.out',
          }, 0.3)
          .to(refs.subheading, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.out',
          }, 0.4)
          
          // Phase 3: Contact links stagger (0.6 - 0.9)
          .to('[data-contact-link]', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            stagger: staggerDelay, // Responsive stagger
            ease: 'power3.out',
          }, 0.6)
          
          // Phase 4: Footer fade in (0.85 - 1.0)
          .to(refs.footer, {
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out',
          }, 0.85);
      }}
    >
      {(refs) => (
        <>
          {/* Animated background */}
          <div
            ref={refs.background}
            className="absolute inset-0"
            style={{ willChange: 'background-color' }}
          />

          {/* Noise overlay for cinematic feel */}
          <NoiseOverlay opacity={0.04} animate={true} />

          {/* Background gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30"
            aria-hidden="true"
          />

          {/* Content container */}
          <div className="relative z-10 flex flex-col h-full items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              {/* Main heading */}
              <h2
                ref={refs.heading}
                className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl"
              >
                Let's Create Together
              </h2>

              {/* Subheading */}
              <p
                ref={refs.subheading}
                className="mb-12 text-xl text-purple-200 md:text-2xl lg:text-3xl max-w-2xl mx-auto"
              >
                Have a project in mind? Let's bring your vision to life.
              </p>

              {/* Contact links */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    data-contact-link
                    className="group px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-3 text-white font-semibold">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span className="text-lg">{link.label}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              ref={refs.footer}
              className="absolute bottom-8 left-0 right-0 text-center"
            >
              <p className="text-white/50 text-sm">
                © 2026 · Crafted with passion and precision
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
        </>
      )}
    </StoryScene>
  );
}
