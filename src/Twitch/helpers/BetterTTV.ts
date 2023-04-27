import axios from 'axios'
import type { EmotePartInfo } from '../types'

const bttvInstance = axios.create({
  baseURL: 'https://api.betterttv.net/3/cached',
})

export default class BetterTTV {
  // not going to bother fetching the BTTV global emotes
  static async getEmotes(
    platform: BTTVPlatform,
    userId: string,
  ): Promise<Map<string, EmotePartInfo> | null> {
    const emotes = await getUserEmotes(platform, userId)
    if (!emotes) return null

    const emoteMap = new Map<string, EmotePartInfo>()

    emotes.forEach(emote => {
      emoteMap.set(emote.code, {
        id: emote.id,
        name: emote.code,
        image: getEmoteUrl(emote.id),
        source: 'betterTTV',
      })
    })

    return emoteMap
  }
}

function getEmoteUrl(id: string, size: 1 | 2 | 3 = 3) {
  return `https://cdn.betterttv.net/emote/${id}/${size}x`
}

async function getUserEmotes(platform: BTTVPlatform, userId: string) {
  const user = await get<UserResponse>(`/users/${platform}/${userId}`)
  if (!user) return null // if the BTTV API is down

  const { channelEmotes, sharedEmotes } = user

  // if these aren't defined then the API returned an error
  if (!channelEmotes || !sharedEmotes) return null

  // user doesn't have any BTTV emotes set
  if (channelEmotes.length === 0 && sharedEmotes.length === 0) return null

  return [...channelEmotes, ...sharedEmotes]
}

async function get<T>(url: string) {
  return await bttvInstance
    .get<T>(url)
    .then(response => response.data)
    .catch(() => null)
}

type BTTVPlatform = 'twitch' | 'youtube'

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

type SharedEmote = Emote & {
  user: {
    id: string
    name: string
    displayName: string
    providerId: string
  }
}
