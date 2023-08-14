import { useState, useEffect } from 'react'
import { useTokenInfo } from './useTokenInfo'
import { apiClient } from '../helpers/twitchAuthentication'
import { HelixChatBadgeSet, HelixChatBadgeVersion } from '@twurple/api'

const badgeMap = new Map<string, Map<string, HelixChatBadgeVersion>>()
let loaded = false

export default function useBadges() {
  function transformBadges(badges: Map<string, string>): Badge[] {
    const badgeArray: Badge[] = []

    badges.forEach((versionId, badgeId) => {
      const image = badgeMap.get(badgeId)?.get(versionId)?.getImageUrl(4)

      if (image) badgeArray.push({ id: badgeId, image })
    })

    return badgeArray
  }

  function getBadge(badgeId: string): Badge | undefined {
    const image = badgeMap
      .get(badgeId)
      ?.get(badgeId === 'subscriber' || badgeId === 'founder' ? '0' : '1')
      ?.getImageUrl(4)

    if (image) return { id: badgeId, image }
  }

  return { transformBadges, getBadge }
}

export function useBadgesLoader() {
  const [loading, setLoading] = useState(true)
  const { broadcaster } = useTokenInfo()

  useEffect(() => {
    async function loadBadges() {
      if (!loaded) {
        const [channelBadges, globalBadges] = await Promise.all([
          apiClient.chat.getChannelBadges(broadcaster.id),
          apiClient.chat.getGlobalBadges(),
        ])

        // channelBadges needs to be after globalBadges to override sub badge
        setBadges(globalBadges)
        setBadges(channelBadges)
      }

      setLoading(false)
      loaded = true
    }

    loadBadges()
  }, [broadcaster])

  return { loading }
}

function setBadges(badges: HelixChatBadgeSet[]) {
  badges.forEach(badge => {
    const versionMap = new Map<string, HelixChatBadgeVersion>()

    badge.versions.forEach(version => {
      versionMap.set(version.id, version)
    })

    badgeMap.set(badge.id, versionMap)
  })
}

type Badge = {
  id: string
  image: string
}
