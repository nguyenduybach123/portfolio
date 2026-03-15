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
