'use client'

import { Timeline } from '@/components/shared'
import { projects } from '@/data/project-data'
import { motion } from 'framer-motion'
import { AnimatedCard } from '@/components/ui/animated-card'
import { ProjectTimelineItem } from './components'

type Project = (typeof projects)[number]

interface ProjectTimelineProps {
  type: 'personal' | 'professional'
}

const ProjectMetaCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className='max-w-md space-y-2'
    >
      {/* DATE */}
      <p className='text-sm text-slate-500'>
        {project.startDate} – {project.endDate}
      </p>

      {/* DESCRIPTION */}
      {project.description && <p className='text-sm leading-relaxed text-slate-700'>{project.description}</p>}

      {/* RESPONSIBILITIES */}
      <div>
        <h5 className='font-medium text-slate-900'>Responsibilities:</h5>
        {(project.responsibilities?.length ?? 0) > 0 && (
          <ul className='list-disc space-y-1 pl-5 text-sm text-slate-700'>
            {project.responsibilities?.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

const ProjectTimeline = ({ type }: ProjectTimelineProps) => {
  return (
    <div className='mt-8'>
      <Timeline variant='outlined'>
        {projects
          .filter((project) => project.type === type)
          .map((project, index) => {
            const isEven = index % 2 === 0

            return (
              <Timeline.Item key={project.id}>
                {/* LEFT SIDE */}
                <Timeline.OppositeContent className={`pr-6 ${isEven ? 'hidden justify-end md:flex' : ''}`}>
                  {isEven ? (
                    <ProjectMetaCard project={project} />
                  ) : (
                    <AnimatedCard>
                      <ProjectTimelineItem project={project} />
                    </AnimatedCard>
                  )}
                </Timeline.OppositeContent>

                {/* CENTER */}
                <Timeline.Separator>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <Timeline.Dot className='relative h-4 w-4 border-4 border-white bg-orange-500 shadow-md' />
                  </motion.div>

                  {index !== projects.length - 1 && <Timeline.Connector className='bg-slate-200' />}
                </Timeline.Separator>

                {/* RIGHT SIDE */}
                <Timeline.Content className={`pl-6 ${!isEven ? 'hidden items-center md:flex' : ''}`}>
                  {isEven ? (
                    <AnimatedCard>
                      <ProjectTimelineItem project={project} />
                    </AnimatedCard>
                  ) : (
                    <ProjectMetaCard project={project} />
                  )}
                </Timeline.Content>
              </Timeline.Item>
            )
          })}
      </Timeline>
    </div>
  )
}

export default ProjectTimeline
