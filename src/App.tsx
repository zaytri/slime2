import { useCallback, useEffect, useRef } from 'react'
import ErrorBanner from './components/banner/ErrorBanner'
import LoadingBanner from './components/banner/LoadingBanner'
import { useClient, useClientDispatch } from './contexts/client/useClient'
import {
  getGroup,
  useWidgetValues,
  useWidgetValuesDispatch,
} from './contexts/widget-values/useWidgetValues'
import Slime2Color from './services/color'
import { cloneTemplate } from './services/helpers'
import Twitch from './services/platforms/twitch/Twitch'
import Random from './services/random'
import { widgetStorage } from './services/storage'
import useAccessToken, {
  KeyInvalidError,
  KeyNotFoundError,
} from './services/useAccessToken'

export default function App() {
  const { status: twitchStatus, error: twitchError } = useAccessToken('twitch')
  const clientReady = useRef(false)
  const widgetValuesResolve = useRef<(() => void) | null>(null)
  const {
    onEvent,
    setKey,
    setPlatform,
    setMaxEvents,
    setEventDelay,
    setEventExpiration,
    createWidgetSettings,
  } = useClientDispatch()
  const { loadValues } = useWidgetValuesDispatch()
  const widgetValues = useWidgetValues()
  const { platforms } = useClient()

  const getData = useCallback(
    (
      groupId?: Widget.Setting.GroupId,
      id?: string,
    ): Widget.ValueGroup | Widget.ValueGroup['key'] | null => {
      if (!Array.isArray(groupId)) return widgetValues

      const group = getGroup(widgetValues, groupId)

      return typeof id !== 'string' ? group : group?.[id] || null
    },
    [widgetValues],
  )

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
      storage: widgetStorage,
      color: Slime2Color,
      random: Random,
      cloneTemplate,
      widget: {
        loadSettings: (dataFileName: string, settings: Widget.Setting[]) => {
          createWidgetSettings(dataFileName, settings)
          return new Promise(resolve => {
            widgetValuesResolve.current = resolve
          })
        },
        loadPlatform: setPlatform,
        setData: (values: Widget.ValueGroup) => {
          loadValues(values)
        },
        getData,
      },
    }

    dispatchEvent(new CustomEvent('slime2:ready'))

    clientReady.current = true
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  useEffect(() => {
    if (Object.keys(widgetValues).length) {
      const resolve = widgetValuesResolve.current
      if (resolve) {
        globalThis.slime2.widget.getData = getData
        resolve()
        dispatchEvent(new CustomEvent('slime2:widget-data-update'))
      }
    }
  }, [widgetValues, getData])

  if (platforms.includes('twitch')) {
    if (twitchError instanceof KeyNotFoundError) {
      return <ErrorBanner message='Twitch key not found.' />
    }

    if (twitchError instanceof KeyInvalidError) {
      return <ErrorBanner message='Twitch key expired.' />
    }
  }

  const loading =
    !!platforms.length && [twitchStatus].some(status => status === 'pending')

  if (loading) {
    return <LoadingBanner message='Verifying Key...' />
  }

  return (
    <div className='absolute inset-x-0'>
      {twitchStatus === 'success' && <Twitch />}
    </div>
  )
}
