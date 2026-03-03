'use client';

import { motion } from 'framer-motion';

export function DotPattern() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 15,
    delay: Math.random() * 0.5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.3, scale: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0, 1, 0] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="absolute h-2 w-2 rounded-full bg-orange-500"
          style={{
            top: `${dot.top}%`,
            left: `${dot.left}%`,
          }}
        />
      ))}
    </div>
  );
}