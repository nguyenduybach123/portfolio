'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, FileText, Briefcase, Mail, BookOpen, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavigationIcon } from './components'
import Link from 'next/link'
const navItems = [
  { icon: Home, label: 'HOME', href: '/', isActive: true },
  { icon: FileText, label: 'ABOUT', href: '/about' },
  { icon: Briefcase, label: 'PROJECTS', href: '#' },
  { icon: BookOpen, label: 'BLOG', href: '#' }
]

/**
 * NavigationContent: slide-in panel từ phải -> trái
 */
function NavigationContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <>
          {/* Slide-in panel */}
          <motion.aside
            key='panel'
            className='fixed right-4 top-16 z-50 h-fit w-full max-w-sm rounded-2xl bg-white/50 px-6 py-8 shadow-xl backdrop-blur-lg'
            initial={{ x: '100%' }}
            animate={{
              x: 0,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 25
              }
            }}
            exit={{
              x: '100%',
              transition: {
                ease: [0.4, 0, 0.2, 1],
                duration: 0.3
              }
            }}
            role='dialog'
            aria-modal='true'
            aria-label='Navigation menu'
            onClick={(e) => e.stopPropagation()}
          >
            <nav className='flex flex-col'>
              {navItems.map((item, idx) => {
                const Icon = item.icon

                return (
                  <Link key={item.label} href={item.href} passHref>
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex items-center gap-4 px-3 py-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                        item.isActive
                          ? 'border-l-4 border-orange-500 bg-orange-100/50 text-orange-500'
                          : 'text-slate-800 hover:bg-orange-100/70 hover:text-orange-500'
                      }`}
                      onClick={onClose}
                    >
                      <Icon className='h-5 w-5' />
                      <span>{item.label}</span>
                    </motion.a>
                  </Link>
                )
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * NavigationMenu: chứa button (NavigationIcon) và Desktop sidebar (giữ nguyên)
 */
export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const handleCloseMenu = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger Button */}
      <Button
        ref={triggerRef}
        size='icon'
        className='fixed right-4 top-4 z-50 bg-primary/70 backdrop-blur-sm'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
      >
        <NavigationIcon checked={isOpen} onToggle={() => setIsOpen((prev) => !prev)} className='z-50' />
      </Button>

      {/* slide left (from right) */}
      <NavigationContent isOpen={isOpen} onClose={handleCloseMenu} />
    </>
  )
}
