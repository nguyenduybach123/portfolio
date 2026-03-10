import { GridWrapper } from '@/components/shared'
import { projects } from '@/data/project-data'
import { ProjectCarousel, ProjectTimeline } from './components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@radix-ui/react-separator'

const Projects = () => {
  return (
    <section className='min-h-screen bg-[#f3f3f3] px-6 py-20'>
      <div className='mx-auto max-w-6xl space-y-16'>
        <div className='text-center'>
          <h1 className='mb-8 text-center font-serif text-6xl md:text-7xl'>
            <span className='text-slate-700'>Projects </span>
            <span className='text-orange-500'>Portfolio</span>
          </h1>
        </div>

        <ProjectCarousel />

        <Tabs defaultValue='personal' className='w-full'>
          <TabsList className='mx-auto flex w-fit items-center rounded-none bg-transparent'>
            <TabsTrigger
              value='personal'
              className='flex-1 bg-transparent text-xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
            >
              Personal
            </TabsTrigger>

            <Separator orientation='vertical' className='mx-4 h-6 w-px bg-gray-300' />

            <TabsTrigger
              value='professional'
              className='flex-1 bg-transparent text-xl font-semibold uppercase data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:shadow-none'
            >
              Professional
            </TabsTrigger>
          </TabsList>
          <TabsContent value='personal' className='mt-8'>
            <ProjectTimeline />
          </TabsContent>
          <TabsContent value='professional' className='mt-8'>
            <ProjectTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Projects
