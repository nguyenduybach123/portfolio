// @ts-nocheck

export type ProjectResponseCategory = typeof ProjectResponseCategory[keyof typeof ProjectResponseCategory];


export const ProjectResponseCategory = {
  frontend: 'frontend',
  backend: 'backend',
  fullstack: 'fullstack',
} as const;
