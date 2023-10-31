import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import useEmulateTwitchMessage from '@/services/platforms/twitch/chat/useEmulate'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import SettingsWindow from './SettingsWindow'

export default function Controls() {
  const [visible, setVisible] = useState(false)
  const [displaySettings, setDisplaySettings] = useState(false)

  const emulate = useEmulateTwitchMessage()
  const { isPlatformReady } = usePlatformReady()
  const ready = isPlatformReady('twitch')

  useEffect(() => {
    function onMouseMove() {
      setVisible(true)
    }

    function onMouseLeave() {
      setVisible(false)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [emulate])

  if (displaySettings)
    return <SettingsWindow close={() => setDisplaySettings(false)} />

  if (!visible) return null

  return (
    <>
      <div className='!fixed z-[999] flex justify-center flex-col gap-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
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
          onClick={() => setDisplaySettings(true)}
          className={clsx(
            'flex justify-center overflow-hidden rounded-2xl border-2 border-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-3 py-1 text-center',
            ready &&
              'btn-shadow-i hover:from-lime-500 hover:to-emerald-600 focus:outline-offset-8',
            !ready && 'grayscale',
          )}
          disabled={!ready}
        >
          <span className='font-grandstander font-semibold text-lime-100 text-shadow text-shadow-c-black/75 text-shadow-y-px'>
            {ready ? 'Settings' : 'Loading...'}
          </span>
        </button>
      </div>
    </>
  )
}
