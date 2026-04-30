import { ReactNode } from 'react'
import { NavigationEffect, NavigationMenu } from '../_components'

const Auth = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavigationMenu />
      <NavigationEffect />
      {children}
    </>
  )
}

export default Auth
