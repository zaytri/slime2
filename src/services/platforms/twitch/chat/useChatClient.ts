import { useClient } from '@/contexts/client/useClient'
import { useEventListDispatch } from '@/contexts/event-list/useEventList'
import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import type { Listener } from '@d-fischer/typed-event-emitter'
import { ChatClient } from '@twurple/chat'
import { useEffect, useRef } from 'react'
import useTwitchBroadcaster from '../useBroadcaster'
import useMessage from './transforms/useMessage'

const source = 'twitch'

let awaitingMessages: string[] = []

const deleteCheckMap = new Map<
  string, // event id
  {
    eventId?: string
    userId?: string
    all?: true
  }[]
>()

export default function useChatClient() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const { isPlatformReady } = usePlatformReady()
  const client = useClient()
  const { addEvent, removeEvent, removeUser, removeMessages } =
    useEventListDispatch()
  const transformMessage = useMessage()
  const chatClientRef = useRef(new ChatClient())
  const platformReady = isPlatformReady('twitch')

  useEffect(() => {
    if (!platformReady) return

    const chatClient = chatClientRef.current
    if (!chatClient.isConnected && !chatClient.isConnecting) {
      chatClient.onConnect(() => {
        chatClient.join(broadcaster!.userName)
      })
      chatClient.connect()
    }

    // -------------------------
    //  Chat Dispatch Functions
    // -------------------------

    function addMessage(message?: Twitch.Event.Message) {
      if (!message) return
      debugLog(message)
      addEvent({
        type: 'message',
        id: message.id,
        userId: message.user.id,
        message: message,
        source,
      })
    }

    function removeMessage(messageId: string) {
      removeEvent('message', messageId)
      client.sendEvent({
        type: 'remove-message',
        messageId,
        source,
      })
    }

    function removeAllMessages() {
      removeMessages()
      client.sendEvent({
        type: 'clear-messages',
        source,
      })
    }

    function removeUserMessages(userId: string | null) {
      if (!userId) return
      removeUser(userId)
      client.sendEvent({
        type: 'remove-user',
        userId,
        source,
      })
    }

    async function processMessage(
      id: string,
      promise: Promise<Twitch.Event.Message | undefined>,
    ) {
      // store id in processing message array while awaiting promise
      awaitingMessages.push(id)
      const message = await promise
      awaitingMessages = awaitingMessages.filter(messageId => messageId !== id)

      if (!message) return

      // check if the message is flagged for deletion while processing
      const deleteChecks = deleteCheckMap.get(id)
      if (deleteChecks) {
        for (const check of deleteChecks) {
          // chat was cleared
          if (check.all) return

          // message was deleted
          if (check.eventId === message.id) return

          // user of this message was banned/timed out
          if (check.userId === message.user.id) return
        }

        deleteCheckMap.delete(id)
      }

      addMessage(message)
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

        processMessage(msg.id, transformMessage(typeData, msg, text))
      }),

      chatClient.onAction(async (_, __, text, msg) => {
        processMessage(msg.id, transformMessage({ type: 'action' }, msg, text))
      }),

      // -------------------------
      //  Events Using UserNotice
      // -------------------------

      chatClient.onResub(async (_, __, info, msg) => {
        const typeData: Twitch.Event.Message.Type = {
          type: 'resub',
          resub: { months: info.months, tier: info.plan },
        }

        processMessage(msg.id, transformMessage(typeData, msg))
      }),

      chatClient.onAnnouncement(async (_, __, info, msg) => {
        const typeData: Twitch.Event.Message.Type = {
          type: 'announcement',
          announcement: { color: info.color },
        }

        processMessage(msg.id, transformMessage(typeData, msg))
      }),

      // --------------------------
      //  Events Removing Messages
      // --------------------------

      chatClient.onChatClear(() => {
        awaitingMessages.forEach(id => {
          const deleteChecks = deleteCheckMap.get(id) ?? []
          deleteCheckMap.set(id, [...deleteChecks, { all: true }])
        })
        removeAllMessages()
      }),

      chatClient.onTimeout((_, __, ___, msg) => {
        const userId = msg.targetUserId
        if (!userId) return

        awaitingMessages.forEach(id => {
          const deleteChecks = deleteCheckMap.get(id) ?? []
          deleteCheckMap.set(id, [...deleteChecks, { userId }])
        })

        removeUserMessages(userId)
      }),

      chatClient.onBan((_, __, msg) => {
        const userId = msg.targetUserId
        if (!userId) return

        awaitingMessages.forEach(id => {
          const deleteChecks = deleteCheckMap.get(id) ?? []
          deleteCheckMap.set(id, [...deleteChecks, { userId }])
        })

        removeUserMessages(userId)
      }),

      chatClient.onMessageRemove((_, messageId) => {
        awaitingMessages.forEach(id => {
          const deleteChecks = deleteCheckMap.get(id) ?? []
          deleteCheckMap.set(id, [...deleteChecks, { eventId: messageId }])
        })

        removeMessage(messageId)
      }),
    )

    return () => {
      listeners.forEach(listener => {
        if (listener) chatClient.removeListener(listener)
      })
    }
  }, [
    platformReady,
    client,
    addEvent,
    removeEvent,
    removeUser,
    removeMessages,
    transformMessage,
    broadcaster,
  ])
}

function debugLog(message: Twitch.Event.Message) {
  if (import.meta.env.DEV && import.meta.env.MODE === 'debug') {
    console.debug(
      `%c[${message.type}] ${message.user.displayName}: ${message.text}`,
      'background-color: black; color: white; padding: 5px 10px; border-radius: 100px; border: 2px solid white',
    )

    console.debug('Slime2 Message Data', message)

    console.debug(
      `%cMessage ${message.id}`,
      'background-color: black; color: white; padding: 5px 10px; border-radius: 0 0 10px 10px; display: inline-block; margin-bottom: 10px; border: 1px solid gray;',
    )
  }
}
