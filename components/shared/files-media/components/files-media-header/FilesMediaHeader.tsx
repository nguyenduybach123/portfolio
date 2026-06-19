import { Upload, Plus } from 'lucide-react'

interface FilesMediaHeaderProps {
  onUploadClick?: () => void
}

const FilesMediaHeader = ({ onUploadClick }: FilesMediaHeaderProps) => {
  return (
    <div className='flex items-center justify-between border-b border-border bg-card px-6 py-6'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold tracking-tight'>Files & Media</h1>
        <p className='mt-1 text-sm text-muted-foreground'>
          Manage uploaded assets, folders, images, videos, and documents.
        </p>
      </div>

      <div className='flex items-center gap-3'>
        <button
          className='group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card/80'
          title='New Folder'
        >
          <Plus className='h-4 w-4 transition-transform group-hover:scale-110' />
          New Folder
        </button>

        <button
          onClick={onUploadClick}
          className='group inline-flex items-center justify-center gap-2 rounded-lg border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20'
          title='Upload Files'
        >
          <Upload className='h-4 w-4 transition-transform group-hover:scale-110' />
          Upload
        </button>
      </div>
    </div>
  )
}

export default FilesMediaHeader
