import { useEffect, useState } from 'react'
import useTestMessage from '../Twitch/hooks/useTestMessage'

type Position = {
  x: number
  y: number
}

export default function CursorControls() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const { sendTestMessage } = useTestMessage()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    function onClick(_: MouseEvent) {
      sendTestMessage()
    }

    function onMouseEnter(_: MouseEvent) {
      setVisible(true)
    }

    function onMouseLeave(_: MouseEvent) {
      setVisible(false)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [sendTestMessage])

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        width: 450,
        transform: 'translate(-50%, calc(-100% - 10px))',
        top: position.y,
        opacity: visible ? 1 : 0,
        textAlign: 'center',
        background: '#000A',
        color: 'white',
        fontFamily: 'sans-serif',
        borderRadius: 10,
        padding: 20,
        userSelect: 'none',
        zIndex: 999,
      }}
    >
      Left Click to Send a Test Message
    </div>
  )
}
