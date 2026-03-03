import { Project, SkillCategory } from "@/types";

export const personalInfo = {
  name: "Your Name",
  title: "Full Stack Developer & Designer",
  description: "I craft beautiful, functional, and user-centric digital experiences.",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
};

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/yourusername/project1",
    demo: "https://project1.vercel.app",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    github: "https://github.com/yourusername/project2",
    demo: "https://project2.vercel.app",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Beautiful data visualization dashboard with interactive charts, real-time data processing, and custom reporting.",
    technologies: ["Vue.js", "D3.js", "Express", "Redis"],
    github: "https://github.com/yourusername/project3",
    demo: "https://project3.vercel.app",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Vue.js",
      "TailwindCSS",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "GraphQL",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "Figma",
      "Jest",
      "CI/CD",
      "Agile",
    ],
  },
];
