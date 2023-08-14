import { useEffect, useState } from 'react'
import { useMessageListDispatch } from '../Twitch/contexts/MessageList'
import {
  TwitchMessage,
  TwitchMessageType,
  TwitchPart,
  TwitchUser,
} from '../Twitch/types'
import useBadges from '../Twitch/hooks/useBadges'
import usePronouns from '../Twitch/hooks/usePronouns'
import useCheermotes from '../Twitch/hooks/useCheermotes'
import useChannelEmotes from '../Twitch/hooks/useChannelEmotes'
import useOtherEmotes from '../Twitch/hooks/useOtherEmotes'

type Position = {
  x: number
  y: number
}

const TEST_ROLES: (keyof Omit<TwitchMessage['user']['roles'], 'followDate'>)[] =
  ['broadcaster', 'moderator', 'artist', 'vip', 'founder', 'subscriber']

const TEST_MESSAGE_TYPES: TwitchMessageType['type'][] = [
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

export default function CursorControls() {
  const { getAllOtherEmotes } = useOtherEmotes()
  const { getAllChannelEmotes } = useChannelEmotes()
  const { getCheerColor, getCheermoteUrls } = useCheermotes()
  const { getBadge } = useBadges()
  const { getAllPronouns } = usePronouns()
  const dispatch = useMessageListDispatch()
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const allPronouns = getAllPronouns()
  const channelEmotes = [...getAllChannelEmotes(), ...getAllOtherEmotes()]

  function sendTestMessage() {
    const date = new Date()
    const first = !randomInteger(0, 4) // 20% chance of being first time chat
    let text = 'test message'
    let textPart = text
    if (first) {
      text = `${text} (first time chat)`
    }
    const parts: TwitchPart[] = []

    const user: TwitchUser = {
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
        followDate: new Date(0),
      },
    }

    const role = randomInteger(0, 1) // 50% chance of having a special role
      ? 'user'
      : TEST_ROLES[randomInteger(0, TEST_ROLES.length - 1)]
    const badge = getBadge(role)

    if (role !== 'user' && badge) {
      user.badges = [badge]
      user.roles[role] = true
      user.userName = `test${role}`
      user.displayName = `test${role.charAt(0).toUpperCase()}${role.slice(1)}`
    }

    let messageType: TwitchMessageType = { type: 'basic' }

    if (randomInteger(0, 1)) {
      // 50% chance of being a special type
      const type =
        TEST_MESSAGE_TYPES[randomInteger(0, TEST_MESSAGE_TYPES.length - 1)]

      switch (type) {
        case 'action':
          text = `${text} (/me action message)`
          textPart = text
          break

        case 'highlight':
          text = `${text} (highlighted message)`
          textPart = text
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
          text = `${cheerText} ${text} (cheer message)`
          parts.unshift({ type: 'text', text: ' ' })
          parts.unshift({
            type: 'cheer',
            text: cheerText,
            cheer: {
              name,
              amount,
              color: getCheerColor(name, amount),
              images: {
                default: getCheermoteUrls(name, amount),
                static: getCheermoteUrls(name, amount, true),
              },
            },
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
              cost: randomInteger(1, 1000),
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
    if (randomInteger(0, 1) && channelEmotes.length) {
      const emote = channelEmotes[randomInteger(0, channelEmotes.length - 1)]
      parts.unshift({ type: 'text', text: ' ' })
      parts.unshift({ type: 'emote', emote, text: emote.name })
      text = `${emote.name} ${text}`
    }

    parts.push({ type: 'text', text: textPart })

    const message: TwitchMessage = {
      ...messageType,
      id: `test-message-${date.getTime()}`,
      first,
      date,
      user,
      text,
      parts,
      tags: new Map<string, string>([['test', '1']]),
    }

    dispatch({ type: 'add', payload: message })
  }

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    function onClick(_: MouseEvent) {
      sendTestMessage()
    }

    function onMouseEnter(_: MouseEvent) {
      setVisible(true)
    }

    function onMouseLeave(_: MouseEvent) {
      setVisible(false)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        width: 450,
        transform: 'translate(-50%, calc(-100% - 10px))',
        top: position.y,
        opacity: visible ? 1 : 0,
        textAlign: 'center',
        background: '#000A',
        color: 'white',
        fontFamily: 'sans-serif',
        borderRadius: 10,
        padding: 20,
        userSelect: 'none',
        zIndex: 999,
      }}
    >
      Left Click to Send a Test Message
    </div>
  )
}

// generate a random integer between min (included) and max (included)
function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
