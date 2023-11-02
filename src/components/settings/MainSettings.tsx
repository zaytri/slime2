import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import { useWindowListDispatch } from '@/contexts/window-list/useWindowList'
import useEmulateTwitchMessage from '@/services/platforms/twitch/chat/useEmulate'
import clsx from 'clsx'
import WidgetSettings from './WidgetSettings'

export default function MainSettings() {
  const emulate = useEmulateTwitchMessage()
  const { isPlatformReady } = usePlatformReady()
  const ready = isPlatformReady('twitch')
  const { openWindow } = useWindowListDispatch()

  return (
    <div className='flex flex-col justify-center gap-2 p-3'>
      <button
        onClick={emulate}
        className={clsx(
          'flex justify-center overflow-hidden rounded-2xl border-2 border-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-3 py-1 text-center',
          ready &&
            'btn-shadow-i hover:from-lime-500 hover:to-emerald-600 focus:outline-offset-8',
          !ready && 'grayscale',
        )}
        disabled={!ready}
      >
        <span className='font-grandstander font-semibold text-lime-100 text-shadow text-shadow-c-black/75 text-shadow-y-px'>
          {ready ? 'Send Test Message' : 'Loading...'}
        </span>
      </button>
      <button
        onClick={() =>
          openWindow({
            id: 'widget-settings',
            title: 'Widget Settings',
            className: 'w-96',
            children: <WidgetSettings />,
          })
        }
        className={clsx(
          'flex justify-center overflow-hidden rounded-2xl border-2 border-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-3 py-1 text-center',
          ready &&
            'btn-shadow-i hover:from-lime-500 hover:to-emerald-600 focus:outline-offset-8',
          !ready && 'grayscale',
        )}
        disabled={!ready}
      >
        <span className='font-grandstander font-semibold text-lime-100 text-shadow text-shadow-c-black/75 text-shadow-y-px'>
          {ready ? 'Widget Settings' : 'Loading...'}
        </span>
      </button>
    </div>
  )
}
