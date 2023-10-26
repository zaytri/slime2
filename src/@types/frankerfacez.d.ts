// damn FFZ sends... way too much information

namespace FrankerFaceZ {
  type RoomResponse = {
    room: Room
    sets: {
      // key is the set ID
      [key: string]: {
        id: number // same as key
        _type: number // no clue what this means
        icon?: string // could be an image url
        title?: string
        css?: string // probably deprecated
        emoticons: Emote[]
      }
    }
  }

  type Emote = {
    id: number
    name: string
    height: number // height of emote at 1x scale in pixels
    width: number // width of emote at 1x scale in pixels
    public: boolean // true if the owner allows other channels to add this emote
    hidden: boolean // used by ffz for easter eggs, can ignore
    modifier: boolean // true if the emote is a modifier emote
    // https://api.frankerfacez.com/docs/?urls.primaryName=API%20v1#modifier-emotes
    modifier_flags: number // bitset of flags for modifying the emote
    // https://api.frankerfacez.com/docs/?urls.primaryName=API%20v1#modifier-emotes
    offset?: string // deprecated
    margins?: string // deprecated
    css?: string // deprecated
    owner?: User
    artist?: User
    urls: ImageUrls
    animated?: ImageUrls // if the emote is animated, sent as webp
    mask?: ImageUrls // if the emote is a modifier emote that applies a mask
    mask_animated?: ImageUrls // if that mask is animated
    status: number // should always be 1, which means the emote is approved
    usage_count: number // number of channels using the emote
    created_at: string // ISO date time string
    last_updated?: string // ISO date time string
  }

  type ImageUrls = {
    // 1 is guaranteed, 2 and 4 aren't
    '1': string
    '2'?: string
    '4'?: string
  }

  type User = {
    _id: number // ffz id
    name: string // platform username on either Twitch or YouTube
    display_name?: string // platform display name on either Twitch or YouTube
  }

  type Room = {
    _id: number // ffz id
    twitch_id?: number
    youtube_id?: string
    id: string // platform username on either Twitch or YouTube
    is_group: boolean // no clue what this is for
    display_name?: string // platform display name on either Twitch or YouTube
    set: number // id of the emote set associated with the room
    moderator_badge?: string // image url
    vip_badge?: ImageUrls
    mod_urls?: ImageUrls // 1 is the same as moderator_badge
    user_badges: {
      // key might be badge slot number
      [key: string]: string[] // array of platform usernames
    }
    user_badge_ids: {
      // key might be badge slot number
      [key: string]: string[] // array of platform user IDs
    }
    css?: string // probably deprecated
  }

  type PlatformUrlPart = 'id' | 'yt'
}
