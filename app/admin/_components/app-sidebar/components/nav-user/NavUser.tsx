'use client'

import { motion } from 'framer-motion'
import { Bell, ChevronsUpDown, CreditCard, LogOut, UserCircle } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

interface NavUserProps {
  user: {
    name: string
    email: string
    avatar: string
  }
}

const NavUser = ({ user }: NavUserProps) => {
  const { isMobile } = useSidebar()

  // Tự động lấy 2 chữ cái đầu của tên làm Fallback (VD: "Nguyen Van A" -> "NV")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Sử dụng motion.button thay vì button thường để thêm hiệu ứng tap */}
            <SidebarMenuButton
              size='lg'
              asChild
              className='group relative flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-all hover:bg-muted/60 data-[state=open]:bg-muted/80'
            >
              <motion.button whileTap={{ scale: 0.98 }}>
                <Avatar className='h-8 w-8 rounded-full border border-border/50 shadow-sm transition-transform group-hover:scale-105'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='bg-primary/10 text-xs font-medium text-primary'>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium text-foreground'>{user.name}</span>
                  <span className='truncate text-xs text-muted-foreground/70'>{user.email}</span>
                </div>

                <ChevronsUpDown className='ml-auto size-4 text-muted-foreground/50 transition-transform duration-300 group-data-[state=open]:rotate-180' />
              </motion.button>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border-border/40 bg-background/80 p-1.5 shadow-lg backdrop-blur-xl'
            side={isMobile ? 'bottom' : 'top'}
            align='center'
            sideOffset={8}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-3 px-2 py-2.5 text-left text-sm'>
                <Avatar className='h-9 w-9 rounded-full ring-1 ring-border/50'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='bg-primary/10 text-xs font-medium text-primary'>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold text-foreground'>{user.name}</span>
                  <span className='truncate text-xs text-muted-foreground/70'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className='bg-border/50' />

            <DropdownMenuGroup className='px-0.5'>
              <DropdownMenuItem className='group my-0.5 cursor-pointer rounded-lg px-2 py-2 focus:bg-muted/60'>
                <UserCircle className='mr-2 size-4 text-muted-foreground transition-colors group-hover:text-foreground' />
                <span className='font-medium text-muted-foreground transition-colors group-hover:text-foreground'>
                  Account
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className='group my-0.5 cursor-pointer rounded-lg px-2 py-2 focus:bg-muted/60'>
                <CreditCard className='mr-2 size-4 text-muted-foreground transition-colors group-hover:text-foreground' />
                <span className='font-medium text-muted-foreground transition-colors group-hover:text-foreground'>
                  Billing
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className='group my-0.5 cursor-pointer rounded-lg px-2 py-2 focus:bg-muted/60'>
                <Bell className='mr-2 size-4 text-muted-foreground transition-transform group-hover:rotate-12 group-hover:text-foreground' />
                <span className='font-medium text-muted-foreground transition-colors group-hover:text-foreground'>
                  Notifications
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className='bg-border/50' />

            <DropdownMenuItem className='group my-0.5 cursor-pointer rounded-lg px-2 py-2 focus:bg-destructive/10'>
              <LogOut className='mr-2 size-4 text-muted-foreground transition-transform group-hover:-translate-x-1 group-focus:text-destructive' />
              <span className='font-medium text-muted-foreground transition-colors group-focus:text-destructive'>
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser
