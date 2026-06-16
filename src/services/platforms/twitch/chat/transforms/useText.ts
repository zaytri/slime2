import { parseChatMessage } from '@twurple/chat'
import useCheermotes from '../../useCheermotes'
import { useCheerPart } from './useCheerPart'
import { useEmotePart } from './useEmotePart'
import { useTextPart } from './useTextPart'

/**
 * Hook that returns the function {@link transform}
 */
export default function useText(enableEmoteModifiers: boolean = false) {
  const { data: cheermotes } = useCheermotes()
  const transformTextPart = useTextPart()
  const transformCheerPart = useCheerPart()
  const transformEmotePart = useEmotePart()

  /**
   * Transform a string into {@link Twitch.Event.Message.Part}[], given `emoteOffsets`
   *
   * Cheermotes will also be parsed if `cheer = true`
   */
  function transform(
    messageText: string,
    emoteOffsets: Map<string, string[]>,
    cheer = false,
  ): Twitch.Event.Message.Part[] {
    if (!messageText) return []

    const twurpleParts = parseChatMessage(
      messageText,
      emoteOffsets,
      cheer ? cheermotes!.getAllNames() : undefined,
    )

    const parts: Twitch.Event.Message.Part[] = []
    twurpleParts.forEach(part => {
      switch (part.type) {
        default:
        case 'text':
          parts.push(...transformTextPart(part))
          break
        case 'cheer':
          parts.push(transformCheerPart(part, messageText))
          break
        case 'emote':
          parts.push(transformEmotePart(part, messageText))
          break
      }
    })

    let emoteModifiersQueued: Slime2.Event.Message.Emote[] = []
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (part.type === 'emote') {
        if (part.emote.isModifier) {
          emoteModifiersQueued.push(part.emote)
          if (
            i + 1 < parts.length &&
            parts[i + 1].type === 'text' &&
            parts[i + 1].text.trim() === ''
          ) {
            // Drop whitespace seperating the modifier from the following emote
            parts.splice(i + 1, 1)
          }
        } else if (emoteModifiersQueued.length > 0) {
          i -= emoteModifiersQueued.length
          parts.splice(i, emoteModifiersQueued.length)

          part.modifier = ''
          emoteModifiersQueued.forEach(emote => {
            switch (emote.name) {
              case 'c!': // Cursed
                part.modifier +=
                  'filter: grayscale(1) brightness(.7) contrast(2.5);'
                break
              case 'h!': // Horizontal Flip
                part.modifier += 'transform: scaleX(-1);'
                break
              case 'l!': // Left Rotate
                part.modifier += 'transform: rotate(-90deg);'
                break
              case 'p!': // Party
                part.modifier +=
                  'animation: slime2-emote-modifier-party 1.5s linear infinite;'
                break
              case 'r!': // Right Rotate
                part.modifier += 'transform: rotate(90deg);'
                break
              case 'v!': // Vertical Flip
                part.modifier += 'transform: scaleY(-1);'
                break
              case 'w!': // Wide
                part.modifier += 'transform: scaleX(3);'
                // We can't hardcod emote size to make widened emote spacing work.
                // Instead, add blank emotes before and after this emote, for easy spacing no matter what widget
                parts.splice(i + 1, 0, BLANK_EMOTE_PART)
                parts.splice(i, 0, BLANK_EMOTE_PART)
                i += 1
                break
              case 'z!': // Zero Space
                // Simply remove the whitespace-only text part before this emote
                if (
                  i - 1 < parts.length &&
                  parts[i - 1].type === 'text' &&
                  parts[i - 1].text.trim() === ''
                ) {
                  parts.splice(i - 1, 1)
                }
                break
            }
          })
          emoteModifiersQueued = []

          if (part.modifier === '') part.modifier = undefined
        }
      } else if (emoteModifiersQueued.length > 0) {
        emoteModifiersQueued = []
      }
    }
    console.log(parts)

    return parts
  }

  return transform
}

const BLANK_EMOTE_PART: Twitch.Event.Message.Part = {
  type: 'emote',
  text: '',
  emote: {
    id: '',
    name: ':blank:',
    images: {
      default: {
        x1: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        x2: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        x4: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      },
      static: {
        x1: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        x2: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        x4: 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      },
    },
    source: 'betterttv',
    isModifier: false,
  },
}
