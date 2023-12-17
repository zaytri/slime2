import useText from './useText'

export default function useMessage() {
  const transformText = useText()

  function transform(
    message: Youtube.API.LiveChatMessage,
  ): Youtube.Event.Message {
    return {
      id: message.id!,
      type: 'basic',
      user: {
        id: message.authorDetails.channelId,
        displayName: message.authorDetails.displayName,
        url: message.authorDetails.channelUrl,
        image: message.authorDetails.profileImageUrl,
        roles: {
          broadcaster: message.authorDetails.isChatOwner,
          moderator: message.authorDetails.isChatModerator,
          member: message.authorDetails.isChatSponsor,
        },
        subscriptionDate: null,
      },
      text: message.snippet.displayMessage || '',
      parts: transformText(message.snippet.displayMessage || ''),
      date: new Date(message.snippet.publishedAt),
    }
  }

  return transform
}
