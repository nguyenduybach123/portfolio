import { FileItem } from './types'

export const mockFiles: FileItem[] = [
  {
    id: 'root-img-1',
    name: 'Hero Banner.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 342_120,
    width: 1920,
    height: 1080,
    url: 'https://images.pexels.com/photos/37429278/pexels-photo-37429278.jpeg',
    previewUrl: 'https://images.pexels.com/photos/37429278/pexels-photo-37429278.jpeg?auto=compress&cs=tinysrgb&w=200',
    parentId: 'root',
    createdAt: new Date('2025-01-10T10:00:00Z'),
    updatedAt: new Date('2025-06-01T12:00:00Z'),
    isFolder: false
  },
  {
    id: 'logo-png',
    name: 'Brand Logo.png',
    type: 'image',
    mimeType: 'image/png',
    size: 54_321,
    width: 800,
    height: 800,
    url: '/images/mock/logo.png',
    previewUrl: '/images/mock/logo-thumb.png',
    parentId: 'assets',
    createdAt: new Date('2024-11-01T09:30:00Z'),
    updatedAt: new Date('2025-02-21T08:15:00Z'),
    isFolder: false
  },
  {
    id: 'proj-1-img-1',
    name: 'Landing Mockup.png',
    type: 'image',
    mimeType: 'image/png',
    size: 128_987,
    width: 1440,
    height: 900,
    url: '/images/mock/landing-mockup.png',
    previewUrl: '/images/mock/landing-mockup-thumb.png',
    parentId: 'proj-1',
    createdAt: new Date('2025-03-02T11:22:00Z'),
    updatedAt: new Date('2025-03-05T10:00:00Z'),
    isFolder: false
  },
  {
    id: 'doc-1',
    name: 'Project Brief.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    size: 98_765,
    url: '/docs/mock/project-brief.pdf',
    parentId: 'proj-1',
    createdAt: new Date('2024-09-15T07:00:00Z'),
    updatedAt: new Date('2024-12-01T07:00:00Z'),
    isFolder: false
  },
  {
    id: 'video-1',
    name: 'Intro Demo.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 8_345_678,
    duration: 45,
    url: '/videos/mock/intro-demo.mp4',
    previewUrl: '/images/mock/video-thumb.jpg',
    parentId: 'assets',
    createdAt: new Date('2024-05-20T14:00:00Z'),
    updatedAt: new Date('2024-06-10T09:00:00Z'),
    isFolder: false
  },
  {
    id: 'audio-1',
    name: 'Background Music.mp3',
    type: 'audio',
    mimeType: 'audio/mpeg',
    size: 3_210_000,
    duration: 120,
    url: '/audio/mock/background-music.mp3',
    parentId: 'assets',
    createdAt: new Date('2023-08-01T10:00:00Z'),
    updatedAt: new Date('2023-08-01T10:00:00Z'),
    isFolder: false
  },
  // folders as entries (optional)
  {
    id: 'proj-1',
    name: 'Website Redesign',
    type: 'folder',
    isFolder: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2025-03-05T10:00:00Z')
  },
  {
    id: 'assets',
    name: 'Assets',
    type: 'folder',
    isFolder: true,
    createdAt: new Date('2022-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z')
  },
  {
    id: 'shared',
    name: 'Shared',
    type: 'folder',
    isFolder: true,
    createdAt: new Date('2024-06-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z')
  }
]

export default mockFiles
