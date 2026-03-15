import { Project } from '@/types'

export const featuredProjects: Project[] = [
  {
    id: '2',
    type: 'personal',
    title: 'English Learning Website',
    description: 'Interactive English learning platform with quizzes and progress tracking.',
    technologies: ['React', 'TypeScript', 'Tanstack Query', 'Zustand'],
    demo: 'https://englishmaster.erp.meu-solutions.com/',
    image: '/projects/english-learning-project.png',
    featured: true,
    createdAt: '2025-02-10',
    category: 'frontend',
    tech: ['React', 'TypeScript', 'Tanstack Query', 'Zustand'],
    startDate: '2025-01-20',
    endDate: '2025-02-10',
    responsibilities: [
      'Built a responsive UI with React and TypeScript',
      'Managed global state using Zustand',
      'Implemented interactive quizzes and progress tracking',
      'Optimized performance and accessibility',
      'Deployed the app on Vercel'
    ]
  },
  {
    id: '4',
    type: 'personal',
    title: 'The Movie Website',
    description: 'Responsive travel booking website with dynamic pricing.',
    technologies: ['Next.js', 'Redux Toolkit'],
    github: 'https://github.com/nguyenduybach123/the-movies_challenge',
    demo: 'https://deploy-next-movie.vercel.app/',
    image: '/projects/the-movie-project.png',
    featured: false,
    createdAt: '2024-11-05',
    category: 'frontend',
    tech: ['Next.js', 'Redux Toolkit'],
    startDate: '2024-10-01',
    endDate: '2024-11-05',
    responsibilities: [
      'Built a responsive UI with Next.js and TailwindCSS',
      'Managed state using Redux Toolkit',
      'Implemented dynamic pricing based on user selections',
      'Optimized for SEO and performance',
      'Deployed the website on Vercel'
    ]
  },
  {
    id: '1',
    type: 'personal',
    title: 'Fast Food Delivery',
    description:
      'Fullstack NextJS project aimed research NextJS and MongoDB, with features like user authentication, profile management, and real-time chat.',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com/nguyenduybach123/Fast_food_restaurant',
    image: '/projects/fast-food-delivery-project.png',
    featured: true,
    createdAt: '2025-01-15',
    category: 'fullstack',
    tech: ['Next.js', 'MongoDB'],
    startDate: '2024-12-01',
    endDate: '2025-01-15',
    responsibilities: [
      'Designed and implemented the frontend using React and Next.js',
      'Developed RESTful APIs with Node.js and Express',
      'Integrated MongoDB for data storage',
      'Implemented Stripe for payment processing',
      'Deployed the application on Vercel'
    ]
  },
  {
    id: '3',
    type: 'personal',
    title: 'Game Java Application',
    description: 'Management system for orphanage centers with donation tracking.',
    technologies: ['Java'],
    github: 'https://github.com/nguyenduybach123/Java-Game',
    image: '/projects/java-game-project.png',
    featured: false,
    createdAt: '2024-12-20',
    category: 'fullstack',
    tech: ['Next.js', 'Node.js', 'PostgreSQL'],
    startDate: '2024-11-15',
    endDate: '2024-12-20',
    responsibilities: [
      'Developed the frontend with Next.js and TailwindCSS',
      'Created RESTful APIs using Node.js and Express',
      'Designed the database schema and implemented PostgreSQL',
      'Implemented donation tracking and reporting features',
      'Deployed the application on Vercel'
    ]
  },
  {
    id: '5',
    type: 'personal',
    title: 'Portfolio Website',
    description: 'Modern minimal developer portfolio optimized for SEO.',
    technologies: ['Next.js', 'Framer Motion', 'TailwindCSS'],
    github: 'https://github.com/nguyenduybach123/portfolio',
    image: '/projects/portfolio-project.png',
    featured: true,
    createdAt: '2025-03-01',
    category: 'frontend',
    tech: ['Next.js', 'Framer Motion', 'TailwindCSS'],
    startDate: '2025-02-01',
    endDate: '2025-03-01',
    responsibilities: [
      'Designed a modern and minimal UI with Next.js and TailwindCSS',
      'Implemented smooth animations using Framer Motion',
      'Optimized for SEO with server-side rendering',
      'Showcased projects and blog posts with dynamic content',
      'Deployed the portfolio on Vercel'
    ]
  }
]

