'use client'

import { motion, Variants } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { skillsData } from '@/data/about-data'

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
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

const SkillGrid = ({ skills }: { skills: Array<{ name: string; logo: string }> }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
    >
      {skills.map((skill) => (
        <motion.div key={skill.name} variants={itemVariants}>
          <SkillItem {...skill} />
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
            <TabsList className='inline-flex h-auto gap-2 bg-transparent p-0'>
              {skillsData.map((group, idx) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                >
                  <TabsTrigger
                    value={group.category.toLowerCase()}
                    className='relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-orange-500 data-[state=inactive]:text-muted-foreground data-[state=active]:shadow-none'
                  >
                    {group.category}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Content */}
          {skillsData.map((group) => (
            <TabsContent
              key={group.category}
              value={group.category.toLowerCase()}
              className='mt-8 focus-visible:outline-none'
            >
              <SkillGrid skills={group.skills} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default SkillsCollection
