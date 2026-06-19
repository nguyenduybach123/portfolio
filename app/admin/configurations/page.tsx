'use client'

import { useState } from 'react'
import {
  Settings,
  Paintbrush,
  Search,
  Globe,
  BarChart3,
  MessageSquare,
  Maximize2,
  Zap,
  Save,
  RotateCcw,
  AlertCircle
} from 'lucide-react'

// Import Shadcn/UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import GeneralTab from './_components/general-tab'
import SeoTab from './_components/seo-tab'

// Định nghĩa lại TabConfig sạch sẽ hơn với Lucide Icon Component
interface TabConfig {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: TabConfig[] = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'social', label: 'Social', icon: Globe }
]

export default function CMSConfigurationPage() {
  const [activeTab, setActiveTab] = useState<string>('general')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    setHasChanges(false)
  }

  return (
    <div className='min-h-screen bg-slate-50/50 text-foreground antialiased dark:bg-zinc-950'>
      {/* Sticky Header với Glassmorphism tinh tế hơn */}
      <header className='sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-2xl font-semibold tracking-tight'>CMS Configuration</h1>
              {hasChanges && (
                <Badge
                  variant='secondary'
                  className='gap-1 border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                >
                  <AlertCircle className='h-3 w-3' /> Unsaved
                </Badge>
              )}
            </div>
            <p className='mt-0.5 text-sm text-muted-foreground'>
              Manage your content management system settings and preferences.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center gap-2.5 self-end sm:self-center'>
            <Button
              variant='outline'
              size='sm'
              onClick={handleReset}
              disabled={!hasChanges || isSaving}
              className='gap-2 transition-all active:scale-95'
            >
              <RotateCcw className='h-4 w-4 text-muted-foreground' />
              Reset
            </Button>
            <Button
              size='sm'
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className='min-w-[120px] gap-2 shadow-sm shadow-primary/20 transition-all active:scale-95'
            >
              {isSaving ? (
                <>
                  <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  Saving...
                </>
              ) : (
                <>
                  <Save className='h-4 w-4' />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6'>
        {/* Khởi tạo Shadcn Tabs bao bọc toàn bộ layout để tối ưu hóa việc chuyển state */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
          <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-4'>
            {/* Left/Main Column */}
            <div className='space-y-6 lg:col-span-3'>
              {/* Shadcn TabsList được style lại mượt mà, hỗ trợ scroll ngang trên mobile */}
              <div className='no-scrollbar w-full overflow-x-auto pb-1'>
                <TabsList className='inline-flex h-11 w-full justify-start rounded-xl border border-border/40 bg-muted/60 p-1'>
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className='gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'
                      >
                        <Icon className='h-4 w-4 opacity-70 data-[state=active]:opacity-100' />
                        {tab.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </div>

              {/* Tab Contents được bọc trong Shadcn Card tạo cảm giác Dashboard cao cấp */}
              <Card className='border-border/60 bg-background/50 shadow-sm backdrop-blur-sm'>
                <CardHeader className='border-b border-border/50 bg-muted/10'>
                  <CardTitle className='flex items-center gap-2 text-lg font-medium'>
                    {(() => {
                      const currentTab = tabs.find((t) => t.id === activeTab)
                      const CurrentIcon = currentTab?.icon || Settings
                      return (
                        <>
                          <CurrentIcon className='h-5 w-5 text-primary' />
                          {currentTab?.label} Settings
                        </>
                      )
                    })()}
                  </CardTitle>
                  <CardDescription>Configure parameters and behaviors for the {activeTab} module.</CardDescription>
                </CardHeader>

                <CardContent className='animate-in fade-in-50 slide-in-from-bottom-2 pt-6 duration-300'>
                  <TabsContent value='general' className='mt-0 focus-visible:outline-none'>
                    <GeneralTab onChange={() => setHasChanges(true)} />
                  </TabsContent>

                  <TabsContent value='seo' className='mt-0 focus-visible:outline-none'>
                    <SeoTab />
                  </TabsContent>

                  {/* Fallback cho các tab chưa code content */}
                  {!['general', 'seo'].includes(activeTab) && (
                    <div className='flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/5 py-12 text-center'>
                      <div className='rounded-full bg-muted p-3'>
                        <Settings className='h-6 w-6 animate-pulse text-muted-foreground' />
                      </div>
                      <h3 className='mt-4 text-sm font-medium'>Under Construction</h3>
                      <p className='mt-1 max-w-xs text-xs text-muted-foreground'>
                        The {activeTab} configuration panel is being wired up. Trigger "onChange" to test saving state.
                      </p>
                      <Button variant='outline' size='sm' className='mt-4' onClick={() => setHasChanges(true)}>
                        Simulate Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
