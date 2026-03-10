'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { Project } from '@/types'

interface Props {
  project: Project
}

const ProjectTimelineItem = ({ project }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className='group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md'
    >
      <div className='flex flex-col gap-5 md:flex-row'>
        {/* IMAGE */}
        <div className='relative h-40 w-full overflow-hidden rounded-lg md:w-60'>
          <Image
            src={project.image || '/images/placeholder.png'}
            alt={project.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>

        {/* CONTENT */}
        <div className='flex flex-1 flex-col'>
          <h3 className='text-lg font-semibold text-slate-900'>{project.title}</h3>

          <p className='mt-2 line-clamp-2 text-sm text-slate-600'>{project.description}</p>

          {/* TECH STACK */}
          <div className='mt-3 flex flex-wrap gap-2'>
            {project.tech.map((tech) => (
              <span key={tech} className='rounded bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600'>
                {tech}
              </span>
            ))}
          </div>

          {/* ACTIONS */}
          <div className='mt-4 flex items-center gap-4'>
            <Link
              href={project.demo}
              target='_blank'
              className='flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600'
            >
              <ExternalLink size={16} />
              Demo
            </Link>

            <Link
              href={project.github}
              target='_blank'
              className='flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900'
            >
              <Github size={16} />
              Code
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectTimelineItem
