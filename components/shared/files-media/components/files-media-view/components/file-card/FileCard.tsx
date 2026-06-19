'use client'

import { useState } from 'react'
import { Eye, Copy, Download, Folder } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { FileItem } from '@/components/shared/files-media/lib/types'
import { getFileIcon } from '@/components/shared/files-media/lib/icon-helper'
import { formatDate, formatFileSize } from '@/components/shared/files-media/lib/utils'

// Shadcn UI components
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

interface FileCardProps {
  file: FileItem
  isSelected: boolean
  onToggleSelect: (fileId: string) => void
  onOpenPreview: (fileId: string) => void
  onNavigateFolder: (folderId: string, folderName: string) => void
}

const FileCard = ({ file, isSelected, onToggleSelect, onOpenPreview, onNavigateFolder }: FileCardProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleFolderClick = () => {
    if (file.isFolder) {
      onNavigateFolder(file.id, file.name)
    }
  }

  // Ngăn chặn sự kiện click lan ra ngoài khi thao tác trên overlay/checkbox
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  return (
    <motion.div
      layout // Giúp card di chuyển mượt mà khi layout grid thay đổi (vd: xóa file, filter)
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-xl border transition-colors duration-300 ${
        isSelected
          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
          : 'border-border/50 bg-card hover:border-border hover:shadow-sm'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Checkbox (Minimalist: Chỉ hiện khi được chọn hoặc khi hover) */}
      <div
        className={`absolute left-3 top-3 z-20 transition-opacity duration-300 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(file.id)}
          className='bg-background/80 shadow-sm backdrop-blur-sm data-[state=checked]:bg-primary'
        />
      </div>

      {/* Preview Section */}
      <div
        className='relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden bg-muted/30'
        onClick={handleFolderClick}
      >
        {file.isFolder ? (
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
            <Folder className='h-14 w-14 text-blue-500/70' strokeWidth={1.5} />
          </motion.div>
        ) : file.previewUrl ? (
          <motion.img
            src={file.previewUrl}
            alt={file.name}
            className='h-full w-full object-cover'
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ) : (
          <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            {getFileIcon(file.type, false, 'lg')}
          </motion.div>
        )}

        {/* Quick Actions Overlay với Framer Motion */}
        <AnimatePresence>
          {isHovering && !file.isFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 z-10 flex items-center justify-center gap-3 bg-background/40 backdrop-blur-md'
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                <Button
                  size='icon'
                  variant='secondary'
                  className='h-9 w-9 rounded-full shadow-sm hover:scale-105'
                  onClick={(e) => handleActionClick(e, () => onOpenPreview(file.id))}
                  title='Preview'
                >
                  <Eye className='h-4 w-4' />
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Button
                  size='icon'
                  variant='secondary'
                  className='h-9 w-9 rounded-full shadow-sm hover:scale-105'
                  onClick={(e) => handleActionClick(e, () => {})}
                  title='Copy URL'
                >
                  <Copy className='h-4 w-4' />
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                <Button
                  size='icon'
                  variant='secondary'
                  className='h-9 w-9 rounded-full shadow-sm hover:scale-105'
                  onClick={(e) => handleActionClick(e, () => {})}
                  title='Download'
                >
                  <Download className='h-4 w-4' />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* File Info Section (Minimalist Typography) */}
      <div className='flex flex-col gap-1.5 p-4'>
        <div className='flex items-center gap-2'>
          <div className='flex-shrink-0 text-muted-foreground/70'>{getFileIcon(file.type, file.isFolder, 'sm')}</div>
          <p className='truncate text-sm font-medium leading-none text-foreground' title={file.name}>
            {file.name}
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground/70'>
          {file.size && <span>{formatFileSize(file.size)}</span>}
          {file.width && file.height && (
            <>
              <span className='h-1 w-1 rounded-full bg-muted-foreground/30' />
              <span>
                {file.width} × {file.height}
              </span>
            </>
          )}
          <span className='h-1 w-1 rounded-full bg-muted-foreground/30' />
          <span>{formatDate(file.updatedAt)}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default FileCard
