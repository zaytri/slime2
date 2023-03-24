import { useEffect } from 'react'
import { ChatClient, PrivateMessage } from '@twurple/chat'

import type { Listener } from '@d-fischer/typed-event-emitter'
import type { HelixCheermoteList } from '@twurple/api'
import { UserNotice, ChatUser } from '@twurple/chat'

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

// holds data to prevent sub gift spam
// https://twurple.js.org/docs/examples/chat/sub-gift-spam.html
const giftCounts = new Map<string, number>()
const followCache = new Map<string, { date: Date | false; expire: number }>()
const FOLLOW_CACHE_EXPIRE_TIME = 1000 * 60 * 60 // 1 hour

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
    console.log(`[${message.type}]`, message.text)
    console.log(message)
    console.log('---------------------------')
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

  // convert message into an array, separating text, emotes, and cheermotes
  function messageParse(data: PrivateMessage | UserNotice): TwitchPart[] {
    const twurpleParts =
      data instanceof PrivateMessage && data.bits > 0
        ? data.parseEmotesAndBits(cheermoteList, {
            background: 'dark',
            scale: '4',
            state: 'animated',
          })
        : data.parseEmotes()

    const parts: TwitchPart[] = []
    twurpleParts.forEach(part => {
      switch (part.type) {
        case 'text':
          parts.push(...emoteParse({ type: part.type, text: part.text }))
          break
        case 'cheer':
          parts.push({
            type: part.type,
            text: part.name,
            typeInfo: {
              name: part.name,
              amount: part.amount,
              color: part.displayInfo.color,
              image: part.displayInfo.url,
            },
          })
          break
        case 'emote': {
          parts.push({
            type: part.type,
            text: part.name,
            typeInfo: {
              id: part.id,
              name: part.name,
              image: part.displayInfo.getUrl({
                backgroundType: 'dark',
                animationSettings: 'default',
                size: '3.0',
              }),
              source: 'twitch',
            },
          })
        }
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
          parts.push({ type: 'emote', text, typeInfo: emote })
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

  // returns true if the message was the first message that user has ever
  // sent to the broadcaster's chat (shows as First Time Chatter)
  function isFirstMessage(tags: PrivateMessage['tags']) {
    return tags.get('first-msg') === '1'
  }

  // fully process UserNotice and add new TwitchMessage to the chat context
  async function processUserNotice(type: TwitchMessageType, data: UserNotice) {
    console.log({ UserNotice: data })
    const user = await transformChatUser(data.userInfo)

    const newMessageData: TwitchMessage = {
      id: data.id,
      first: isFirstMessage(data.tags),
      date: data.date,

      text: data.tags.get('system-msg') || '',
      parts: [{ type: 'text', text: data.tags.get('system-msg') || '' }],

      user,

      tags: data.tags,
      randomSeed: Math.random(),
      ...type,
    }

    console.log('[Parsed UserNotice message]', messageParse(data))

    addMessage(newMessageData)
  }

  // fully process PrivateMessage and add new TwitchMessage to the chat context
  async function processPrivateMessage(
    baseType: 'default' | 'action',
    text: string,
    data: PrivateMessage,
  ) {
    console.log({ PrivateMessage: data })
    const user = await transformChatUser(data.userInfo)

    let newMessageData: TwitchMessage = {
      id: data.id,
      first: isFirstMessage(data.tags),
      date: data.date,
      type: baseType,

      text,
      parts: messageParse(data),

      user,

      tags: data.tags,
      randomSeed: Math.random(),
    }

    if (data.isHighlight) {
      newMessageData = { ...newMessageData, type: 'highlight' }
    } else if (data.isCheer) {
      newMessageData = {
        ...newMessageData,
        type: 'cheer',
        typeInfo: { bits: data.bits },
      }
    } else if (data.isRedemption) {
      newMessageData = {
        ...newMessageData,
        type: 'redemption',
        typeInfo: channelRewards.get(data.tags.get('custom-reward-id')!)!,
      }
    } else if (data.tags.has('reply-parent-msg-id')) {
      newMessageData = {
        ...newMessageData,
        type: 'reply',
        typeInfo: {
          id: data.tags.get('reply-parent-msg-id')!,
          text: data.tags.get('reply-parent-msg-body')!,
          user: {
            id: data.tags.get('reply-parent-user-id')!,
            userName: data.tags.get('reply-parent-user-login')!,
            displayName: data.tags.get('reply-parent-display-name')!,
          },
        },
      }
    }

    addMessage(newMessageData)
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

      chatClient.onAction((_, __, text, message) => {
        processPrivateMessage('action', text, message)
      }),

      chatClient.onMessage((_, __, text, message) => {
        processPrivateMessage('default', text, message)
      }),

      // -------------------------
      //  Events Using UserNotice
      // -------------------------

      chatClient.onAnnouncement((_, __, info, notice) => {
        processUserNotice({ type: 'announcement', typeInfo: info }, notice)
      }),

      chatClient.onCommunityPayForward((_, __, info, notice) => {
        processUserNotice(
          { type: 'community-pay-forward', typeInfo: info },
          notice,
        )
      }),

      chatClient.onCommunitySub((_, __, info, notice) => {
        // count handling related to onSubGift to prevent sub gift spam
        // empty string for anonymous gifter
        const { gifter = '', count } = info
        const previousCount = giftCounts.get(gifter) ?? 0
        giftCounts.set(gifter, previousCount + count)

        processUserNotice({ type: 'community-sub', typeInfo: info }, notice)
      }),

      chatClient.onGiftPaidUpgrade((_, __, info, notice) => {
        processUserNotice({ type: 'gift-paid-upgrade', typeInfo: info }, notice)
      }),

      chatClient.onPrimeCommunityGift((_, __, info, notice) => {
        processUserNotice(
          { type: 'prime-community-gift', typeInfo: info },
          notice,
        )
      }),

      chatClient.onPrimePaidUpgrade((_, __, info, notice) => {
        processUserNotice(
          { type: 'prime-paid-upgrade', typeInfo: info },
          notice,
        )
      }),

      chatClient.onRaid((_, __, info, notice) => {
        processUserNotice({ type: 'raid', typeInfo: info }, notice)
      }),

      chatClient.onResub((_, __, info, notice) => {
        processUserNotice({ type: 'resub', typeInfo: info }, notice)
      }),

      chatClient.onRewardGift((_, __, info, notice) => {
        processUserNotice({ type: 'reward-gift', typeInfo: info }, notice)
      }),

      chatClient.onStandardPayForward((_, __, info, notice) => {
        processUserNotice(
          { type: 'standard-pay-forward', typeInfo: info },
          notice,
        )
      }),

      chatClient.onSub((_, __, info, notice) => {
        processUserNotice({ type: 'sub', typeInfo: info }, notice)
      }),

      chatClient.onSubExtend((_, __, info, notice) => {
        processUserNotice({ type: 'sub-extend', typeInfo: info }, notice)
      }),

      chatClient.onSubGift((_, __, info, notice) => {
        // count handling related to onCommunityGift to prevent sub gift spam
        // empty string for anonymous gifter
        const { gifter = '' } = info
        const previousCount = giftCounts.get(gifter) ?? 0
        if (previousCount > 0) {
          giftCounts.set(gifter, previousCount - 1)
        } else {
          processUserNotice({ type: 'sub-gift', typeInfo: info }, notice)
        }
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
