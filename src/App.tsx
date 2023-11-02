import { useEffect, useRef } from 'react'
import ErrorBanner from './components/banner/ErrorBanner'
import LoadingBanner from './components/banner/LoadingBanner'
import { useClient, useClientDispatch } from './contexts/client/useClient'
import Slime2Color from './services/color'
import { cloneTemplate } from './services/helpers'
import Twitch from './services/platforms/twitch/Twitch'
import YouTube from './services/platforms/youtube/YouTube'
import Random from './services/random'
import { widgetStorage } from './services/storage'
import useAccessToken, {
  KeyInvalidError,
  KeyNotFoundError,
} from './services/useAccessToken'

export default function App() {
  const { status: twitchStatus, error: twitchError } = useAccessToken('twitch')
  const { status: youtubeStatus, error: youtubeError } =
    useAccessToken('google')
  const clientReady = useRef(false)
  const {
    onEvent,
    setKey,
    setPlatform,
    setMaxEvents,
    setEventDelay,
    setEventExpiration,
    setWidgetSettingsPage,
  } = useClientDispatch()
  const { platforms } = useClient()

  // set functions for global var slime2
  useEffect(() => {
    if (clientReady.current) return

    // create client to allow widget to use these functions
    globalThis.slime2 = {
      onEvent,
      setKey,
      setPlatform,
      setMaxEvents,
      setEventDelay,
      setEventExpiration,
      setWidgetSettingsPage,
      storage: widgetStorage,
      color: Slime2Color,
      random: Random,
      cloneTemplate,
    }

    dispatchEvent(new CustomEvent('slime2:ready'))

    clientReady.current = true
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  if (platforms.includes('twitch')) {
    if (twitchError instanceof KeyNotFoundError) {
      return <ErrorBanner message='Twitch key not found.' />
    }

    if (twitchError instanceof KeyInvalidError) {
      return <ErrorBanner message='Twitch key expired.' />
    }
  }

  if (platforms.includes('youtube')) {
    if (youtubeError instanceof KeyNotFoundError) {
      return <ErrorBanner message='YouTube key not found.' />
    }

    if (youtubeError instanceof KeyInvalidError) {
      return <ErrorBanner message='YouTube key expired.' />
    }
  }

  const loading =
    !!platforms.length &&
    [twitchStatus, youtubeStatus].some(status => status === 'pending')

  if (loading) {
    return <LoadingBanner message='Verifying Key...' />
  }

  return (
    <div className='absolute inset-x-0'>
      {twitchStatus === 'success' && <Twitch />}
      {youtubeStatus === 'success' && <YouTube />}
    </div>
  )
}
