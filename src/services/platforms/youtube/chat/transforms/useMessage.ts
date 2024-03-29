export default function useMessage() {
  function transform(
    message: gapi.client.youtube.LiveChatMessage,
  ): YouTube.Event.Message {
    return {
      id: message.id!,
      type: 'basic',
      user: {
        id: message.authorDetails!.channelId!,
        displayName: message.authorDetails!.displayName!,
        url: message.authorDetails!.channelUrl!,
        image: message.authorDetails!.profileImageUrl!,
        roles: {
          broadcaster: message.authorDetails!.isChatOwner!,
          moderator: message.authorDetails!.isChatModerator!,
          member: message.authorDetails!.isChatSponsor!,
        },
        subscriptionDate: null,
      },
      text: message.snippet!.displayMessage!,
      parts: [{ type: 'text', text: message.snippet!.displayMessage! }],
      date: new Date(message.snippet!.publishedAt!),
    }
  }

  return transform
}
