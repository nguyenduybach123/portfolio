'use client'

import { X, Download, Copy, Trash2, Edit2 } from 'lucide-react'

import { getFileIcon } from '../../lib/icon-helper'
import { formatDate, formatFileSize } from '../../lib/utils'
import { FileItem } from '../../lib/types'

interface PreviewDrawerProps {
  file: FileItem | undefined
  isOpen: boolean
  onClose: () => void
}

const FilesMediaPreview = ({ file, isOpen, onClose }: PreviewDrawerProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className='fixed inset-0 z-40 bg-black/50 transition-opacity' onClick={onClose} />}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-screen w-96 flex-col border-l border-border bg-card transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-border px-6 py-4'>
          <h2 className='text-lg font-semibold'>Preview</h2>
          <button onClick={onClose} className='rounded p-1 transition-colors hover:bg-card/50'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Content */}
        <div className='flex-1 space-y-6 overflow-y-auto p-6'>
          {file ? (
            <>
              {/* Preview Image */}
              <div className='overflow-hidden rounded-lg bg-gradient-to-br from-card to-card/50'>
                <div className='flex aspect-square items-center justify-center'>
                  {file.isFolder ? (
                    <div className='flex flex-col items-center gap-2'>
                      <div className='text-blue-400/30'>{getFileIcon('other', true, 'lg')}</div>
                      <span className='text-sm text-muted-foreground'>Folder</span>
                    </div>
                  ) : file.previewUrl ? (
                    <img src={file.previewUrl} alt={file.name} className='h-full w-full object-cover' />
                  ) : (
                    <div className='flex flex-col items-center gap-2'>
                      <div className='flex h-16 w-16 items-center justify-center text-muted-foreground/50'>
                        {getFileIcon(file.type, false, 'lg')}
                      </div>
                      <span className='text-sm capitalize text-muted-foreground'>{file.type} File</span>
                    </div>
                  )}
                </div>
              </div>

              {/* File Info */}
              <div className='space-y-4'>
                {/* Name */}
                <div>
                  <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>File Name</p>
                  <p className='break-words text-sm font-medium text-foreground'>{file.name}</p>
                </div>

                {/* Type */}
                <div>
                  <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>File Type</p>
                  <p className='text-sm capitalize text-foreground'>
                    {file.isFolder ? 'Folder' : file.mimeType || file.type}
                  </p>
                </div>

                {/* Dimensions */}
                {file.width && file.height && (
                  <div>
                    <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>Dimensions</p>
                    <p className='text-sm text-foreground'>
                      {file.width} × {file.height}px
                    </p>
                  </div>
                )}

                {/* File Size */}
                {file.size && (
                  <div>
                    <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>File Size</p>
                    <p className='text-sm text-foreground'>{formatFileSize(file.size)}</p>
                  </div>
                )}

                {/* Duration */}
                {file.duration && (
                  <div>
                    <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>Duration</p>
                    <p className='text-sm text-foreground'>
                      {Math.floor(file.duration / 60)}m {file.duration % 60}s
                    </p>
                  </div>
                )}

                {/* Created */}
                <div>
                  <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>Created</p>
                  <p className='text-sm text-foreground'>{new Date(file.createdAt).toLocaleString()}</p>
                </div>

                {/* Modified */}
                <div>
                  <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>Modified</p>
                  <p className='text-sm text-foreground'>
                    {formatDate(file.updatedAt)} - {new Date(file.updatedAt).toLocaleString()}
                  </p>
                </div>

                {/* URL */}
                {file.url && (
                  <div>
                    <p className='mb-1 text-xs font-semibold uppercase text-muted-foreground'>URL</p>
                    <div className='flex items-center gap-2'>
                      <input
                        type='text'
                        value={file.url}
                        readOnly
                        className='flex-1 rounded border border-border bg-card px-3 py-1 text-sm text-muted-foreground'
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(file.url!)}
                        className='rounded p-1 transition-colors hover:bg-card/50'
                      >
                        <Copy className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='flex h-full items-center justify-center text-center'>
              <div className='space-y-2'>
                <p className='text-muted-foreground'>Select a file to preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {file && (
          <div className='space-y-2 border-t border-border p-4'>
            <button className='flex w-full items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20'>
              <Download className='h-4 w-4' />
              Download
            </button>
            <button className='flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card/50'>
              <Edit2 className='h-4 w-4' />
              Rename
            </button>
            <button className='flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20'>
              <Trash2 className='h-4 w-4' />
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default FilesMediaPreview
