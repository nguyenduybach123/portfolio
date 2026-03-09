'use client'

import Image from 'next/image'
import { EducationTimeline, ExperienceTimeline, PersonalInformation, SkillsCollection } from './_components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function About() {
  return (
    <section className='min-h-screen px-6 py-20'>
      <div className='mx-auto max-w-5xl'>
        {/* Heading */}
        <h1 className='mb-20 text-center font-serif text-6xl md:text-7xl'>
          <span className='text-slate-700'>About </span>
          <span className='text-orange-500'>Me</span>
        </h1>

        <div className='space-y-16'>
          {/* Content */}
          <PersonalInformation />

          {/* Resume Tabs */}
          <Tabs defaultValue='experience' className='w-full'>
            <div className='space-y-4'>
              <h3 className='text-center font-serif text-2xl md:text-4xl'>My Resume</h3>
              <TabsList className='mx-auto flex w-fit rounded-none bg-transparent'>
                <TabsTrigger
                  value='experience'
                  className='bg-transparent text-2xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
                >
                  Experience
                </TabsTrigger>

                <Separator orientation='vertical' className='mx-4 h-6 bg-gray-300' />

                <TabsTrigger
                  value='education'
                  className='bg-transparent text-2xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
                >
                  Education
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='experience'>
              <ExperienceTimeline />
            </TabsContent>
            <TabsContent value='education'>
              <EducationTimeline />
            </TabsContent>
          </Tabs>

          {/* Skills */}
          <SkillsCollection />
        </div>
      </div>
    </section>
  )
}
