namespace Twitch {
  type Event = Event.Type & Slime2.BasicEvent

  namespace Event {
    type Type = { type: 'message'; message: Message }
    type Source = 'twitch'

    type Message = {
      user: User
      text: string
      first: boolean
      parts: Message.Part[]
      tags: Map<string, string>
      source: Source
    } & Message.Type &
      Slime2.Event.BasicMessage

    namespace Message {
      type Type =
        | { type: 'basic' }
        | { type: 'action' }
        | { type: 'highlight' }
        | { type: 'cheer'; cheer: Cheer }
        | { type: 'reply'; reply: Reply }
        | { type: 'redeem'; redeem: Redeem }
        | { type: 'resub'; resub: Resub }
        | { type: 'announcement'; announcement: Announcement }

      type Cheer = {
        amount: number // total number of bits cheered in the message
      }

      type Reply = {
        id: string // id of the message being replied to
        text: string // text of the message being replied to

        // info of the user being replied to
        user: {
          id: string
          userName: string
          displayName: string
        }
      }

      type Redeem = {
        id: string
        name: string
        image: string
        color: string
        cost: number
      }

      type Resub = {
        months: number
        tier: string // '1000' | '2000' | '3000' | 'Prime'
      }

      type Announcement = {
        color: string // 'PRIMARY' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE'
      }

      type User = {
        // identifiers
        userName: string
        pronouns?: string

        // cosmetics
        badges: User.Badge[]
        color?: string

        // roles
        roles: {
          broadcaster: boolean
          moderator: boolean
          artist: boolean
          vip: boolean
          founder: boolean
          subscriber: boolean
        }

        followDate?: Date
      } & Slime2.BasicUser

      namespace User {
        type Badge = {
          id: string
          image: string
        }
      }

      type Part = { text: string } & Part.Type
      namespace Part {
        type Type =
          | { type: 'text' }
          | { type: 'cheer'; cheer: Cheermote }
          | { type: 'emote'; emote: Slime2.Event.Message.Emote }
      }

      type Cheermote = {
        name: string
        amount: number
        color: string
        images: Slime2.Event.Message.Emote.Images
      }
    }
  }
}
