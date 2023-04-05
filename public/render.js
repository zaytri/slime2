slimeChat.render = ({ message }) => {
  // get useful data from message
  const { parts, user } = message

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

  // insert in the user's pronouns, display name, and name color
  messageClone.find('.pronouns').text(user.pronouns).css('color', user.color)
  messageClone.find('.username').text(user.displayName).css('color', user.color)

  return [messageClone]
}

// given an ID, clone the template and wrap it with jQuery
function cloneTemplate(id) {
  return $(document.getElementById(id).content.cloneNode(true))
}
