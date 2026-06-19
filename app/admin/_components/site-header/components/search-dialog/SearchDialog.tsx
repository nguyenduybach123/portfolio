'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, CircleDashed, CornerDownLeft, Command as CommandIcon } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='rounded-2xl! overflow-hidden border-border/40 bg-background p-0 shadow-2xl sm:max-w-[550px]'
        hideCloseButton
      >
        <DialogTitle className='sr-only'>Search Command Palette</DialogTitle>

        <Command className='bg-transparent [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4'>
          {/* Vùng Input - Box xám bo tròn như trong ảnh */}
          <div className='p-3 pb-0'>
            <div className='flex items-center rounded-xl bg-muted/50 px-3 transition-colors focus-within:bg-muted focus-within:ring-1 focus-within:ring-border'>
              <Search className='mr-2 h-4 w-4 shrink-0 text-muted-foreground' />
              <CommandInput
                placeholder='Component...'
                className='h-11 w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 focus:ring-0'
              />
            </div>
          </div>

          <CommandList className='scrollbar-thin max-h-[350px] overflow-y-auto p-2'>
            <CommandEmpty className='py-6 text-center text-sm text-muted-foreground'>No results found.</CommandEmpty>

            {/* Sử dụng AnimatePresence để tạo hiệu ứng xuất hiện tuần tự cho các Group */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <CommandGroup heading='Pages'>
                    <CommandItem className='group cursor-pointer rounded-lg aria-selected:bg-muted aria-selected:text-foreground'>
                      <ArrowRight className='mr-2.5 text-muted-foreground/70' />
                      <span>Components</span>
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator className='my-1.5' />

                  <CommandGroup heading='Components'>
                    <motion.div
                      variants={{
                        show: { transition: { staggerChildren: 0.05 } }
                      }}
                      initial='hidden'
                      animate='show'
                    >
                      {['Accordion', 'Alert', 'Alert Dialog', 'Aspect Ratio', 'Avatar', 'Badge'].map((item) => (
                        <motion.div
                          key={item}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            show: { opacity: 1, x: 0 }
                          }}
                        >
                          <CommandItem className='group cursor-pointer rounded-lg text-muted-foreground transition-all duration-200 aria-selected:bg-muted/80 aria-selected:font-medium aria-selected:text-foreground'>
                            <CircleDashed className='mr-2.5 text-muted-foreground/50 transition-colors group-aria-selected:text-primary' />
                            <span>{item}</span>
                          </CommandItem>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CommandGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </CommandList>

          {/* Footer - Hiển thị phím tắt như trong ảnh */}
          <div className='flex items-center justify-between border-t border-border/40 bg-muted/20 px-4 py-3 sm:py-2.5'>
            <div className='flex items-center gap-4 text-[11px] text-muted-foreground/70'>
              <div className='flex items-center gap-1.5'>
                <kbd className='shadow-xs flex h-5 items-center justify-center rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                  <CornerDownLeft className='h-3 w-3' />
                </kbd>
                <span>Go to Page</span>
              </div>
              <div className='hidden items-center gap-1.5 sm:flex'>
                <kbd className='shadow-xs flex h-5 items-center justify-center rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                  <CommandIcon className='mr-0.5 h-3 w-3' />C
                </kbd>
                <span>pnpm dlx shadcn@latest add alert</span>
              </div>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
