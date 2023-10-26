import getBTTVChannelEmotes from '@/services/emotes/BetterTTV'
import getFFZChannelEmotes from '@/services/emotes/FrankerFaceZ'

import { useQuery } from '@tanstack/react-query'
import useTwitchBroadcaster from './useBroadcaster'

export default function useThirdPartyEmotes() {
  const { data: broadcaster } = useTwitchBroadcaster()

  return useQuery<Slime2.Event.Message.EmoteMap>({
    enabled: !!broadcaster,
    queryKey: ['twitch', 'thirdPartyEmotes', broadcaster?.id],
    queryFn: async () => {
      const emoteMap = new Map<string, Slime2.Event.Message.Emote>()

      const thirdPartyEmotes = await Promise.all<
        Promise<Slime2.Event.Message.EmoteMap>
      >([
        getBTTVChannelEmotes('twitch', broadcaster!.id),
        getFFZChannelEmotes('twitch', broadcaster!.id),
      ])

      thirdPartyEmotes.forEach(emotes => {
        emotes.forEach((emote, name) => {
          emoteMap.set(name, emote)
        })
      })

      return emoteMap
    },
    retry: 1,
    retryOnMount: false,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
