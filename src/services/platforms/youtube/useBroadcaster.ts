import useYoutubeApi from '@/services/platforms/youtube/useApi'
import { infiniteCache } from '@/services/settings'
import useAccessToken from '@/services/useAccessToken'
import { useQuery } from '@tanstack/react-query'

export default function useYoutubeBroadcaster() {
  const { data: accessToken } = useAccessToken('google')
  const { data: api } = useYoutubeApi()

  return useQuery<Slime2.User.Broadcaster>({
    enabled: !!accessToken && !!api,
    queryKey: ['youtube', 'broadcaster', accessToken || null],
    queryFn: async () => {
      const response = await gapi.client.youtube.channels.list({
        mine: true,
        part: ['id', 'snippet'],
      })

      const { items } = response.result
      if (!items || !items.length) throw new YouTubeChannelNotFoundError()

      const [channel] = items
      const { id, snippet } = channel
      if (!id || !snippet) throw new YouTubeChannelNotFoundError()

      const { title, thumbnails, customUrl } = snippet
      if (!title) throw new YouTubeChannelNotFoundError()

      return {
        id,
        userName: customUrl || '',
        displayName: title,
        image:
          thumbnails?.medium?.url ||
          thumbnails?.standard?.url ||
          thumbnails?.default?.url ||
          '',
        url: customUrl ? `https://www.youtube.com/${customUrl}` : '',
      }
    },
    ...infiniteCache,
  })
}

export class YouTubeChannelNotFoundError extends Error {
  constructor() {
    const message = 'YouTube channel not found'
    super(message)
    this.name = 'YouTubeChannelNotFoundError'
  }
}
