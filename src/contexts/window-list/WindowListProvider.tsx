import MainSettings from '@/components/settings/MainSettings'
import { useReducer } from 'react'
import {
  WindowListContext,
  WindowListDispatchContext,
  windowListReducer,
} from './useWindowList'

export function WindowListProvider({ children }: React.PropsWithChildren) {
  const [windowList, dispatch] = useReducer(windowListReducer, [
    { id: 'main', title: 'Settings', children: <MainSettings /> },
  ])
  return (
    <WindowListContext.Provider value={windowList}>
      <WindowListDispatchContext.Provider value={dispatch}>
        {children}
      </WindowListDispatchContext.Provider>
    </WindowListContext.Provider>
  )
}
