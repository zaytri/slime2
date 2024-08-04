namespace BetterTTV {
  type UserResponse = {
    id: string
    bots: string[]
    avatar: string // why do they even send this?
    channelEmotes: ChannelEmote[]
    sharedEmotes: SharedEmote[]
  }

  type Emote = {
    id: string
    code: string
    imageType: string
    animated: boolean
  }

  type ChannelEmote = Emote & {
    userId: string
  }

  type GlobalEmote = ChannelEmote & {
    modifier: boolean
  }

  type SharedEmote = Emote & {
    user: {
      id: string
      name: string
      displayName: string
      providerId: string
    }
  }
}
