export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
  image?: string
  featured: boolean
  createdAt: string
  category: 'frontend' | 'backend' | 'fullstack'
}
