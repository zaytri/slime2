import { PrivateMessage, UserNotice } from '@twurple/chat'

import type { TwitchMessage, TwitchMessageType } from '../types'
import useTextTransform from './useTextTransform'
import useUserTransform from './useUserTransform'
import { useRewards } from '../contexts/Twitch'

/**
 * Hook that returns the function {@link messageTransform}
 */
export default function useMessageTransform() {
  const rewards = useRewards()!
  const textTransform = useTextTransform()
  const userTransform = useUserTransform()

  /**
   * Transforms `PrivateMessage`/`UserNotice` from Twurple into `TwitchMessage`
   *
   * Returns `undefined` if `UserNotice` doesn't contain a message
   * `PrivateMessage` always contains a message
   */
  async function messageTransform(
    typeData: TwitchMessageType,
    twurpleMessage: PrivateMessage | UserNotice,
    text?: string,
  ): Promise<TwitchMessage | undefined> {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `%cMessage ${twurpleMessage.id}`,
        'background-color: white; color: black; padding: 5px 10px; border-radius: 10px 10px 0 0; font-weight: bold; display: inline-block; margin-top: 10px',
      )

      console.log('Twurple Data', twurpleMessage)
    }

    // user notices don't always have user messages
    if (twurpleMessage instanceof UserNotice) {
      text = twurpleMessage.message?.value // message could be undefined
    }
    if (!text || text === '') return

    const { type } = typeData

    const twitchMessage: TwitchMessage = {
      id: twurpleMessage.id,

      first: twurpleMessage.tags.get('first-msg') === '1',
      date: twurpleMessage.date,

      text,
      parts: textTransform(text, twurpleMessage.emoteOffsets, type === 'cheer'),

      user: await userTransform(twurpleMessage.userInfo),

      tags: twurpleMessage.tags,
      randomSeed: Math.random(),
      ...typeData,
    }

    if (type !== 'basic') {
      // non-basic types never overlap, so further transforms aren't necessary
      return twitchMessage
    }

    // highlighted message
    if (twurpleMessage.tags.get('msg-id') === 'highlighted-message') {
      return { ...twitchMessage, type: 'highlight' }
    }

    // channel point redemption message
    const rewardId = twurpleMessage.tags.get('custom-reward-id')
    if (rewardId) {
      const reward = rewards.get(rewardId)
      if (reward) {
        const redeem = {
          id: reward.id,
          name: reward.title,
          cost: reward.cost,
          image: reward.getImageUrl(4),
          color: reward.backgroundColor,
        }

        return { ...twitchMessage, type: 'redeem', redeem }
      }
    }

    // reply message
    const getReplyData = (tagPart: string) =>
      twurpleMessage.tags.get(`reply-parent-${tagPart}`) || ''
    const replyId = getReplyData('msg-id')
    if (replyId !== '') {
      const reply = {
        id: replyId,
        text: getReplyData('msg-body'),
        user: {
          id: getReplyData('user-id'),
          userName: getReplyData('user-login'),
          displayName: getReplyData('display-name'),
        },
      }

      return { ...twitchMessage, type: 'reply', reply }
    }

    // basic message
    return twitchMessage
  }

  return messageTransform
}
