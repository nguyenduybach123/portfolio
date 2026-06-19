import { Page } from '@/types/pages'

export const mockPages: Page[] = [
  {
    id: '1',
    title: 'Home Page',
    status: 'published',

    author: {
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },

    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-10T09:30:00Z'
  },

  {
    id: '2',
    title: 'About Us',
    status: 'published',

    author: {
      name: 'Trần Minh Quân',
      email: 'quan.tran@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=2'
    },

    createdAt: '2026-05-02T10:00:00Z',
    updatedAt: '2026-05-11T14:00:00Z'
  },

  {
    id: '3',
    title: 'Contact Page',
    status: 'draft',

    author: {
      name: 'Lê Hoàng Nam',
      email: 'nam.le@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=3'
    },

    createdAt: '2026-05-03T11:30:00Z',
    updatedAt: '2026-05-03T11:30:00Z'
  },

  {
    id: '4',
    title: 'Pricing',
    status: 'published',

    author: {
      name: 'Phạm Gia Huy',
      email: 'huy.pham@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=4'
    },

    createdAt: '2026-05-04T07:45:00Z',
    updatedAt: '2026-05-12T16:20:00Z'
  },

  {
    id: '5',
    title: 'Terms of Service',
    status: 'archived',

    author: {
      name: 'Đỗ Thanh Bình',
      email: 'binh.do@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    },

    createdAt: '2026-05-05T13:10:00Z',
    updatedAt: '2026-05-15T09:15:00Z'
  },

  {
    id: '6',
    title: 'Privacy Policy',
    status: 'published',

    author: {
      name: 'Nguyễn Quốc Bảo',
      email: 'bao.nguyen@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=6'
    },

    createdAt: '2026-05-06T15:00:00Z',
    updatedAt: '2026-05-16T11:45:00Z'
  },

  {
    id: '7',
    title: 'Careers',
    status: 'draft',

    author: {
      name: 'Bùi Đức Anh',
      email: 'anh.bui@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=7'
    },

    createdAt: '2026-05-07T09:25:00Z',
    updatedAt: '2026-05-07T09:25:00Z'
  },

  {
    id: '8',
    title: 'FAQ',
    status: 'published',

    author: {
      name: 'Phan Nhật Minh',
      email: 'minh.phan@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=8'
    },

    createdAt: '2026-05-08T12:40:00Z',
    updatedAt: '2026-05-18T17:00:00Z'
  },

  {
    id: '9',
    title: 'Documentation',
    status: 'published',

    author: {
      name: 'Lương Khánh Duy',
      email: 'duy.luong@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=9'
    },

    createdAt: '2026-05-09T08:50:00Z',
    updatedAt: '2026-05-19T13:35:00Z'
  },

  {
    id: '10',
    title: 'Release Notes',
    status: 'archived',

    author: {
      name: 'Võ Minh Khôi',
      email: 'khoi.vo@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=10'
    },

    createdAt: '2026-05-10T14:20:00Z',
    updatedAt: '2026-05-20T18:10:00Z'
  }
]
