import Random from '@/services/random'
import { useQueryClient } from '@tanstack/react-query'

export default function useUserColor() {
  const queryClient = useQueryClient()

  // caches a color for every user,
  // selecting a random one from defaultColors if color is undefined
  async function transform(userId: string, color?: string) {
    return await queryClient.fetchQuery<string>({
      queryKey: ['twitch', 'user', userId, 'color'],
      queryFn: () => color || Random.item(defaultColors),
      staleTime: Infinity,
      gcTime: Infinity,
    })
  }

  return transform
}

// default colors directly from Twitch
const defaultColors = [
  'red',
  'blue',
  'green',
  'firebrick',
  'coral',
  'yellowgreen',
  'orangered',
  'seagreen',
  'goldenrod',
  'chocolate',
  'cadetblue',
  'dodgerblue',
  'hotpink',
  'blueviolet',
  'springgreen',
]
