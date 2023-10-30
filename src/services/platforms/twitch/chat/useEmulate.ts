import { useEventListDispatch } from '@/contexts/event-list/useEventList'
import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import Random from '@/services/random'
import useBadges from '../useBadges'
import useChannelEmotes from '../useChannelEmotes'
import useCheermotes from '../useCheermotes'
import { useAllPronouns } from '../usePronouns'
import useThirdPartyEmotes from '../useThirdPartyEmotes'
import useUserColor from './transforms/useUserColor'

export default function useEmulateTwitchMessage() {
  const { addEvent } = useEventListDispatch()
  const { data: thirdPartyEmoteMap } = useThirdPartyEmotes()
  const { data: channelEmotes } = useChannelEmotes()
  const { data: cheermotes } = useCheermotes()
  const { data: badges } = useBadges()
  const { data: pronounsMap } = useAllPronouns()
  const { isPlatformReady } = usePlatformReady()
  const transformUserColor = useUserColor()

  async function emulate() {
    if (!isPlatformReady('twitch')) return

    const allPronouns = Array.from(pronounsMap!.values())
    const emotes = [
      ...channelEmotes!,
      ...Array.from(thirdPartyEmoteMap!.values()),
    ]

    const date = new Date()
    const first = Random.percent(5) // 5% chance of being first time chat

    const testMessage = 'test message'
    const longTestMessage = `long test message${' long test message'.repeat(5)}`
    const connectedLongTestMessage = 'LongTestMessage'.repeat(7)

    let text = testMessage

    // 5% chance of being longTestMessage or connectedLongTestMessage
    if (Random.percent(5)) text = longTestMessage
    if (Random.percent(5)) text = connectedLongTestMessage

    // add in randomized punctuation
    text = `${text}${Random.item(TEST_PUNCTUATION)}`
    let textPart = text

    if (first) {
      text = `${text} (first time chat)`
    }
    const parts: Twitch.Event.Message.Part[] = []

    const user: Twitch.Event.Message.User = {
      id: `test-user-${date.getTime()}`,
      userName: 'testuser',
      displayName: 'testUser',
      pronouns: Random.boolean() // 50% chance of showing pronouns
        ? null
        : Random.item(allPronouns),
      badges: [],
      color: await transformUserColor('testuser'),
      roles: {
        broadcaster: false,
        moderator: false,
        artist: false,
        vip: false,
        founder: false,
        subscriber: false,
      },
      followDate: new Date(0),
    }

    const role = Random.boolean() // 50% chance of having a special role
      ? 'user'
      : Random.item(TEST_ROLES)
    const badge = badges!.get(role === 'artist' ? 'artist-badge' : role)

    if (role !== 'user' && badge) {
      user.badges = [badge]
      user.roles[role] = true

      // ensure that testFounder and testBroadcaster are also subscribers
      if (role === 'founder' || role === 'broadcaster') {
        user.roles.subscriber = true
      }

      user.userName = `test${role}`
      user.displayName = `test${role.charAt(0).toUpperCase()}${role.slice(1)}`
      user.color = await transformUserColor(user.userName)
    }

    let messageType: Twitch.Event.Message.Type = { type: 'basic' }

    if (Random.boolean()) {
      // 50% chance of being a special type
      const type = Random.item(TEST_MESSAGE_TYPES)

      switch (type) {
        case 'action':
          {
            text = `${text} (/me action message)`
            textPart = text
            messageType = { type }
          }
          break

        case 'highlight':
          {
            text = `${text} (highlighted message)`
            textPart = text
            messageType = { type }
          }
          break

        case 'cheer':
          {
            const amount = Random.item(TEST_CHEER_AMOUNTS)
            const name = 'Cheer'
            messageType = {
              type,
              cheer: {
                amount,
              },
            }
            const cheerText = `${name}${amount}`
            textPart = `${text} (cheer message)`
            text = `${cheerText} ${textPart}`

            parts.unshift({ type: 'text', text: ' ' })
            parts.unshift({
              type: 'cheer',
              text: cheerText,
              cheer: cheermotes!.get(name, amount),
            })
          }
          break

        case 'reply':
          {
            messageType = {
              type,
              reply: {
                id: `test-reply-${date.getTime()}`,
                text: 'test message being replied to',
                user: {
                  id: `test-user-reply-${date.getTime()}`,
                  userName: 'testreplyuser',
                  displayName: 'testReplyUser',
                },
              },
            }
            text = `${text} (reply message)`
            textPart = text
          }
          break

        case 'redeem':
          {
            messageType = {
              type,
              redeem: {
                id: `test-redeem-${date.getTime()}`,
                name: 'Test Redeem',
                image:
                  'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
                color: '#FFC6FF',
                cost: Random.integer(1, 10000),
              },
            }
            text = `${text} (channel point redemption requiring text)`
            textPart = text
          }
          break

        case 'resub':
          {
            messageType = {
              type,
              resub: {
                months: Random.integer(1, 24),
                tier: Random.item(TEST_RESUB_TIERS),
              },
            }
            text = `${text} (resub message)`
            textPart = text
          }
          break

        case 'announcement':
          {
            if (role === 'broadcaster' || role === 'moderator') {
              messageType = {
                type,
                announcement: {
                  color: Random.item(TEST_ANNOUNCEMENT_COLORS),
                },
              }
              text = `${text} (announcement message)`
              textPart = text
            }
          }
          break

        default: // nothing
      }
    }

    // 50% chance of using a channel emote, if the user has any
    if (Random.boolean() && emotes.length) {
      const emote = Random.item(emotes)
      parts.unshift({ type: 'text', text: ' ' })
      parts.unshift({ type: 'emote', emote, text: emote.name })
      text = `${emote.name} ${text}`
    }

    // 20% chance of converting any basic message to just say "hi"
    if (messageType.type === 'basic' && Random.percent(20)) {
      text = 'hi'
      textPart = text
    }

    parts.push({ type: 'text', text: textPart })

    const message: Twitch.Event.Message = {
      ...messageType,
      id: `test-message-${date.getTime()}`,
      first,
      date,
      user,
      text,
      parts,
      tags: new Map<string, string>([['test', '1']]),
    }

    addEvent({
      type: 'message',
      id: message.id,
      userId: message.user.id,
      message,
      source: 'twitch',
      emulated: true,
    })
  }

  return emulate
}

const TEST_ROLES: (keyof Twitch.Event.Message.User['roles'])[] = [
  'broadcaster',
  'moderator',
  'artist',
  'vip',
  'founder',
  'subscriber',
]

const TEST_MESSAGE_TYPES: Twitch.Event.Message.Type['type'][] = [
  'action',
  'highlight',
  'cheer',
  'reply',
  'redeem',
  'resub',
  'announcement',
]

const TEST_RESUB_TIERS = ['1000', '2000', '3000', 'Prime']

const TEST_ANNOUNCEMENT_COLORS = [
  'PRIMARY',
  'BLUE',
  'GREEN',
  'ORANGE',
  'PURPLE',
]

const TEST_CHEER_AMOUNTS = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000]

const TEST_PUNCTUATION = ['', '.', '...', '!', '?', '!!', '!?', '?!']
