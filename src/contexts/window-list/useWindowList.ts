import useMousePosition from '@/components/settings/useCursorPosition'
import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function useWindowList(): WindowProps[] {
  return useContext(WindowListContext)
}

export function useWindowListDispatch() {
  const dispatch = useContext(WindowListDispatchContext)
  const mousePosition = useMousePosition()

  function openWindow(window: MappedOmit<WindowProps, 'initialMousePosition'>) {
    dispatch({
      type: 'add',
      window: { ...window, initialMousePosition: mousePosition },
    })
  }

  function closeWindow(id: string) {
    dispatch({ type: 'remove', id })
  }

  function sendWindowToTop(id: string) {
    dispatch({ type: 'top', id })
  }

  return { openWindow, closeWindow, sendWindowToTop }
}

export const initialState: WindowProps[] = []

export const WindowListContext = createContext<WindowProps[]>(initialState)
export const WindowListDispatchContext =
  createContext<React.Dispatch<WindowListAction>>(emptyFunction)

export function windowListReducer(
  state: WindowProps[],
  action: WindowListAction,
): WindowProps[] {
  switch (action.type) {
    case 'add': {
      // don't allow duplicate IDs
      const duplicateFound = !!state.find(
        window => window.id === action.window.id,
      )
      return duplicateFound ? state : [...state, action.window]
    }
    case 'remove':
      return state.filter(window => window.id !== action.id)
    case 'top': {
      const windowIndex = state.findIndex(window => window.id === action.id)

      // window not found or window is already at top
      if (windowIndex === -1 || windowIndex === state.length - 1) {
        return state
      }

      return [
        ...state.filter(window => window.id !== action.id),
        state[windowIndex],
      ]
    }
  }
}

type WindowListAddAction = {
  type: 'add'
  window: WindowProps
}

type WindowListRemoveAction = {
  type: 'remove'
  id: string
}

type WindowListTopAction = {
  type: 'top'
  id: string
}

type WindowListAction =
  | WindowListAddAction
  | WindowListTopAction
  | WindowListRemoveAction

export type WindowProps = React.PropsWithChildren<{
  id: string
  title: string
  className?: string
  initialMousePosition?: {
    x: number
    y: number
  }
}>
