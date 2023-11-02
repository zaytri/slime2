import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useYoutubeApi from '../useApi'
import useLiveChatId from './useLiveChatId'

const MAX_POLLING_INTERVAL = 5 * 1000 // 5 seconds

export default function useLiveChat() {
  const { data: liveChatId } = useLiveChatId()
  const { data: api } = useYoutubeApi()
  const [emptyMessageCount, setEmptyMessageCount] = useState(0)

  return useInfiniteQuery({
    enabled: !!api && !!liveChatId,
    queryKey: ['youtube', 'liveChat', liveChatId || null],
    queryFn: async ({ pageParam: pageToken }): Promise<LiveChatResponse> => {
      const response = await api!.liveChatMessages.list({
        liveChatId: liveChatId!,
        part: ['id', 'snippet', 'authorDetails'],
        pageToken,
      })

      const {
        items: messages = [],
        pollingIntervalMillis = 0,
        nextPageToken,
      } = response.result

      // reset empty message count if messages exist, otherwise increment it
      const newEmptyMessageCount = messages.length ? 0 : emptyMessageCount + 1
      setEmptyMessageCount(newEmptyMessageCount)

      // add 1 second for every time in a row that empty messages are fetched
      const increasedDelay = newEmptyMessageCount * 1000

      const pollingInterval = Math.max(
        pollingIntervalMillis, // just in case it's greater than 5 seconds
        Math.min(pollingIntervalMillis + increasedDelay, MAX_POLLING_INTERVAL),
      )

      return {
        nextPageToken,
        pollingInterval,
        messages,
      }
    },
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage.nextPageToken,
    maxPages: 2,
    gcTime: Infinity,
    staleTime: Infinity,
    retry: 0,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

type LiveChatResponse = {
  nextPageToken?: string
  pollingInterval: number
  messages: gapi.client.youtube.LiveChatMessage[]
}
