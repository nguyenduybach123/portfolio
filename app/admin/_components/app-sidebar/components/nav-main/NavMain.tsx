'use client'

import { useId } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
}

const NavMain = ({ items }: { items: NavItem[] }) => {
  const pathName = usePathname()
  const layoutId = useId() // Đảm bảo layoutId độc nhất cho Framer Motion

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        {/* Tăng nhẹ khoảng cách giữa các items để có không gian thở (whitespace) */}
        <SidebarMenu className='gap-1.5'>
          {items.map((item) => {
            // Logic check active: Có thể dùng startsWith nếu có sub-routes,
            // ở đây dùng exact match theo code gốc của bạn.
            const isActive = pathName === item.url

            return (
              <SidebarMenuItem key={item.title}>
                {/* Dùng asChild để truyền component Link của Next.js vào trong */}
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    'group relative h-10 w-full cursor-pointer overflow-hidden border-transparent transition-colors hover:bg-transparent',
                    !isActive && 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Link href={item.url}>
                    {/* Hiệu ứng Background trượt mượt mà cho trạng thái Active */}
                    {isActive && (
                      <motion.div
                        layoutId={`active-nav-bg-${layoutId}`}
                        className='absolute inset-0 rounded-md bg-primary/10'
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30
                        }}
                      />
                    )}

                    {/* Content Layer (Phải có relative z-10 để nổi lên trên background) */}
                    <div className='relative z-10 flex w-full items-center gap-3 px-2'>
                      {item.icon && (
                        <item.icon
                          className={cn(
                            'size-4 transition-transform duration-300 group-hover:scale-110',
                            isActive ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground'
                          )}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      )}
                      <span
                        className={cn(
                          'text-sm transition-all duration-200',
                          isActive ? 'font-semibold text-primary' : 'font-medium'
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default NavMain
