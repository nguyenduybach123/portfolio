import { Fragment, ReactNode } from 'react'
import { NavigationEffect, NavigationMenu } from './_components'

const Public = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <NavigationMenu />
      <NavigationEffect />
      {children}
    </Fragment>
  )
}

export default Public
