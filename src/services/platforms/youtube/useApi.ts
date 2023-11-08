import { infiniteCache } from '@/services/helpers'
import useAccessToken from '@/services/useAccessToken'
import { useQuery } from '@tanstack/react-query'

export default function useYoutubeApi() {
  const { data: accessToken } = useAccessToken('google')

  return useQuery<typeof gapi.client.youtube>({
    enabled: !!accessToken,
    queryKey: ['youtube', 'api', accessToken!],
    queryFn: async () => {
      throw Error('YouTube is not ready.')
      await gapiClientLoad()
      gapi.client.setToken({ access_token: accessToken! })
      return gapi.client.youtube
    },
    ...infiniteCache,
  })
}

let gapiClientLoadPromise: Promise<void> | undefined = undefined

async function gapiClientLoad(): Promise<void> {
  if (gapiClientLoadPromise) return gapiClientLoadPromise

  gapiClientLoadPromise = new Promise<void>(resolve => {
    const topScriptElement = document.getElementsByTagName('script')[0]
    const gapiScriptElement = document.createElement('script')
    gapiScriptElement.src = 'https://apis.google.com/js/api.js'
    gapiScriptElement.async = true
    gapiScriptElement.defer = true
    topScriptElement.parentNode?.insertBefore(
      gapiScriptElement,
      topScriptElement,
    )
    gapiScriptElement.onload = async () => {
      gapi.load('client', () => {
        gapi.client
          .init({
            discoveryDocs: [
              'https://youtube.googleapis.com/$discovery/rest?version=v3',
            ],
          })
          .then(() => resolve())
      })
    }
  })

  return gapiClientLoadPromise
}
