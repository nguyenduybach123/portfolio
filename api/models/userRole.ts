// @ts-nocheck

export type UserRole = typeof UserRole[keyof typeof UserRole];


export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;
