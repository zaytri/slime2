import { useReducer } from 'react'
import {
  PlatformReadyContext,
  PlatformReadyDispatchContext,
  initialState,
  platformReadyReducer,
} from './usePlatformReady'

export default function PlatformReadyProvider({
  children,
}: React.PropsWithChildren) {
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
