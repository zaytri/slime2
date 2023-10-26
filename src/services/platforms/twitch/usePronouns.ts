import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllPronouns, getUserPronouns } from './pronouns'
import { infiniteCache } from '@/services/settings'

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
