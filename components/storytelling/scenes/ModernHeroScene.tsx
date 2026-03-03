/**
 * ModernHeroScene Component
 * 
 * Inspired by modern portfolio design with:
 * - Large, clean typography
 * - Decorative dot patterns
 * - Floating abstract shapes
 * - Minimal, professional aesthetic
 * - Subtle animations on scroll
 * 
 * Design Features:
 * - White background with accent colors
 * - Large headline with name highlight
 * - Subtitle with professional description
 * - CTA button
 * - Contact information
 * - Decorative elements with gentle animation
 * 
 * Technical:
 * - Non-pinned natural scroll
 * - Fade in on entry
 * - Parallax decorative elements
 * - Responsive design
 */

'use client';

import { StoryScene } from '../StoryScene';
import { gsap } from '@/lib/animation/gsap';
import { createParallaxLayers } from '@/lib/animation/effects';

export function ModernHeroScene() {
  return (
    <StoryScene
      id="modern-hero-scene"
      className="relative min-h-screen w-full bg-white overflow-hidden"
      pinned={false}
      start="top bottom"
      end="bottom top"
      onBuildTimeline={(tl, refs, capabilities) => {
        // Set initial states
        gsap.set([refs.greeting, refs.name, refs.subtitle], {
          opacity: 0,
          y: 30,
        });

        gsap.set(refs.cta, {
          opacity: 0,
          y: 20,
        });

        gsap.set(refs.contact, {
          opacity: 0,
        });

        gsap.set('[data-dot]', {
          opacity: 0,
          scale: 0,
        });

        gsap.set('[data-float-shape]', {
          opacity: 0,
          scale: 0,
          rotation: 0,
        });

        // Parallax for floating shapes (if capable)
        if (!capabilities.isLowPower && !capabilities.prefersReducedMotion) {
          createParallaxLayers(
            tl,
            [
              { selector: '[data-float-shape="1"]', speed: 0.3, direction: 'vertical' },
              { selector: '[data-float-shape="2"]', speed: 0.5, direction: 'vertical' },
              { selector: '[data-float-shape="3"]', speed: 0.4, direction: 'vertical' },
              { selector: '[data-float-shape="4"]', speed: 0.6, direction: 'vertical' },
            ],
            { start: 0, duration: 1 }
          );
        }

        // Build entrance timeline
        tl
          // Dots appear first (0 - 0.2)
          .to('[data-dot]', {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            stagger: 0.02,
            ease: 'back.out(1.7)',
          }, 0)
          
          // Main text appears (0.1 - 0.4)
          .to(refs.greeting, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.1)
          .to(refs.name, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.15)
          .to(refs.subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.2)
          
          // CTA button (0.3 - 0.5)
          .to(refs.cta, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, 0.3)
          
          // Floating shapes appear (0.2 - 0.6)
          .to('[data-float-shape]', {
            opacity: 0.6,
            scale: 1,
            rotation: 360,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power3.out',
          }, 0.2)
          
          // Contact info (0.4 - 0.6)
          .to(refs.contact, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          }, 0.4);
      }}
    >
      {(refs) => (
        <>
          {/* Dot pattern - top left */}
          <div className="absolute top-0 left-0 p-8" aria-hidden="true">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  data-dot
                  className="w-2 h-2 rounded-full bg-orange-500"
                  style={{ 
                    willChange: 'transform, opacity',
                    transitionDelay: `${i * 20}ms` 
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main content container */}
          <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
            <div className="max-w-4xl">
              {/* Headline */}
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
                  <span 
                    ref={refs.greeting}
                    className="text-gray-800 inline-block"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    Hi ! I'm{' '}
                  </span>
                  <span 
                    ref={refs.name}
                    className="text-orange-500 inline-block"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    Daniel.
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p
                ref={refs.subtitle}
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl"
                style={{ willChange: 'transform, opacity' }}
              >
                I'm a Freelance UI/UX Designer and Developer based in London, England.
              </p>

              {/* CTA Button */}
              <button
                ref={refs.cta}
                className="px-8 py-4 bg-orange-500 text-white font-semibold tracking-wide hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                style={{ willChange: 'transform, opacity' }}
              >
                MORE ABOUT ME
              </button>
            </div>
          </div>

          {/* Contact info - bottom left */}
          <div
            ref={refs.contact}
            className="absolute bottom-8 left-8 text-sm text-gray-600"
          >
            <p className="mb-2 font-medium">Let's work together</p>
            <a href="mailto:contact@daniel.net" className="text-orange-500 hover:text-orange-600 transition-colors block mb-1">
              contact@daniel.net
            </a>
            <p className="text-gray-500">+216 21 184 010 32</p>
          </div>

          {/* Social icons - bottom right */}
          <div className="absolute bottom-8 right-8 flex gap-4">
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="Dribbble">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm7.88 7.89c1.21 1.77 1.9 3.92 1.9 6.24 0 .29-.01.58-.03.87-.34-.08-3.75-.81-7.16-.35-.06-.14-.12-.29-.19-.44-.18-.43-.38-.86-.58-1.28 3.74-1.52 5.46-3.73 5.46-3.73s-.42.47-1.18 1.16c-.77.7-1.8 1.53-3.05 2.26-1.01.59-2.14 1.08-3.37 1.4-.32.08-.65.15-.98.2-.12-.21-.24-.42-.36-.64-.72-1.31-1.5-2.71-2.34-4.18 3.46-1.36 6.59-2.02 9.16-2.02.62 0 1.23.05 1.82.13.38.07.75.15 1.11.24zm-8.56-5.48c1.62-.29 3.3-.44 5.05-.44 1.17 0 2.32.09 3.43.26-.87 1.44-2.17 3.02-3.88 4.59-1.73 1.6-3.67 3.01-5.8 4.19-.46-.88-.91-1.78-1.34-2.7-.43-.93-.82-1.87-1.18-2.82 1.47-.62 2.93-1.37 4.34-2.24.44-.27.87-.56 1.29-.85.88-1.03 1.74-2.14 2.57-3.31z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Floating decorative shapes */}
          <div
            data-float-shape="1"
            className="absolute top-32 right-20 w-32 h-32 bg-pink-200 rounded-xl transform rotate-12 opacity-60"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          />
          <div
            data-float-shape="2"
            className="absolute top-48 right-48 w-24 h-24 bg-pink-200 rounded-xl transform -rotate-6 opacity-60"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          />
          <div
            data-float-shape="3"
            className="absolute bottom-32 right-32 w-40 h-40 bg-pink-200 rounded-xl transform rotate-6 opacity-60"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          />
          <div
            data-float-shape="4"
            className="absolute bottom-48 left-96 w-20 h-20 bg-pink-200 rounded-xl transform -rotate-12 opacity-60"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          />
          
          {/* Small decorative squares near contact */}
          <div
            className="absolute bottom-32 left-32 w-12 h-12 bg-pink-200 rounded-lg transform rotate-6 opacity-60"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-40 left-48 w-8 h-8 bg-pink-200 rounded-lg transform -rotate-12 opacity-60"
            aria-hidden="true"
          />
        </>
      )}
    </StoryScene>
  );
}
