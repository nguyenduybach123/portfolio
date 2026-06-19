'use client'

import { useState } from 'react'
import { ChevronRight, Star, Folder } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Shadcn UI components
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

interface FolderNode {
  id: string
  name: string
  icon: string
  children?: FolderNode[]
}

interface SidebarProps {
  folders: FolderNode[]
  currentFolderId: string | null
  onNavigate: (folderId: string, folderName: string) => void
}

interface FilesMediaSidebarProps extends SidebarProps {}

const FilesMediaSidebar = ({ folders, currentFolderId, onNavigate }: FilesMediaSidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['projects']))

  const toggleFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn chặn sự kiện click kích hoạt điều hướng folder cha
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
  }

  const renderFolderTree = (items: FolderNode[], depth = 0) => {
    return items.map((item) => {
      const isExpanded = expandedFolders.has(item.id)
      const hasChildren = item.children && item.children.length > 0
      const isActive = currentFolderId === item.id

      return (
        <div key={item.id} className='w-full'>
          {/* Row Container: Đã tách biệt nút Toggle Chevron và vùng điều hướng */}
          <div
            className={`group flex items-center gap-1 rounded-lg px-1 py-0.5 text-sm transition-all duration-200 ${
              isActive
                ? 'bg-secondary font-medium text-foreground'
                : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
            }`}
            style={{ paddingLeft: `${depth * 12 + 4}px` }}
          >
            {/* Nút bấm mở rộng */}
            {hasChildren ? (
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6 rounded-md text-muted-foreground/60 hover:bg-muted'
                onClick={(e) => toggleFolder(item.id, e)}
              >
                <motion.span
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className='flex items-center justify-center'
                >
                  <ChevronRight className='h-3.5 w-3.5' />
                </motion.span>
              </Button>
            ) : (
              <div className='w-6' /> // Giữ khoảng cách thẳng hàng đều đặn
            )}

            {/* Content Button để điều hướng */}
            <button
              onClick={() => onNavigate(item.id, item.name)}
              className='flex flex-1 items-center gap-2 py-1.5 pr-2 text-left focus:outline-none'
            >
              <span className='shrink-0'>
                {item.icon === 'star' ? (
                  <Star className='h-4 w-4 fill-amber-400/90 text-amber-400' strokeWidth={1.5} />
                ) : (
                  <Folder className={`h-4 w-4 ${isActive ? 'text-blue-500' : 'text-blue-400/80'}`} strokeWidth={1.5} />
                )}
              </span>
              <span className='truncate font-normal tracking-tight'>{item.name}</span>
            </button>
          </div>

          {/* Sub-folders với chuyển động Accordion mượt mà */}
          <AnimatePresence initial={false}>
            {hasChildren && isExpanded && item.children && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }} // Custom cubic-bezier mượt hơn
                className='overflow-hidden'
              >
                <div className='flex flex-col gap-0.5 pt-0.5'>{renderFolderTree(item.children, depth + 1)}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    })
  }

  return (
    <>
      <ResizablePanel minSize={200} maxSize={400} defaultSize={240}>
        <aside className='flex h-full w-full flex-col bg-background/50'>
          {/* Header không viền cứng, sử dụng tracking-wider tối giản */}
          <div className='px-6 py-4'>
            <h2 className='text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70'>
              Files & Spaces
            </h2>
          </div>

          {/* Cây thư mục lồng trong ScrollArea cao cấp */}
          <ScrollArea className='flex-1 px-3'>
            <nav className='flex flex-col gap-0.5 pb-4'>{renderFolderTree(folders)}</nav>
          </ScrollArea>

          {/* Thông tin bộ nhớ lưu trữ tối giản (Storage) */}
          <div className='backdrop-blur-xs flex flex-col gap-2.5 border-t border-border/40 bg-background/30 p-4'>
            <div className='flex items-center justify-between text-xs tracking-tight'>
              <span className='text-muted-foreground/80'>Cloud Storage</span>
              <span className='font-medium text-foreground/90'>4.2 GB of 10 GB</span>
            </div>
            <Progress value={42} className='h-1 bg-muted' />
          </div>
        </aside>
      </ResizablePanel>
      <ResizableHandle withHandle className='bg-border/30 transition-colors hover:bg-border/80' />
    </>
  )
}

export default FilesMediaSidebar
