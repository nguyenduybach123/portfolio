'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { featuredProjects } from '@/data/project-data'

const ProjectCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <Carousel setApi={setApi} className='relative w-full'>
        <CarouselContent>
          {featuredProjects.slice(0, 5).map((project) => (
            <CarouselItem key={project.id} className='basis-full'>
              <div className='flex flex-col items-center gap-12 md:flex-row md:gap-20'>
                {/* LEFT */}
                <div className='flex flex-1 flex-col justify-center space-y-8'>
                  {/* Project Number */}
                  <div className='font-mono text-6xl font-bold tracking-tighter text-orange-500 sm:text-7xl'>
                    {String(current).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h2 className='font-mono text-4xl font-bold leading-tight text-slate-900 sm:text-5xl'>
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className='max-w-md text-base leading-relaxed text-slate-600 sm:text-lg'>{project.description}</p>

                  {/* Tech Stack */}
                  <div className='flex flex-wrap items-center gap-2'>
                    {project.tech.map((tech, index) => (
                      <span key={tech} className='font-mono text-sm text-orange-500 sm:text-base'>
                        {tech}
                        {index < project.tech.length - 1 && <span className='ml-2 text-slate-400'>,</span>}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className='h-px w-full bg-slate-200' />

                  {/* Buttons */}
                  <div className='flex items-center gap-4'>
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-full border border-slate-200 bg-orange-500 p-3 transition-all duration-200 hover:border-orange-500'
                    >
                      <ExternalLink className='h-5 w-5 text-white' />
                    </a>

                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-full border border-slate-200 bg-orange-500 p-3 transition-all duration-200 hover:border-orange-500'
                    >
                      <Github className='h-5 w-5 text-white' />
                    </a>
                  </div>
                </div>

                {/* RIGHT */}
                <div className='mr-2 flex flex-1 shrink-0 items-center justify-center'>
                  <div className='relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl ring-8 ring-gray-300/50'>
                    <div className='relative aspect-video sm:aspect-auto sm:h-96'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className='object-contain transition-transform duration-500 hover:scale-105'
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* DOT PAGINATION */}
        <div className='absolute bottom-0 left-1/2 mt-12 flex -translate-x-1/2 transform items-center justify-center gap-3'>
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                current === index + 1 ? 'w-5 scale-125 bg-orange-500' : 'bg-slate-300 hover:bg-orange-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default ProjectCarousel
