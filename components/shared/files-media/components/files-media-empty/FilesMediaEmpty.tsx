import { Upload, X } from 'lucide-react'

interface EmptyStateProps {
  query: string
  onClearSearch: () => void
  onUpload: (files: File[]) => void
}

const FilesMediaEmpty = ({ query, onClearSearch, onUpload }: EmptyStateProps) => {
  return (
    <div className='flex h-full items-center justify-center px-4'>
      <div className='max-w-md space-y-4 text-center'>
        <div className='inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card'>
          <Upload className='h-8 w-8 text-muted-foreground/50' />
        </div>

        <div className='space-y-2'>
          {query ? (
            <>
              <h3 className='text-lg font-semibold'>No files found</h3>
              <p className='text-sm text-muted-foreground'>
                No results for <span className='font-medium text-foreground'>"{query}"</span>. Try adjusting your search
                terms.
              </p>

              <button
                onClick={onClearSearch}
                className='mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20'
              >
                <X className='h-4 w-4' />
                Clear Search
              </button>
            </>
          ) : (
            <>
              <h3 className='text-lg font-semibold'>No files yet</h3>
              <p className='text-sm text-muted-foreground'>
                Get started by uploading your first file or creating a new folder.
              </p>

              <button
                onClick={() => onUpload([])}
                className='mt-4 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20'
              >
                <Upload className='h-4 w-4' />
                Upload Files
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilesMediaEmpty
