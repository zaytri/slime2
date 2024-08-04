import axios from 'axios'

const bttvApi = axios.create({
  baseURL: 'https://api.betterttv.net/3/cached',
})

export default async function getChannelEmotes(
  platform: Slime2.Platform,
  userId: string,
): Promise<Slime2.Event.Message.EmoteMap> {
  const emoteMap = new Map<string, Slime2.Event.Message.Emote>()

  setEmotes(<BetterTTV.GlobalEmote[]>[
    {
      id: '6468f7acaee1f7f47567708e',
      code: 'c!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '6468f845aee1f7f47567709b',
      code: 'h!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '6468f869aee1f7f4756770a8',
      code: 'l!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '6468f883aee1f7f4756770b5',
      code: 'r!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '6468f89caee1f7f4756770c2',
      code: 'v!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '6468f8d1aee1f7f4756770cf',
      code: 'z!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '64e3b31920cb0d25d950a9f9',
      code: 'w!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
    {
      id: '65cbe7dbaed093b2eaf87c65',
      code: 'p!',
      imageType: 'png',
      animated: false,
      userId: '5561169bd6b9d206222a8c19',
      modifier: true,
    },
  ])

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
        isModifier:
          'modifier' in emote ? (<BetterTTV.GlobalEmote>emote).modifier : false,
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
