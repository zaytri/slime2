import { useEffect, useState } from 'react'
import useTestMessage from '../Twitch/hooks/useTestMessage'

type Position = {
  x: number
  y: number
}

export default function CursorControls() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)

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

    function onMouseDown(_: MouseEvent) {
      setMouseDown(true)
    }

    function onMouseUp(_: MouseEvent) {
      setMouseDown(false)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [sendTestMessage])

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        width: 400,
        transform: 'translate(-50%, calc(-100% - 10px))',
        top: position.y,
        opacity: visible ? 1 : 0,
        background: mouseDown ? '#0000008D' : '#0008',
        border: mouseDown ? '8px inset #0008' : '8px outset #0008',
        color: 'white',
        fontFamily: 'sans-serif',
        borderRadius: 10,
        padding: 12,
        userSelect: 'none',
        overflow: 'hidden',
        zIndex: 999,
        textShadow:
          '0 -1px black, 0 1px black, -1px 0 black, 1px 0 black, 0 -2px black, 0 2px black, -2px 0 black, 2px 0 black, -1px -1px black, 1px -1px black, -1px 1px black, 1px 1px black, -2px -2px rgba(0, 0, 0, 0.25), 2px -2px rgba(0, 0, 0, 0.25), -2px 2px rgba(0, 0, 0, 0.25), 2px 2px rgba(0, 0, 0, 0.25), 0 0 1px black, 0 0 2px black',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      Click to Send a Test Message
    </div>
  )
}
