import Controls from './Controls'
import ErrorBanner from './banner/ErrorBanner'
import LoadingBanner from './banner/LoadingBanner'
import { MessageListProvider } from '@/contexts/MessageListContext'
import useAccessToken, {
  KeyInvalidError,
  KeyNotFoundError,
} from '@/services/useAccessToken'
import Twitch from '@/services/platforms/twitch'
import MessageList from './MessageList'
import { useEffect } from 'react'
import { useClientDispatch } from '@/contexts/ClientContext'

export default function App() {
  const { status: twitchStatus, error: twitchError } = useAccessToken('twitch')
  const { status: youtubeStatus, error: youtubeError } =
    useAccessToken('youtube')
  const dispatch = useClientDispatch()

  useEffect(() => {
    function setOnEvent(setFunction: Slime2.Client.OnEvent) {
      dispatch({ type: 'event', payload: setFunction })
    }

    function setOnModMessageDelete(
      setFunction: Slime2.Client.OnModMessageDelete,
    ) {
      dispatch({ type: 'modMessageDelete', payload: setFunction })
    }

    // allow client to set these functions
    slime2.onEvent = setOnEvent
    slime2.onModMessageDelete = setOnModMessageDelete
  }, [])

  if (twitchStatus === 'error' || youtubeStatus === 'error') {
    if (
      twitchError instanceof KeyNotFoundError &&
      youtubeError instanceof KeyNotFoundError
    ) {
      return <ErrorBanner message='No key found.' />
    }

    if (twitchError instanceof KeyInvalidError) {
      return <ErrorBanner message='Twitch key expired.' />
    }

    if (youtubeError instanceof KeyInvalidError) {
      return <ErrorBanner message='YouTube key expired.' />
    }
  }

  const loading = [twitchStatus, youtubeStatus].some(
    status => status === 'pending',
  )

  if (loading) {
    return <LoadingBanner message='Verifying Key...' />
  }

  return (
    <MessageListProvider>
      <div className='absolute inset-x-0'>
        <Twitch />
      </div>
      <Controls />
      <MessageList />
    </MessageListProvider>
  )
}
