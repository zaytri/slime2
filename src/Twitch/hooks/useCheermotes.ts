import { useEffect, useState } from 'react'
import { useTokenInfo } from './useTokenInfo'
import { apiClient } from '../helpers/twitchAuthentication'
import { HelixCheermoteList } from '@twurple/api/lib'
import { EmoteUrls } from '../types'

let cheermotes: HelixCheermoteList
let loaded = false

export function useCheermotesLoader() {
  const [loading, setLoading] = useState(true)
  const { broadcaster } = useTokenInfo()

  useEffect(() => {
    async function loadCheermotes() {
      if (!loaded) {
        cheermotes = await apiClient.bits.getCheermotes(broadcaster.id)
      }

      setLoading(false)
      loaded = true
    }

    loadCheermotes()
  }, [broadcaster])

  return { loading }
}

export default function useCheermotes() {
  function getCheermoteNames() {
    return cheermotes.getPossibleNames()
  }

  function getCheerColor(name: string, amount: number) {
    return cheermotes.getCheermoteDisplayInfo(name, amount, {
      background: 'light',
      scale: '4',
      state: 'animated',
    }).color
  }

  function getCheermoteUrls(
    name: string,
    amount: number,
    staticEmote: boolean = false,
  ): EmoteUrls {
    function getCheermoteUrl(size: '1' | '1.5' | '2' | '3' | '4' = '4') {
      return cheermotes.getCheermoteDisplayInfo(name, amount, {
        background: 'light',
        scale: size,
        state: staticEmote ? 'static' : 'animated',
      }).url
    }

    return {
      x1: getCheermoteUrl('1'),
      x2: getCheermoteUrl('2'),
      x4: getCheermoteUrl('4'),
    }
  }

  return { getCheermoteNames, getCheerColor, getCheermoteUrls }
}
