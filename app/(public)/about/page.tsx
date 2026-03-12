'use client'

import { motion } from 'framer-motion'
import { EducationTimeline, ExperienceTimeline, PersonalInformation, SkillsCollection } from './_components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Variants } from 'framer-motion'

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export default function About() {
  return (
    <motion.section
      className='min-h-screen bg-[#f3f3f3] px-6 py-20'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='mx-auto max-w-5xl'>
        {/* Heading */}
        <motion.h1 variants={itemVariants} className='mb-20 text-center font-serif text-6xl md:text-7xl'>
          <span className='text-slate-700'>About </span>
          <span className='text-orange-500'>Me</span>
        </motion.h1>

        <div className='space-y-16'>
          {/* Personal Info */}
          <motion.div variants={itemVariants}>
            <PersonalInformation />
          </motion.div>

          {/* Resume Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue='experience' className='w-full'>
              <div className='space-y-4'>
                <h3 className='text-center font-serif text-2xl md:text-4xl'>
                  <span className='text-slate-700'>My </span>
                  <span className='text-orange-500'>Resume</span>
                </h3>

                <TabsList className='mx-auto flex w-fit rounded-none bg-transparent'>
                  <TabsTrigger
                    value='experience'
                    className='bg-transparent text-xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
                  >
                    Experience
                  </TabsTrigger>

                  <Separator orientation='vertical' className='mx-4 h-6 bg-gray-300' />

                  <TabsTrigger
                    value='education'
                    className='bg-transparent text-xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
                  >
                    Education
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='experience'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ExperienceTimeline />
                </motion.div>
              </TabsContent>

              <TabsContent value='education'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <EducationTimeline />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <SkillsCollection />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
