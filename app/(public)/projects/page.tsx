import { GalleryWrapper } from '@/components/shared'
import { projects } from '@/data/project-data'
import { ProjectCarousel, ProjectItem } from './components'

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

        <GalleryWrapper animation='stagger'>
          {projects.map((project) => (
            <div key={project.id} className='mb-8 break-inside-avoid'>
              <ProjectItem project={project} />
            </div>
          ))}
        </GalleryWrapper>
      </div>
    </section>
  )
}

export default Projects
