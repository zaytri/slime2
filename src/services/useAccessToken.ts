import settings, { infiniteCache } from '@/services/settings'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const slime2Api = axios.create({
  baseURL: 'https://slime2.stream/api',
})

export default function useAccessToken(platform: Slime2.Platform) {
  const { key } = settings[platform]

  return useQuery({
    queryKey: [platform, 'accessToken', key],
    queryFn: async () => {
      return getAccessToken(platform)
    },
    ...infiniteCache,
  })
}

async function getAccessToken(platform: Slime2.Platform): Promise<string> {
  const { key } = settings[platform]

  if (!key) throw new KeyNotFoundError(`Key not found for platform ${platform}`)

  return slime2Api
    .get<Slime2.Api.TokenResponse>(
      `/auth/${platformUrlTransformer(platform)}/token`,
      {
        headers: { Authorization: `Bearer ${settings[platform].key}` },
      },
    )
    .then(response => response.data.token)
    .catch(error => {
      const errorMessage = `Invalid key for platform ${platform}, download a new one from https://slime2.stream/account`
      console.error(errorMessage, error)

      throw new KeyInvalidError(
        `Invalid key for platform ${platform}, download a new one from https://slime2.stream/account`,
        { cause: error },
      )
    })
}

function platformUrlTransformer(platform: Slime2.Platform): Slime2.Provider {
  switch (platform) {
    case 'twitch':
      return 'twitch'
    case 'youtube':
      return 'google'
    default:
      throw Error(
        `Unhandled platform "${platform}" in slime2 Platform URL Transformer`,
      )
  }
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
