import { useState, useEffect } from 'react'
import { HelixCustomReward } from '@twurple/api'
import { apiClient } from '../helpers/twitchAuthentication'
import { useTokenInfo } from './useTokenInfo'

const rewardMap = new Map<string, HelixCustomReward>()
let loaded = false

export default function useRewards() {
  function getReward(rewardId: string) {
    return rewardMap.get(rewardId)
  }

  return { getReward }
}

export function useRewardsLoader() {
  const [loading, setLoading] = useState(true)
  const { broadcaster } = useTokenInfo()

  useEffect(() => {
    async function loadRewards() {
      if (!loaded) {
        const rewards = await apiClient.channelPoints.getCustomRewards(
          broadcaster.id,
        )

        rewards.forEach(reward => {
          rewardMap.set(reward.id, reward)
        })
      }

      setLoading(false)
      loaded = true
    }

    loadRewards()
  }, [broadcaster])

  return { loading }
}
