import { motion } from 'framer-motion'

const layers = [
  { className: 'bg-primary z-30', delay: 0 },
  { className: 'bg-light z-20', delay: 0.2 },
  { className: 'bg-dark z-10', delay: 0.4 }
]

const NavigationEffect = () => {
  return (
    <>
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          initial={{ x: '100%', width: '100%' }}
          animate={{ x: '0%', width: '0%' }}
          transition={{
            duration: 0.8,
            delay: layer.delay,
            ease: 'easeInOut'
          }}
          className={`fixed inset-y-0 right-full h-screen w-screen ${layer.className}`}
        />
      ))}
    </>
  )
}

export default NavigationEffect
