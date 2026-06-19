'use client'

import { FileItem } from '@/components/shared/files-media/lib/types'
import FileCard from '../file-card'

interface GridViewProps {
  files: FileItem[]
  selectedFileIds: Set<string>
  onToggleSelect: (fileId: string) => void
  onOpenPreview: (fileId: string) => void
  onNavigateFolder: (folderId: string, folderName: string) => void
}

const GridView = ({ files, selectedFileIds, onToggleSelect, onOpenPreview, onNavigateFolder }: GridViewProps) => {
  return (
    <div className='grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          isSelected={selectedFileIds.has(file.id)}
          onToggleSelect={onToggleSelect}
          onOpenPreview={onOpenPreview}
          onNavigateFolder={onNavigateFolder}
        />
      ))}
    </div>
  )
}

export default GridView
