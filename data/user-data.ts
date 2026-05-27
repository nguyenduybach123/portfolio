import { User } from '@/types/users'

export const mockUsers: User[] = [
  {
    id: 'usr_001',
    email: 'admin@example.com',
    fullName: 'Nguyễn Văn An',
    username: 'nguyenvanan',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    provider: 'LOCAL',
    providerId: null,
    role: 'ADMIN',
    createdAt: '2026-01-10T08:30:00Z',
    updatedAt: '2026-05-20T10:15:00Z'
  },
  {
    id: 'usr_002',
    email: 'tranbinh@example.com',
    fullName: 'Trần Minh Bình',
    username: 'tranbinh',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    provider: 'GOOGLE',
    providerId: 'google_123456',
    role: 'USER',
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-05-18T13:20:00Z'
  },
  {
    id: 'usr_003',
    email: 'hoanganh@example.com',
    fullName: 'Hoàng Anh',
    username: 'hoanganh',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    provider: 'GITHUB',
    providerId: 'github_789456',
    role: 'EDITOR',
    createdAt: '2026-02-15T14:45:00Z',
    updatedAt: '2026-05-21T08:00:00Z'
  },
  {
    id: 'usr_004',
    email: 'phamlinh@example.com',
    fullName: 'Phạm Thị Linh',
    username: 'phamlinh',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    provider: 'GOOGLE',
    providerId: 'google_654321',
    role: 'USER',
    createdAt: '2026-03-01T07:20:00Z',
    updatedAt: '2026-05-19T17:30:00Z'
  },
  {
    id: 'usr_005',
    email: 'ducthanh@example.com',
    fullName: 'Đức Thành',
    username: 'ducthanh',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    provider: 'LOCAL',
    providerId: null,
    role: 'MODERATOR',
    createdAt: '2026-03-12T11:15:00Z',
    updatedAt: '2026-05-22T09:10:00Z'
  },
  {
    id: 'usr_006',
    email: 'ngocmai@example.com',
    fullName: 'Ngọc Mai',
    username: 'ngocmai',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    provider: 'FACEBOOK',
    providerId: 'fb_998877',
    role: 'USER',
    createdAt: '2026-03-25T10:40:00Z',
    updatedAt: '2026-05-15T14:00:00Z'
  },
  {
    id: 'usr_007',
    email: 'quanghuy@example.com',
    fullName: 'Quang Huy',
    username: 'quanghuy',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    provider: 'GITHUB',
    providerId: 'github_112233',
    role: 'EDITOR',
    createdAt: '2026-04-02T08:10:00Z',
    updatedAt: '2026-05-23T16:25:00Z'
  },
  {
    id: 'usr_008',
    email: 'thuyduong@example.com',
    fullName: 'Thùy Dương',
    username: 'thuyduong',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    provider: 'GOOGLE',
    providerId: 'google_556677',
    role: 'USER',
    createdAt: '2026-04-10T13:35:00Z',
    updatedAt: '2026-05-24T11:50:00Z'
  },
  {
    id: 'usr_009',
    email: 'leminh@example.com',
    fullName: 'Lê Minh',
    username: 'leminh',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    provider: 'LOCAL',
    providerId: null,
    role: 'ADMIN',
    createdAt: '2026-04-20T09:50:00Z',
    updatedAt: '2026-05-25T08:45:00Z'
  },
  {
    id: 'usr_010',
    email: 'kimngan@example.com',
    fullName: 'Kim Ngân',
    username: 'kimngan',
    avatarUrl: 'https://i.pravatar.cc/150?img=10',
    provider: 'FACEBOOK',
    providerId: 'fb_445566',
    role: 'USER',
    createdAt: '2026-05-01T15:00:00Z',
    updatedAt: '2026-05-26T09:30:00Z'
  }
]
