'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Calendar, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/data/project-data'

export interface Project {
  id: string
  type: 'personal' | 'professional'
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image: string
  featured: boolean
  createdAt: string
  category: 'frontend' | 'backend' | 'fullstack'
  tech: string[]
  startDate?: string
  endDate?: string
  responsibilities?: string[]
}

const ProjectDetailPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const project: Project = projects[0]

  return (
    <article className='min-h-screen bg-background'>
      {/* Header Navigation */}
      <header className='sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm'>
        <div className='mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8'>
          <button className='inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'>
            <ArrowLeft className='h-4 w-4' />
            Back
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative w-full'>
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          {/* Featured Badge */}
          {project.featured && (
            <div className='pb-6 pt-12'>
              <Badge className='bg-primary text-primary-foreground'>Featured Project</Badge>
            </div>
          )}

          {/* Title Section */}
          <div className='py-8 sm:py-12'>
            <h1 className='mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
              {project.title}
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl'>{project.description}</p>
          </div>

          {/* Project Image */}
          <div className='relative mb-12 h-96 w-full overflow-hidden rounded-lg bg-muted sm:mb-16 sm:h-[500px]'>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoadingComplete={() => setImageLoaded(true)}
              priority
            />
            {!imageLoaded && (
              <div className='absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-background to-muted' />
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className='border-t border-border bg-card'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
            {/* Main Content */}
            <div className='space-y-12 lg:col-span-2'>
              {/* Project Meta */}
              <div className='space-y-6'>
                <div>
                  <h2 className='mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                    Project Details
                  </h2>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Category</p>
                      <p className='text-base font-medium capitalize text-foreground'>{project.category}</p>
                    </div>
                    <div className='space-y-2'>
                      <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Type</p>
                      <p className='text-base font-medium capitalize text-foreground'>{project.type}</p>
                    </div>
                    {project.startDate && (
                      <div className='space-y-2'>
                        <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Timeline</p>
                        <p className='text-base font-medium text-foreground'>
                          {formatDate(project.startDate)}
                          {project.endDate && ` – ${formatDate(project.endDate)}`}
                        </p>
                      </div>
                    )}
                    <div className='space-y-2'>
                      <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Created</p>
                      <p className='text-base font-medium text-foreground'>{formatDate(project.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities Section */}
              {project.responsibilities && project.responsibilities.length > 0 && (
                <div className='space-y-6'>
                  <div>
                    <h2 className='mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                      Key Responsibilities
                    </h2>
                    <ul className='space-y-4'>
                      {project.responsibilities.map((responsibility, index) => (
                        <li key={index} className='flex items-start gap-4'>
                          <span className='mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10'>
                            <Zap className='h-3 w-3 text-primary' />
                          </span>
                          <span className='leading-relaxed text-foreground/90'>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className='lg:col-span-1'>
              <div className='sticky top-24 space-y-8'>
                {/* Technologies */}
                <div className='space-y-4'>
                  <h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                    Technologies Used
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {[...new Set([...project.technologies, ...project.tech])].map((tech) => (
                      <Badge key={tech} variant='secondary' className='text-xs font-medium'>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-3'>
                  <h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>Links</h3>
                  <div className='space-y-2'>
                    {project.github && (
                      <Link href={project.github} target='_blank' rel='noopener noreferrer'>
                        <Button variant='outline' className='w-full justify-start gap-2'>
                          <Github className='h-4 w-4' />
                          View Source
                        </Button>
                      </Link>
                    )}
                    {project.demo && (
                      <Link href={project.demo} target='_blank' rel='noopener noreferrer'>
                        <Button className='w-full justify-start gap-2'>
                          <ExternalLink className='h-4 w-4' />
                          Live Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Info Box */}
                <div className='rounded-lg border border-border bg-secondary/30 p-4'>
                  <div className='flex items-start gap-3'>
                    <Calendar className='mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground' />
                    <div className='space-y-1'>
                      <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Project ID</p>
                      <p className='break-all font-mono text-xs text-muted-foreground'>{project.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className='border-t border-border bg-background'>
        <div className='mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <p className='mb-6 text-muted-foreground'>Interested in discussing this project?</p>
            <Button variant='outline' className='gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Back to Projects
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}

export default ProjectDetailPage
