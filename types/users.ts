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

export type UserSession = {
  id: string
  userId: string
  refreshTokenHash: string
  ipAddress: string
  userAgent: string
  deviceId: string
  deviceName: string
  revoked: boolean
  expiresAt: string
  lastActiveAt: string
  createdAt: string
}
