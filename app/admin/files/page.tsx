'use client'

import { FilesMedia } from '@/components/shared'

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
      <FilesMedia initialFolderId={null} initialFiles={[]}>
        <FilesMedia.Layout>
          <FilesMedia.SideBar folders={mockFolders} currentFolderId={null} onNavigate={() => {}} />

          <FilesMedia.Main>
            <FilesMedia.Header />
            <FilesMedia.Toolbar
              searchQuery={''}
              onSearchChange={() => {}}
              selectedCount={0}
              allSelected={true}
              onSelectAll={() => {}}
              onSortChange={() => {}}
              sortOrder={'asc'}
              onSortOrderChange={() => {}}
              sortBy={'name'}
              onViewModeChange={() => {}}
              viewMode={'grid'}
              selectedFilter={'all'}
              onFilterChange={() => {}}
              totalCount={0}
            />

            <FilesMedia.View />
          </FilesMedia.Main>
        </FilesMedia.Layout>

        <FilesMedia.Upload isUploading={false} progress={0} onUpload={() => {}} />
      </FilesMedia>
    </div>
  )
}

export default FilesPage
