'use client'

import { Upload, X } from 'lucide-react'

interface UploadZoneProps {
  isUploading: boolean
  progress: number
  onUpload: (files: File[]) => void
}

const FilesMediaUpload = ({ isUploading, progress }: UploadZoneProps) => {
  if (!isUploading) return null

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Upload className='h-4 w-4 animate-bounce text-accent' />
          <span className='text-sm font-medium'>Uploading files...</span>
        </div>
        <span className='text-sm font-semibold text-accent'>{Math.round(progress)}%</span>
      </div>

      <div className='h-2 overflow-hidden rounded-full bg-card'>
        <div
          className='h-full rounded-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-300 ease-out'
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className='text-xs text-muted-foreground'>
        {progress < 100 ? 'Please wait while your files are being uploaded...' : 'Upload complete!'}
      </p>
    </div>
  )
}

export default FilesMediaUpload
