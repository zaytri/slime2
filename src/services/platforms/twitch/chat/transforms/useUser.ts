import type { ChatUser } from '@twurple/chat'
import usePronouns from '../../usePronouns'
import useBadges from '../../useBadges'
import useFollowDate from '../../useFollowDate'

/**
 * Hook that returns the function {@link transform}
 */
export default function useUser() {
  const { getPronouns } = usePronouns()
  const { getFollowDate } = useFollowDate()
  const { data: badges } = useBadges()

  /**
   * Transform {@link ChatUser} into {@link Twitch.Event.Message.User},
   * adding in pronouns, follow date, and a badge array
   */
  async function transform(user: ChatUser): Promise<Twitch.Event.Message.User> {
    const {
      userId,
      userName,
      displayName,
      badges: twurpleBadges,
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
      badges: badges!.transform(twurpleBadges),
      color,
      roles: {
        broadcaster: isBroadcaster,
        moderator: isMod,
        artist: isArtist,
        vip: isVip,
        founder: isFounder,
        subscriber: isSubscriber,
      },
      followDate: await getFollowDate(userId),
    }
  }

  return transform
}
