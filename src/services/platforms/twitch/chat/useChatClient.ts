import { auth } from '@/services/settings'
import useAccessToken from '@/services/useAccessToken'
import { StaticAuthProvider } from '@twurple/auth'
import { ChatClient } from '@twurple/chat'
import { useRef } from 'react'
import useTwitchBroadcaster from '../useBroadcaster'

export default function useChatClient() {
  const { data: accessToken } = useAccessToken('twitch')
  const { data: broadcaster } = useTwitchBroadcaster()
  const { clientId } = auth.twitch

  const authProvider = new StaticAuthProvider(
    clientId,
    accessToken || '',
    auth.twitch.scopes,
  )

  const chatClientRef = useRef(
    new ChatClient({
      authProvider,
      channels: [broadcaster!.userName],
    }),
  )

  const chatClient = chatClientRef.current

  if (!chatClient.isConnected) chatClient.connect()

  return chatClient
}
