import { createContext, useContext, useReducer } from 'react'

const initialState: Slime2.Client = {
  onEvent: emptyFunction,
  onModMessageDelete: emptyFunction,
}

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

export function useClient(): Slime2.Client {
  return useContext(ClientContext)
}

export function useClientDispatch() {
  return useContext(ClientDispatchContext)
}

const ClientContext = createContext<Slime2.Client>(initialState)

const ClientDispatchContext =
  createContext<React.Dispatch<ClientAction>>(emptyFunction)

function clientReducer(
  state: Slime2.Client,
  action: ClientAction,
): Slime2.Client {
  switch (action.type) {
    case 'event':
      return { ...state, onEvent: action.payload }
    case 'modMessageDelete':
      return { ...state, onModMessageDelete: action.payload }
  }
}

function emptyFunction() {}

type ClientAction = ClientActionEvent | ClientActionModMessageDelete

type ClientActionEvent = {
  type: 'event'
  payload: Slime2.Client.OnEvent
}

type ClientActionModMessageDelete = {
  type: 'modMessageDelete'
  payload: Slime2.Client.OnModMessageDelete
}
