import { infiniteCache } from '@/services/settings'
import useAccessToken from '@/services/useAccessToken'
import { useQuery } from '@tanstack/react-query'

export default function useYoutubeApi() {
  const { data: accessToken } = useAccessToken('google')

  return useQuery<typeof gapi.client>({
    enabled: !!accessToken,
    queryKey: ['youtube', 'api', accessToken!],
    queryFn: async () => {
      await gapiClientLoad()
      gapi.client.setToken({ access_token: accessToken! })
      return gapi.client
    },
    ...infiniteCache,
  })
}

let gapiClientLoadPromise: Promise<void> | undefined = undefined

async function gapiClientLoad(): Promise<void> {
  if (gapiClientLoadPromise) return gapiClientLoadPromise

  gapiClientLoadPromise = new Promise<void>(resolve => {
    gapi.load('client', () => {
      gapi.client
        .init({
          discoveryDocs: [
            'https://youtube.googleapis.com/$discovery/rest?version=v3',
          ],
        })
        .then(() => resolve())
    })
  })

  return gapiClientLoadPromise
}
