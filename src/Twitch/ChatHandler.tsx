import { useEffect } from 'react'
import { ChatClient, PrivateMessage } from '@twurple/chat'
import { UserNotice, ChatUser } from '@twurple/chat'
import { parseChatMessage } from '@twurple/common'

import type { Listener } from '@d-fischer/typed-event-emitter'
import type { HelixCheermoteList } from '@twurple/api'

import { apiClient, authProvider } from './helpers/authentication'
import { useMessageListDispatch } from './Context'
import TwitchChat from './MessageList'

import type BadgeImages from './helpers/BadgeImages'
import type ChannelRewards from './helpers/ChannelRewards'
import type {
  TwitchPart,
  TwitchMessage,
  TwitchMessageType,
  User,
  EmotePartInfo,
} from './types'
import type Pronouns from './helpers/Pronouns'

type TwitchChatProps = {
  badgeImages: BadgeImages
  channelRewards: ChannelRewards
  cheermoteList: HelixCheermoteList
  broadcasterUserName: string
  broadcasterUserId: string
  pronouns: Pronouns
  emotes: Map<string, EmotePartInfo>
}

const followCache = new Map<string, { date: Date | false; expire: number }>()
const FOLLOW_CACHE_EXPIRE_TIME = 1000 * 60 * 60 // 1 hour

function log(...data: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...data)
  }
}

