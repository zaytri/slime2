import { type ParsedMessageCheerPart } from '@twurple/chat'
import useCheermotes from '../../useCheermotes'

/**
 * Hook that returns the function {@link transform}
 */
export function useCheerPart() {
  const { data: cheermotes } = useCheermotes()

  /**
   * Transforms {@link ParsedMessageCheerPart} into
   * {@link Twitch.Event.Message.Part} with `type: 'cheer'`
   */
  function transform(
    parsedMessageCheerPart: ParsedMessageCheerPart,
    fullMessageText: string,
  ): Twitch.Event.Message.Part {
    const { name, amount, position, length } = parsedMessageCheerPart

    return {
      type: 'cheer',
      text: fullMessageText.slice(position, position + length),
      cheer: cheermotes!.get(name, amount),
    }
  }

  return transform
}
