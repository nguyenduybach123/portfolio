export interface SkillCategory {
  title: string
  skills: string[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type { Project } from './projects'