export default function TwitchChatClient({
  badgeImages,
  channelRewards,
  cheermoteList,
  broadcasterUserId,
  broadcasterUserName,
  pronouns,
  emotes,
}: TwitchChatProps) {
  // -------------------------
  //  Chat Dispatch Functions
  // -------------------------

  const dispatch = useMessageListDispatch()

  function addMessage(message: TwitchMessage) {
    log(
      `%c[${message.type}] ${message.user.displayName}: ${message.text}`,
      'background-color: black; color: white; padding: 5px 10px; border-radius: 100px; border: 2px solid white',
    )
    log(message)
    log(
      `%cMessage ${message.id}`,
      'background-color: white; color: black; padding: 5px 10px; border-radius: 0 0 10px 10px; font-weight: bold; display: inline-block; margin-bottom: 10px',
    )
    dispatch({ type: 'add', payload: message })
  }

  // lets the user send test messages
  slimeChat.ready({ test: addMessage })

  function clearMessages(userId: string | null = null) {
    dispatch({ type: 'clear', payload: userId })
  }

  function removeMessage(messageId: string) {
    dispatch({ type: 'remove', payload: messageId })
  }

  // ----------------------------
  //  Chat Client Initialization
  // ----------------------------

  const chatClient = new ChatClient({
    authProvider: authProvider,
    channels: [broadcasterUserName],
  })

  chatClient.connect()

  // ----------------------------
  //  Message Parsing/Processing
  // ----------------------------

  // standardize twurple data and add new TwitchMessage to the chat content
  async function processMessage(
    typeData: TwitchMessageType,
    messageData: PrivateMessage | UserNotice,
    text?: string,
  ): Promise<void> {
    log(
      `%cMessage ${messageData.id}`,
      'background-color: white; color: black; padding: 5px 10px; border-radius: 10px 10px 0 0; font-weight: bold; display: inline-block; margin-top: 10px',
    )
    log(messageData)

    // user notices don't always have user messages
    if (messageData instanceof UserNotice) {
      text = messageData.message?.value // message could be undefined
    }
    if (!text || text === '') return

    const { type } = typeData

    let newMessageData: TwitchMessage = {
      id: messageData.id,

      first: messageData.tags.get('first-msg') === '1',
      date: messageData.date,

      text,
      parts: textParse(text, messageData.emoteOffsets, type === 'cheer'),

      user: await transformChatUser(messageData.userInfo),

      tags: messageData.tags,
      randomSeed: Math.random(),
      ...typeData,
    }

    // if type isn't basic, we're already done transforming the data
    if (type !== 'basic') {
      addMessage(newMessageData)
      return
    }

    const updateMessageData = (typeData: TwitchMessageType) => {
      newMessageData = { ...newMessageData, ...typeData }
    }

    // rewardId = '' for messages that have been manually approved
    const rewardId = messageData.tags.get('custom-reward-id')

    const getReplyData = (tagPart: string) =>
      messageData.tags.get(`reply-parent-${tagPart}`) || ''
    const replyId = getReplyData('msg-id')

    // these tags will only possibly exist on basic messages, because no
    // combination of these types is possible (other than overriding basic)
    if (messageData.tags.get('msg-id') === 'highlighted-message') {
      // highlighted message

      updateMessageData({ type: 'highlight' })
    } else if (rewardId) {
      // redeem message

      const reward = channelRewards.get(rewardId)
      if (reward) {
        const redeem = {
          id: reward.id,
          name: reward.title,
          cost: reward.cost,
          image: reward.getImageUrl(4),
          color: reward.backgroundColor,
        }

        updateMessageData({ type: 'redeem', redeem })
      }
    } else if (replyId !== '') {
      // reply message

      const reply = {
        id: replyId,
        text: getReplyData('msg-body'),
        user: {
          id: getReplyData('user-id'),
          userName: getReplyData('user-login'),
          displayName: getReplyData('display-name'),
        },
      }

      updateMessageData({ type: 'reply', reply })
    }

    addMessage(newMessageData)
  }

  // convert text content into an array, separating text, emotes, and cheermotes
  function textParse(
    text: string,
    emoteOffsets: Map<string, string[]>,
    withCheermotes = false,
  ): TwitchPart[] {
    if (text === '') return []

    const twurpleParts = parseChatMessage(
      text,
      emoteOffsets,
      withCheermotes ? cheermoteList.getPossibleNames() : undefined,
    )

    const parts: TwitchPart[] = []
    twurpleParts.forEach(part => {
      switch (part.type) {
        default:
        case 'text':
          parts.push(...emoteParse({ type: part.type, text: part.text }))
          break
        case 'cheer':
          const cheerInfo = cheermoteList.getCheermoteDisplayInfo(
            part.name,
            part.amount,
            {
              background: 'dark',
              scale: '4',
              state: 'animated',
            },
          )

          parts.push({
            type: part.type,
            text: text.slice(part.position, part.position + part.length),
            cheer: {
              color: cheerInfo.color,
              image: cheerInfo.url,
              name: part.name,
              amount: part.amount,
            },
          })
          break
        case 'emote':
          const image = part.displayInfo.getUrl({
            backgroundType: 'dark',
            animationSettings: 'default',
            size: '3.0',
          })

          parts.push({
            type: part.type,
            text: text.slice(part.position, part.position + part.length),
            emote: {
              id: part.id,
              name: part.name,
              image,
              source: 'twitch',
            },
          })
          break
      }
    })

    return parts
  }

  // parse emotes from 3rd party emote services
  function emoteParse(part: TwitchPart) {
    if (part.type !== 'text') return [part]

    const regex = createEmoteRegex(Array.from(emotes.keys()))
    const splitText = part.text.split(regex)

    // if the array has 1 element, no emotes were found
    if (splitText.length <= 1) return [part]

    let parts: TwitchPart[] = []
    splitText.forEach(text => {
      if (text !== '') {
        // ignore empty strings
        const emote = emotes.get(text)
        if (emote) {
          parts.push({ type: 'emote', text, emote })
        } else {
          parts.push({ type: 'text', text })
        }
      }
    })

    return parts
  }

  // returns the date at which the user followed the streamer
  // returns false if the user isn't following
  // cached for FOLLOW_CACHE_EXPIRE_TIME (1 hour)
  async function getFollowDate(userId: string) {
    // set broadcaster as oldest possible follower
    if (userId === broadcasterUserId) return new Date(0)

    let cached = followCache.get(userId)

    if (!cached || cached.expire < Date.now()) {
      const followers = await apiClient.channels.getChannelFollowers(
        broadcasterUserId,
        broadcasterUserId,
        userId,
      )

      const [follower] = followers.data
      const date = follower ? follower.followDate : false
      cached = { date, expire: Date.now() + FOLLOW_CACHE_EXPIRE_TIME }
      followCache.set(userId, cached)
    }

    return cached.date
  }

  // create a new user object which includes pronouns, badge array, follow date
  async function transformChatUser(chatUser: ChatUser): Promise<User> {
    const userPronouns = await pronouns.get(chatUser.userName)
    const follower = await getFollowDate(chatUser.userId)

    return {
      id: chatUser.userId,
      userName: chatUser.userName,
      displayName: chatUser.displayName,
      pronouns: userPronouns,

      badges: badgeImages.parse(chatUser.badges),
      color: chatUser.color,

      roles: {
        broadcaster: chatUser.isBroadcaster,
        moderator: chatUser.isMod,
        artist: chatUser.isArtist,
        vip: chatUser.isVip,
        founder: chatUser.isFounder,
        subscriber: chatUser.isSubscriber,
        follower,
      },
    }
  }

  // -----------------
  //  Event Listeners
  // -----------------

  useEffect(() => {
    const listeners: Listener[] = []
    listeners.push(
      // -----------------------------
      //  Events Using PrivateMessage
      // -----------------------------

      chatClient.onMessage((_, __, text, msg) => {
        const { bits } = msg
        const typeData: TwitchMessageType = bits
          ? { type: 'cheer', cheer: { amount: bits } }
          : { type: 'basic' }

        processMessage(typeData, msg, text)
      }),

      chatClient.onAction((_, __, text, msg) => {
        processMessage({ type: 'action' }, msg, text)
      }),

      // -------------------------
      //  Events Using UserNotice
      // -------------------------

      chatClient.onResub(async (_, __, info, msg) => {
        const typeData: TwitchMessageType = {
          type: 'resub',
          resub: { months: info.months, tier: info.plan },
        }

        processMessage(typeData, msg)
      }),

      chatClient.onAnnouncement(async (_, __, info, msg) => {
        const typeData: TwitchMessageType = {
          type: 'announcement',
          announcement: { color: info.color },
        }

        processMessage(typeData, msg)
      }),

      // -----------------------
      //  Remove Message Events
      // -----------------------

      chatClient.onChatClear(() => {
        clearMessages()
      }),

      chatClient.onTimeout((_, __, ___, msg) => {
        clearMessages(msg.targetUserId)
      }),

      chatClient.onBan((_, __, msg) => {
        clearMessages(msg.targetUserId)
      }),

      chatClient.onMessageRemove((_, messageId) => {
        removeMessage(messageId)
      }),
    )

    return () => {
      listeners.forEach(listener => {
        if (listener) chatClient.removeListener(listener)
      })
      chatClient.quit()
    }
  })

  return <TwitchChat />
}

