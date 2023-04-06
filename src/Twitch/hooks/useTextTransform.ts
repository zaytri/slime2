import { parseChatMessage } from '@twurple/common'
import { useCheermotes } from '../contexts/Twitch'
import { usePartTransform } from './usePartTransform'

import type { TwitchPart } from '../types'

/**
 * Hook that returns the function {@link textTransform}
 */
export default function useTextTransform() {
  const { textPartTransform, cheerPartTransform, emotePartTransform } =
    usePartTransform()
  const cheermotes = useCheermotes()!

  /**
   * Transform a string into `TwitchPart[]`, given `emoteOffsets`
   *
   * Cheermotes will also be parsed if `cheer = true`
   */
  function textTransform(
    messageText: string,
    emoteOffsets: Map<string, string[]>,
    cheer = false,
  ): TwitchPart[] {
    if (messageText === '') return []

    const twurpleParts = parseChatMessage(
      messageText,
      emoteOffsets,
      cheer ? cheermotes.getPossibleNames() : undefined,
    )

    const parts: TwitchPart[] = []
    twurpleParts.forEach(part => {
      switch (part.type) {
        default:
        case 'text':
          parts.push(...textPartTransform(part))
          break
        case 'cheer':
          parts.push(cheerPartTransform(part, messageText))
          break
        case 'emote':
          parts.push(emotePartTransform(part, messageText))
          break
      }
    })

    return parts
  }

  return textTransform
}
