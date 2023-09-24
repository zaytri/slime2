import { useEffect, useState } from 'react'
import useTestMessage from '../Twitch/hooks/useTestMessage'

type Style = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  transform?: string
}

const oneThird = 1 / 3
const halfPercent = '50%'
const sixthPercent = `${100 / 6}%`

export default function Controls() {
  const [style, setStyle] = useState<Style>({
    top: halfPercent,
    left: halfPercent,
    transform: 'translate(-50%, -50%)',
  })
  const [visible, setVisible] = useState(false)

  const { sendTestMessage } = useTestMessage()

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      const mouseX = event.clientX
      const mouseY = event.clientY

      if (mouseY < windowHeight * oneThird) {
        if (mouseX < windowWidth * oneThird) {
          // top left
          setStyle({
            top: sixthPercent,
            left: sixthPercent,
            transform: 'translate(-50%, -50%)',
          })
        } else if (mouseX < windowWidth * oneThird * 2) {
          // top center
          setStyle({
            top: sixthPercent,
            left: halfPercent,
            transform: 'translate(-50%, -50%)',
          })
        } else {
          // top right
          setStyle({
            top: sixthPercent,
            right: sixthPercent,
            transform: 'translate(50%, -50%)',
          })
        }
      } else if (mouseY < windowHeight * oneThird * 2) {
        if (mouseX < windowWidth * oneThird) {
          // center left
          setStyle({
            top: halfPercent,
            left: sixthPercent,
            transform: 'translate(-50%, -50%)',
          })
        } else if (mouseX < windowWidth * oneThird * 2) {
          // center
          setStyle({
            top: halfPercent,
            left: halfPercent,
            transform: 'translate(-50%, -50%)',
          })
        } else {
          // center right
          setStyle({
            top: halfPercent,
            right: sixthPercent,
            transform: 'translate(50%, -50%)',
          })
        }
      } else {
        if (mouseX < windowWidth * oneThird) {
          // bottom left
          setStyle({
            bottom: sixthPercent,
            left: sixthPercent,
            transform: 'translate(-50%, 50%)',
          })
        } else if (mouseX < windowWidth * oneThird * 2) {
          // bottom center
          setStyle({
            bottom: sixthPercent,
            left: halfPercent,
            transform: 'translate(-50%, 50%)',
          })
        } else {
          // bottom right
          setStyle({
            bottom: sixthPercent,
            right: sixthPercent,
            transform: 'translate(50%, 50%)',
          })
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
