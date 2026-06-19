export interface Page {
  id: string
  title: string
  status: 'published' | 'draft' | 'archived'
  author: {
    name: string
    email: string
    avatarUrl: string
  }
  createdAt: string
  updatedAt: string
}
