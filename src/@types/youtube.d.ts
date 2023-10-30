namespace YouTube {
  type Event = Event.Type & { source: 'youtube' }
  type RenderableEvent = Exclude<
    Event,
    { type: 'remove-user' | 'remove-message' }
  >

  namespace Event {
    type Type =
      | { type: 'message'; message: Message }
      | { type: 'remove-user'; userId: string }
      | { type: 'remove-message'; messageId: string }

    type Message = {
      user: Message.User
      parts: Message.Part[]
    } & Message.Type &
      Slime2.Event.BasicMessage

    namespace Message {
      type Type = { type: 'basic' }

      type User = {
        // identifiers
        url: string
        image: string

        // roles
        roles: {
          broadcaster: boolean
          moderator: boolean
          member: boolean
        }

        // null if the user hasn't subscribed
        subscriptionDate: Date | null
      } & Slime2.BasicUser

      type Part = { text: string } & Part.Type
      namespace Part {
        type Type =
          | { type: 'text' }
          | { type: 'emote'; emote: Slime2.Event.Message.Emote }
      }
    }
  }

  type Emoji = {
    emojiId: string
    shortcuts: string[]
    searchTerms: string[]
    image: {
      thumbnails: EmojiThumbnail[]
      accessibility: {
        accessibilityData: {
          label: string
        }
      }
    }
    isCustomEmoji?: boolean
    isLocked?: boolean
  }

  type EmojiThumbnail = {
    url: string
    width: number
    height: number
  }
}
