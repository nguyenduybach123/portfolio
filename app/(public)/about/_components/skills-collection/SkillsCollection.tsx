'use client'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Fragment, useState } from 'react'
import { skillsData } from '@/data/about-data'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

// Mock SkillItem component - replace with your actual import
const SkillItem = ({ name, logo }: { name: string; logo: string }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className='group flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
  >
    <div className='mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-muted'>
      <img src={logo} alt={name} className='h-8 w-8 object-contain' />
    </div>
    <span className='text-center text-sm font-medium text-foreground transition-colors group-hover:text-primary'>
      {name}
    </span>
  </motion.div>
)

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
}

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

const SkillGrid = ({ skills }: { skills: Array<{ name: string; logo: string }> }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='grid grid-cols-2 gap-px overflow-hidden border border-black/5 bg-black/5 md:grid-cols-3 lg:grid-cols-5'
    >
      {skills.map((skill, index) => (
        <motion.div
          variants={itemVariants}
          key={`${skill.name}-${index}`}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className={cn(
            'group relative flex aspect-square flex-col items-center justify-center bg-white p-8 transition-all duration-500 hover:z-10',
            'cursor-pointer overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]'
          )}
        >
          <div className='relative mb-6 aspect-square w-full overflow-hidden grayscale transition-all duration-700 group-hover:grayscale-0'>
            <Image
              src={skill.logo || '/placeholder.svg'}
              alt={skill.name}
              fill
              className='scale-95 object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105'
            />
          </div>

          <div className='text-center'>
            <h3 className='text-[11px] font-medium uppercase tracking-[0.15em] text-black/80 transition-colors group-hover:text-black'>
              {skill.name}
            </h3>
            <div className='mx-auto mt-2 h-px w-0 bg-black/20 transition-all duration-500 group-hover:w-8' />
          </div>

          {/* Subtle architectural corner markers */}
          <div className='absolute left-4 top-4 h-px w-2 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100' />
          <div className='absolute left-4 top-4 h-2 w-px bg-black/5 opacity-0 transition-opacity group-hover:opacity-100' />
          <div className='absolute bottom-4 right-4 h-px w-2 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100' />
          <div className='absolute bottom-4 right-4 h-2 w-px bg-black/5 opacity-0 transition-opacity group-hover:opacity-100' />
        </motion.div>
      ))}
    </motion.div>
  )
}

const SkillsCollection = () => {
  const [activeTab, setActiveTab] = useState(skillsData[0].category.toLowerCase())

  return (
    <section className='mx-auto w-full max-w-6xl'>
      {/* Header */}
      <div className='mb-8 space-y-3 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center font-serif text-2xl md:text-4xl'
        >
          <span className='text-slate-700'>Technical </span>
          <span className='text-orange-500'>Skills</span>
        </motion.h2>
      </div>

      {/* Tabs */}
      <div className='space-y-8'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          {/* Tab List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex justify-center'
          >
            <TabsList className='inline-flex h-auto justify-center bg-transparent p-0'>
              {skillsData.map((group, idx) => (
                <Fragment>
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                  >
                    <TabsTrigger
                      value={group.category.toLowerCase()}
                      className='bg-transparent text-xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
                    >
                      {group.category}
                    </TabsTrigger>
                  </motion.div>
                  {idx < skillsData.length - 1 && <Separator orientation='vertical' className='mx-4 h-6 bg-gray-300' />}
                </Fragment>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Content */}
          {skillsData.map((group) =>
            activeTab === group.category.toLowerCase() ? (
              <TabsContent value={group.category.toLowerCase()} className='mt-8 focus-visible:outline-none'>
                <SkillGrid skills={group.skills} />
              </TabsContent>
            ) : null
          )}
        </Tabs>
      </div>
    </section>
  )
}

export default SkillsCollection
