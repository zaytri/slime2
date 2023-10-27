import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function useClient(): Slime2.Client {
  return useContext(ClientContext)
}

export function useClientDispatch() {
  return useContext(ClientDispatchContext)
}

export const initialState: Slime2.Client = {
  onEvent: emptyFunction,
  keys: {
    twitch: import.meta.env.VITE_TWITCH_KEY,
    google: import.meta.env.VITE_GOOGLE_KEY,
  },
}

export const ClientContext = createContext<Slime2.Client>(initialState)

export const ClientDispatchContext =
  createContext<React.Dispatch<ClientAction>>(emptyFunction)

export function clientReducer(
  state: Slime2.Client,
  action: ClientAction,
): Slime2.Client {
  switch (action.type) {
    case 'event':
      return { ...state, onEvent: action.setFunction }
    case 'key':
      return {
        ...state,
        keys: { ...state.keys, [action.provider]: action.key },
      }
  }
}

type ClientAction = ClientActionEvent | ClientActionKey

type ClientActionEvent = {
  type: 'event'
  setFunction: Slime2.Client.OnEvent
}

type ClientActionKey = {
  type: 'key'
  provider: Slime2.Auth.Provider
  key: string
}
