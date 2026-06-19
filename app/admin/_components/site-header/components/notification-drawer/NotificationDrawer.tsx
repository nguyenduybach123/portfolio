'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Settings2, Bell, Image as ImageIcon, Trash2 } from 'lucide-react'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

// Mock Data bám sát UI tham khảo
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'mention',
    author: 'Joe Lincoln',
    action: 'mentioned you in',
    target: 'Latest Trends',
    time: '18 mins ago',
    category: 'Web Design 2024',
    content: '@Cody For an expert opinion, check out what Mike has to say on this topic!',
    hasInput: true
  },
  {
    id: 2,
    type: 'tag',
    author: 'Leslie Alexander',
    action: 'added new tags to',
    target: 'Web Redesign 2024',
    time: '53 mins ago',
    category: 'ACME',
    tags: ['Client-Request', 'Figma', 'Redesign']
  },
  {
    id: 3,
    type: 'request',
    author: 'Guy Hawkins',
    action: 'requested access to',
    target: 'AirSpace project',
    time: '14 hours ago',
    category: 'Dev Team',
    hasActions: true
  }
]

const TABS = ['All', 'Inbox', 'Team', 'Following']

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, scale: 0.95, filter: 'blur(2px)', transition: { duration: 0.2 } }
}

export default function NotificationDrawer() {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState('All')

  const removeNotification = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const markAllRead = () => {
    // Logic mark as read
  }

  const archiveAll = () => {
    setItems([])
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='relative rounded-lg border-neutral-200'>
          <Bell className='h-4 w-4 text-neutral-800' />
          {items.length > 0 && (
            <span className='absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white' />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        className='right-4 top-1/2 flex max-h-[90vh] w-full max-w-[440px] -translate-y-1/2 flex-col rounded-2xl border-l border-neutral-200 bg-white p-0'
        hideCloseButton
      >
        {/* Header */}
        <SheetHeader className='space-y-0 border-b border-neutral-100 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <SheetTitle className='text-xl font-semibold tracking-tight text-neutral-900'>Notifications</SheetTitle>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-neutral-500 hover:bg-neutral-100 hover:text-black'
            >
              <Settings2 className='h-4 w-4' />
            </Button>
          </div>

          {/* Tabs */}
          <div className='flex gap-6 pt-4'>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className='relative pb-3 text-sm font-medium transition-colors'
                style={{ color: activeTab === tab ? '#000' : '#888' }}
              >
                {tab}
                {/* Chấm xanh lá báo unread (giả lập cho All và Inbox) */}
                {tab === 'Inbox' && (
                  <span className='absolute -right-2 top-0.5 h-1.5 w-1.5 rounded-full bg-neutral-900' />
                )}

                {/* Active Indicator 2D style */}
                {activeTab === tab && (
                  <motion.div
                    layoutId='activeTabIndicator'
                    className='absolute bottom-0 left-0 right-0 h-[2px] bg-black'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </SheetHeader>

        {/* List Content */}
        <div className='scrollbar-hide flex-1 overflow-y-auto px-4 py-4'>
          <motion.div variants={containerVariants} initial='hidden' animate='show' className='flex flex-col gap-2'>
            <AnimatePresence mode='popLayout'>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='py-10 text-center text-sm text-neutral-500'
                >
                  You're all caught up!
                </motion.div>
              ) : (
                items.map((notif) => (
                  <motion.div
                    key={notif.id}
                    layout
                    variants={itemVariants}
                    initial='hidden'
                    animate='show'
                    exit='exit'
                    className='group relative rounded-xl border border-transparent p-4 transition-colors hover:border-neutral-200 hover:bg-neutral-50'
                  >
                    <div className='flex gap-4'>
                      {/* Avatar */}
                      <div className='relative'>
                        <Avatar className='h-10 w-10 border border-neutral-200 bg-white'>
                          <AvatarFallback className='bg-neutral-50 text-xs font-medium text-neutral-600'>
                            {notif.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {/* Status dot */}
                        {notif.id === 1 && (
                          <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500' />
                        )}
                      </div>

                      {/* Content */}
                      <div className='flex-1 space-y-1.5'>
                        <p className='text-sm leading-tight text-neutral-800'>
                          <span className='font-semibold text-black'>{notif.author}</span> {notif.action}{' '}
                          <span className='font-medium text-black'>{notif.target}</span>
                          {notif.type === 'mention' && ' topic'}
                        </p>

                        <div className='flex items-center gap-2 text-xs text-neutral-500'>
                          <span>{notif.time}</span>
                          <span className='h-1 w-1 rounded-full bg-neutral-300' />
                          <span>{notif.category}</span>
                        </div>

                        {/* Special Content Blocks */}
                        {notif.content && (
                          <div className='mt-3 rounded-lg border border-neutral-200 bg-white p-3 text-sm text-neutral-700 shadow-sm'>
                            {notif.content}
                          </div>
                        )}

                        {notif.hasInput && (
                          <div className='relative mt-2 flex items-center'>
                            <Input
                              placeholder='Reply'
                              className='h-9 rounded-lg border-neutral-300 pr-9 text-sm focus-visible:ring-black'
                            />
                            <Button
                              variant='ghost'
                              size='icon'
                              className='absolute right-1 h-7 w-7 text-neutral-400 hover:text-black'
                            >
                              <ImageIcon className='h-4 w-4' />
                            </Button>
                          </div>
                        )}

                        {notif.tags && (
                          <div className='mt-2 flex flex-wrap gap-1.5'>
                            {notif.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant='secondary'
                                className='border-none bg-neutral-100 px-2 py-0.5 text-xs font-normal text-neutral-700 hover:bg-neutral-200'
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {notif.hasActions && (
                          <div className='mt-3 flex gap-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              className='h-8 border-neutral-200 px-4 text-xs font-medium hover:bg-neutral-100'
                            >
                              Decline
                            </Button>
                            <Button
                              size='sm'
                              className='h-8 bg-black px-4 text-xs font-medium text-white hover:bg-neutral-800'
                            >
                              Accept
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Action (hiện khi hover) */}
                    <button
                      onClick={() => removeNotification(notif.id)}
                      className='absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100'
                    >
                      <Trash2 className='h-4 w-4 text-neutral-400 transition-colors hover:text-black' />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Actions */}
        <div className='border-t border-neutral-100 p-4'>
          <div className='flex gap-3'>
            <Button
              variant='outline'
              className='w-full border-neutral-200 font-medium text-neutral-700 hover:bg-neutral-50'
              onClick={archiveAll}
            >
              Archive all
            </Button>
            <Button
              variant='outline'
              className='w-full border-neutral-200 font-medium text-neutral-700 hover:bg-neutral-50'
              onClick={markAllRead}
            >
              Mark all as read
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
