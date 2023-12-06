// the slime2:ready event is fired once
// indicates that the slime2 global variable is ready to use
addEventListener('slime2:ready', () => {
  slime2.widget.loadPlatform('twitch')
  slime2.setMaxEvents(100)
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

  const { display, pronouns, textStyles } = data

  const eventList = $('#slime2-event-list').removeClass()

  // display settings
  slime2.setMaxEvents(display.max)
  slime2.setEventDelay(display.delay * 1000)
  if (display.hideBadges) eventList.addClass('hide-badges')
  if (display.hideUser) eventList.addClass('hide-user')
  if (display.emoteOnly) eventList.addClass('emote-only')

  // pronouns settings
  eventList.addClass(`pronouns-${pronouns.display}`)

  // text style settings
  eventList
    .addClass(`text-color-${textStyles.colorOption}`)
    .addClass(`edge-${textStyles.edge}`)
    .css({
      '--font': `'${textStyles.font}'`,
      '--fontSize': `${textStyles.size}px`,
      '--fontWeight': textStyles.weight,
      '--color': textStyles.color,
      '--edgeColor': textStyles.edgeColor,
      // 20% opacity of edgeColor
      '--edgeColorLowOpacity': slime2.color
        .mix('transparent', textStyles.edgeColor, 0.2, {
          space: 'srgb',
        })
        .toString({ format: 'rgba' }),
    })
})

/****************
 * Chat Handler *
 ****************/

function onMessage(message) {
  if (!evaluateFilters(message)) return

  const { display } = slime2.widget.getData()

  if (
    display.emoteOnly &&
    !message.parts.some(part => part.type === 'emote' || part.type === 'cheer')
  ) {
    // Only Show Emotes is enabled and message contains zero emotes
    return
  }

  // extract the necessary data from the message
  const { parts, user } = message

  // clone the main message template to insert the message data into
  // the templates are all defined in the HTML file
  const messageClone = $(slime2.cloneTemplate('message-template'))

  // create the elements for the user and message content within the clone
  // this uses the element builder functions defined below
  messageClone.find('.user').append(buildUser(user))
  messageClone.find('.content').append(buildContent(parts))

  // add user's name color
  if (user.color) {
    messageClone.find('.message').css({
      '--userColorLight': slime2.color.light(user.color),
      '--userColor': user.color,
      '--userColorDark': slime2.color.dark(user.color),
    })
  }

  // set position
  const position = `${slime2.random.integer(0, window.innerHeight / 2)}px`
  messageClone
    .find('.message')
    .css(slime2.random.boolean() ? { top: position } : { bottom: position })

  return {
    fragment: messageClone,
    callback: messageElement => {
      /*******************
       * Scroll Handling *
       *******************/
      const messageWidth = $(messageElement).get(0).scrollWidth
      const windowWidth = $(window).width()
      const extraScrollDistance = 100
      const scrollAmount = windowWidth + messageWidth + extraScrollDistance
      const scrollTime = (scrollAmount / display.speed) * 1000

      $(messageElement)
        .css({
          '--duration': `${scrollTime}ms`,
          '--start': `${windowWidth}px`,
          '--end': `${(messageWidth + extraScrollDistance) * -1}px`,
        })
        .addClass('animate')

      setTimeout(() => {
        $(messageElement).css({ display: 'none' })
      }, scrollTime)
    },
  }
}

/********************
 * Element Builders *
 ********************/

// insert in the user data
function buildUser(user) {
  const { displayName, userName, badges, pronouns } = user

  const userClone = $(slime2.cloneTemplate('user-template'))
  userClone.find('.badges').append(buildBadges(badges))

  let name = displayName

  // handle localized display names
  // https://blog.twitch.tv/en/2016/08/22/localized-display-names-e00ee8d3250a/
  if (displayName.toLowerCase() !== userName.toLowerCase()) {
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
  const { display } = slime2.widget.getData()
  const { images } = part.emote

  const emoteClone = $(slime2.cloneTemplate('content-emote-template'))
  emoteClone
    .find('.emote')
    .attr('src', display.static ? images.static.x4 : images.default.x4)

  return emoteClone
}

// insert in the cheermote image and cheer amount
function buildCheer(part) {
  const { display } = slime2.widget.getData()
  const { amount, images } = part.cheer

  const cheerClone = $(slime2.cloneTemplate('content-cheer-template'))
  cheerClone
    .find('.emote')
    .attr('src', display.static ? images.static.x4 : images.default.x4)
  cheerClone.find('.cheer-amount').text(amount)

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
