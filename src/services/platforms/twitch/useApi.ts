import settings from '@/services/settings'
import useAccessToken from '@/services/useAccessToken'
import { ApiClient } from '@twurple/api'
import { StaticAuthProvider } from '@twurple/auth'

export default function useTwitchApi() {
  const { data: accessToken } = useAccessToken('twitch')
  const { clientId } = settings.twitch

  const authProvider = new StaticAuthProvider(
    clientId,
    accessToken || '',
    settings.twitch.scopes,
  )
  return new ApiClient({ authProvider })
}
