import { WindowListProvider } from '@/contexts/window-list/WindowListProvider'
import { useWindowList } from '@/contexts/window-list/useWindowList'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Window from './Window'

function Settings() {
  const [hidden, setHidden] = useState<boolean>()
  const windowList = useWindowList()

  useEffect(() => {
    function onMouseMove() {
      setHidden(false)
    }

    function onMouseLeave() {
      setHidden(true)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  if (hidden === undefined) return null

  return (
    <div
      id='slime2-windows'
      className={clsx(
        hidden ? 'slime2-window-exit' : 'slime2-window-enter',
        'pointer-events-none absolute left-0 top-0 h-screen w-screen p-2',
      )}
    >
      {windowList.map(windowProps => (
        <Window {...windowProps} key={windowProps.id} />
      ))}
    </div>
  )
}

export default function WindowedSettings() {
  return (
    <WindowListProvider>
      <Settings />
    </WindowListProvider>
  )
}
