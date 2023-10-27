import { useClient } from '@/contexts/client/useContext'
import { useEventListDispatch } from '@/contexts/event-list/useContext'
import { usePlatformReady } from '@/contexts/platform-ready/useContext'
import type { Listener } from '@d-fischer/typed-event-emitter'
import { ChatClient } from '@twurple/chat'
import { useEffect, useRef } from 'react'
import useTwitchBroadcaster from '../useBroadcaster'
import useMessage from './transforms/useMessage'

const source = 'twitch'

export default function useChatClient() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const [platformReady] = usePlatformReady('twitch')
  const client = useClient()
  const dispatch = useEventListDispatch()
  const transformMessage = useMessage()
  const chatClientRef = useRef(new ChatClient())

  useEffect(() => {
    if (!platformReady) return

    const chatClient = chatClientRef.current
    if (!chatClient.isConnected) {
      chatClient.connect()
      chatClient.join(broadcaster!.userName)
    }

    // -------------------------
    //  Chat Dispatch Functions
    // -------------------------

    function addMessage(message?: Twitch.Event.Message) {
      if (!message) return
      debugLog(message)
      dispatch({
        type: 'add',
        event: {
          type: 'message',
          data: message,
          source,
        },
      })
    }

    function clearMessages(userId?: string | null) {
      if (userId) clearUserMessages(userId)
      else clearAllMessages()
    }

    function clearAllMessages() {
      dispatch({ type: 'clear-all-messages' })
      client.onEvent({
        type: 'message-delete',
        data: { type: 'all' },
        source,
      })
    }

    function clearUserMessages(userId: string) {
      dispatch({ type: 'clear-user-messages', userId })
      client.onEvent({
        type: 'message-delete',
        data: { type: 'user', userId },
        source,
      })
    }

    function removeMessage(messageId: string) {
      dispatch({ type: 'remove', eventType: 'message', eventId: messageId })
      client.onEvent({
        type: 'message-delete',
        data: { type: 'one', messageId },
        source,
      })
    }

    // -----------------
    //  Event Listeners
    // -----------------

    const listeners: Listener[] = []
    listeners.push(
      // -----------------------------
      //  Events Using ChatMessage
      // -----------------------------

      chatClient.onMessage(async (_, __, text, msg) => {
        const { bits } = msg
        const typeData: Twitch.Event.Message.Type = bits
          ? { type: 'cheer', cheer: { amount: bits } }
          : { type: 'basic' }

        const message = await transformMessage(typeData, msg, text)
        addMessage(message)
      }),

      chatClient.onAction(async (_, __, text, msg) => {
        const message = await transformMessage({ type: 'action' }, msg, text)
        addMessage(message)
      }),

      // -------------------------
      //  Events Using UserNotice
      // -------------------------

      chatClient.onResub(async (_, __, info, msg) => {
        const typeData: Twitch.Event.Message.Type = {
          type: 'resub',
          resub: { months: info.months, tier: info.plan },
        }

        const message = await transformMessage(typeData, msg)
        addMessage(message)
      }),

      chatClient.onAnnouncement(async (_, __, info, msg) => {
        const typeData: Twitch.Event.Message.Type = {
          type: 'announcement',
          announcement: { color: info.color },
        }

        const message = await transformMessage(typeData, msg)
        addMessage(message)
      }),

      // --------------------------
      //  Events Removing Messages
      // --------------------------

      chatClient.onChatClear(() => {
        clearMessages()
      }),

      chatClient.onTimeout((_, __, ___, msg) => {
        clearMessages(msg.targetUserId)
      }),

      chatClient.onBan((_, __, msg) => {
        clearMessages(msg.targetUserId)
      }),

      chatClient.onMessageRemove((_, messageId) => {
        removeMessage(messageId)
      }),
    )

    return () => {
      listeners.forEach(listener => {
        if (listener) chatClient.removeListener(listener)
      })
    }
  }, [platformReady, client, dispatch, transformMessage, broadcaster])
}

function debugLog(message: Twitch.Event.Message) {
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
