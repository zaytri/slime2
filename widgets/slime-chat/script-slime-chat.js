// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  slime2.widget.loadPlatform('twitch')

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
    display,
    textStyles,
    backgroundStyles,
    animations,
    emotes,
    badges,
    pronouns,
  } = data

  const eventList = $('#slime2-event-list').removeClass()

  // display settings
  slime2.setEventDelay(display.delay * 1000)
  slime2.setMaxEvents(display.max)
  slime2.setEventExpiration(
    display.expiration ? display.expiration * 1000 : undefined,
    animations.exit !== 'none'
      ? {
          animationTime: 500,
          animationClass: `animation-exit-${animations.exit}`,
        }
      : undefined,
  )
  eventList.addClass(`${display.direction}-${display.corner}`).css({
    '--maxWidth': `${display.maxWidth}px`,
    '--gap': `${display.gap}px`,
  })

  if (display.under) eventList.addClass('display-under')

  // emote settings
  if (emotes.dynamic)
    eventList.addClass('dynamic-emote-sizes').css({
      '--emoteMedium': `${emotes.medium}px`,
      '--emoteLarge': `${emotes.large}px`,
    })

  // text style settings
  eventList
    .addClass([
      `text-edge-${textStyles.edge}`,
      `text-color-${textStyles.textColorOption}`,
      `username-color-${textStyles.usernameColorOption}`,
    ])
    .css({
      '--fontName': `'${textStyles.font}'`,
      '--fontSize': `${textStyles.size}px`,
      '--fontWeight': textStyles.weight,
      '--textColor': textStyles.textColor,
      '--usernameColor': textStyles.usernameColor,
      '--edgeColor': textStyles.edgeColor,
      '--lineHeight': `${textStyles.lineHeight}px`,
      // 20% opacity of edgeColor
      '--edgeColorLowOpacity': slime2.color
        .mix('transparent', textStyles.edgeColor, 0.2, {
          space: 'srgb',
        })
        .toString({ format: 'rgba' }),
    })

  if (textStyles.colon) eventList.addClass('display-colon')

  // background style settings
  eventList.css({
    '--backgroundColor': backgroundStyles.color,
    '--padding': `${backgroundStyles.padding}px`,
    '--borderColor': backgroundStyles.borderColor,
    '--borderWidth': `${backgroundStyles.borderWidth}px`,
    '--borderRadius': `${backgroundStyles.borderRadius}px`,
    '--borderStyle': backgroundStyles.borderStyle,
  })
  if (backgroundStyles.fullWidth) eventList.addClass('full-width')

  // badge settings
  if (!badges.display) eventList.addClass('hide-badges')
  eventList.css({
    '--badgeSize': `${badges.size}px`,
  })

  // pronouns settings
  eventList.addClass(`pronouns-${pronouns.display}`)
})

/****************
 * Chat Handler *
 ****************/

function onMessage(message) {
  if (!evaluateFilters(message)) return
  const { animations, sound } = slime2.widget.getData()

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
  messageClone.find('.message').css({
    '--userColor': user.color,
    '--userColorLight': slime2.color.light(user.color),
    '--userColorDark': slime2.color.dark(user.color),
  })

  // set emote size
  const emoteSize = calculateEmoteSize(parts)
  messageClone.find('.content').addClass(`emote-${emoteSize}`)

  // return the message fragment which renders the fragment
  return {
    fragment: messageClone,
    callback: () => {
      // sound effect
      if (sound.audio) {
        const audio = new Audio(sound.audio)
        audio.volume = sound.volume / 100
        audio.play()
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
  const { emotes } = slime2.widget.getData()
  const { images } = part.emote

  const emoteClone = $(slime2.cloneTemplate('content-emote-template'))
  emoteClone
    .find('.emote')
    .attr('src', emotes.static ? images.static.x4 : images.default.x4)

  return emoteClone
}

// insert in the cheermote image and cheer amount
function buildCheer(part) {
  const { emotes } = slime2.widget.getData()
  const { amount, color, images } = part.cheer

  const cheerClone = $(slime2.cloneTemplate('content-cheer-template'))
  cheerClone
    .find('.emote')
    .attr('src', emotes.static ? images.static.x4 : images.default.x4)
  cheerClone.find('.cheer-amount').text(amount).css('color', color)

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
