import { useQueryClient } from '@tanstack/react-query'
import useTwitchApi from './useApi'
import useTwitchBroadcaster from './useBroadcaster'

export default function useFollowDate() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const api = useTwitchApi()
  const queryClient = useQueryClient()

  /**
   * Returns the {@link Date} at which the user with the given `userId`
   * followed the broadcaster's channel
   *
   * If the user ID matches the broadcaster, `new Date(0)` is returned to
   * act as if the broadcaster is the oldest possible follower
   *
   * Returns `null` if the user isn't a follower
   *
   * Result is cached for 1 hour per user
   */
  async function getFollowDate(userId: string): Promise<Date | null> {
    if (!broadcaster) return null

    return await queryClient.fetchQuery({
      queryKey: ['twitch', 'followDate', userId],
      queryFn: async () => {
        if (userId === broadcaster.id) return new Date(0)

        const followers = await api.channels.getChannelFollowers(
          broadcaster!.id,
          userId,
        )

        const [follower] = followers.data
        if (!follower) return null // follower could be undefined

        return follower.followDate
      },
      staleTime: 1 * 60 * 60 * 1000, // cache for 1 hour
      gcTime: 2 * 60 * 60 * 1000, // garbage collected after 2 hours,
      retry: 1,
    })
  }

  return { getFollowDate }
}
