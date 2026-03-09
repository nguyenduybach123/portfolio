'use client'

import { Fragment, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationEffect, NavigationMenu } from './_components'
import { AnimatePresence } from 'framer-motion'

const Public = ({ children }: { children: ReactNode }) => {
  // Hooks
  const pathname = usePathname()

  return (
    <Fragment>
      <NavigationMenu />
      <AnimatePresence mode='wait'>
        <NavigationEffect key={pathname} />
      </AnimatePresence>
      {children}
    </Fragment>
  )
}

export default Public
