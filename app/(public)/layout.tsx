import { FC, Fragment, ReactNode } from 'react'
import { NavigationMenu } from './_components'

const Public = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <NavigationMenu />
      {children}
    </Fragment>
  )
}

export default Public