// escapes all characters that have special functionality in regex
// by inserting a backslash (\) before them
// . * + ? ^ $ { } ( ) | [ ] \
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * When this regex is used in String.prototype.split, it will result in
 * an array of strings split up by the emote names, with the emote names
 * included. If an emote name is at the beginning or end of the string,
 * then the array will include an empty string at the beginning or end.
 *
 * Examples using 'uwu' as an emote name:
 *
 *     'hewwo? uwu hewwo??' => ['hewwo? ', 'uwu', 'hewwo??']
 *                   'uwu!' => ['', 'uwu', '!']
 *             'uwuuwu uwu' => ['uwuuwu ', 'uwu', '']
 *                    'uwu' => ['', 'uwu', '']
 */
function createEmoteRegex(emoteNames: string[]) {
  // regex escape every emote name, and join with the regex OR character
  const regexPart = emoteNames.map(escapeRegExp).join('|')

  /**
   * Explaining this so that I know how it works in the future:
   *
   *        \s = any whitespace character
   *         ^ = the beginning of the string
   *         $ = the end of the string
   *     [.,!] = period, comma, or exclamation mark
   *
   * All of these are valid to go directly before or after an emote
   */
  const regex = String.raw`(?<=\s|[.,!]|^)(${regexPart})(?=\s|[.,!]|$)`
  return new RegExp(regex, 'g')
}
