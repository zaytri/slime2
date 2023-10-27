namespace Slime2 {
  type Client = {
    onEvent: Client.OnEvent
    keys: {
      [key in AuthProvider]?: string
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

    type OnEventReturn =
      | { fragment?: Fragment; callback?: AfterRenderCallback }
      | null
      | void
      | undefined

    type Fragment = DocumentFragment | JQuery<DocumentFragment>
    type AfterRenderCallback = (div: HTMLElement) => void

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

  type BasicEvent = {
    emulated?: true
    remove?: () => void
  }

  type RenderableEvent = Twitch.RenderableEvent

  type Event = Twitch.Event

  namespace Event {
    type BasicData = {
      id: string
    }

    type BasicMessage = {
      date: Date
      text: string
    } & BasicData

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