import { useEffect, useState } from 'react'
import { accessToken, clientId } from '../helpers/twitchAuthentication'
import { TokenInfo, getTokenInfo } from '@twurple/auth'
import { Broadcaster } from '../types'

let tokenInfo: TokenInfo | null = null
let loaded = false

export function useTokenInfo() {
  if (!tokenInfo) {
    throw new Error('tokenInfo is not defined!')
  }

  const { userId, userName } = tokenInfo
  const broadcaster: Broadcaster = {
    id: userId!,
    userName: userName!,
  }

  return { broadcaster }
}

export function useTokenInfoLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadToken() {
      if (!loaded) {
        tokenInfo = await getTokenInfo(accessToken, clientId).catch(() => null)
      }

      setLoading(false)
      loaded = true
    }

    loadToken()
  }, [])

  return { loading, tokenInfo }
}
