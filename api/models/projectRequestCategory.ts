// @ts-nocheck

export type ProjectRequestCategory = typeof ProjectRequestCategory[keyof typeof ProjectRequestCategory];


export const ProjectRequestCategory = {
  frontend: 'frontend',
  backend: 'backend',
  fullstack: 'fullstack',
} as const;
