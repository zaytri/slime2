import { useClient } from '@/contexts/client/useContext'
import { infiniteCache } from '@/services/settings'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const slime2Api = axios.create({
  baseURL: 'https://slime2.stream/api',
})

export default function useAccessToken(authProvider: Slime2.AuthProvider) {
  const key = useClient().key[authProvider]
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
    queryKey: [authProvider, 'accessToken', key],
    queryFn: async () => {
      return getAccessToken(authProvider, key)
    },
    ...infiniteCache,
  })
}

async function getAccessToken(
  authProvider: Slime2.AuthProvider,
  key?: string,
): Promise<string> {
  if (!key)
    throw new KeyNotFoundError(`Key not found for platform ${authProvider}`)

  return slime2Api
    .get<Slime2.Api.TokenResponse>(`/auth/${authProvider}/token`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    .then(response => response.data.token)
    .catch(error => {
      const errorMessage = `Invalid key for platform ${authProvider}, download a new one from https://slime2.stream/account`
      console.error(errorMessage, error)

      throw new KeyInvalidError(
        `Invalid key for platform ${authProvider}, download a new one from https://slime2.stream/account`,
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
