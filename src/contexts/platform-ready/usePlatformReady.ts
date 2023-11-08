import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function usePlatformReady() {
  const platformReady = useContext(PlatformReadyContext)

  function isPlatformReady(platform: Slime2.Platform): boolean {
    return !!platformReady[platform]
  }

  return { isPlatformReady }
}

export function usePlatformReadyDispatch() {
  const dispatch = useContext(PlatformReadyDispatchContext)

  function setPlatformReady(platform: Slime2.Platform) {
    dispatch({ type: platform })
  }

  return { setPlatformReady }
}

export const initialState: PlatformReadyState = {}

export const PlatformReadyContext =
  createContext<PlatformReadyState>(initialState)

export const PlatformReadyDispatchContext =
  createContext<React.Dispatch<PlatformReadyAction>>(emptyFunction)

export function platformReadyReducer(
  state: PlatformReadyState,
  action: PlatformReadyAction,
): PlatformReadyState {
  switch (action.type) {
    case 'twitch':
      return { ...state, twitch: true }
    case 'youtube':
      return { ...state, youtube: true }
  }
}

type PlatformReadyAction = { type: Slime2.Platform }
type PlatformReadyState = { [key in Slime2.Platform]?: boolean }
