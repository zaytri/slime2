import { useQuery } from '@tanstack/react-query'
import useTwitchApi from './useApi'
import useTwitchBroadcaster from './useBroadcaster'
import { HelixCheermoteList } from '@twurple/api'
import { infiniteCache } from '@/services/settings'

export default function useCheermotes() {
  const { data: broadcaster } = useTwitchBroadcaster()
  const api = useTwitchApi()

  return useQuery({
    enabled: !!broadcaster,
    queryKey: ['twitch', 'cheermotes', broadcaster?.id],
    queryFn: async () => {
      const cheermoteList = await api.bits.getCheermotes(broadcaster!.id)
      return new Cheermotes(cheermoteList)
    },
    ...infiniteCache,
  })
}

class Cheermotes {
  private readonly cheermoteList: HelixCheermoteList

  constructor(cheermoteList: HelixCheermoteList) {
    this.cheermoteList = cheermoteList
  }

  getAllNames() {
    return this.cheermoteList.getPossibleNames()
  }

  get(name: string, amount: number): Twitch.Event.Message.Cheermote {
    return {
      name,
      amount,
      color: this.cheerColor(name, amount),
      images: {
        default: this.buildCheermoteUrls(name, amount),
        static: this.buildCheermoteUrls(name, amount, true),
      },
    }
  }

  private cheerColor(name: string, amount: number) {
    return this.cheermoteList.getCheermoteDisplayInfo(name, amount, {
      background: 'light',
      scale: '1',
      state: 'static',
    }).color
  }

  private buildCheermoteUrls(
    name: string,
    amount: number,
    staticEmote: boolean = false,
  ): Slime2.Event.Message.Emote.Urls {
    const cheermoteList = this.cheermoteList

    function buildCheermoteUrl(size: '1' | '2' | '4') {
      return cheermoteList.getCheermoteDisplayInfo(name, amount, {
        background: 'light',
        scale: size,
        state: staticEmote ? 'static' : 'animated',
      }).url
    }

    return {
      x1: buildCheermoteUrl('1'),
      x2: buildCheermoteUrl('2'),
      x4: buildCheermoteUrl('4'),
    }
  }
}
