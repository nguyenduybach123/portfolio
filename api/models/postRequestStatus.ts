// @ts-nocheck

export type PostRequestStatus = typeof PostRequestStatus[keyof typeof PostRequestStatus];


export const PostRequestStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;
