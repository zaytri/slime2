import { buildEmoteImageUrl, type ParsedMessageEmotePart } from '@twurple/chat'
import useThirdPartyEmotes from '../../useThirdPartyEmotes'

/**
 * Hook that returns the function {@link transform}
 */
export function useEmotePart() {
  const { data: emoteMap } = useThirdPartyEmotes()

  /**
   * Transforms {@link ParsedMessageEmotePart} into
   * {@link Twitch.Event.Message.Part} with `type: 'emote'`
   *
   * Emotes from 3rd party emote services override Twitch emotes
   */
  function transform(
    parsedMessageEmotePart: ParsedMessageEmotePart,
    fullMessageText: string,
  ): Twitch.Event.Message.Part {
    const { position, length, id, name } = parsedMessageEmotePart

    const text = fullMessageText.slice(position, position + length)

    // check if a 3rd party emote can override this Twitch emote
    const thirdPartyEmote = emoteMap!.get(text)
    if (thirdPartyEmote)
      return {
        type: 'emote',
        text,
        emote: thirdPartyEmote,
      }

    return {
      type: 'emote',
      text,
      emote: {
        id,
        name,
        images: {
          default: buildEmoteUrls(id),
          static: buildEmoteUrls(id, true),
        },
        source: 'twitch',
        isModifier: false,
      },
    }
  }

  return transform
}

function buildEmoteUrls(
  id: string,
  staticEmote: boolean = false,
): Slime2.Event.Message.Emote.Urls {
  function buildEmoteUrl(size: '1.0' | '2.0' | '3.0') {
    const animationSettings = staticEmote ? 'static' : 'default'
    const backgroundType = 'light'
    return buildEmoteImageUrl(id, { animationSettings, backgroundType, size })
  }

  return {
    x1: buildEmoteUrl('1.0'),
    x2: buildEmoteUrl('2.0'),
    x4: buildEmoteUrl('3.0'),
  }
}