export const projects: Project[] = [
  {
    id: '1',
    type: 'personal',
    title: 'Network Social Website',
    description:
      'Fullstack NextJS project aimed research NextJS and MongoDB, with features like user authentication, profile management, and real-time chat.',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com/nguyenduybach123/next-social',

    image: '/projects/social-network-project.png',
    featured: true,
    createdAt: '2025-01-15',
    category: 'fullstack',
    tech: ['Next.js', 'Prisma', 'MongoDB'],
    startDate: '2024-12-01',
    endDate: '2025-01-15',
    responsibilities: [
      'Designed and implemented the frontend using React and Next.js',
      'Developed RESTful APIs with Prisma and NextJS Backend',
      'Learn how to use Oauth2 with Clerk',
      'Deployed the application on Vercel'
    ]
  },
  {
    id: '2',
    type: 'personal',
    title: 'Fashion E-commerce',
    description: 'Interactive fashion e-commerce platform with product browsing and shopping cart features.',
    technologies: ['NextJS', 'TypeScript', 'Spring', 'PostgreSQL'],
    github: 'https://github.com/nguyenduybach123/Shop_stuffing',
    image: '/projects/fashion-ecommerce-project.png',
    featured: true,
    createdAt: '2025-02-10',
    category: 'frontend',
    tech: ['NextJS', 'TypeScript', 'Spring', 'PostgreSQL'],
    startDate: '2025-01-20',
    endDate: '2025-02-10',
    responsibilities: [
      'Built a responsive UI with Next.js and TypeScript',
      'Design System implemented backend with Spring and PostgreSQL'
    ]
  },
  {
    id: '3',
    type: 'personal',
    title: 'Fast Food Delivery',
    description: 'Responsive fast food delivery website with dynamic pricing.',
    technologies: ['Next.js', 'Tanstack Query', 'Zustand'],
    github: 'https://github.com/nguyenduybach123/Fast_food_restaurant',
    image: '/projects/fast-food-delivery-project.png',
    featured: false,
    createdAt: '2024-11-05',
    category: 'frontend',
    tech: ['Next.js', 'Tanstack Query', 'Zustand'],
    startDate: '2024-10-01',
    endDate: '2024-11-05',
    responsibilities: [
      'Built a responsive UI with Next.js and TailwindCSS',
      'Managed state using Tanstack Query and Zustand',
      'Implemented dynamic pricing based on user selections'
    ]
  },
  {
    id: '4',
    type: 'personal',
    title: 'Game Java Application',
    description: 'Management system for orphanage centers with donation tracking.',
    technologies: ['Java'],
    github: 'https://github.com/nguyenduybach123/Java-Game',
    image: '/projects/java-game-project.png',
    featured: false,
    createdAt: '2024-12-20',
    category: 'fullstack',
    tech: ['Java'],
    startDate: '2024-11-15',
    endDate: '2024-12-20',
    responsibilities: [
      'Built entirely with Java Core',
      'Learn how to construct an object using OOP.',
      'Physics design, characters, monsters, maps.'
    ]
  },
  {
    id: '5',
    type: 'personal',
    title: 'The Movie Website',
    description: 'Responsive travel booking website with dynamic pricing.',
    technologies: ['React', 'TypeScript', 'Tanstack Query', 'Zustand'],
    github: 'https://github.com/nguyenduybach123/the-movies_challenge',
    demo: 'https://deploy-next-movie.vercel.app/',
    image: '/projects/the-movie-project.png',
    featured: false,
    createdAt: '2024-11-05',
    category: 'frontend',
    tech: ['React', 'TypeScript', 'Tanstack Query', 'Zustand'],
    startDate: '2024-10-01',
    endDate: '2024-11-05',
    responsibilities: [
      'Built a responsive UI with React and TypeScript',
      'Managed state using Tanstack Query and Zustand',
      'Implemented API from themoviedb.org to fetch movie data'
    ]
  },
  {
    id: '6',
    type: 'personal',
    title: 'English Learning Website',
    description: 'Interactive English learning platform with quizzes and progress tracking.',
    technologies: ['React', 'TypeScript', 'Tanstack Query', 'Zustand'],
    demo: 'https://englishmaster.erp.meu-solutions.com/',
    image: '/projects/english-learning-project.png',
    featured: true,
    createdAt: '2025-02-10',
    category: 'frontend',
    tech: ['React', 'TypeScript', 'Tanstack Query', 'Zustand'],
    startDate: '2025-01-20',
    endDate: '2025-02-10',
    responsibilities: [
      'Built a responsive UI with React and TypeScript',
      'Implemented system test exam IELTS, TOEIC',
      'Designed game flashcard to help user learn vocabulary'
    ]
  },
  {
    id: '7',
    type: 'personal',
    title: 'Portfolio',
    description: 'Modern minimal portfolio website to showcase projects and blog posts.',
    technologies: ['NextJS', 'Tanstack Query', 'Zustand', 'Framer Motion', 'TailwindCSS'],
    github: 'https://github.com/nguyenduybach123/portfolio',
    image: '/projects/portfolio-project.png',
    featured: false,
    createdAt: '2024-09-12',
    category: 'fullstack',
    tech: ['NextJS', 'Tanstack Query', 'Zustand', 'Framer Motion', 'TailwindCSS'],
    startDate: '2024-08-01',
    endDate: '2024-09-12',
    responsibilities: [
      'Designed and implemented the frontend using Next.js and TailwindCSS',
      'Implemented smooth animations with Framer Motion'
    ]
  },
  {
    id: '8',
    type: 'professional',
    title: 'First Green Internal Social Network',
    description: 'Internal social network for First Green employees to collaborate and share updates.',
    technologies: ['NextJS', 'Tanstack Query', 'Zustand'],
    image: '/projects/first-green-project.png',
    featured: false,
    createdAt: '2024-09-12',
    category: 'fullstack',
    tech: ['NextJS', 'Tanstack Query', 'Zustand'],
    startDate: '2024-08-01',
    endDate: '2024-09-12',
    responsibilities: [
      'Setup front-end technologies',
      'Setup Tanstack Query handle realtime',
      'Analyze and develop new features',
      'Work and communicate with other team members to find an effective solution',
      'Added online presence indicators and typing notifications',
      'Deployed the application on Vercel'
    ]
  },
  {
    id: '9',
    type: 'professional',
    title: 'Samco Binh Tan Ecommerce',
    description: 'Ecommerce website for Samco Binh Tan with product listings, shopping cart, and warranty.',
    technologies: ['NextJS', 'Tanstack Query', 'Zustand'],
    image: '/projects/samco-project.png',
    featured: false,
    createdAt: '2024-09-12',
    category: 'fullstack',
    tech: ['NextJS', 'Tanstack Query', 'Zustand'],
    startDate: '2024-08-01',
    endDate: '2024-09-12',
    responsibilities: [
      'Setup front-end technologies',
      'Frontend managers assign tasks to team members.',
      'Work and communicate with other team members to find an effective solution',
      'Added online presence indicators and typing notifications',
      'Deployed the application on Vercel'
    ]
  },
  {
    id: '10',
    type: 'professional',
    title: 'Noblelift Logistics Management System',
    description:
      'Logistics management system for Noblelift with delivery tracking, inventory management, and reporting features.',
    technologies: ['ReactJS', 'Tanstack Query', 'Zustand'],
    image: '/projects/noblelift-project.png',
    featured: false,
    createdAt: '2024-09-12',
    category: 'fullstack',
    tech: ['ReactJS', 'MUI', 'Tanstack Query', 'Zustand', 'Spring'],
    startDate: '2024-08-01',
    endDate: '2024-09-12',
    responsibilities: [
      'Configuration Tanstack Query, MUI, TailwindCSS',
      'Implemented Tanstack visualization to display logistics data',
      'Support and maintain backend system'
    ]
  }
]
