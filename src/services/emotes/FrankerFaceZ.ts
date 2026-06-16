import axios from 'axios'

const ffzApi = axios.create({
  baseURL: 'https://api.frankerfacez.com/v1',
})

export default async function getChannelEmotes(
  platform: Slime2.Platform,
  userId: string,
): Promise<Slime2.Event.Message.EmoteMap> {
  const emoteMap = new Map<string, Slime2.Event.Message.Emote>()

  const roomResponse = await ffzApi
    .get<FrankerFaceZ.RoomResponse>(
      `/room/${platformUrlTransformer(platform)}/${userId}`,
    )
    .then(response => response.data)
    .catch(() => null)
  if (!roomResponse) return emoteMap // FFZ API error

  const { sets } = roomResponse

  // if this isn't defined then the API returned an error
  if (!sets) return emoteMap

  Object.keys(sets).forEach(id => {
    sets[id].emoticons.forEach(emote => {
      emoteMap.set(emote.name, {
        id: emote.id.toString(),
        name: emote.name,
        images: {
          default: buildEmoteUrls(emote),
          static: buildEmoteUrls(emote, true),
        },
        source: 'frankerfacez',
        isModifier: false,
      })
    })
  })

  return emoteMap
}

function buildEmoteUrls(
  emote: FrankerFaceZ.Emote,
  staticEmote: boolean = false,
): Slime2.Event.Message.Emote.Urls {
  // size 1 is guaranteed, so it's used as a fallback for all other sizes
  let x1 = emote.urls[1]
  let x2 = emote.urls[2] || x1
  let x4 = emote.urls[4] || x2

  if (!staticEmote && emote.animated) {
    x1 = emote.animated[1]
    x2 = emote.animated[2] || x1
    x4 = emote.animated[4] || x2
  }

  return { x1, x2, x4 }
}

function platformUrlTransformer(
  platform: Slime2.Platform,
): FrankerFaceZ.PlatformUrlPart {
  switch (platform) {
    case 'twitch':
      return 'id'
    case 'youtube':
      return 'yt'
    default:
      throw Error(
        `Unhandled platform "${platform}" in FFZ Platform URL Transformer`,
      )
  }
}
