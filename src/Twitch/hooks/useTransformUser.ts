import type { ChatUser } from '@twurple/chat'
import type { TwitchUser } from '../types'
import usePronouns from './usePronouns'
import { apiClient } from '../helpers/twitchAuthentication'
import { useTokenInfo } from './useTokenInfo'
import useBadges from './useBadges'
import Color from 'colorjs.io'

const followCache = new Map<string, { date?: Date; expire: number }>()
const FOLLOW_CACHE_EXPIRE_TIME = 1000 * 60 * 60 // 1 hour

const blackColor = new Color('black')
const whiteColor = new Color('white')

/**
 * Hook that returns the function {@link transformUser}
 */
export default function useTransformUser() {
  const { getPronouns } = usePronouns()
  const { broadcaster } = useTokenInfo()
  const { transformBadges } = useBadges()

  /**
   * Transform {@link ChatUser} into {@link TwitchUser},
   * adding in pronouns, follow date, and a badge array
   */
  async function transformUser(user: ChatUser): Promise<TwitchUser> {
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
      badges: transformBadges(badges),
      color,
      colorBrightness: color ? calculateColorBrightness(color) : undefined,
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
        userId,
      )

      const [follower] = followers.data
      const date = follower?.followDate // follower could be undefined
      cachedData = { date, expire: Date.now() + FOLLOW_CACHE_EXPIRE_TIME }
      followCache.set(userId, cachedData)
    }

    return cachedData.date
  }

  return { transformUser }
}

function calculateColorBrightness(color: string) {
  const nameColor = new Color(color)
  const lightContrast = Math.abs(whiteColor.contrastAPCA(nameColor))
  const darkContrast = Math.abs(blackColor.contrastAPCA(nameColor))
  if (lightContrast > darkContrast) {
    return 'dark'
  } else {
    return 'light'
  }
}
