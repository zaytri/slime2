import { useEffect, useState } from 'react'
import { useTokenInfo } from './useTokenInfo'
import { apiClient } from '../helpers/twitchAuthentication'
import { HelixCheermoteList } from '@twurple/api/lib'

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

  function getCheermote(name: string, amount: number) {
    return cheermotes.getCheermoteDisplayInfo(name, amount, {
      background: 'light',
      scale: '4',
      state: 'animated',
    })
  }

  return { getCheermoteNames, getCheermote }
}
