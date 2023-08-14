import { MessageListProvider } from './contexts/MessageList'
import ChatHandler from './ChatHandler'
import Loading from '../components/Loading'
import Connected from '../components/Connected'
import { usePronounsLoader } from './hooks/usePronouns'
import { useRewardsLoader } from './hooks/useRewards'
import { useCheermotesLoader } from './hooks/useCheermotes'
import { useOtherEmotesLoader } from './hooks/useOtherEmotes'
import { useBadgesLoader } from './hooks/useBadges'
import { useChannelEmotesLoader } from './hooks/useChannelEmotes'

export default function Twitch() {
  const { loading: loadingPronouns } = usePronounsLoader()
  const { loading: loadingRewards } = useRewardsLoader()
  const { loading: loadingCheermotes } = useCheermotesLoader()
  const { loading: loadingOtherEmotes } = useOtherEmotesLoader()
  const { loading: loadingBadges } = useBadgesLoader()
  const { loading: loadingChannelEmotes } = useChannelEmotesLoader()

  if (
    loadingPronouns ||
    loadingRewards ||
    loadingCheermotes ||
    loadingOtherEmotes ||
    loadingBadges ||
    loadingChannelEmotes
  ) {
    return <Loading message='Connecting to Chat...' />
  }

  return (
    <>
      <Connected />
      <MessageListProvider>
        <ChatHandler />
      </MessageListProvider>
    </>
  )
}
