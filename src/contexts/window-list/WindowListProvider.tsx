import Tools from '@/components/settings/Tools'
import { useReducer } from 'react'
import { Tool } from 'react-feather'
import {
  WindowListContext,
  WindowListDispatchContext,
  windowListReducer,
  type WindowProps,
} from './useWindowList'

export function WindowListProvider({ children }: React.PropsWithChildren) {
  const initialState: WindowProps[] = [
    {
      id: 'slime2window.tools',
      icon: Tool,
      title: 'Tools',
      children: <Tools />,
    },
  ]

  const [windowList, dispatch] = useReducer(windowListReducer, initialState)
  return (
    <WindowListContext.Provider value={windowList}>
      <WindowListDispatchContext.Provider value={dispatch}>
        {children}
      </WindowListDispatchContext.Provider>
    </WindowListContext.Provider>
  )
}
