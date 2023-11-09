let staticEmotes = false
let soundAudio = null
let soundVolume = 50

// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  slime2.widget.loadPlatform('twitch')
  slime2.widget.loadSettings('simple-chat-data.js', widgetSettings)

  slime2.onEvent(event => {
    switch (event.type) {
      case 'message':
        return onMessage(event.message)
    }
  })
})

// this event is fired every time a widget setting is changed
// use this to update the widget live, rather than the user having to refresh
addEventListener('slime2:widget-data-update', () => {
  // slime2.widget.getData() will always fetch the latest data
  const data = slime2.widget.getData()

  const {
    alignment,
    textStyles,
    animations,
    disappear,
    emotes,
    badges,
    pronouns,
    sound,
  } = data

  const eventList = $('#slime2-event-list').removeClass()

  // disappear settings
  slime2.setMaxEvents(disappear.max)
  slime2.setEventExpiration(
    disappear.expiration ? disappear.expiration * 1000 : undefined,
    animations.exit !== 'none'
      ? {
          animationTime: 500,
          animationClass: `animation-exit-${animations.exit}`,
        }
      : undefined,
  )

  // emote settings
  staticEmotes = emotes.static
  if (emotes.dynamic) eventList.addClass('dynamic-emote-sizes')

  // alignment settings
  eventList.addClass(`${alignment.direction}-${alignment.corner}`)

  // text style settings
  eventList.addClass(`text-${textStyles.edge}`).css({
    '--fontName': `'${textStyles.font}'`,
    '--fontSize': `${textStyles.size}px`,
    '--fontWeight': textStyles.weight,
  })

  // badge settings
  if (!badges.display) eventList.addClass('hide-badges')
  eventList.css({
    '--badgeSize': `${badges.size}px`,
  })

  // pronouns settings
  eventList.addClass(`pronouns-${pronouns.display}`)

  // sound effect settings
  soundAudio = sound.audio
  soundVolume = sound.volume
})

/****************
 * Chat Handler *
 ****************/

function onMessage(message) {
  if (!evaluateFilters(message)) return
  const { animations } = slime2.widget.getData()

  // extract the necessary data from the message
  const { parts, user } = message

  // clone the main message template to insert the message data into
  // the templates are all defined in the HTML file
  const messageClone = $(slime2.cloneTemplate('message-template'))

  // create the elements for the user and message content within the clone
  // this uses the element builder functions defined below
  messageClone.find('.user').append(buildUser(user))
  messageClone.find('.content').append(buildContent(parts))

  // add animation
  messageClone.find('.message').addClass(`animation-enter-${animations.enter}`)

  // add user's name color
  if (user.color) {
    messageClone
      .find('.user')
      .css('--userColor', slime2.color.light(user.color))
  }

  // set emote size
  const emoteSize = calculateEmoteSize(parts)
  messageClone.find('.content').addClass(`emote-${emoteSize}`)

  // return the message fragment which renders the fragment
  return {
    fragment: messageClone,
    callback: () => {
      if (soundAudio) {
        const sound = new Audio(soundAudio)
        sound.volume = soundVolume / 100
        sound.play()
      }
    },
  }
}

/********************
 * Element Builders *
 ********************/

// insert in the user data
function buildUser(user) {
  const { displayName, userName, badges = [], pronouns } = user

  const userClone = $(slime2.cloneTemplate('user-template'))
  userClone.find('.badges').append(buildBadges(badges))

  let name = displayName

  // handle localized display names
  // https://blog.twitch.tv/en/2016/08/22/localized-display-names-e00ee8d3250a/
  if (userName && displayName.toLowerCase() !== userName.toLowerCase()) {
    name = `${displayName} (${userName})`
  }

  // insert in the user's pronouns and display name
  userClone.find('.pronouns').text(pronouns)
  userClone.find('.name').text(name)

  return userClone
}

// go through every message part, inserting in the emote, cheer, or text data
function buildContent(parts) {
  return parts.map(part => {
    switch (part.type) {
      case 'emote':
        return buildEmote(part)

      case 'cheer':
        return buildCheer(part)

      case 'text':
      default:
        return buildText(part)
    }
  })
}

// insert in the badge images
function buildBadges(badges) {
  return badges.map(badge => {
    const { image } = badge

    const badgeClone = $(slime2.cloneTemplate('badge-template'))
    badgeClone.find('.badge').attr('src', image)

    return badgeClone
  })
}

