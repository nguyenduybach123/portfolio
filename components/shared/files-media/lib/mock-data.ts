import { FileItem } from './types'

export const mockFiles: FileItem[] = [
  {
    id: 'folder-root',
    name: 'My Files',
    type: 'folder',
    isFolder: true,
    children: [],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-06-01')
  },
  {
    id: 'folder-projects',
    name: 'Projects',
    type: 'folder',
    parentId: 'folder-root',
    isFolder: true,
    children: [],
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-04-12')
  },
  {
    id: 'img-001',
    name: 'hero-banner.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    size: 245_120,
    width: 1920,
    height: 720,
    previewUrl: '/images/mock/hero-banner.jpg',
    url: '/images/mock/hero-banner.jpg',
    parentId: 'folder-root',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-06-05')
  },
  {
    id: 'img-002',
    name: 'avatar.png',
    type: 'image',
    mimeType: 'image/png',
    size: 48_512,
    width: 400,
    height: 400,
    previewUrl: '/images/mock/avatar.png',
    url: '/images/mock/avatar.png',
    parentId: 'folder-root',
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-05-20')
  },
  {
    id: 'doc-001',
    name: 'specs.pdf',
    type: 'document',
    mimeType: 'application/pdf',
    size: 512_000,
    url: '/files/mock/specs.pdf',
    parentId: 'folder-projects',
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-02')
  },
  {
    id: 'video-001',
    name: 'promo.mp4',
    type: 'video',
    mimeType: 'video/mp4',
    size: 5_120_000,
    duration: 32,
    previewUrl: '/videos/mock/promo-thumb.jpg',
    url: '/videos/mock/promo.mp4',
    parentId: 'folder-root',
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-15')
  },
  {
    id: 'audio-001',
    name: 'podcast-episode.mp3',
    type: 'audio',
    mimeType: 'audio/mpeg',
    size: 3_200_000,
    duration: 1800,
    url: '/audio/mock/podcast-episode.mp3',
    parentId: 'folder-root',
    createdAt: new Date('2026-02-20'),
    updatedAt: new Date('2026-02-22')
  },
  {
    id: 'file-locked',
    name: 'notes.txt',
    type: 'document',
    mimeType: 'text/plain',
    size: 1_024,
    url: '/files/mock/notes.txt',
    parentId: 'folder-projects',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-01')
  }
]

export default mockFiles
