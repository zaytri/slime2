import { memo, useEffect, useRef } from 'react'
import { useMessageListDispatch } from './contexts/MessageListContext'
import imagesLoaded from 'imagesloaded'

import type { TwitchMessage } from './types'

function Message(props: TwitchMessage) {
  const dispatch = useMessageListDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const hasCalledCallback = useRef(false)

  // allows the user client JS to manually remove messages
  function clientRemoveMessage() {
    dispatch({ type: 'remove', payload: props.id, moderator: false })
  }

  // send message data and deleteMessage function to the user,
  // getting [userFragment, userCallback] in return
  const userRender = slime2Chat.onMessage({
    message: props,
    deleteMessage: clientRemoveMessage,
  })

  const [userFragment, userCallback] = userRender || []

  let innerHTML = ''
  if (userFragment) {
    const fragment =
      userFragment instanceof DocumentFragment
        ? userFragment // DocumentFragment
        : userFragment[0] // JQuery<DocumentFragment>

    // create a temporary element to get the innerHTML of the fragment,
    // because it's not possible to directly get that from a DocumentFragment
    const tempRoot = document.createElement('div')
    tempRoot.appendChild(fragment)
    innerHTML = tempRoot.innerHTML
    tempRoot.remove()
  }

  useEffect(() => {
    // runs the user-defined callback function once all the images of the
    // message have been loaded, allowing the user to accurately get the
    // dimensions of the message
    if (
      userFragment &&
      userCallback &&
      ref.current &&
      !hasCalledCallback.current
    ) {
      hasCalledCallback.current = true
      // use the element that the user defined
      const element = ref.current.firstElementChild as HTMLElement
      imagesLoaded(element, () => {
        userCallback(element)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // delete message and show nothing if the client doesn't return a fragment
  if (!userFragment) {
    clientRemoveMessage()
    return null
  }

  return (
    <div
      id='slime2-chat-message'
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      ref={ref}
    ></div>
  )
}

// memo necessary so that messages don't get re-rendered
// when the message list is updated
export default memo(Message)