// insert in the emote image
function buildEmote(part) {
  const { images } = part.emote

  const emoteClone = $(slime2.cloneTemplate('content-emote-template'))
  emoteClone
    .find('.emote')
    .attr('src', staticEmotes ? images.static.x4 : images.default.x4)

  return emoteClone
}

// insert in the cheermote image and cheer amount
function buildCheer(part) {
  const { amount, color, images } = part.cheer

  const cheerClone = $(slime2.cloneTemplate('content-cheer-template'))
  cheerClone
    .find('.emote')
    .attr('src', staticEmotes ? images.static.x4 : images.default.x4)
  cheerClone
    .find('.cheer-amount')
    .text(amount)
    .css('color', slime2.color.light(color))

  return cheerClone
}

// insert in the text
function buildText(part) {
  const { text } = part

  const textClone = $(slime2.cloneTemplate('content-text-template'))
  textClone.find('.text').text(text)

  return textClone
}

/***********
 * Filters *
 ***********/

function evaluateFilters(message) {
  return (
    evaluateBotFilters(message) &&
    evaluateUserFilters(message) &&
    evaluateMessageFilters(message)
  )
}

function evaluateBotFilters(message) {
  const { botFilters } = slime2.widget.getData().filters
  const { text, user } = message

  for (const prefix of botFilters.prefixes) {
    if (text.startsWith(prefix)) return false
  }

  for (const name of botFilters.names) {
    if (user.userName.toLowerCase() === name.toLowerCase()) return false
  }

  return true
}

function evaluateUserFilters(message) {
  const { userFilters } = slime2.widget.getData().filters
  const { user } = message

  for (const name of userFilters.users) {
    if (user.userName.toLowerCase() === name.toLowerCase()) return true
  }

  const typeMap = new Map(userFilters.types.map(type => [type, true]))

  if (typeMap.get('all')) return true

  const { roles } = user
  if (typeMap.get('subs') && roles.subscriber) return true
  if (typeMap.get('mods') && roles.moderator) return true
  if (typeMap.get('vips') && roles.vip) return true
  if (typeMap.get('artists') && roles.artist) return true

  if (typeMap.get('followers')) {
    const { followDate } = user
    if (!followDate) return false

    const minFollowTime = (userFilters.followHours || 0) * 60 * 60 * 1000
    const userFollowTime = Date.now() - followDate.getTime()

    return userFollowTime > minFollowTime
  }

  return false
}

function evaluateMessageFilters(message) {
  const { messageFilters } = slime2.widget.getData().filters

  for (const word of messageFilters.words) {
    if (message.text.includes(word)) return false
  }

  const typeMap = new Map(messageFilters.types.map(type => [type, true]))
  if (!typeMap.size) return true

  if (typeMap.get('text') && message.parts.some(part => part.type === 'text')) {
    return false
  }

  if (
    typeMap.get('emote') &&
    message.parts.some(part => part.type !== 'text')
  ) {
    return false
  }

  if (typeMap.get('first') && message.first) return false

  const { type } = message
  if (typeMap.get('action') && type === 'action') return false
  if (typeMap.get('cheer') && type === 'cheer') return false
  if (typeMap.get('reply') && type === 'reply') return false
  if (typeMap.get('highlight') && type === 'highlight') return false
  if (typeMap.get('redeem') && type === 'redeem') return false
  if (typeMap.get('resub') && type === 'resub') return false
  if (typeMap.get('announcement') && type === 'announcement') return false

  return true
}

/********************
 * Helper Functions *
 ********************/

// emote size is 1 if the message contains anything other than emotes
// 2 if the message contains multiple emotes and nothing else
// 4 if the entire messages is just a single emote
function calculateEmoteSize(parts) {
  let emoteCount = 0
  let otherCount = 0

  parts.forEach(part => {
    if (part.type === 'emote') {
      emoteCount++
    } else if (part.text.trim() !== '') {
      otherCount++
    }
  })

  if (otherCount > 0) {
    return 1
  } else if (emoteCount > 1) {
    return 2
  }

  return 4
}

/************************
 * Settings Definitions *
 ************************/

const alignmentSettings = {
  label: 'Chat Alignment',
  type: 'group',
  id: 'alignment',
  items: [
    {
      label: 'Direction',
      type: 'input-select',
      id: 'direction',
      defaultValue: 'vertical',
      options: ['Vertical', 'Horizontal'].map(label => {
        return { label, value: label.toLowerCase() }
      }),
    },
    {
      label: 'Corner',
      type: 'input-select',
      id: 'corner',
      defaultValue: 'bottom-left',
      placeholder: 'Command prefix',
      options: ['Top Left', 'Top Right', 'Bottom Left', 'Bottom Right'].map(
        label => {
          return { label, value: label.replaceAll(' ', '-').toLowerCase() }
        },
      ),
    },
  ],
}

