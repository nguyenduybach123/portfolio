import { EducationTimeline, ExperienceTimeline } from '@/types/timeline'

export const experienceData: ExperienceTimeline[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'ABC Company',
    period: '06/2022 - Present',
    description: 'Working on building and maintaining the company main website using React, Next.js and TypeScript.'
  },
  {
    id: '2',
    title: 'Fullstack Developer Intern',
    company: 'MeU Solutions',
    period: '09/2023 - 02/2024',
    description: 'Developed internal dashboard systems using React, Node.js, and integrated REST APIs.'
  },
  {
    id: '3',
    title: 'Personal Projects & Learning',
    period: '2024 - Present',
    description:
      'Building personal projects with Next.js, exploring DDD architecture, and studying Data Structures & Algorithms.'
  },
  {
    id: '4',
    title: 'Layoff - Exploring Remote Opportunities',
    period: '2025',
    description:
      'Focusing on improving system design, backend architecture with Node.js and preparing for remote developer roles.'
  }
]

export const educationData: EducationTimeline[] = [
  {
    id: '1',
    title: 'Bachelor of Information Technology',
    school: 'Open University Ho Chi Minh City',
    period: '2020 - 2024',
    description:
      'Studied core computer science subjects including Data Structures, Algorithms, Database Systems, and Web Development.'
  },
  {
    id: '2',
    title: 'Fullstack Web Development',
    school: 'Self-learning & Online Courses',
    period: '2022 - Present',
    description: 'Focused on React, Next.js, Node.js, TypeScript and modern frontend architecture.'
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    school: 'Self Study',
    period: '2024 - Present',
    description: 'Practicing algorithmic thinking, problem solving, and preparing for technical interviews.'
  },
  {
    id: '4',
    title: 'Software Architecture & Backend Development',
    school: 'Personal Learning',
    period: '2025 - Present',
    description: 'Studying Domain Driven Design (DDD), Clean Architecture, and scalable backend systems with Node.js.'
  }
]

export const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', logo: '/skills/react.png' },
      { name: 'Next.js', logo: '/skills/react.png' },
      { name: 'TypeScript', logo: '/skills/react.png' },
      { name: 'TailwindCSS', logo: '/skills/react.png' },
      { name: 'Shadcn/UI', logo: '/skills/react.png' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', logo: '/skills/react.png' },
      { name: 'Express', logo: '/skills/react.png' },
      { name: 'NestJS', logo: '/skills/react.png' }
    ]
  },
  {
    category: 'Database',
    skills: [
      { name: 'PostgreSQL', logo: '/skills/react.png' },
      { name: 'MongoDB', logo: '/skills/react.png' },
      { name: 'Redis', logo: '/skills/react.png' }
    ]
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', logo: '/skills/react.png' },
      { name: 'AWS', logo: '/skills/react.png' },
      { name: 'CI/CD', logo: '/skills/react.png' }
    ]
  }
]
