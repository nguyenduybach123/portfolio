import { FC } from 'react'
import { useFilesMediaContext } from '../../lib/hooks'
import { GridView, ListView } from './components'

const FilesMediaView: FC = () => {
  const {
    viewMode,
    files,
    searchQuery,
    currentFolderId,
    selectedFileIds,
    toggleFileSelection,
    setSelectedFile,
    navigateTo,
    selectAll
  } = useFilesMediaContext()

  const filtered = files
    .filter((f) => (currentFolderId ? f.parentId === currentFolderId : !f.parentId))
    .filter((f) => (searchQuery ? f.name.toLowerCase().includes(searchQuery.toLowerCase()) : true))

  const handleOpenPreview = (id: string) => {
    const file = files.find((f) => f.id === id) ?? null
    setSelectedFile(file)
  }

  const allSelected = filtered.length > 0 && filtered.every((f) => selectedFileIds.has(f.id))

  return (
    <div className='h-full w-full overflow-auto p-4'>
      {viewMode === 'grid' ? (
        <GridView
          files={filtered}
          selectedFileIds={selectedFileIds}
          onNavigateFolder={(folderId) => navigateTo(folderId)}
          onOpenPreview={handleOpenPreview}
          onToggleSelect={toggleFileSelection}
        />
      ) : (
        <ListView
          files={filtered}
          allSelected={allSelected}
          selectedFileIds={selectedFileIds}
          onSelectAll={selectAll}
          onOpenPreview={handleOpenPreview}
          onToggleSelect={toggleFileSelection}
        />
      )}
    </div>
  )
}

export default FilesMediaView
