import { useWindowList } from '@/contexts/window-list/useWindowList'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Window from './Window'

export default function Settings() {
  const [hidden, setHidden] = useState<boolean>()
  const windowList = useWindowList()

  useEffect(() => {
    let timer: NodeJS.Timeout

    function onMouseMove() {
      clearTimeout(timer)
      setHidden(false)
    }

    function onMouseLeave() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (import.meta.env.DEV) return

        setHidden(true)
      }, 1000)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      clearTimeout(timer)
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
