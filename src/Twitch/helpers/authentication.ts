import { StaticAuthProvider } from '@twurple/auth'
import { ApiClient } from '@twurple/api'

export const CLIENT_ID = 'xrjkdmui65qd33jdx8itfslt61qys8'
export const ACCESS_TOKEN = slimeChat.token || ''

export const authProvider = new StaticAuthProvider(CLIENT_ID, ACCESS_TOKEN)
export const apiClient = new ApiClient({ authProvider })
