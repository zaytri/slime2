import { parseChatMessage } from '@twurple/chat'
import useCheermotes from '../../useCheermotes'
import { useTextPart } from './useTextPart'
import { useEmotePart } from './useEmotePart'
import { useCheerPart } from './useCheerPart'

/**
 * Hook that returns the function {@link transform}
 */
export default function useText() {
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

    return parts
  }

  return transform
}
