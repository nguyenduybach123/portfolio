'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  } as const;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex min-h-screen items-center justify-center px-4 pt-20 md:pt-0"
    >
      <div className="relative z-10 max-w-4xl text-center">
        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-serif md:text-7xl">
          <span className="text-slate-700">Hi ! I&apos;m </span>
          <span className="text-orange-500">Duy Bach.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-12 text-lg text-slate-500 md:text-xl"
        >
          I&apos;m a Frontend Developer based in Ho Chi Minh City, Vietnam.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="bg-orange-500 px-8 py-6 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-orange-600"
          >
            MORE ABOUT ME
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
