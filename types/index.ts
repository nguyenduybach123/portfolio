export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
