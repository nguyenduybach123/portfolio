'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import {
  ChartBarIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  NewspaperIcon,
  PanelsTopLeftIcon,
  UsersIcon,
  Package2Icon,
  CogIcon
} from 'lucide-react'
import { NavMain, NavUser } from './components'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboardIcon
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: UsersIcon
    },
    {
      title: 'Blogs',
      url: '/admin/posts',
      icon: NewspaperIcon
    },
    {
      title: 'Projects',
      url: '/admin/projects',
      icon: Package2Icon
    },
    {
      title: 'Pages',
      url: '/admin/pages',
      icon: PanelsTopLeftIcon
    },
    {
      title: 'Files & Media',
      url: '/admin/files',
      icon: FolderIcon
    },
    {
      title: 'Configuration',
      url: '/admin/configurations',
      icon: CogIcon
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='data-[slot=sidebar-menu-button]:!p-1.5'>
              <a href=''>
                <span className='text-base font-semibold'>Portfolio Management</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
