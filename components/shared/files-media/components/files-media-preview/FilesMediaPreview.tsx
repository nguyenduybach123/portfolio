'use client'

import { Download, Copy, Trash2, Edit2, FileIcon } from 'lucide-react'
import { useState } from 'react'

import { getFileIcon } from '../../lib/icon-helper'
import { formatDate, formatFileSize } from '../../lib/utils'
import { FileItem } from '../../lib/types'

// Import shadcn components (Điều chỉnh đường dẫn @/components/ui cho phù hợp với project của bạn)
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFilesMediaContext } from '../../lib/hooks'

interface PreviewDrawerProps {
  onClose: () => void
}

const FilesMediaPreview = ({ onClose }: PreviewDrawerProps) => {
  // Hooks
  const { selectedFile, setSelectedFile } = useFilesMediaContext()

  // States
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const hanldeClose = () => {
    setIsCopied(false)
    setSelectedFile(null)
    onClose()
  }

  const MetaRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className='flex flex-col gap-1.5'>
      <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>{label}</span>
      <div className='text-sm font-medium text-foreground'>{value}</div>
    </div>
  )

  const isOpen = Boolean(selectedFile) && Boolean(selectedFile?.id)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && hanldeClose()}>
      {/* Sử dụng side="right" để trượt từ phải sang. Bỏ p-0 mặc định để custom padding theo ý muốn */}
      <SheetContent side='right' className='flex w-full flex-col gap-0 p-0 sm:max-w-md'>
        {/* Header */}
        <SheetHeader className='border-b p-4 text-left'>
          <SheetTitle className='text-lg font-semibold'>File Preview</SheetTitle>
        </SheetHeader>

        {/* Body Content */}
        <ScrollArea className='flex-1'>
          {selectedFile ? (
            <div className='flex flex-col gap-6 p-6'>
              {/* Preview Image / Icon Wrapper */}
              <div className='group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border bg-muted/50 transition-colors hover:bg-muted'>
                {selectedFile.isFolder ? (
                  <div className='flex flex-col items-center gap-3 transition-transform group-hover:scale-105'>
                    <div className='text-blue-500/80'>{getFileIcon('other', true, 'lg')}</div>
                    <span className='text-sm font-medium text-muted-foreground'>Folder</span>
                  </div>
                ) : selectedFile.previewUrl ? (
                  <img
                    src={selectedFile.previewUrl}
                    alt={selectedFile.name}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                ) : (
                  <div className='flex flex-col items-center gap-3 transition-transform group-hover:scale-105'>
                    <div className='text-muted-foreground/50'>{getFileIcon(selectedFile.type, false, 'lg')}</div>
                    <span className='text-sm font-medium capitalize text-muted-foreground'>
                      {selectedFile.type} File
                    </span>
                  </div>
                )}
              </div>

              {/* File Info / Metadata */}
              <div className='flex flex-col gap-4'>
                <MetaRow label='File Name' value={<span className='break-all'>{selectedFile.name}</span>} />

                <div className='grid grid-cols-2 gap-4'>
                  <MetaRow
                    label='Type'
                    value={
                      <span className='capitalize'>
                        {selectedFile.isFolder ? 'Folder' : selectedFile.mimeType || selectedFile.type}
                      </span>
                    }
                  />
                  {selectedFile.size && <MetaRow label='Size' value={formatFileSize(selectedFile.size)} />}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  {selectedFile.width && selectedFile.height && (
                    <MetaRow label='Dimensions' value={`${selectedFile.width} × ${selectedFile.height}px`} />
                  )}
                  {selectedFile.duration && (
                    <MetaRow
                      label='Duration'
                      value={`${Math.floor(selectedFile.duration / 60)}m ${selectedFile.duration % 60}s`}
                    />
                  )}
                </div>

                <Separator className='my-2' />

                <MetaRow label='Created' value={new Date(selectedFile.createdAt).toLocaleString()} />
                <MetaRow
                  label='Modified'
                  value={`${formatDate(selectedFile.updatedAt)} - ${new Date(selectedFile.updatedAt).toLocaleString()}`}
                />

                {/* URL with Copy Action */}
                {selectedFile.url && (
                  <div className='flex flex-col gap-1.5 pt-2'>
                    <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>URL</span>
                    <div className='flex items-center gap-2'>
                      <Input readOnly value={selectedFile.url} className='h-9 font-mono text-xs' />
                      <Button
                        size='icon'
                        variant='secondary'
                        className='h-9 w-9 shrink-0'
                        onClick={() => handleCopy(selectedFile.url!)}
                        title='Copy URL'
                      >
                        <Copy className={`h-4 w-4 ${isCopied ? 'text-green-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='flex h-[50vh] flex-col items-center justify-center gap-2 text-muted-foreground'>
              <FileIcon className='h-10 w-10 opacity-20' />
              <p className='text-sm'>Select a file to preview</p>
            </div>
          )}
        </ScrollArea>

        {/* Fixed Action Footer */}
        {selectedFile && (
          <div className='mt-auto flex flex-col gap-2 border-t bg-background p-4 shadow-sm'>
            <Button className='w-full gap-2' variant='default'>
              <Download className='h-4 w-4' />
              Download
            </Button>
            <div className='grid grid-cols-2 gap-2'>
              <Button className='w-full gap-2' variant='outline'>
                <Edit2 className='h-4 w-4' />
                Rename
              </Button>
              <Button className='w-full gap-2' variant='destructive'>
                <Trash2 className='h-4 w-4' />
                Delete
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default FilesMediaPreview
