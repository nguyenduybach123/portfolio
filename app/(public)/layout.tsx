import { Fragment, ReactNode } from 'react'
import { NavigationEffect, NavigationMenu } from '../_components'

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <NavigationMenu />
      <NavigationEffect />
      {children}
    </Fragment>
  )
}

export default PublicLayout
