'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell } from 'lucide-react'

// Shadcn UI components
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const SiteHeader = () => {
  const pathname = usePathname()

  // Tự động phân tách pathname thành các chỉ mục để làm Breadcrumb động
  const segments = pathname ? pathname.split('/').filter(Boolean) : []

  return (
    <header className='h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-0 z-30 flex w-full shrink-0 items-center border-b border-border/40 bg-background/60 backdrop-blur-md transition-all duration-200'>
      <div className='flex w-full items-center justify-between px-4 lg:px-6'>
        {/* Left Side: Sidebar Trigger + Dynamic Breadcrumb */}
        <div className='flex items-center gap-2'>
          <SidebarTrigger className='-ml-1 h-8 w-8 text-muted-foreground/80 hover:bg-muted/60' />

          <Separator
            orientation='vertical'
            className='mx-2 hidden h-4 bg-border/60 data-[orientation=vertical]:h-4 sm:block'
          />

          {/* Breadcrumb với Motion */}
          <Breadcrumb className='hidden sm:block'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/' className='text-muted-foreground/60 transition-colors hover:text-foreground'>
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>

              <AnimatePresence mode='popLayout'>
                {segments.map((segment, index) => {
                  const isLast = index === segments.length - 1
                  const href = `/${segments.slice(0, index + 1).join('/')}`
                  const label = segment.charAt(0).toUpperCase() + segment.slice(1)

                  return (
                    <motion.div
                      key={href}
                      className='flex items-center gap-1.5'
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <BreadcrumbSeparator className='text-muted-foreground/40' />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className='font-medium tracking-tight text-foreground'>
                            {label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={href}
                            className='text-muted-foreground/60 transition-colors hover:text-foreground'
                          >
                            {label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right Side: Minimal Actions (Cân bằng thị giác cho Header) */}
        <div className='flex items-center gap-3'>
          {/* Nút bấm giả lập Kính mờ kích hoạt Tìm kiếm nhanh (Command Menu) */}
          <button className='hidden h-9 w-48 items-center justify-between rounded-lg bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground/60 transition-all hover:bg-muted/80 hover:text-muted-foreground focus:outline-none md:flex'>
            <div className='flex items-center gap-2'>
              <Search className='h-3.5 w-3.5' />
              <span>Search everywhere...</span>
            </div>
            <kbd className='shadow-xs pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/50 bg-background px-1.5 font-mono text-[10px] font-medium opacity-100'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </button>

          {/* Nút Mobile Search */}
          <Button variant='ghost' size='icon' className='h-8 w-8 text-muted-foreground/80 hover:bg-muted/60 md:hidden'>
            <Search className='h-4 w-4' />
          </Button>

          {/* Notification Button */}
          <Button variant='ghost' size='icon' className='relative h-8 w-8 text-muted-foreground/80 hover:bg-muted/60'>
            <Bell className='h-4 w-4' />
            <span className='absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-primary' />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
