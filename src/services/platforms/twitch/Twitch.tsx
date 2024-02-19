import LoadingBanner from '@/components/banner/LoadingBanner'
import SuccessBanner from '@/components/banner/SuccessBanner'
import {
  usePlatformReady,
  usePlatformReadyDispatch,
} from '@/contexts/platform-ready/usePlatformReady'
import { useEffect } from 'react'
import useChatClient from './chat/useChatClient'
import useBadges from './useBadges'
import useTwitchBroadcaster from './useBroadcaster'
import useChannelEmotes from './useChannelEmotes'
import useChannelPointRewards from './useChannelPointRewards'
import useCheermotes from './useCheermotes'
import { useAllPronouns } from './usePronouns'
import useThirdPartyEmotes from './useThirdPartyEmotes'

export default function Twitch() {
  const { data: broadcaster, status: broadcasterStatus } =
    useTwitchBroadcaster()
  const { status: badgesStatus } = useBadges()
  const { status: channelEmotesStatus } = useChannelEmotes()
  const { status: channelPointRewardsStatus } = useChannelPointRewards()
  const { status: cheermotesStatus } = useCheermotes()
  const { status: thirdPartyEmotesStatus } = useThirdPartyEmotes()
  const { isPlatformReady } = usePlatformReady()
  const { setPlatformReady } = usePlatformReadyDispatch()
  useAllPronouns() // prefetch pronouns without waiting for result
  useChatClient()

  const loading = [
    broadcasterStatus,
    badgesStatus,
    channelEmotesStatus,
    channelPointRewardsStatus,
    cheermotesStatus,
    thirdPartyEmotesStatus,
  ].some(status => status === 'pending')

  // ensure that LoadingBanner isn't shown again after initial load
  useEffect(() => {
    if (!loading) setPlatformReady('twitch')
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [loading])

  if (!isPlatformReady('twitch')) {
    return (
      <LoadingBanner
        staticPosition
        message='Key verified! Loading Twitch data...'
        items={[
          { message: 'Loading broadcaster...', status: broadcasterStatus },
          { message: 'Loading badges...', status: badgesStatus },
          { message: 'Loading channel emotes...', status: channelEmotesStatus },
          {
            message: 'Loading channel point rewards...',
            status: channelPointRewardsStatus,
          },
          { message: 'Loading cheermotes...', status: cheermotesStatus },
          {
            message: 'Loading third party emotes...',
            status: thirdPartyEmotesStatus,
          },
        ]}
      ></LoadingBanner>
    )
  }

  return (
    <SuccessBanner
      broadcaster={broadcaster!}
      platform='twitch'
      staticPosition
    />
  )
}
