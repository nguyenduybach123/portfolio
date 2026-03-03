'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'

interface Props {
  project: Project
}

const ProjectItem = ({ project }: Props) => {
  return (
    <motion.div
      whileHover='hover'
      initial='rest'
      animate='rest'
      className='group relative mb-8 cursor-pointer break-inside-avoid overflow-hidden rounded-xl'
    >
      {/* IMAGE */}
      <Image
        src={project.image || '/images/placeholder.png'}
        alt={project.title}
        width={600}
        height={800}
        className='h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105'
      />

      {/* 🔝 TOP ACTIONS (Hover only) */}
      <motion.div
        variants={{
          rest: { opacity: 0, y: -10 },
          hover: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.3 }}
        className='absolute left-0 right-0 top-0 flex justify-end gap-3 bg-gradient-to-b from-black/60 to-transparent p-4'
      >
        <Link
          href={project.demo}
          target='_blank'
          className='rounded-full bg-white px-4 py-1 text-xs font-medium text-black shadow'
        >
          Demo
        </Link>

        <Link
          href={project.github}
          target='_blank'
          className='rounded-full border border-white px-4 py-1 text-xs text-white backdrop-blur-sm'
        >
          GitHub
        </Link>
      </motion.div>

      {/* 🔻 BOTTOM INFO (Always visible) */}
      <div className='absolute bottom-0 left-0 right-0 bg-white p-5 shadow-lg'>
        <h3 className='text-base font-semibold text-slate-800'>{project.title}</h3>
        <p className='mt-1 line-clamp-2 text-sm text-slate-500'>{project.description}</p>
      </div>
    </motion.div>
  )
}

export default ProjectItem
