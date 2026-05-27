// @ts-nocheck

export type ProjectResponseType = typeof ProjectResponseType[keyof typeof ProjectResponseType];


export const ProjectResponseType = {
  personal: 'personal',
  professional: 'professional',
} as const;
