import { infiniteCache } from '@/services/settings'
import { useQuery } from '@tanstack/react-query'
import type { HelixCustomReward } from '@twurple/api'
import useTwitchApi from './useApi'
import useTwitchBroadcaster from './useBroadcaster'

export default function useChannelPointRewards() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const api = useTwitchApi()

  return useQuery<Map<string, HelixCustomReward>>({
    enabled: !!broadcaster,
    queryKey: ['twitch', 'channelPointRewards', broadcaster?.id],
    queryFn: async () => {
      const rewardMap = new Map<string, HelixCustomReward>()

      const rewards = await api.channelPoints
        .getCustomRewards(broadcaster!.id)
        .catch(() => {
          // if the broadcaster isn't affiliate/partner, there's a 403 error
          // to fix this, return an empty array on any error
          return []
        })

      rewards.forEach(reward => {
        rewardMap.set(reward.id, reward)
      })

      return rewardMap
    },
    ...infiniteCache,
  })
}
