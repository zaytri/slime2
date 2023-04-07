import type {
  ParsedMessageTextPart,
  ParsedMessageEmotePart,
  BasicMessageCheermote,
} from '@twurple/common'
import { useCheermotes, useOtherEmotes } from '../contexts/Twitch'

import type { TwitchPart } from '../types'

/**
 * Hook that returns the functions {@link textPartTransform},
 * {@link emotePartTransform}, and {@link cheerPartTransform}
 */
export function usePartTransform() {
  const otherEmotes = useOtherEmotes()!
  const cheermotes = useCheermotes()!

  /**
   * Transforms {@link ParsedMessageEmotePart} into {@link TwitchPart} with `type: 'emote'`
   *
   * Emotes from 3rd party emote services override Twitch emotes
   */
  function emotePartTransform(
    parsedMessageEmotePart: ParsedMessageEmotePart,
    fullMessageText: string,
  ): TwitchPart {
    const { displayInfo, position, length, id, name } = parsedMessageEmotePart

    const text = fullMessageText.slice(position, position + length)

    // check if a 3rd party emote can override this Twitch emote
    const otherEmote = otherEmotes.get(text)
    if (otherEmote)
      return {
        type: 'emote',
        text,
        emote: otherEmote,
      }

    const image = displayInfo.getUrl({
      backgroundType: 'dark',
      animationSettings: 'default',
      size: '3.0',
    })

    return {
      type: 'emote',
      text: fullMessageText.slice(position, position + length),
      emote: {
        id,
        name,
        image,
        source: 'twitch',
      },
    }
  }

  /**
   * Transforms {@link BasicMessageCheermote} into {@link TwitchPart} with `type: 'cheer'`
   */
  function cheerPartTransform(
    basicMessageCheermote: BasicMessageCheermote,
    fullMessageText: string,
  ): TwitchPart {
    const { name, amount, position, length } = basicMessageCheermote

    const cheerInfo = cheermotes.getCheermoteDisplayInfo(
      basicMessageCheermote.name,
      basicMessageCheermote.amount,
      {
        background: 'light',
        scale: '4',
        state: 'animated',
      },
    )
    const { color, url } = cheerInfo

    return {
      type: 'cheer',
      text: fullMessageText.slice(position, position + length),
      cheer: {
        color,
        image: url,
        name,
        amount,
      },
    }
  }

  /**
   * Transforms {@link ParsedMessageTextPart} into {@link TwitchPart}[]
   *
   * The text is split into an array between instances of 3rd party emotes,
   * with the text parts being {@link TwitchPart}s with `type: 'text'` and the
   * emote parts being {@link TwitchPart}s with `type: 'emote'`
   */
  function textPartTransform(
    parsedMessageTextPart: ParsedMessageTextPart,
  ): TwitchPart[] {
    const { text } = parsedMessageTextPart

    const regex = createEmoteRegex(Array.from(otherEmotes.keys()))
    const textParts = text.split(regex).filter(part => {
      // filter out empty strings due to emotes being
      // at the beginning or end of of the text
      return part !== ''
    })

    return textParts.map(part => {
      const emote = otherEmotes.get(part)
      if (emote) {
        return { type: 'emote', text: part, emote }
      }
      return { type: 'text', text: part }
    })
  }

  return { textPartTransform, emotePartTransform, cheerPartTransform }
}

/**
 * When this regex is used in {@link String.prototype.split}, it will result in
 * an array of strings split up by the emote names, with the emote names
 * included. If an emote name is at the beginning or end of the string,
 * then the array will include an empty string at the beginning or end.
 *
 * Examples:
 * ```
 * const regex = createEmoteRegex(['uwu'])
 *
 * 'hewwo? uwu hewwo??'.split(regex) === ['hewwo? ', 'uwu', 'hewwo??']
 *               'uwu!'.split(regex) === ['', 'uwu', '!']
 *         'uwuuwu uwu'.split(regex) === ['uwuuwu ', 'uwu', '']
 *                'uwu'.split(regex) === ['', 'uwu', '']
 * ```
 */
function createEmoteRegex(emoteNames: string[]) {
  // regex escape every emote name, and join with the regex OR character
  const regexPart = emoteNames.map(escapeRegExp).join('|')

  /**
   * Explaining this regex so that I know how it works in the future...
   *
   * These are all valid to go directly before or after an emote:
   * | Regex   | Explanation |
   * | ------- | - |
   * | `\s`    | any whitespace character
   * | `^`     | beginning of the string
   * | `$`     | end of the string
   * | `[.,!]` | period, comma, or exclamation mark
   *
   * These match a group without including it in the result:
   * | Regex    | Explanation |
   * | -------- | - |
   * | (?<= ) | Positive lookbehind. Matches a group before the main expression.
   * | (?= )  | Positive lookahead. Matches a group after the main expression.
   *
   */
  const regex = String.raw`(?<=\s|[.,!]|^)(${regexPart})(?=\s|[.,!]|$)`
  return new RegExp(regex, 'g')
}

/**
 * Escapes all characters that have special functionality in regex by inserting
 * a backslash before them
 *
 * Characters escaped: . * + ? ^ $ { } ( ) | [ ] \
 */
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
