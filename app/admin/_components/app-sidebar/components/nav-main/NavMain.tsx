'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { LucideIcon, MailIcon, PlusCircleIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const NavMain = ({
  items
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) => {
  // Hooks
  const pathName = usePathname()
  const router = useRouter()

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  'data-[slot=sidebar-menu-button]:!p-1.5',
                  pathName === item.url &&
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                )}
                onClick={() => router.push(item.url)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default NavMain
