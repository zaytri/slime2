import { ChatClient } from '@twurple/chat'
import { useRef } from 'react'
import useTwitchBroadcaster from '../useBroadcaster'

export default function useChatClient() {
  const { data: broadcaster } = useTwitchBroadcaster()

  const chatClientRef = useRef(
    new ChatClient({
      channels: [broadcaster!.userName],
    }),
  )

  const chatClient = chatClientRef.current

  if (!chatClient.isConnected) chatClient.connect()

  return chatClient
}
