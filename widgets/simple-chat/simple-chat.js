addEventListener('slime2:ready', () => {
  // slime2.setEventExpiration(1 * 1000, {
  //   animationTime: 1000,
  //   animationClass: 'fade',
  // })

  slime2.onEvent(event => {
    switch (event.type) {
      case 'message':
        return onMessage(event.message)
    }
  })
})

/****************
 * Chat Handler *
 ****************/

function onMessage(data) {
  // extract the necessary data from the message
  const { parts, user } = data

  // clone the main message template to insert the message data into
  // the templates are all defined in the HTML file
  const messageClone = $(slime2.cloneTemplate('message-template'))

  // create the elements for the user and message content within the clone
  // this uses the element builder functions defined below
  messageClone.find('.user').append(buildUser(user))
  messageClone.find('.content').append(buildContent(parts))

  // add user's name color
  messageClone.find('.user').css('--userColor', slime2.color.light(user.color))

  // set emote size
  const emoteSize = calculateEmoteSize(parts)
  messageClone.find('.content').addClass(`emote-${emoteSize}`)

  // return the message fragment which renders the fragment
  return { fragment: messageClone }
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
  const { images } = part.emote

  const emoteClone = $(slime2.cloneTemplate('content-emote-template'))
  emoteClone.find('.emote').attr('src', images.default.x4)

  return emoteClone
}

// insert in the cheermote image and cheer amount
function buildCheer(part) {
  const { amount, color, images } = part.cheer

  const cheerClone = $(slime2.cloneTemplate('content-cheer-template'))
  cheerClone.find('.emote').attr('src', images.default.x4)
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