const disappearingSettings = {
  label: 'Disappearing',
  type: 'group',
  id: 'disappear',
  items: [
    {
      label: 'Expiration time (seconds)',
      type: 'input-number',
      id: 'expiration',
      min: 0,
      step: 1,
      placeholder: 'Seconds',
      description:
        'Each messages will be removed after the expiration time. If empty or set to 0, messages will never expire.',
    },
    {
      label: 'Maximum number of messages',
      type: 'input-number',
      id: 'max',
      defaultValue: 100,
      min: 0,
      max: 200,
      step: 1,
      description:
        'When there are more messages than the max, the oldest messages will be removed.',
    },
  ],
}

const emoteSettings = {
  label: 'Emotes',
  type: 'group',
  id: 'emotes',
  items: [
    {
      label: 'Static emotes',
      type: 'input-boolean',
      id: 'static',
      defaultValue: false,
      description:
        'When enabled, all emotes will be static instead of animated.',
    },
    {
      label: 'Dynamic emote sizing',
      type: 'input-boolean',
      id: 'dynamic',
      defaultValue: true,
      description:
        'When enabled, emotes are larger when the chat message only contains emotes.',
    },
    {
      label: 'Dynamic emote sizing example',
      type: 'display-image',
      id: 'dynamicPreview',
      url: 'https://i.imgur.com/vfHCWjB.png',
      alt: [
        'Three chat messages.',
        "The first one contains text and an emote, showing the emote at it's normal size.",
        'The second one contains 2 emotes, showing the emotes at a larger size.',
        "The third one contains a single emote, showing the emote at it's largest size.",
      ].join('\n'),
    },
  ],
}

const badgeSettings = {
  label: 'Badges',
  type: 'group',
  id: 'badges',
  items: [
    {
      label: 'Show Twitch Badges',
      type: 'input-boolean',
      id: 'display',
      defaultValue: true,
    },
    {
      label: 'Badge Size (px)',
      type: 'input-number',
      id: 'size',
      defaultValue: 24,
      min: 0,
      step: 1,
    },
  ],
}

const pronounsSettings = {
  label: 'Pronouns',
  type: 'group',
  id: 'pronouns',
  items: [
    {
      type: 'display-text',
      id: 'link',
      label: 'Set your pronouns here: https://pronouns.alejo.io/',
    },
    {
      label: 'Pronouns Display',
      type: 'input-select',
      id: 'display',
      defaultValue: 'lowercase',
      options: ['Lowercase', 'Capitalize', 'Uppercase', 'Hidden'].map(label => {
        return { label, value: label.toLowerCase() }
      }),
      description: [
        'Examples:',
        '- Lowercase: she/her',
        '- Capitalize: She/Her',
        '- Uppercase: SHE/HER',
        'Hidden: For when you want a more compact chat.',
      ].join('\n'),
    },
  ],
}

const botFilterSettings = {
  label: 'Bot Filters',
  type: 'group',
  id: 'botFilters',
  items: [
    {
      label: 'Bots to hide',
      type: 'input-text',
      id: 'names',
      multiple: true,
      defaultValue: ['Sery_Bot', 'Nightbot', 'StreamElements', 'Streamlabs'],
      placeholder: 'Bot name',
      description: 'Use this to hide chat messages from specific bots.',
    },
    {
      label: 'Command prefixes to hide',
      type: 'input-text',
      id: 'prefixes',
      multiple: true,
      defaultValue: ['!'],
      placeholder: 'Command prefix',
      description:
        'Chat messages that start with these prefixes will be hidden. For example, if one of the prefixes is ! then messages like !socials or !followage will be hidden.',
    },
  ],
}

const userFilterSettings = {
  label: 'User Filters',
  type: 'group',
  id: 'userFilters',
  items: [
    {
      label: 'Show messages from these types of users',
      type: 'input-select',
      id: 'types',
      multiple: true,
      defaultValue: ['all', 'subs', 'mods', 'vips', 'followers', 'artists'],
      options: [
        { label: 'Everyone', value: 'all' },
        { label: 'Followers', value: 'followers' },
        { label: 'Subscribers', value: 'subs' },
        { label: 'Moderators', value: 'mods' },
        { label: 'VIPs', value: 'vips' },
        { label: 'Artists', value: 'artists' },
      ],
    },
    {
      label: 'Follow age (hours)',
      type: 'input-number',
      id: 'followHours',
      min: 0,
      step: 'any',
      placeholder: 'Hours',
      description:
        "If you're using the follower option above, users will only be considered a follower if they have followed for at least this many hours.",
    },
    {
      label: 'Always show messages from these users',
      type: 'input-text',
      id: 'users',
      multiple: true,
      placeholder: 'Username',
      description:
        'These users will always have their messages shown regardless of the options above.',
    },
  ],
}

