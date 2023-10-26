import axios from 'axios'

const bttvApi = axios.create({
  baseURL: 'https://api.betterttv.net/3/cached',
})

export default async function getChannelEmotes(
  platform: Slime2.Platform,
  userId: string,
): Promise<Slime2.Event.Message.EmoteMap> {
  const emoteMap = new Map<string, Slime2.Event.Message.Emote>()

  const user = await bttvApi
    .get<BetterTTV.UserResponse>(`/users/${platform}/${userId}`)
    .then(response => response.data)
    .catch(() => null)
  if (!user) return emoteMap // BTTV API error

  const { channelEmotes, sharedEmotes } = user

  // if these aren't defined then the API returned an error
  if (!channelEmotes || !sharedEmotes) return emoteMap

  function setEmotes(emotes: BetterTTV.Emote[]) {
    emotes.forEach(emote => {
      emoteMap.set(emote.code, {
        id: emote.id,
        name: emote.code,
        images: {
          default: buildEmoteUrls(emote.id),
          static: buildEmoteUrls(emote.id, true),
        },
        source: 'betterttv',
      })
    })
  }

  setEmotes(channelEmotes)
  setEmotes(sharedEmotes)

  return emoteMap
}

function buildEmoteUrls(
  id: string,
  staticEmote: boolean = false,
): Slime2.Event.Message.Emote.Urls {
  function buildEmoteUrl(size: 1 | 2 | 3) {
    const baseURL = 'https://cdn.betterttv.net/emote'
    return `${baseURL}/${id}${staticEmote ? '/static' : ''}/${size}x`
  }

  return {
    x1: buildEmoteUrl(1),
    x2: buildEmoteUrl(2),
    x4: buildEmoteUrl(3),
  }
}
