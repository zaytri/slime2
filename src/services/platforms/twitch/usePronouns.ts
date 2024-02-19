import { infiniteCache } from '@/services/helpers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export default function usePronouns() {
  const { data: pronounsMap } = useAllPronouns()
  const queryClient = useQueryClient()

  async function getPronouns(userName: string): Promise<string | null> {
    if (!pronounsMap) return null

    return await queryClient.fetchQuery({
      queryKey: ['twitch', 'pronouns', 'user', userName],
      queryFn: async () => {
        const pronouns = await getUserPronouns(userName)
        if (!pronouns) return null

        const [primary, secondary] = pronouns

        return displayPronouns(
          pronounsMap[primary],
          secondary ? pronounsMap[secondary] : null,
        )
      },
      staleTime: 5 * 60 * 1000, // stale after 5 minutes
      gcTime: 1 * 60 * 60 * 1000, // garbage collected after 1 hour
      retry: 0,
    })
  }

  return { getPronouns }
}

export function useAllPronouns() {
  return useQuery<Pronouns.All | null>({
    queryKey: ['twitch', 'pronouns', 'all'],
    queryFn: async () => {
      return getAllPronouns()
    },
    ...infiniteCache,
    staleTime: 0,
    initialData: pronounsCache,
  })
}

const pronounsApi = axios.create({
  baseURL: 'https://api.pronouns.alejo.io/v1',
})

export async function getUserPronouns(
  userName: string,
): Promise<[string, string | null] | null> {
  const user = await pronounsApi
    .get<Pronouns.User>(`/users/${userName}`)
    .then(response => response.data)
    .catch(() => null)

  if (!user) return null // user hasn't set pronouns or server is down

  return [user.pronoun_id, user.alt_pronoun_id]
}

export async function getAllPronouns(): Promise<Pronouns.All | null> {
  const allPronouns = await pronounsApi
    .get<Pronouns.All>('/pronouns')
    .then(response => response.data)
    .catch(() => null) // server is down

  return allPronouns
}

export function displayPronouns(
  primary: Pronouns.Data,
  secondary: Pronouns.Data | null,
): string {
  if (!secondary) {
    return primary.singular
      ? primary.subject
      : `${primary.subject}/${primary.object}`
  }

  return `${primary.subject}/${secondary.subject}`
}

// what the /pronouns endpoint currently returns as of 2/18/2024
const pronounsCache: Pronouns.All = {
  aeaer: { name: 'aeaer', subject: 'Ae', object: 'Aer', singular: false },
  any: { name: 'any', subject: 'Any', object: 'Any', singular: true },
  eem: { name: 'eem', subject: 'E', object: 'Em', singular: false },
  faefaer: { name: 'faefaer', subject: 'Fae', object: 'Faer', singular: false },
  hehim: { name: 'hehim', subject: 'He', object: 'Him', singular: false },
  itits: { name: 'itits', subject: 'It', object: 'Its', singular: false },
  other: { name: 'other', subject: 'Other', object: 'Other', singular: true },
  perper: { name: 'perper', subject: 'Per', object: 'Per', singular: false },
  sheher: { name: 'sheher', subject: 'She', object: 'Her', singular: false },
  theythem: {
    name: 'theythem',
    subject: 'They',
    object: 'Them',
    singular: false,
  },
  vever: { name: 'vever', subject: 'Ve', object: 'Ver', singular: false },
  xexem: { name: 'xexem', subject: 'Xe', object: 'Xem', singular: false },
  ziehir: { name: 'ziehir', subject: 'Zie', object: 'Hir', singular: false },
}
