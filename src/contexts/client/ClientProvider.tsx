import { useReducer } from 'react'
import {
  ClientContext,
  ClientDispatchContext,
  clientReducer,
  initialState,
} from './useClient'

export function ClientProvider({ children }: React.PropsWithChildren) {
  const [client, dispatch] = useReducer(clientReducer, initialState)

  return (
    <ClientContext.Provider value={client}>
      <ClientDispatchContext.Provider value={dispatch}>
        {children}
      </ClientDispatchContext.Provider>
    </ClientContext.Provider>
  )
}
