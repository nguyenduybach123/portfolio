import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader, AppSidebar } from './_components'
import { ReactNode } from 'react'

const Admin = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '250px',
          '--header-height': 'calc(var(--spacing) * 12)'
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2 p-4'>{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Admin
