// @ts-nocheck

export type UserStatus = typeof UserStatus[keyof typeof UserStatus];


export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
  PENDING_VERIFY: 'PENDING_VERIFY',
} as const;
