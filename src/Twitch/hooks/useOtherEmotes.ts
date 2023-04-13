import { useEffect, useState } from 'react'
import { useTokenInfo } from './useTokenInfo'
import BetterTTV from '../helpers/BetterTTV'
import FrankerFaceZ from '../helpers/FrankerFaceZ'
import { EmotePartInfo } from '../types'

const emoteMap = new Map<string, EmotePartInfo>()
let loaded = false

export default function useOtherEmotes() {
  function getOtherEmote(name: string) {
    return emoteMap.get(name)
  }

  function getOtherEmoteNames() {
    return Array.from(emoteMap.keys())
  }

  return { getOtherEmote, getOtherEmoteNames }
}

export function useOtherEmotesLoader() {
  const [loading, setLoading] = useState(true)
  const { broadcaster } = useTokenInfo()

  useEffect(() => {
    async function loadOtherEmotes() {
      if (!loaded) {
        const [bttvEmotes, ffzEmotes] = await Promise.all([
          BetterTTV.getEmotes('twitch', broadcaster.id),
          FrankerFaceZ.getEmotes('twitch', broadcaster.id),
        ])

        if (bttvEmotes) bttvEmotes.forEach(loadEmote)
        if (ffzEmotes) ffzEmotes.forEach(loadEmote)
      }

      setLoading(false)
      loaded = true
    }

    loadOtherEmotes()
  }, [broadcaster])

  return { loading }
}

function loadEmote(emote: EmotePartInfo, name: string) {
  emoteMap.set(name, emote)
}
