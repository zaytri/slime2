import type { HelixCustomReward } from '@twurple/api'

export default class ChannelRewards {
  private rewardMap = new Map<string, HelixCustomReward>()

  constructor(rewards: HelixCustomReward[]) {
    rewards.forEach(reward => {
      this.rewardMap.set(reward.id, reward)
    })
  }

  get(rewardId: string) {
    return this.rewardMap.get(rewardId)
  }
}
