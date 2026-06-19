// @ts-nocheck

export type GetPostsStatus = typeof GetPostsStatus[keyof typeof GetPostsStatus];


export const GetPostsStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;
