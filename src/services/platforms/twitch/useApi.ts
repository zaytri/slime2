import { useClient } from '@/contexts/client/useClient'
import useAccessToken from '@/services/useAccessToken'
import { ApiClient } from '@twurple/api'
import { TwitchAuthentication } from './authentication'

const authProvider = new TwitchAuthentication()
const apiClient = new ApiClient({ authProvider })

export default function useTwitchApi() {
  const { data: accessToken } = useAccessToken('twitch')
  const { keys } = useClient()

  authProvider.setAccessToken(accessToken)
  authProvider.setKey(keys.twitch)

  return apiClient
}
