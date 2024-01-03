import { useClient } from '@/contexts/client/useClient'
import { useEventListDispatch } from '@/contexts/event-list/useEventList'
import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import type { Listener } from '@d-fischer/typed-event-emitter'
import { ChatClient } from '@twurple/chat'
import { useEffect, useRef } from 'react'
import useTwitchBroadcaster from '../useBroadcaster'
import useMessage from './transforms/useMessage'

const source = 'twitch'

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
      chatClient.connect()
    }

    // -------------------------
    // Channel Maintenance Functions
    // -------------------------

    function watchChannel(channelId: string) {
      chatClient.join(userName)
    }

    function watchBroadcasterChannel() {
      chatClient.join(broadcaster!.userName)
    }

    function stopWatchingChannel(channelId: string) {
      chatClient.part(userName)
    }

    function stopWatchingBroadcasterChannel() {
      chatClient.part(broadcaster!.username)
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
        channelId: message.channelId,
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

    function removeAllMessages(channelId: string) {
      removeMessages()
      client.sendEvent({
        type: 'clear-messages',
        channelId,
        source,
      })
    }

    function removeUserMessages(channelId: string, userId: string | null) {
      if (!userId) return
      removeUser(userId)
      client.sendEvent({
        type: 'remove-user',
        userId,
        channelId,
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

      chatClient.onChatClear((channelId) => {
        removeAllMessages(channelId)
      }),

      chatClient.onTimeout((channelId, __, ___, msg) => {
        removeUserMessages(channelId, msg.targetUserId)
      }),

      chatClient.onBan((channelId, __, msg) => {
        removeUserMessages(channelId, msg.targetUserId)
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
