import { useEffect, useState } from 'react'
import useTestMessage from '../Twitch/hooks/useTestMessage'

type Style = {
  top?: number | string
  bottom?: number
  left?: number | string
  right?: number
  transform?: string
}

const POSITION_MARGIN = 20

export default function Controls() {
  const [style, setStyle] = useState<Style>({
    bottom: POSITION_MARGIN,
    right: POSITION_MARGIN,
  })
  const [visible, setVisible] = useState(false)

  const { sendTestMessage } = useTestMessage()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      const mouseX = event.clientX
      const mouseY = event.clientY

      if (
        mouseX > windowWidth * 0.3 &&
        mouseX < windowWidth * 0.7 &&
        mouseY > windowHeight * 0.3 &&
        mouseY < windowHeight * 0.7
      ) {
        setStyle({
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        })
      } else if (mouseX < windowWidth / 2) {
        if (mouseY < windowHeight / 2) {
          setStyle({ top: POSITION_MARGIN, left: POSITION_MARGIN })
        } else {
          setStyle({ bottom: POSITION_MARGIN, left: POSITION_MARGIN })
        }
      } else {
        if (mouseY < windowHeight / 2) {
          setStyle({ top: POSITION_MARGIN, right: POSITION_MARGIN })
        } else {
          setStyle({ bottom: POSITION_MARGIN, right: POSITION_MARGIN })
        }
      }
    }

    function onMouseEnter(_: MouseEvent) {
      setVisible(true)
    }

    function onMouseLeave(_: MouseEvent) {
      setVisible(false)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [sendTestMessage])

  if (!visible) return null

  return (
    <button
      onClick={sendTestMessage}
      className='btn-shadow-i !fixed z-[999] flex justify-center gap-2 overflow-hidden rounded-2xl border-2 border-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-3 py-1 text-center hover:from-lime-500 hover:to-emerald-600 focus:outline-offset-8'
      style={{ ...style }}
    >
      <span className='font-grandstander font-semibold text-lime-100 text-shadow text-shadow-c-black/75 text-shadow-y-px'>
        Send Test Message
      </span>
    </button>
  )
}
