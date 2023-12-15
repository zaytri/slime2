namespace Slime2 {
  type Client = {
    sendEvent: Client.OnEvent
    maxEvents: number
    eventDelay?: number
    eventExpiration?: number
    eventExpirationOptions?: Client.EventExpirationOptions
    widgetSettings: Widget.Setting[]
    widgetDataFileName: string
    platforms: Slime2.Platform[]
    keys: {
      [key in Auth.Provider]?: string
    }
  }

  namespace Auth {
    type Settings = {
      [key in Provider]: Provider.Settings
    }

    type Provider = 'twitch' | 'google'
    namespace Provider {
      type Settings = {
        clientId: string
        scopes: string[]
      }
    }
  }

  namespace Client {
    type OnEvent = (data: Event) => OnEventReturn | Promise<OnEventReturn>

    type OnEventReturn = OnEventObject | null | void | undefined

    type OnEventObject = {
      fragment?: Fragment
      callback?: AfterRenderCallback
      parentProps?: MappedOmit<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        'ref' | 'dangerouslySetInnerHTML'
      >
    }

    type Fragment = DocumentFragment | JQuery<DocumentFragment>
    type AfterRenderCallback = (div: HTMLElement) => void

    type EventExpirationOptions = {
      animationTime?: number
      animationClass?: string
      animationFunction?: AfterRenderCallback
    }

    type Storage = {
      use: (widgetName: string) => void
      get: <T = any>(key: string) => Promise<T | undefined>
      getMany: <T = any>(keys: string[]) => Promise<T[]>
      set: (key: string, value: any) => Promise<void>
      setMany: (entries: [string, any][]) => Promise<void>
      update: <T = any>(
        key: string,
        updater: (oldValue: T | undefined) => T,
      ) => Promise<void>
      del: (key: string) => Promise<void>
      delMany: (keys: string[]) => Promise<void>
      clear: () => Promise<void>
      keys: () => Promise<string[]>
      values: <T = any>() => Promise<T[]>
      entries: <T = any>() => Promise<[string, T][]>
    }

    type Color = {
      light: (color: string) => string
      dark: (color: string) => string
      accessibleBackground: (color: string) => 'black' | 'white'
      accessibleForeground: (color: string) => 'black' | 'white'
    }
  }

  type Platform = 'twitch' | 'youtube'

  type BasicUser = {
    id: string
    displayName: string
  }

  namespace User {
    type Broadcaster = {
      userName: string // @handle for youtube
      image: string
      url: string
    } & BasicUser
  }

  type BasicRenderableEvent = {
    id: string
    userId: string
    renderable: true
    emulated?: true
    remove: () => void
  }

  type RenderableEvent = (Twitch.RenderableEvent | Youtube.RenderableEvent) &
    BasicRenderableEvent

  type Event = Twitch.Event | Youtube.Event

  namespace Event {
    type BasicMessage = {
      id: string
      date: Date
      text: string
    }

    namespace Message {
      type Emote = {
        id: string
        name: string
        images: Emote.Images
        source: Emote.Source
      }

      type EmoteMap = Map<string, Emote>

      namespace Emote {
        type Source = Platform | 'betterttv' | 'frankerfacez'

        type Images = {
          default: Urls
          static: Urls
        }

        type Urls = {
          x1: string
          x2: string
          x4: string
        }
      }
    }
  }

  namespace Api {
    type TokenResponse = {
      token: string
    }
  }
}
