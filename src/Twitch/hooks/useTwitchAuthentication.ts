import { StaticAuthProvider } from '@twurple/auth'
import { ApiClient } from '@twurple/api'

const clientId = 'xrjkdmui65qd33jdx8itfslt61qys8'
const accessToken =
  process.env.REACT_APP_TWITCH_TOKEN || slimeChat.twitchToken || ''
const authProvider = new StaticAuthProvider(clientId, accessToken)
const apiClient = new ApiClient({ authProvider })

export default function useTwitchAuthentication() {
  return { authProvider, apiClient, clientId, accessToken }
}
