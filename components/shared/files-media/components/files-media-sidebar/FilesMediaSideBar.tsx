'use client'

import { useState } from 'react'
import { ChevronRight, Star, Folder } from 'lucide-react'

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
    e.stopPropagation()
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
        <div key={item.id}>
          <button
            onClick={() => onNavigate(item.id, item.name)}
            className={`group relative flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive ? 'bg-accent/20 font-medium text-accent' : 'text-foreground hover:bg-card'
            }`}
            style={{ paddingLeft: `${depth * 16 + 12}px` }}
          >
            {hasChildren && (
              <button
                onClick={(e) => toggleFolder(item.id, e)}
                className='flex-shrink-0 rounded p-0 transition-colors hover:bg-card'
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            )}

            {!hasChildren && <div className='w-4' />}

            <div className='flex-shrink-0'>
              {item.icon === 'star' ? (
                <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              ) : (
                <Folder className='h-4 w-4 text-blue-400' />
              )}
            </div>

            <span className='flex-1 truncate text-left'>{item.name}</span>
          </button>

          {hasChildren && isExpanded && item.children && <>{renderFolderTree(item.children, depth + 1)}</>}
        </div>
      )
    })
  }

  return (
    <aside className='flex w-80 flex-col border-r border-border'>
      {/* Sidebar Header */}
      <div className='border-b border-border px-6 py-4'>
        <h2 className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Navigation</h2>
      </div>

      {/* Folder Tree */}
      <nav className='flex-1 space-y-1 overflow-y-auto px-3 py-4'>{renderFolderTree(folders)}</nav>

      {/* Storage Info */}
      <div className='space-y-2 border-t border-border p-4'>
        <div className='flex items-center justify-between text-xs'>
          <span className='text-muted-foreground'>Storage Used</span>
          <span className='font-medium'>4.2 GB / 10 GB</span>
        </div>
        <div className='h-1.5 overflow-hidden rounded-full bg-card'>
          <div className='h-full rounded-full bg-gradient-to-r from-accent to-accent/60' style={{ width: '42%' }} />
        </div>
      </div>
    </aside>
  )
}

export default FilesMediaSidebar
