import { useClient } from '@/contexts/client/useContext'
import { infiniteCache } from '@/services/settings'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const slime2Api = axios.create({
  baseURL: 'https://slime2.stream/api',
})

export default function useAccessToken(provider: Slime2.Auth.Provider) {
  const { keys } = useClient()
  const key = keys[provider]
  const [ready, setReady] = useState(false)

  useEffect(() => {
    function onReady() {
      setReady(true)
    }

    addEventListener('slime2:ready', onReady)

    return () => {
      removeEventListener('slime2:ready', onReady)
    }
  }, [])

  return useQuery({
    enabled: ready,
    queryKey: [provider, 'accessToken', key],
    queryFn: async () => {
      return getAccessToken(provider, key)
    },
    ...infiniteCache,
  })
}

export async function getAccessToken(
  provider: Slime2.Auth.Provider,
  key?: string,
): Promise<string> {
  if (!key) throw new KeyNotFoundError(`Key not found for platform ${provider}`)

  return slime2Api
    .get<Slime2.Api.TokenResponse>(`/auth/${provider}/token`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    .then(response => response.data.token)
    .catch(error => {
      const errorMessage = `Invalid key for platform ${provider}, download a new one from https://slime2.stream/account`
      console.error(errorMessage, error)

      throw new KeyInvalidError(
        `Invalid key for platform ${provider}, download a new one from https://slime2.stream/account`,
        { cause: error },
      )
    })
}

export class KeyNotFoundError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'KeyNotFoundError'
  }
}

export class KeyInvalidError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'KeyInvalidError'
  }
}
