import { Project, SkillCategory } from '@/types'

export const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer & Designer',
  description: 'I craft beautiful, functional, and user-centric digital experiences.',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername'
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'TailwindCSS', 'HTML/CSS', 'JavaScript']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Django', 'GraphQL', 'REST APIs', 'PostgreSQL', 'MongoDB']
  },
  {
    title: 'Tools & Others',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Jest', 'CI/CD', 'Agile']
  }
]