const messageFilterSettings = {
  label: 'Message Filters',
  type: 'group',
  id: 'messageFilters',
  items: [
    {
      label: 'Hide these message types',
      type: 'input-select',
      id: 'types',
      multiple: true,
      defaultValue: [],
      options: [
        { label: 'First-time chat', value: 'first' },
        { label: '/me message', value: 'action' },
        { label: 'Messages with text', value: 'text' },
        { label: 'Messages with emotes', value: 'emote' },
        { label: 'Message with bits', value: 'cheer' },
        { label: 'Replies', value: 'reply' },
        { label: 'Highlighted', value: 'highlight' },
        { label: 'Channel point redemption message', value: 'redeem' },
        { label: 'Resub message', value: 'resub' },
        { label: 'Announcements', value: 'announcement' },
      ],
    },
    {
      label: 'Hide messages containing these words',
      type: 'input-text',
      id: 'words',
      multiple: true,
      description:
        'Messages that contain these words will never be shown, regardless of other filters.',
    },
  ],
}

const filterSettings = {
  label: 'Filters',
  type: 'group',
  id: 'filters',
  items: [botFilterSettings, userFilterSettings, messageFilterSettings],
}

const soundSettings = {
  label: 'Sound Effect',
  type: 'group',
  id: 'sound',
  items: [
    {
      label: 'Sound',
      type: 'input-audio',
      id: 'audio',
      description: 'This sound effect will be played for every chat message.',
    },
    {
      label: 'Volume (%)',
      type: 'input-number',
      id: 'volume',
      defaultValue: 50,
      slider: true,
      min: 0,
      max: 100,
      step: 1,
    },
  ],
}

const textSettings = {
  label: 'Text Styles',
  type: 'group',
  id: 'textStyles',
  items: [
    {
      label: 'Font Name',
      type: 'input-font',
      id: 'font',
      defaultValue: 'Nunito',
    },
    {
      label: 'Font Size (px)',
      type: 'input-number',
      id: 'size',
      defaultValue: 16,
      min: 0,
      step: 1,
    },
    {
      label: 'Font Weight',
      type: 'input-select',
      id: 'weight',
      defaultValue: 800,
      options: ['Normal', 'Bold']
        .map(label => {
          return { label, value: label.toLowerCase() }
        })
        .concat(
          [100, 200, 300, 400, 500, 600, 700, 800, 900].map(value => {
            return { label: value.toString(), value }
          }),
        ),
    },
    {
      label: 'Edge Style',
      type: 'input-select',
      id: 'edge',
      defaultValue: 'outline-2',
      options: [
        'Outline 1',
        'Outline 2',
        'Bottom Shadow 1',
        'Bottom Shadow 2',
        'Bottom Right Shadow 1',
        'Bottom Right Shadow 2',
        'None',
      ].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    },
  ],
}

const animationSettings = {
  label: 'Animations',
  type: 'group',
  id: 'animations',
  items: [
    {
      label: 'Entrance Animation',
      type: 'input-select',
      id: 'enter',
      defaultValue: 'none',
      options: ['Fade', 'Fade Left', 'Fade Right', 'None'].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    },
    {
      label: 'Exit Animation',
      type: 'input-select',
      id: 'exit',
      defaultValue: 'none',
      options: ['Fade', 'Fade Left', 'Fade Right', 'None'].map(label => {
        return { label, value: label.replaceAll(' ', '-').toLowerCase() }
      }),
    },
  ],
}

const widgetSettings = [
  {
    type: 'display-text',
    id: 'title',
    label: 'Simple Chat v3.0.0 by Zaytri',
  },
  animationSettings,
  badgeSettings,
  alignmentSettings,
  disappearingSettings,
  emoteSettings,
  filterSettings,
  pronounsSettings,
  soundSettings,
  textSettings,
  {
    type: 'display-text',
    id: 'help',
    label:
      'For any questions and support: https://forums.slime2.stream/threads/20/',
  },
  {
    type: 'display-text',
    id: 'author',
    label: 'Zaytri: https://zaytri.com/',
  },
]
