import { createContext, useContext, useReducer } from 'react'

const initialState: PlatformReadyState = {}

export function usePlatformReady(
  platform: Slime2.Platform,
): [boolean, () => void] {
  const platformReady = useContext(PlatformReadyContext)
  const dispatch = useContext(PlatformReadyDispatchContext)

  return [
    !!platformReady[platform],
    () => {
      dispatch({ type: platform })
    },
  ]
}

export function PlatformReadyProvider({ children }: React.PropsWithChildren) {
  const [platformReady, dispatch] = useReducer(
    platformReadyReducer,
    initialState,
  )

  return (
    <PlatformReadyContext.Provider value={platformReady}>
      <PlatformReadyDispatchContext.Provider value={dispatch}>
        {children}
      </PlatformReadyDispatchContext.Provider>
    </PlatformReadyContext.Provider>
  )
}

const PlatformReadyContext = createContext<PlatformReadyState>(initialState)

const PlatformReadyDispatchContext =
  createContext<React.Dispatch<PlatformReadyAction>>(emptyFunction)

function platformReadyReducer(
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

function emptyFunction() {}

type PlatformReadyAction = {
  type: Slime2.Platform
}

type PlatformReadyState = {
  [key in Slime2.Platform]?: boolean
}
