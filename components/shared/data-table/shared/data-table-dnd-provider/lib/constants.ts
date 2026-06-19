import { createContext } from 'react'
import { DnDProviderContextValue } from './types'

export const DnD_PROVIDER_CONTEXT = createContext<DnDProviderContextValue | null>(null)
