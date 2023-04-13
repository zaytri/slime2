import type {
  ParsedMessageTextPart,
  ParsedMessageEmotePart,
  BasicMessageCheermote,
} from '@twurple/common'

import type { TwitchPart } from '../types'
import useCheermotes from './useCheermotes'
import useOtherEmotes from './useOtherEmotes'

/**
 * Hook that returns the functions {@link transfromTextPart},
 * {@link transformEmotePart}, and {@link transformCheerPart}
 */
export function useTransformPart() {
  const { getOtherEmote, getOtherEmoteNames } = useOtherEmotes()
  const { getCheermote } = useCheermotes()

  /**
   * Transforms {@link ParsedMessageEmotePart} into {@link TwitchPart} with `type: 'emote'`
   *
   * Emotes from 3rd party emote services override Twitch emotes
   */
  function transformEmotePart(
    parsedMessageEmotePart: ParsedMessageEmotePart,
    fullMessageText: string,
  ): TwitchPart {
    const { displayInfo, position, length, id, name } = parsedMessageEmotePart

    const text = fullMessageText.slice(position, position + length)

    // check if a 3rd party emote can override this Twitch emote
    const otherEmote = getOtherEmote(text)
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
  function transformCheerPart(
    basicMessageCheermote: BasicMessageCheermote,
    fullMessageText: string,
  ): TwitchPart {
    const { name, amount, position, length } = basicMessageCheermote

    const cheerInfo = getCheermote(
      basicMessageCheermote.name,
      basicMessageCheermote.amount,
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
  function transformTextPart(
    parsedMessageTextPart: ParsedMessageTextPart,
  ): TwitchPart[] {
    const { text } = parsedMessageTextPart

    const regex = createEmoteRegex(getOtherEmoteNames())
    const textParts = text.split(regex).filter(part => {
      // filter out empty strings due to emotes being
      // at the beginning or end of of the text
      return part !== ''
    })

    return textParts.map(part => {
      const emote = getOtherEmote(part)
      if (emote) {
        return { type: 'emote', text: part, emote }
      }
      return { type: 'text', text: part }
    })
  }

  return { transformTextPart, transformEmotePart, transformCheerPart }
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
