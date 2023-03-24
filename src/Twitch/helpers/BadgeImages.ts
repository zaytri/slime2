import type { HelixChatBadgeSet, HelixChatBadgeVersion } from '@twurple/api'

export type Badge = {
  id: string
  image: string
}

export default class BadgeImages {
  private badgeMap = new Map<string, Map<string, HelixChatBadgeVersion>>()

  constructor(
    globalBadges: HelixChatBadgeSet[],
    channelBadges: HelixChatBadgeSet[],
  ) {
    this.set(globalBadges)
    this.set(channelBadges)
  }

  private set(badgeSets: HelixChatBadgeSet[]) {
    badgeSets.forEach(badgeSet => {
      const versionMap = new Map<string, HelixChatBadgeVersion>()
      badgeSet.versions.forEach(version => {
        versionMap.set(version.id, version)
      })

      this.badgeMap.set(badgeSet.id, versionMap)
    })
  }

  private get(badgeId: string, versionId: string) {
    return this.badgeMap.get(badgeId)?.get(versionId)?.getImageUrl(4)
  }

  parse(badges: Map<string, string>) {
    const badgeArray: Badge[] = []
    badges.forEach((versionId, badgeId) => {
      const image = this.get(badgeId, versionId)
      if (image) badgeArray.push({ id: badgeId, image })
    })
    return badgeArray
  }
}
