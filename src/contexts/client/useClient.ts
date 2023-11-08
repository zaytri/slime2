import { loadScript } from '@/services/helpers'
import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'
import { useWidgetValuesDispatch } from '../widget-values/useWidgetValues'

export function useClient(): Slime2.Client {
  return useContext(ClientContext)
}

export function useClientDispatch() {
  const dispatch = useContext(ClientDispatchContext)
  const { loadDefaults } = useWidgetValuesDispatch()

  function onEvent(onEvent: Slime2.Client.OnEvent) {
    dispatch({ type: 'set-on-event', onEvent })
  }

  async function setPlatform(
    platform: Slime2.Platform | Slime2.Platform[],
  ): Promise<boolean> {
    dispatch({ type: 'set-platform', platform })

    const platforms = Array.isArray(platform) ? platform : [platform]
    const results = await Promise.all(
      platforms.map(platform => {
        const provider: Slime2.Auth.Provider =
          platform === 'youtube' ? 'google' : platform

        return loadScript(
          `${platform}.key`,
          `SLIME2_${provider.toUpperCase()}_KEY.js`,
        )
      }),
    )

    return results.reduce((result, promise) => {
      return promise && result
    }, true)
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

  function createWidgetSettings(
    dataFileName: string,
    settings: Widget.Setting[],
  ) {
    if (typeof dataFileName !== 'string' || !dataFileName.endsWith('.js')) {
      throw Error(
        'The first parameter of createWidgetSettings must be a string that ends in ".js"',
      )
    }

    if (!Array.isArray(settings)) {
      throw Error(
        'The second parameter of createWidgetSettings must be an array of objects',
      )
    }

    loadScript('widget.data', dataFileName).finally(() =>
      loadDefaults(settings),
    )
    dispatch({ type: 'create-widget-settings', settings, dataFileName })
  }

  return {
    onEvent,
    setKey,
    setPlatform,
    setMaxEvents,
    setEventDelay,
    setEventExpiration,
    createWidgetSettings,
  }
}

export const initialState: Slime2.Client = {
  sendEvent: emptyFunction,
  maxEvents: 100, // default to 100
  platforms: [],
  widgetSettings: [],
  widgetDataFileName: '',
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
    case 'create-widget-settings':
      return {
        ...state,
        widgetSettings: action.settings,
        widgetDataFileName: action.dataFileName,
      }
  }
}

type ClientAction =
  | { type: 'set-platform'; platform: Slime2.Platform | Slime2.Platform[] }
  | { type: 'set-key'; provider: Slime2.Auth.Provider; key: string }
  | { type: 'set-on-event'; onEvent: Slime2.Client.OnEvent }
  | { type: 'set-max-events'; maxEvents: number }
  | {
      type: 'set-event-expiration'
      expiration: number
      options?: Slime2.Client.EventExpirationOptions
    }
  | { type: 'set-event-delay'; delay: number }
  | {
      type: 'create-widget-settings'
      settings: Widget.Setting[]
      dataFileName: string
    }
