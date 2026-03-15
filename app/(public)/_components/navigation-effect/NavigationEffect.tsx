'use client'

import { AnimatePresence, easeInOut, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const stairAnimation = {
  initial: {
    top: '0%'
  },
  animate: {
    top: '100%'
  },
  exit: {
    top: ['100%', '0%']
  }
}

const reverseIndex = (index: number) => {
  const totalSteps = 4
  return totalSteps - index - 1
}

const Stairs = () => {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <motion.div
            key={index}
            variants={stairAnimation}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              duration: 0.3,
              ease: easeInOut,
              delay: reverseIndex(index) * 0.1
            }}
            className='relative h-full w-full bg-orange-500'
          />
        ))}
    </>
  )
}

const NavigationEffect = () => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait'>
      <div key={pathname}>
        <div className='pointer-events-none fixed inset-0 z-40 flex h-dvh w-dvw'>
          <Stairs />
        </div>
        <motion.div
          className='pointer-events-none fixed inset-0 bg-white'
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              duration: 1.2,
              ease: easeInOut
            }
          }}
        />
      </div>
    </AnimatePresence>
  )
}

export default NavigationEffect
