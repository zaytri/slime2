import { StaticAuthProvider } from '@twurple/auth'
import { ApiClient } from '@twurple/api'

export const clientId = 'xrjkdmui65qd33jdx8itfslt61qys8'
export const accessToken =
  process.env.REACT_APP_TWITCH_TOKEN || slime2Login.twitch.chat || ''
export const authProvider = new StaticAuthProvider(clientId, accessToken)
export const apiClient = new ApiClient({ authProvider })
