import LoadingBanner from '@/components/banner/LoadingBanner'
import {
  usePlatformReady,
  usePlatformReadyDispatch,
} from '@/contexts/platform-ready/usePlatformReady'
import { useEffect } from 'react'
import Chat from './chat/Chat'
import useYoutubeBroadcaster from './useBroadcaster'
import useThirdPartyEmotes from './useThirdPartyEmotes'

export default function Youtube() {
  const { status: broadcasterStatus } = useYoutubeBroadcaster()
  const { status: thirdPartyEmotesStatus } = useThirdPartyEmotes()
  const { isPlatformReady } = usePlatformReady()
  const { setPlatformReady } = usePlatformReadyDispatch()

  const loading = [broadcasterStatus, thirdPartyEmotesStatus].some(
    status => status === 'pending',
  )

  // ensure that LoadingBanner isn't shown again after initial load
  useEffect(() => {
    if (!loading) setPlatformReady('youtube')
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [loading])

  if (!isPlatformReady('youtube')) {
    return (
      <LoadingBanner
        staticPosition
        message='Key verified! Loading YouTube data...'
        items={[
          { message: 'Loading broadcaster...', status: broadcasterStatus },
          {
            message: 'Loading third party emotes...',
            status: thirdPartyEmotesStatus,
          },
        ]}
      ></LoadingBanner>
    )
  }

  return <Chat />
}
