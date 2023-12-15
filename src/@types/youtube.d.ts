namespace Youtube {
  type Event = Event.Type & { source: 'youtube' }
  type RenderableEvent = Exclude<
    Event,
    { type: 'remove-user' | 'remove-message' }
  >

  namespace Event {
    type Type =
      | { type: 'message'; message: Message }
      | { type: 'remove-user'; userId: string }
      | { type: 'remove-message'; messageId: string }

    type Message = {
      user: Message.User
      parts: Message.Part[]
    } & Message.Type &
      Slime2.Event.BasicMessage

    namespace Message {
      type Type = { type: 'basic' }

      type User = {
        // identifiers
        url: string
        image: string

        // roles
        roles: {
          broadcaster: boolean
          moderator: boolean
          member: boolean
        }

        // null if the user hasn't subscribed
        subscriptionDate: Date | null
      } & Slime2.BasicUser

      type Part = { text: string } & Part.Type
      namespace Part {
        type Type =
          | { type: 'text' }
          | { type: 'emote'; emote: Slime2.Event.Message.Emote }
      }
    }
  }

  type Emoji = {
    emojiId: string
    shortcuts: string[]
    searchTerms: string[]
    image: {
      thumbnails: EmojiThumbnail[]
      accessibility: {
        accessibilityData: {
          label: string
        }
      }
    }
    isCustomEmoji?: boolean
    isLocked?: boolean
  }

  type EmojiThumbnail = {
    url: string
    width: number
    height: number
  }

  namespace API {
    type ChannelListResponse = {
      kind: 'youtube#channelListResponse'
      etag: string
      nextPageToken: string
      prevPageToken: string
      pageInfo: {
        totalResults: number
        resultsPerPage: number
      }
      items: Channel[]
    }

    type LiveBroadcastListResponse = {
      kind: 'youtube#liveBroadcastListResponse'
      etag: string
      nextPageToken: string
      prevPageToken: string
      pageInfo: {
        totalResults: number
        resultsPerPage: number
      }
      items: LiveBroadcast[]
    }

    type LiveChatMessageListResponse = {
      kind: 'youtube#liveChatMessageListResponse'
      etag: string
      nextPageToken: string
      pollingIntervalMillis: number
      offlineAt: string
      pageInfo: {
        totalResults: number
        resultsPerPage: number
      }
      items: LiveChatMessage[]
    }

    type Channel = {
      kind: 'youtube#channel'
      etag: string
      id: string
      snippet: {
        title: string
        description: string
        customUrl: string
        publishedAt: string
        thumbnails: Thumbnails
        defaultLanguage: string
        localized: {
          title: string
          description: string
        }
        country: string
      }
    }

    type LiveBroadcast = {
      kind: 'youtube#liveBroadcast'
      etag: string
      id: string
      snippet: {
        publishedAt: string
        channelId: string
        title: string
        description: string
        thumbnails: Thumbnails
        scheduledStartTime: string
        scheduledEndTime: string
        actualStartTime: string
        actualEndTime: string
        liveChatId: string
      }
      status: {
        lifeCycleStatus:
          | 'complete'
          | 'created'
          | 'live'
          | 'liveStarting'
          | 'ready'
          | 'revoked'
          | 'testStarting'
          | 'testing'
        privacyStatus: 'private' | 'public' | 'unlisted'
        recordingStatus: 'notRecording' | 'recorded' | 'recording'
        madeForKids: boolean
        selfDeclaredMadeForKids: boolean
      }
    }

    type LiveChatMessage = {
      kind: 'youtube#liveChatMessage'
      etag: string
      id: string
      snippet: {
        liveChatId: string
        authorChannelId: string
        publishedAt: string
        hasDisplayContent: boolean
        displayMessage?: string
      } & LiveChatMessageEventDetails
      authorDetails: {
        channelId: string
        channelUrl: string
        displayName: string
        profileImageUrl: string
        isVerified: boolean
        isChatOwner: boolean
        isChatSponsor: boolean
        isChatModerator: boolean
      }
    }

    type LiveChatMessageEventDetails =
      | {
          type: 'textMessageEvent'
          textMessageDetails: {
            messageText: string
          }
        }
      | {
          type: 'messageDeletedEvent'
          messageDeletedDetails: {
            deletedMessageId: string
          }
        }
      | {
          type: 'userBannedEvent'
          userBannedDetails: {
            bannedUserDetails: {
              channelId: string
              channelUrl: string
              displayName: string
              profileImageUrl: string
            }
            banType: 'permanent' | 'temporary'
            banDurationSeconds: number
          }
        }
      | {
          type: 'newSponsorEvent'
          newSponsorDetails: {
            memberLevelName: string
            isUpgrade: boolean
          }
        }
      | {
          type: 'memberMilestoneChatEvent'
          memberMilestoneChatDetails: {
            userComment?: string
            memberMonth: number
            memberLevelName: string
          }
        }
      | {
          type: 'superChatEvent'
          superChatDetails: {
            amountMicros: number
            currency: string
            amountDisplayString: string
            userComment: string
            tier: number
          }
        }
      | {
          type: 'superStickerEvent'
          superStickerDetails: {
            superStickerMetadata: {
              stickerId: string
              altText: string
              language: string
            }
            amountMicros: number
            currency: string
            amountDisplayString: string
            tier: number
          }
        }
      | {
          type: 'membershipGiftingEvent'
          membershipGiftingDetails: {
            giftMembershipsCount: number
            giftMembershipsLevelName: string
          }
        }
      | {
          type: 'giftMembershipReceivedEvent'
          giftMembershipReceivedDetails: {
            memberLevelName: string
            gifterChannelId: string
            associatedMembershipGiftingMessageId: string
          }
        }
      | { type: 'chatEndedEvent' }
      | { type: 'tombstone' }
      | { type: 'sponsorOnlyModeStartedEvent' }
      | { type: 'sponsorOnlyModeEndedEvent' }

    type Thumbnails = {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
    }

    type Thumbnail = {
      url: string
      width: number
      height: number
    }
  }
}
