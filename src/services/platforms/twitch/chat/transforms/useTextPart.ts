import { type ParsedMessageTextPart } from '@twurple/chat'
import useThirdPartyEmotes from '../../useThirdPartyEmotes'

/**
 * Hook that returns the function {@link transform}
 */
export function useTextPart() {
  const { data: emoteMap } = useThirdPartyEmotes()

  /**
   * Transforms {@link ParsedMessageTextPart} into {@link Twitch.Event.Message.Part}[]
   *
   * The text is split into an array between instances of 3rd party emotes,
   * with text parts as {@link Twitch.Event.Message.Part} with `type: 'text'`
   * and emote parts as {@link Twitch.Event.Message.Part} with `type: 'emote'`
   */
  function transform(
    parsedMessageTextPart: ParsedMessageTextPart,
  ): Twitch.Event.Message.Part[] {
    const parts: Twitch.Event.Message.Part[] = []
    const { text } = parsedMessageTextPart

    const regex = createEmoteRegex(Array.from(emoteMap!.keys()))
    text.split(regex).forEach(part => {
      // filter out empty strings due to emotes being
      // at the beginning or end of of the text
      if (part === '') return

      const emote = emoteMap!.get(part)
      if (emote) parts.push({ type: 'emote', text: part, emote })
      else parts.push({ type: 'text', text: part })
    })

    return parts
  }

  return transform
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
