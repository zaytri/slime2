import { parseChatMessage } from '@twurple/common'
import { useTransformPart } from './useTransformPart'

import type { TwitchPart } from '../types'
import useCheermotes from './useCheermotes'

/**
 * Hook that returns the function {@link transformText}
 */
export default function useTransformText() {
  const { transformTextPart, transformCheerPart, transformEmotePart } =
    useTransformPart()
  const { getCheermoteNames } = useCheermotes()

  /**
   * Transform a string into {@link TwitchPart}[], given `emoteOffsets`
   *
   * Cheermotes will also be parsed if `cheer = true`
   */
  function transformText(
    messageText: string,
    emoteOffsets: Map<string, string[]>,
    cheer = false,
  ): TwitchPart[] {
    if (!messageText) return []

    const twurpleParts = parseChatMessage(
      messageText,
      emoteOffsets,
      cheer ? getCheermoteNames() : undefined,
    )

    const parts: TwitchPart[] = []
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

  return { transformText }
}
