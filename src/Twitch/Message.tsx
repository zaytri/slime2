import { useEffect, useRef, useState } from 'react'
import { AfterRenderCallback } from '../global'
import { useMessageListDispatch } from './contexts/MessageList'

import type { TwitchMessage } from './types'

type MessageProps = {
  data: TwitchMessage
}

export default function Message({ data }: MessageProps) {
  const [rendered, setRendered] = useState(false)
  const dispatch = useMessageListDispatch()

  // allows the user to manually remove messages
  function userRemoveMessage() {
    dispatch({ type: 'remove', payload: data.id })
  }

  // create a temporary element
  // necessary because it's not possible to directly get the
  // innerHTML string of a DocumentFragment
  const tempRoot = document.createElement('div')

  // get the user-defined fragment and after render callback
  let fragment: DocumentFragment | undefined = undefined
  let callback: AfterRenderCallback | undefined = undefined

  const userRender = slime2Chat.onMessage({
    message: data,
    deleteMessage: userRemoveMessage,
  })
  if (userRender) {
    const [userFragment, userCallback] = userRender
    if (userFragment instanceof DocumentFragment) {
      fragment = userFragment
    } else if (userFragment) {
      fragment = userFragment[0]
    }
    callback = userCallback
  }

  // append the fragment to the temporary element, get the innerHTML of it as
  // a string, then remove the temporary element
  let innerHTML = ''
  if (fragment) {
    tempRoot.appendChild(fragment)
    innerHTML = tempRoot.innerHTML
    tempRoot.remove()
  }

  // runs the callback function and passes the outer container of the message
  // as a HTMLDivElement to the user so that they can use that chat message
  // element specifically without needing to query it themselves
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setRendered(true)
    if (rendered && callback) {
      callback(ref.current!.firstElementChild as HTMLElement)
    }
  }, [rendered, callback])

  if (!userRender) return null

  return (
    <div
      id='slime2-chat-message'
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      ref={ref}
    ></div>
  )
}
