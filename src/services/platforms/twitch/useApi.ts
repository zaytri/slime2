import { useClient } from '@/contexts/client/useContext'
import useAccessToken from '@/services/useAccessToken'
import { ApiClient } from '@twurple/api'
import { CustomAuthProvider } from './customAuthProvider'

export default function useTwitchApi() {
  const { data: accessToken } = useAccessToken('twitch')
  const { keys } = useClient()

  const authProvider = new CustomAuthProvider(accessToken, keys.twitch)
  return new ApiClient({ authProvider })
}
