import { infiniteCache } from '@/services/helpers'
import { useQuery } from '@tanstack/react-query'
import { buildEmoteImageUrl } from '@twurple/chat'
import useTwitchApi from './useApi'
import useTwitchBroadcaster from './useBroadcaster'

export default function useChannelEmotes() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const api = useTwitchApi()

  return useQuery<Slime2.Event.Message.Emote[]>({
    enabled: !!broadcaster,
    queryKey: ['twitch', 'channelEmotes', broadcaster?.id],
    queryFn: async () => {
      const emotesArray = await api.chat.getChannelEmotes(broadcaster!.id)
      return emotesArray.map<Slime2.Event.Message.Emote>(emote => {
        const { id, name } = emote
        return {
          id,
          name,
          images: {
            default: buildEmoteUrls(id),
            static: buildEmoteUrls(id, true),
          },
          source: 'twitch',
        }
      })
    },
    ...infiniteCache,
  })
}

function buildEmoteUrls(
  id: string,
  staticEmote: boolean = false,
): Slime2.Event.Message.Emote.Urls {
  function buildEmoteUrl(size: '1.0' | '2.0' | '3.0') {
    return buildEmoteImageUrl(id, {
      animationSettings: staticEmote ? 'static' : 'default',
      backgroundType: 'light',
      size,
    })
  }

  return {
    x1: buildEmoteUrl('1.0'),
    x2: buildEmoteUrl('2.0'),
    x4: buildEmoteUrl('3.0'),
  }
}
