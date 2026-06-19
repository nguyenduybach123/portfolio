import { useContext } from 'react'
import { DnD_PROVIDER_CONTEXT } from './constants'

export const useDnDProviderContext = () => {
  const context = useContext(DnD_PROVIDER_CONTEXT)
  if (!context) {
    return null
  }
  return context
}
