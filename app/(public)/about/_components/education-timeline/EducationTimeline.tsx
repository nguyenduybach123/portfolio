import { Timeline } from '@/components/shared'
import { educationData } from '@/data/about-data'
import { motion } from 'framer-motion'

const EducationTimeline = () => {
  return (
    <div className='mt-12'>
      <Timeline>
        {educationData.map((edu, index) => (
          <Timeline.Item key={edu.id}>
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
                {index !== educationData.length - 1 && (
                  <Timeline.Connector className='mt-2 w-[2px] flex-1 bg-gray-200' />
                )}
              </Timeline.Separator>

              {/* Content */}
              <Timeline.Content>
                <div className='pb-10 transition-all hover:translate-x-1'>
                  <h4 className='text-xl font-semibold text-gray-900'>
                    {edu.title}
                    {edu.school && <span className='font-medium text-primary'> — {edu.school}</span>}
                  </h4>

                  <p className='mt-1 text-sm text-gray-500'>{edu.period}</p>

                  <p className='mt-3 max-w-[600px] leading-relaxed text-gray-600'>{edu.description}</p>
                </div>
              </Timeline.Content>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default EducationTimeline
