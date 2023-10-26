import useYoutubeApi from '@/services/platforms/youtube/useApi'
import { infiniteCache } from '@/services/settings'
import { useQuery } from '@tanstack/react-query'

export default function useYoutubeBroadcaster() {
  const { data: api } = useYoutubeApi()

  return useQuery<Slime2.User.Broadcaster>({
    enabled: !!api,
    queryKey: ['youtube', 'broadcaster', api?.getToken() || ''],
    queryFn: async () => {
      const response = await gapi.client.youtube.channels.list({
        mine: true,
        part: ['id', 'snippet'],
      })

      const { items } = response.result
      if (!items) throw Error('YouTube broadcaster not found')

      const [channel] = items
      const { id, snippet } = channel
      if (!id || !snippet) throw Error('YouTube broadcaster not found')

      const { title, thumbnails, customUrl } = snippet
      if (!title) throw Error('YouTube broadcaster not found')

      console.log({ id, customUrl, title, thumbnails })

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
