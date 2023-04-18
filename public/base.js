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

    // if the user hasn't set a name color,
    // generate a color for them from the DEFAULT_USER_COLORS list
    user.color ||= generateUserColor(user.displayName)

    // clone the main message template to insert the message data into
    const messageClone = cloneTemplate('message-template')

    // go through every message part, inserting in the emote, cheer, or text data
    const messageContent = messageClone.find('.content')
    parts.forEach(part => {
      switch (part.type) {
        case 'emote': // insert in the emote image
          {
            const { image } = part.emote

            const emoteClone = cloneTemplate('emote-template')
            emoteClone.find('.emote').attr('src', image)

            messageContent.append(emoteClone)
          }
          break

        case 'cheer': // insert in the cheermote image and cheer amount
          {
            const { amount, color, image } = part.cheer

            const cheerClone = cloneTemplate('cheermote-template')
            cheerClone.find('.cheer').attr('src', image)
            cheerClone.find('.cheer-amount').text(amount).css('color', color)

            messageContent.append(cheerClone)
          }
          break

        case 'text': // insert in the text
        default:
          {
            const textClone = cloneTemplate('text-template')
            textClone.find('.text').text(part.text)

            messageContent.append(textClone)
          }
          break
      }
    })

    // go through every visible user badge, inserting in the badge image
    user.badges.forEach(badge => {
      const badgeClone = cloneTemplate('badge-template')
      badgeClone.find('.badge').attr('src', badge.image)
      messageClone.find('.badges').append(badgeClone)
    })

    let name = user.displayName

    // handle localized display names
    // https://blog.twitch.tv/en/2016/08/22/localized-display-names-e00ee8d3250a/
    if (user.displayName.toLowerCase() !== user.userName.toLowerCase()) {
      name = `${user.displayName} (${user.userName})`
    }

    // insert in the user's pronouns, display name, and name color
    messageClone.find('.pronouns').text(user.pronouns).css('color', user.color)
    messageClone.find('.username').text(name).css('color', user.color)

    return [messageClone]
  },
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
