/**
 * Hook that returns the function {@link transform}
 */
export default function useText() {
  /**
   * Transform a string into {@link Youtube.Event.Message.Part}[], given `emoteOffsets`
   *
   * Cheermotes will also be parsed if `cheer = true`
   */
  function transform(messageText: string) {
    if (!messageText) return []

    const parts: Youtube.Event.Message.Part[] = []
    const regex = createEmoteRegex([])
    messageText.split(regex).forEach(part => {
      if (part === '') return

      parts.push({ type: 'text', text: part })
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
 * const regex = createEmoteRegex([':uwu:'])
 *
 * 'hewwo? :uwu: hewwo??'.split(regex) === ['hewwo? ', 'uwu', ' hewwo??']
 *               ':uwu:!'.split(regex) === ['', ':uwu:', '!']
 *     ':uwu::uwu: :uwu:'.split(regex) === ['', ':uwu:', '', ':uwu:', ' ', ':uwu:', '']
 *                ':uwu:'.split(regex) === ['', ':uwu:', '']
 * ```
 */
function createEmoteRegex(emoteNames: string[]) {
  // regex escape every emote name, and join with the regex OR character
  const regexPart = emoteNames.map(escapeRegExp).join('|')
  const regex = String.raw`(${regexPart})`
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
