import { auth } from '@/services/settings'
import useAccessToken from '@/services/useAccessToken'
import { ApiClient } from '@twurple/api'
import { StaticAuthProvider } from '@twurple/auth'

export default function useTwitchApi() {
  const { data: accessToken } = useAccessToken('twitch')
  const { clientId } = auth.twitch

  const authProvider = new StaticAuthProvider(
    clientId,
    accessToken || '',
    auth.twitch.scopes,
  )
  return new ApiClient({ authProvider })
}
