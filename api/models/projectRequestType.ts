// @ts-nocheck

export type ProjectRequestType = typeof ProjectRequestType[keyof typeof ProjectRequestType];


export const ProjectRequestType = {
  personal: 'personal',
  professional: 'professional',
} as const;
