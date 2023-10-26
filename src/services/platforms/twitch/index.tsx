import LoadingBanner from '@/components/banner/LoadingBanner'
import SuccessBanner from '@/components/banner/SuccessBanner'
import { usePlatformReady } from '@/contexts/platform-ready/useContext'
import { useEffect } from 'react'
import ChatHandler from './chat'
import useBadges from './useBadges'
import useTwitchBroadcaster from './useBroadcaster'
import useChannelEmotes from './useChannelEmotes'
import useChannelPointRewards from './useChannelPointRewards'
import useCheermotes from './useCheermotes'
import { useAllPronouns } from './usePronouns'
import useThirdPartyEmotes from './useThirdPartyEmotes'

export default function TwitchLoader() {
  const { data: broadcaster, status: broadcasterStatus } =
    useTwitchBroadcaster()
  const { status: badgesStatus } = useBadges()
  const { status: channelEmotesStatus } = useChannelEmotes()
  const { status: channelPointRewardsStatus } = useChannelPointRewards()
  const { status: cheermotesStatus } = useCheermotes()
  const { status: allPronounsStatus } = useAllPronouns()
  const { status: thirdPartyEmotesStatus } = useThirdPartyEmotes()
  const [platformReady, setPlatformReady] = usePlatformReady('twitch')

  const loading = [
    broadcasterStatus,
    badgesStatus,
    channelEmotesStatus,
    channelPointRewardsStatus,
    cheermotesStatus,
    allPronounsStatus,
    thirdPartyEmotesStatus,
  ].some(status => status === 'pending')

  // keep LoadingBanner shown for 1.5 extra seconds
  // also ensure that LoadingBanner isn't shown again after initial load
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setPlatformReady()
      }, 1.5 * 1000)
    }
  }, [loading, setPlatformReady])

  if (!platformReady) {
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
          { message: 'Loading pronouns...', status: allPronounsStatus },
          {
            message: 'Loading third party emotes...',
            status: thirdPartyEmotesStatus,
          },
        ]}
      ></LoadingBanner>
    )
  }

  return (
    <>
      <SuccessBanner broadcaster={broadcaster!} staticPosition />
      <ChatHandler />
    </>
  )
}
