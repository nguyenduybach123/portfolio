import { Timeline } from '@/components/shared'
import { experienceData } from '@/data/about-data'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ExperienceTimeline = () => {
  return (
    <div className='mt-12'>
      <Timeline>
        {experienceData.map((exp, index) => (
          <Timeline.Item key={exp.id}>
            <div className='grid grid-cols-[40px_1fr] gap-6'>
              {/* Timeline indicator */}
              <Timeline.Separator className='flex flex-col items-center'>
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Timeline.Dot className='relative h-4 w-4 border-4 border-white bg-orange-500 shadow-md' />
                </motion.div>

                {/* Line */}
                {index !== experienceData.length - 1 && (
                  <Timeline.Connector className='mt-2 w-[2px] flex-1 bg-gray-300' />
                )}
              </Timeline.Separator>

              {/* Content */}
              <Timeline.Content>
                <div className='pb-10'>
                  <h4 className='text-xl font-semibold'>
                    {exp.title}
                    {exp.company && (
                      <Link
                        href={`https://www.${exp.company}.com`}
                        className='text-orange-500 hover:border-b-2 hover:border-orange-500'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {' '}
                        @{exp.company}
                      </Link>
                    )}
                  </h4>

                  <p className='mt-1 text-sm text-gray-500'>{exp.period}</p>

                  <p className='mt-3 leading-relaxed text-gray-600'>{exp.description}</p>
                </div>
              </Timeline.Content>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default ExperienceTimeline
