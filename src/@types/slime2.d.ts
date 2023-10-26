namespace Slime2 {
  type Client = {
    onEvent: Client.OnEvent
    onModMessageDelete: Client.OnModMessageDelete
    key: {
      [key in AuthProvider]?: string
    }
  }

  type AuthSettings = {
    [key in AuthProvider]: AuthProvider.Settings
  }

  type AuthProvider = 'twitch' | 'google'
  namespace AuthProvider {
    type Settings = {
      clientId: string
      scopes: string[]
    }
  }

  namespace Client {
    type OnEvent = (data: Event) => OnEventReturn | Promise<OnEventReturn>
    type OnModMessageDelete = (data: ModMessageDelete) => void

    type OnEventReturn =
      | { fragment?: Fragment; callback?: AfterRenderCallback }
      | null
      | void
      | undefined

    type Fragment = DocumentFragment | JQuery<DocumentFragment>
    type AfterRenderCallback = (div: HTMLElement) => void

    type ModMessageDelete =
      | { type: 'single'; id: string }
      | { type: 'user'; id: string }
      | { type: 'all'; id: null }
  }

  type Platform = 'twitch' | 'youtube'

  type BasicEvent = {
    remove: () => void
  }

  type Event = Twitch.Event

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

  namespace Event {
    type BasicMessage = {
      id: string
      date: Date
      text: string
    }

    type Message = Twitch.Event.Message

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
