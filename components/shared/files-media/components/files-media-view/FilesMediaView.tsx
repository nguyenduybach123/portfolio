import { ReactNode, FC } from 'react'
import { useFilesMediaContext } from '../../lib/hooks'
import { GridView, ListView } from './components'

interface Props {}

const FilesMediaView: FC<Props> = () => {
  const { viewMode, files } = useFilesMediaContext()

  return (
    <div>
      {viewMode === 'grid' ? (
        <GridView
          files={files}
          selectedFileIds={new Set()}
          onNavigateFolder={() => {}}
          onOpenPreview={() => {}}
          onToggleSelect={() => {}}
        />
      ) : (
        <ListView
          files={files}
          allSelected={true}
          selectedFileIds={new Set()}
          onSelectAll={() => {}}
          onOpenPreview={() => {}}
          onToggleSelect={() => {}}
        />
      )}
    </div>
  )
}

export default FilesMediaView
