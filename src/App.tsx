import { useEffect, useRef } from 'react'
import Controls from './components/Controls'
import EventList from './components/EventList'
import ErrorBanner from './components/banner/ErrorBanner'
import LoadingBanner from './components/banner/LoadingBanner'
import { useClientDispatch } from './contexts/client/useClient'
import { EventListProvider } from './contexts/event-list/EventListProvider'
import Slime2Color from './services/color'
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
  const { onEvent, setKey, setMaxEvents, setEventDelay, setEventExpiration } =
    useClientDispatch()

  // set functions for global var slime2
  useEffect(() => {
    if (clientReady.current) return

    // create client to allow widget to use these functions
    globalThis.slime2 = {
      onEvent,
      setKey,
      setMaxEvents,
      setEventDelay,
      setEventExpiration,
      storage: {
        permanent: widgetStorage,
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        temporary: new Map<string, any>(),
      },
      color: Slime2Color,
      random: Random,
      cloneTemplate,
    }

    dispatchEvent(new CustomEvent('slime2:ready'))

    clientReady.current = true
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  if (twitchStatus === 'error' || youtubeStatus === 'error') {
    if (
      [twitchError, youtubeError].every(
        error => error instanceof KeyNotFoundError,
      )
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
    <EventListProvider>
      <div className='absolute inset-x-0'>
        {twitchStatus === 'success' && <Twitch />}
        {youtubeStatus === 'success' && <YouTube />}
      </div>
      <Controls />
      <EventList />
    </EventListProvider>
  )
}

function cloneTemplate(id: string): DocumentFragment {
  const element = document.getElementById(id) as HTMLTemplateElement
  if (!element) throw Error(`Template with id "${id}" not found.`)
  if (element.tagName !== 'TEMPLATE')
    throw Error(`Element with id "${id}" is not a template.`)

  return element.content.cloneNode(true) as DocumentFragment
}
