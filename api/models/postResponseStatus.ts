// @ts-nocheck

export type PostResponseStatus = typeof PostResponseStatus[keyof typeof PostResponseStatus];


export const PostResponseStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;
