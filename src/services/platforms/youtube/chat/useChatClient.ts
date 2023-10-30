import { useEventListDispatch } from '@/contexts/event-list/useEventList'
import { useEffect } from 'react'
import useMessage from './transforms/useMessage'
import useLiveChat from './useLiveChat'

export default function useChatClient() {
  const { data, fetchNextPage } = useLiveChat()
  const { addEvent } = useEventListDispatch()
  const transformMessage = useMessage()

  function addMessage(message?: YouTube.Event.Message) {
    if (!message) return
    debugLog(message)
    addEvent({
      type: 'message',
      id: message.id,
      userId: message.user.id,
      message: message,
      source: 'youtube',
    })
  }

  useEffect(() => {
    if (!data || !data.pages.length) return

    const latestResponse = data.pages[data.pages.length - 1]
    const { pollingInterval, messages } = latestResponse

    messages.forEach(liveChatMessage => {
      const { id, snippet, authorDetails } = liveChatMessage
      if (!id || !snippet || !authorDetails) return

      switch (snippet.type) {
        // normal chat message
        case 'textMessageEvent':
          addMessage(transformMessage(liveChatMessage))
          break

        // equivalent to twitch hype chat
        case 'superChatEvent':
          break
        // a super chat but with a sticker instead of text
        case 'superStickerEvent':
          break

        // equivalent to twitch new sub
        case 'newSponsorEvent':
          break
        // equivalent to twitch resub
        case 'memberMilestoneChatEvent':
          break

        // equivalent to twitch community gift sub
        case 'membershipGiftingEvent':
          break
        // equivalent to receiving a twitch gift sub
        case 'giftMembershipReceivedEvent':
          break

        // moderation events
        case 'messageDeletedEvent':
          break
        case 'userBannedEvent':
          break
        default:
          return
      }
    })

    setTimeout(() => {
      fetchNextPage()
    }, pollingInterval)

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [data, fetchNextPage])
}

function debugLog(message: YouTube.Event.Message) {
  if (import.meta.env.DEV && import.meta.env.MODE === 'debug') {
    console.log(
      `%c[${message.type}] ${message.user.displayName}: ${message.text}`,
      'background-color: black; color: white; padding: 5px 10px; border-radius: 100px; border: 2px solid white',
    )

    console.log('Slime2 Message Data', message)

    console.log(
      `%cMessage ${message.id}`,
      'background-color: black; color: white; padding: 5px 10px; border-radius: 0 0 10px 10px; display: inline-block; margin-bottom: 10px; border: 1px solid gray;',
    )
  }
}
