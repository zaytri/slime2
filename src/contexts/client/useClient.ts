import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function useClient(): Slime2.Client {
  return useContext(ClientContext)
}

export function useClientDispatch() {
  const dispatch = useContext(ClientDispatchContext)

  function onEvent(onEvent: Slime2.Client.OnEvent) {
    dispatch({ type: 'set-on-event', onEvent })
  }

  function setPlatform(platform: Slime2.Platform | Slime2.Platform[]) {
    dispatch({ type: 'set-platform', platform })
  }

  function setKey(provider: Slime2.Auth.Provider, key: string) {
    dispatch({ type: 'set-key', provider, key })
  }

  function setMaxEvents(maxEvents: number) {
    dispatch({ type: 'set-max-events', maxEvents })
  }

  function setEventDelay(delay: number) {
    dispatch({ type: 'set-event-delay', delay })
  }

  function setEventExpiration(
    expiration: number,
    options?: Slime2.Client.EventExpirationOptions,
  ) {
    dispatch({ type: 'set-event-expiration', expiration, options })
  }

  function setWidgetSettingsPage(fragment: Slime2.Client.Fragment) {
    dispatch({ type: 'set-widget-settings-page', fragment })
  }

  return {
    onEvent,
    setKey,
    setPlatform,
    setMaxEvents,
    setEventDelay,
    setEventExpiration,
    setWidgetSettingsPage,
  }
}

export const initialState: Slime2.Client = {
  sendEvent: emptyFunction,
  maxEvents: 100, // default to 100
  platforms: [],
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
    case 'set-platform':
      return {
        ...state,
        platforms: Array.isArray(action.platform)
          ? action.platform
          : [action.platform],
      }

    case 'set-key':
      return {
        ...state,
        keys: { ...state.keys, [action.provider]: action.key },
      }
    case 'set-on-event':
      return { ...state, sendEvent: action.onEvent }
    case 'set-max-events':
      return {
        ...state,
        maxEvents: action.maxEvents,
      }
    case 'set-event-expiration':
      return {
        ...state,
        eventExpiration: action.expiration,
        eventExpirationOptions: action.options,
      }
    case 'set-event-delay':
      return {
        ...state,
        eventDelay: action.delay,
      }
    case 'set-widget-settings-page':
      return {
        ...state,
        settingsPage: action.fragment,
      }
  }
}

type ClientAction =
  | ClientActionSetPlatform
  | ClientActionSetKey
  | ClientActionSetOnEvent
  | ClientActionSetMaxEvents
  | ClientActionSetEventExpiration
  | ClientActionSetEventDelay
  | ClientActionSetWidgetSettingsPage

type ClientActionSetPlatform = {
  type: 'set-platform'
  platform: Slime2.Platform | Slime2.Platform[]
}

type ClientActionSetKey = {
  type: 'set-key'
  provider: Slime2.Auth.Provider
  key: string
}

type ClientActionSetOnEvent = {
  type: 'set-on-event'
  onEvent: Slime2.Client.OnEvent
}

type ClientActionSetMaxEvents = {
  type: 'set-max-events'
  maxEvents: number
}

type ClientActionSetEventExpiration = {
  type: 'set-event-expiration'
  expiration: number
  options?: Slime2.Client.EventExpirationOptions
}

type ClientActionSetEventDelay = {
  type: 'set-event-delay'
  delay: number
}

type ClientActionSetWidgetSettingsPage = {
  type: 'set-widget-settings-page'
  fragment: Slime2.Client.Fragment
}
