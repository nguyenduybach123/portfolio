'use client'

import { FilesMedia } from '@/components/shared'
import mockFiles from '@/components/shared/files-media/lib/mock'

export const mockFolders = [
  { id: 'root', name: 'My Files', icon: 'folder' },
  { id: 'favorites', name: 'Favorites', icon: 'star' },
  {
    id: 'projects',
    name: 'Projects',
    icon: 'folder',
    children: [
      { id: 'proj-1', name: 'Website Redesign', icon: 'folder' },
      { id: 'proj-2', name: 'Mobile App', icon: 'folder' },
      { id: 'proj-3', name: 'Brand Assets', icon: 'folder' }
    ]
  },
  { id: 'blogs', name: 'Blogs', icon: 'folder' },
  { id: 'assets', name: 'Assets', icon: 'folder' },
  { id: 'portfolio', name: 'Portfolio', icon: 'folder' },
  { id: 'shared', name: 'Shared', icon: 'folder' }
]

const FilesPage = () => {
  return (
    <div>
      <FilesMedia initialFolderId={'root'} initialFiles={mockFiles}>
        <FilesMedia.Layout>
          <FilesMedia.SideBar folders={mockFolders} currentFolderId={null} onNavigate={() => {}} />

          <FilesMedia.Main>
            <FilesMedia.Header />
            <FilesMedia.Toolbar />
            <FilesMedia.View />
          </FilesMedia.Main>
        </FilesMedia.Layout>

        <FilesMedia.Preview onClose={() => {}} />

        <FilesMedia.Upload onUpload={() => {}} isUploading={false} progress={0} />
      </FilesMedia>
    </div>
  )
}

export default FilesPage
