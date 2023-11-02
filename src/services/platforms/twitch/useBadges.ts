import { infiniteCache } from '@/services/helpers'
import { useQuery } from '@tanstack/react-query'
import type { HelixChatBadgeSet, HelixChatBadgeVersion } from '@twurple/api'
import useTwitchApi from './useApi'
import useTwitchBroadcaster from './useBroadcaster'

export default function useBadges() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const api = useTwitchApi()

  return useQuery<Badges>({
    enabled: !!broadcaster,
    queryKey: ['twitch', 'badges', broadcaster?.id],
    queryFn: async () => {
      const [globalBadges, channelBadges] = await Promise.all([
        api.chat.getGlobalBadges(),
        api.chat.getChannelBadges(broadcaster!.id),
      ])

      return new Badges(globalBadges, channelBadges)
    },
    ...infiniteCache,
  })
}

type BadgeVersionMap = Map<string, HelixChatBadgeVersion>
type BadgeMap = Map<string, BadgeVersionMap>

class Badges {
  private readonly badgeMap: BadgeMap = new Map<string, BadgeVersionMap>()

  constructor(
    globalBadges: HelixChatBadgeSet[],
    channelBadges: HelixChatBadgeSet[],
  ) {
    this.set(globalBadges)
    // channelBadges needs to be after globalBadges to override sub badge
    this.set(channelBadges)
  }

  transform(badges: Map<string, string>): Twitch.Event.Message.User.Badge[] {
    const badgeArray: Twitch.Event.Message.User.Badge[] = []

    badges.forEach((versionId, badgeId) => {
      const badge = this.get(badgeId, versionId)
      if (badge) badgeArray.push(badge)
    })

    return badgeArray
  }

  get(
    badgeId: string,
    versionId: string = badgeId === 'subscriber' || badgeId === 'founder'
      ? '0'
      : '1',
  ): Twitch.Event.Message.User.Badge | undefined {
    const image = this.badgeMap.get(badgeId)?.get(versionId)?.getImageUrl(4)
    if (image) return { id: badgeId, image }
  }

  private set(badges: HelixChatBadgeSet[]) {
    badges.forEach(badge => {
      const versionMap = new Map<string, HelixChatBadgeVersion>()

      badge.versions.forEach(version => {
        versionMap.set(version.id, version)
      })

      this.badgeMap.set(badge.id, versionMap)
    })
  }
}
