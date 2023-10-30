import LoadingBanner from '@/components/banner/LoadingBanner'
import SuccessBanner from '@/components/banner/SuccessBanner'
import useYoutubeBroadcaster from '../useBroadcaster'
import useChatClient from './useChatClient'
import useCountdown from './useCountdown'
import useLiveChatId from './useLiveChatId'

export default function Chat() {
  const { data: broadcaster } = useYoutubeBroadcaster()
  const { status, retryDate } = useLiveChatId()
  const countdown = useCountdown(retryDate)
  useChatClient()

  if (status !== 'success') {
    if (retryDate && countdown > 0) {
      return (
        <LoadingBanner
          message={`YouTube live broadcast not found. Searching again in ${countdown} seconds...`}
        />
      )
    }

    return (
      <LoadingBanner message={'Searching for your YouTube live broadcast...'} />
    )
  }

  return (
    <SuccessBanner
      broadcaster={broadcaster!}
      platform='youtube'
      staticPosition
    />
  )
}
