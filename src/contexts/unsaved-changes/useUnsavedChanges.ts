import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function useUnsavedChanges() {
  return useContext(UnsavedChangesContext)
}

export const UnsavedChangesContext = createContext<{
  unsavedChanges: boolean
  setUnsavedChanges: (unsavedChanges: boolean) => void
}>({ unsavedChanges: false, setUnsavedChanges: emptyFunction })
