export interface User {
  id: string

  email: string
  password?: string | null

  fullName?: string | null
  username?: string | null
  avatarUrl?: string | null

  provider?: string | null
  providerId?: string | null

  role?: string | null

  createdAt: string
  updatedAt: string
}
