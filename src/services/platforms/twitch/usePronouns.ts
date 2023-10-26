import { infiniteCache } from '@/services/settings'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export default function usePronouns() {
  const { data: pronounsMap } = useAllPronouns()
  const queryClient = useQueryClient()

  async function getPronouns(userName: string): Promise<string | undefined> {
    if (!pronounsMap) return

    return await queryClient.fetchQuery({
      queryKey: ['twitch', 'pronouns', 'user', userName],
      queryFn: async () => {
        const pronounsId = await getUserPronouns(userName)
        if (!pronounsId) return undefined

        return pronounsMap!.get(pronounsId)
      },
      staleTime: 5 * 60 * 1000, // stale after 5 minutes
      gcTime: 1 * 60 * 60 * 1000, // garbage collected after 1 hour
      retry: 0,
    })
  }

  return { getPronouns }
}

export function useAllPronouns() {
  return useQuery<Map<string, string>>({
    queryKey: ['twitch', 'pronouns', 'all'],
    queryFn: async () => {
      return getAllPronouns()
    },
    ...infiniteCache,
  })
}

const pronounsApi = axios.create({
  baseURL: 'https://pronouns.alejo.io/api',
})

export async function getUserPronouns(
  userName: string,
): Promise<string | undefined> {
  const data = await pronounsApi
    .get<Pronouns.User[]>(`/users/${userName}`)
    .then(response => response.data)
    .catch(() => undefined)

  if (!data) return undefined // if Alejo's server is down

  // pronouns API returns either
  // an array that contains a single User
  // or an empty array if that user hasn't set pronouns
  const [user] = data
  if (!user) return undefined // no pronouns set

  return user.pronoun_id
}

export async function getAllPronouns(): Promise<Map<string, string>> {
  const pronounsMap = new Map<string, string>()

  const allPronouns = await pronounsApi
    .get<Pronouns.Data[]>('/pronouns')
    .then(response => response.data)

  allPronouns.forEach(({ name, display }) => {
    pronounsMap.set(name, display)
  })

  return pronounsMap
}
