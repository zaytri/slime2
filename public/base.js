/**
 * Define the permissions that this has overlay has access to,
 * so that users know what this
 */
var slime2Setup = {
  permissions: ['chat'],
}

const DEFAULT_USER_COLORS = [
  '#FFADAD', // pastel red
  '#FFD6A5', // pastel orange
  '#FDFFB6', // pastel yellow
  '#CAFFBF', // pastel green
  '#9BF6FF', // pastel blue
  '#A0C4FF', // pastel indigo
  '#BDB2FF', // pastel purple
  '#FFC6FF', // pastel pink
]

var slime2Chat = {
  onMessage: ({ message }) => {
    // get useful data from message
    const { parts, user } = message

    // clone the main message template to insert the message data into
    const messageClone = cloneTemplate('message-template')

    messageClone.find('.user').append(buildUser(user))
    messageClone.find('.content').append(buildContent(parts))

    return [messageClone]
  },
}

/********************\
 * Element Builders *
\********************/

function buildUser(user) {
  const { color, displayName, userName, badges, pronouns } = user

  const userClone = cloneTemplate('user-template')
  userClone.find('.badges').append(buildBadges(badges))

  // if the user hasn't set a name color,
  // generate a color for them from the DEFAULT_USER_COLORS list
  const nameColor = color || generateUserColor(displayName)

  let name = displayName

  // handle localized display names
  // https://blog.twitch.tv/en/2016/08/22/localized-display-names-e00ee8d3250a/
  if (displayName.toLowerCase() !== userName.toLowerCase()) {
    name = `${displayName} (${userName})`
  }

  // insert in the user's pronouns, display name, and name color
  userClone.find('.pronouns').text(pronouns).css('color', nameColor)
  userClone.find('.name').text(name).css('color', nameColor)

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

function buildBadges(badges) {
  return badges.map(badge => {
    const { image } = badge

    const badgeClone = cloneTemplate('badge-template')
    badgeClone.find('.badge').attr('src', image)

    return badgeClone
  })
}

// insert in the emote image
function buildEmote(part) {
  const { images } = part.emote

  const emoteClone = cloneTemplate('content-emote-template')
  emoteClone.find('.emote').attr('src', images.default.x4)

  return emoteClone
}

// insert in the cheermote image and cheer amount
function buildCheer(part) {
  const { amount, color, images } = part.cheer

  const cheerClone = cloneTemplate('content-cheer-template')
  cheerClone.find('.emote').attr('src', images.default.x4)
  cheerClone.find('.cheer-amount').text(amount).css('color', color)

  return cheerClone
}

// insert in the text
function buildText(part) {
  const { text } = part

  const textClone = cloneTemplate('content-text-template')
  textClone.find('.text').text(text)

  return textClone
}

// generates a color from DEFAULT_USER_COLORS based on the name given,
// so that the same user will always be given the same color
function generateUserColor(name) {
  // take the first color if name somehow doesn't exist
  if (!name) return DEFAULT_USER_COLORS[0]

  // separate out each character of the string, covert each one into a
  // number, then sum all of those together
  const nameValue = name
    .split('')
    .reduce((sum, character) => sum + character.charCodeAt(0), 0)

  // index the
  return DEFAULT_USER_COLORS[nameValue % DEFAULT_USER_COLORS.length]
}

// given an ID, clone the template and wrap it with jQuery
function cloneTemplate(id) {
  return $(document.getElementById(id).content.cloneNode(true))
}

// generated a random integer between min (included) and max (included)
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// generate a random number between min (included) and max (excluded)
function random(min, max) {
  return Math.random() * (max - min) + min
}
