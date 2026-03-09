'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type SkillItemProps = {
  name: string
  logo: string
}

const SkillItem = ({ name, logo }: SkillItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className='flex cursor-default items-center gap-3 rounded-lg border bg-background px-4 py-3 transition hover:border-primary hover:bg-muted'
    >
      <Image src={logo} alt={name} width={24} height={24} className='grayscale transition hover:grayscale-0' />

      <span className='text-sm font-medium'>{name}</span>
    </motion.div>
  )
}

export default SkillItem
