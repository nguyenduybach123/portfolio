import { EducationTimeline, ExperienceTimeline } from '@/types/timeline'

export const experienceData: ExperienceTimeline[] = [
  {
    id: '1',
    title: 'Passionate about website development.',
    period: '01/2024 - 09/2024',
    description:
      'Start with JavaScript, then focus on frontend development with ReactJS and continue to delve deeper into modern frontend technologies .'
  },
  {
    id: '2',
    title: 'Intern Frontend Developer',
    company: 'MEU Solutions',
    period: '09/2024 - 01/2025',
    description:
      "Internship as a Front End ReactJS developer, assisting in building React Front End solutions for the company's projects."
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'MeU Solutions',
    period: '01/2025 - 11/2025',
    description:
      "Participate in frontend development for the company's systems, build user interfaces, and provide training and mentoring support to new interns in the team."
  },
  {
    id: '4',
    title: 'Learn more about Backend',
    period: '11/2025 - Present',
    description:
      'Study Java Core, Databases, and the Spring Framework, proactively read documentation, and build backend applications.'
  }
]

export const educationData: EducationTimeline[] = [
  {
    id: '1',
    title: 'Bachelor of Information Technology',
    school: 'HUST University',
    period: '01/2020 - 05/2020',
    description:
      'Studied core computer science subjects including Data Structures, Algorithms, Database Systems, and Web Development.'
  },
  {
    id: '2',
    title: 'Studying at home',
    school: 'COVID-19',
    period: '06/2021 - 12/2022',
    description:
      'Without computers for studying, boredom, failing many subjects, and repeatedly wanting to drop out of school.'
  },
  {
    id: '3',
    title: 'Focus on learning',
    period: '01/2023 - 12/2024',
    description: 'I studied while working part-time to gain practical experience and develop my programming skills.'
  },
  {
    id: '4',
    title: 'Never stop learning',
    period: '01/2025 - Present',
    description: 'Always eager to deepen my knowledge and continuously improve my programming skills.'
  }
]

export const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', logo: '/skills/react.png' },
      { name: 'React Router', logo: '/skills/react-router.svg' },
      { name: 'Next.js', logo: '/skills/next.png' },
      { name: 'TypeScript', logo: '/skills/ts.png' },
      { name: 'Tanstack Tech', logo: '/skills/tanstack.png' },
      { name: 'Zustand', logo: '/skills/zustand.jpg' },
      { name: 'RHF', logo: '/skills/rhf.png' },
      { name: 'Zod', logo: '/skills/zod.webp' },
      { name: 'Framer Motion', logo: '/skills/framer.png' },
      { name: 'TailwindCSS', logo: '/skills/tailwind.png' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Java', logo: '/skills/java.png' },
      { name: 'Spring', logo: '/skills/spring.png' },
      { name: 'MyBatis', logo: '/skills/batis.png' },
      { name: 'Express', logo: '/skills/express.jpg' },
      { name: 'Docker', logo: '/skills/docker.jpg' }
    ]
  }
]
