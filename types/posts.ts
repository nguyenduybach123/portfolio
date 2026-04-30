export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
  // chỉnh lại theo enum thật bên Java của bạn
}

export interface PostResponse {
  id: string

  title: string
  slug: string
  summary: string
  content: string
  thumbnail: string

  status: PostStatus
  featured: boolean
  viewCount: number
  publishedAt: string

  createdAt: string
  updatedAt: string

  tags: string[]

  commentCount: number
}

export interface PostRequest {
  title: string
  summary?: string
  content: string
  thumbnail?: string
  status?: PostStatus
  featured?: boolean
  tags?: string[]
}
