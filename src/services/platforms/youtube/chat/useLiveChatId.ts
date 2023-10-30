import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useYoutubeApi from '../useApi'
import useYoutubeBroadcaster from '../useBroadcaster'

export default function useLiveChatId() {
  const { data: broadcaster } = useYoutubeBroadcaster()
  const { data: api } = useYoutubeApi()
  const [retryDate, setRetryDate] = useState<Date>()

  const liveChatIdQuery = useQuery<string>({
    enabled: !!api,
    queryKey: ['youtube', 'liveChatId', broadcaster?.id],
    queryFn: async () => {
      const response = await api!.youtube.liveBroadcasts.list({
        mine: true,
        part: ['snippet', 'status'],
        maxResults: 1,
      })

      const { items } = response.result
      if (!items || !items.length) throw new YouTubeLiveBroadcastNotFoundError()

      const [broadcast] = items
      const { snippet, status } = broadcast
      if (!snippet || !status) throw new YouTubeLiveBroadcastNotFoundError()

      const { lifeCycleStatus } = status
      if (lifeCycleStatus !== 'live')
        throw new YouTubeLiveBroadcastNotFoundError()

      const { liveChatId } = snippet
      if (!liveChatId) throw new YouTubeLiveChatNotFoundError()

      return liveChatId
    },
    gcTime: Infinity,
    staleTime: Infinity,
    retry: true, // infinitely retry failing requests
    retryDelay: () => {
      const delay = 1 * 60 * 1000 // retry every 1 minute
      setRetryDate(new Date(Date.now() + delay))
      return delay
    },
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return { retryDate, ...liveChatIdQuery }
}

class YouTubeLiveBroadcastNotFoundError extends Error {
  constructor() {
    const message = 'YouTube live broadcast not found, retrying in 1 minute'
    super(message)
    this.name = 'YouTubeLiveBroadcastNotFoundError'
  }
}

class YouTubeLiveChatNotFoundError extends Error {
  constructor() {
    const message = 'YouTube live chat not found, retrying in 1 minute'
    super(message)
    this.name = 'YouTubeLiveChatNotFoundError'
  }
}
