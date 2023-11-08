import { createContext, useContext, useEffect, useState } from 'react'
import type { Icon } from 'react-feather'
import { emptyFunction } from '../common'

export function useWindowList(): WindowProps[] {
  return useContext(WindowListContext)
}

export function useWindowListDispatch() {
  const dispatch = useContext(WindowListDispatchContext)
  const { getMousePosition } = useMousePosition()

  function openWindow(
    window: MappedOmit<WindowProps, 'initialMousePosition'>,
    position?: Position,
  ) {
    dispatch({
      type: 'add',
      window: {
        ...window,
        initialMousePosition: position || getMousePosition(),
      },
    })
    dispatch({ type: 'top', id: window.id })
  }

  function closeWindow(id: string) {
    dispatch({ type: 'remove', id })
  }

  function sendWindowToTop(id: string) {
    dispatch({ type: 'top', id })
  }

  return { openWindow, closeWindow, sendWindowToTop }
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    addEventListener('mousemove', onMouseMove)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  function getMousePosition() {
    return mousePosition
  }

  return { getMousePosition }
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

type WindowListAction =
  | { type: 'add'; window: WindowProps }
  | { type: 'remove'; id: string }
  | { type: 'top'; id: string }

export type WindowProps = React.PropsWithChildren<{
  id: string
  title: string
  icon?: Icon
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  initialMousePosition?: Position
}>

type Position = {
  x: number
  y: number
}
