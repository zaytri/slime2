import { apiClient } from '../helpers/authentication'
import { useBadgeImages, useBroadcaster } from '../contexts/Twitch'

import type { ChatUser } from '@twurple/chat'
import type { TwitchUser } from '../types'
import usePronouns from './usePronouns'

const followCache = new Map<string, { date?: Date; expire: number }>()
const FOLLOW_CACHE_EXPIRE_TIME = 1000 * 60 * 60 // 1 hour

/**
 * Hook that returns the function {@link userTransform}
 */
export default function useUserTransform() {
  const { getPronouns } = usePronouns()
  const broadcaster = useBroadcaster()!
  const badgeImages = useBadgeImages()!

  /**
   * Transform {@link ChatUser} into {@link TwitchUser},
   * adding in pronouns, follow date, and a badge array
   */
  async function userTransform(user: ChatUser): Promise<TwitchUser> {
    const {
      userId,
      userName,
      displayName,
      badges,
      color,
      isBroadcaster,
      isMod,
      isArtist,
      isVip,
      isFounder,
      isSubscriber,
    } = user

    return {
      id: userId,
      userName,
      displayName,
      pronouns: await getPronouns(userName),
      badges: badgeImages.parse(badges),
      color,
      roles: {
        broadcaster: isBroadcaster,
        moderator: isMod,
        artist: isArtist,
        vip: isVip,
        founder: isFounder,
        subscriber: isSubscriber,
        followDate: await getFollowDate(userId),
      },
    }
  }

  /**
   * Returns the {@link Date} at which the user with the given `userId`
   * followed the broadcaster's channel
   *
   * If the user ID matches the broadcaster, `new Date(0)` is returned to
   * act as if the broadcaster is the oldest possible follower
   *
   * Returns `undefined` if the user isn't a follower
   *
   * Result is cached for 1 hour per user
   */
  async function getFollowDate(userId: string): Promise<Date | undefined> {
    if (userId === broadcaster.id) return new Date(0)

    let cachedData = followCache.get(userId)

    if (!cachedData || cachedData.expire < Date.now()) {
      const followers = await apiClient.channels.getChannelFollowers(
        broadcaster.id,
        broadcaster.id,
        userId,
      )

      const [follower] = followers.data
      const date = follower?.followDate // follower could be undefined
      cachedData = { date, expire: Date.now() + FOLLOW_CACHE_EXPIRE_TIME }
      followCache.set(userId, cachedData)
    }

    return cachedData.date
  }

  return userTransform
}
