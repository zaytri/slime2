import { useMessageListDispatch } from '@/contexts/MessageListContext'
import { usePlatformReady } from '@/contexts/PlatformReadyContext'
import useBadges from '../useBadges'
import useChannelEmotes from '../useChannelEmotes'
import useCheermotes from '../useCheermotes'
import { useAllPronouns } from '../usePronouns'
import useThirdPartyEmotes from '../useThirdPartyEmotes'

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

export default function useEmulate() {
  const dispatch = useMessageListDispatch()
  const { data: thirdPartyEmoteMap } = useThirdPartyEmotes()
  const { data: channelEmotes } = useChannelEmotes()
  const { data: cheermotes } = useCheermotes()
  const { data: badges } = useBadges()
  const { data: pronounsMap } = useAllPronouns()
  const platformReady = usePlatformReady('twitch')

  function emulate() {
    if (!platformReady) return

    const allPronouns = Array.from(pronounsMap!.values())
    const emotes = [
      ...channelEmotes!,
      ...Array.from(thirdPartyEmoteMap!.values()),
    ]

    const date = new Date()
    const first = !randomInteger(0, 19) // 5% chance of being first time chat

    const testMessage = 'test message'
    const longTestMessage = `long test message${' long test message'.repeat(5)}`
    const connectedLongTestMessage = 'LongTestMessage'.repeat(7)

    let text = testMessage

    // 5% chance of being longTestMessage or connectedLongTestMessage
    if (!randomInteger(0, 19)) text = longTestMessage
    if (!randomInteger(0, 19)) text = connectedLongTestMessage

    // add in randomized punctuation
    text = `${text}${
      TEST_PUNCTUATION[randomInteger(0, TEST_PUNCTUATION.length - 1)]
    }`
    let textPart = text

    if (first) {
      text = `${text} (first time chat)`
    }
    const parts: Twitch.Event.Message.Part[] = []

    const user: Twitch.Event.Message.User = {
      id: `test-user-${date.getTime()}`,
      userName: 'testuser',
      displayName: 'testUser',
      pronouns: randomInteger(0, 1) // 50% chance of showing pronouns
        ? undefined
        : allPronouns[randomInteger(0, allPronouns.length - 1)],
      badges: [],
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

    const role = randomInteger(0, 1) // 50% chance of having a special role
      ? 'user'
      : TEST_ROLES[randomInteger(0, TEST_ROLES.length - 1)]
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
    }

    let messageType: Twitch.Event.Message.Type = { type: 'basic' }

    if (randomInteger(0, 1)) {
      // 50% chance of being a special type
      const type =
        TEST_MESSAGE_TYPES[randomInteger(0, TEST_MESSAGE_TYPES.length - 1)]

      switch (type) {
        case 'action':
          text = `${text} (/me action message)`
          textPart = text
          messageType = { type }
          break

        case 'highlight':
          text = `${text} (highlighted message)`
          textPart = text
          messageType = { type }
          break

        case 'cheer':
          const amount =
            TEST_CHEER_AMOUNTS[randomInteger(0, TEST_CHEER_AMOUNTS.length - 1)]
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
          break

        case 'reply':
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
          break

        case 'redeem':
          messageType = {
            type,
            redeem: {
              id: `test-redeem-${date.getTime()}`,
              name: 'Test Redeem',
              image:
                'https://static-cdn.jtvnw.net/custom-reward-images/default-4.png',
              color: '#FFC6FF',
              cost: randomInteger(1, 10000),
            },
          }
          text = `${text} (channel point redemption requiring text)`
          textPart = text
          break

        case 'resub':
          messageType = {
            type,
            resub: {
              months: randomInteger(1, 24),
              tier: TEST_RESUB_TIERS[
                randomInteger(0, TEST_RESUB_TIERS.length - 1)
              ],
            },
          }
          text = `${text} (resub message)`
          textPart = text
          break

        case 'announcement':
          if (role === 'broadcaster' || role === 'moderator') {
            messageType = {
              type,
              announcement: {
                color:
                  TEST_ANNOUNCEMENT_COLORS[
                    randomInteger(0, TEST_ANNOUNCEMENT_COLORS.length - 1)
                  ],
              },
            }
            text = `${text} (announcement message)`
            textPart = text
          }
          break

        default: // nothing
      }
    }

    // 50% chance of using a channel emote, if the user has any
    if (randomInteger(0, 1) && emotes.length) {
      const emote = emotes[randomInteger(0, emotes.length - 1)]
      parts.unshift({ type: 'text', text: ' ' })
      parts.unshift({ type: 'emote', emote, text: emote.name })
      text = `${emote.name} ${text}`
    }

    // 20% chance of converting any basic message to just say "hi"
    if (messageType.type === 'basic' && !randomInteger(0, 4)) {
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
      source: 'twitch',
      tags: new Map<string, string>([['test', '1']]),
    }

    dispatch({ type: 'add', payload: message })
  }

  return emulate
}

// generate a random integer between min (included) and max (included)
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
