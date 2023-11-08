import { useState } from 'react'
import { UnsavedChangesContext } from './useUnsavedChanges'

export default function UnsavedChangesProvider({
  children,
}: React.PropsWithChildren) {
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  return (
    <UnsavedChangesContext.Provider
      value={{ unsavedChanges, setUnsavedChanges }}
    >
      {children}
    </UnsavedChangesContext.Provider>
  )
}
