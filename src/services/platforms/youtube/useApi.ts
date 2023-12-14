import { useClient } from '@/contexts/client/useClient'
import useAccessToken from '@/services/useAccessToken'
import { ApiClient } from './apiClient'
import { GoogleAuthentication } from './authentication'

const authProvider = new GoogleAuthentication()
const apiClient = new ApiClient(authProvider)

export default function useYoutubeApi() {
  const { data: accessToken } = useAccessToken('google')
  const { keys } = useClient()

  authProvider.setAccessToken(accessToken)
  authProvider.setKey(keys.google)

  return apiClient
}
