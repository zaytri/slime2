import { useClient } from '@/contexts/client/useContext'
import { useEventListDispatch } from '@/contexts/event-list/useContext'
import imagesLoaded from 'imagesloaded'
import { memo, useEffect, useRef, useState } from 'react'

function Event(renderableEvent: Slime2.RenderableEvent) {
  const client = useClient()
  const dispatch = useEventListDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  const clientRenderRef = useRef<Slime2.Client.OnEventReturn>()
  const [innerHTML, setInnerHTML] = useState<string>()

  // allows the user client JS to manually remove messages
  function clientRemoveEvent() {
    dispatch({
      type: 'remove',
      eventType: renderableEvent.type,
      eventId: renderableEvent.data.id,
    })
  }

  useEffect(() => {
    let cancel = false

    async function processFragment() {
      // prevent calling onEvent twice in development
      if (clientRenderRef.current) return

      // send message data and deleteMessage function to the user,
      // getting { fragment, callback } in return
      const eventReturn = await client.onEvent({
        ...renderableEvent,
        remove: clientRemoveEvent,
      })

      // ignore if unmounted
      if (cancel) return

      clientRenderRef.current = eventReturn || {}

      const { fragment } = clientRenderRef.current

      setInnerHTML(generateInnerHTML(fragment))
    }

    processFragment()

    return () => {
      cancel = true
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  useEffect(() => {
    if (!divRef.current || !clientRenderRef.current || !innerHTML) return

    const { callback } = clientRenderRef.current
    if (!callback) return

    // runs the user-defined callback function once all the images of the
    // message have been loaded, allowing the user to accurately get the
    // dimensions of the message
    const element = divRef.current.firstElementChild as HTMLElement
    imagesLoaded(element, () => {
      callback(element)
    })
  }, [innerHTML])

  // remove message if the client doesn't return a fragment
  if (innerHTML === '') clientRemoveEvent()

  // show nothing if innerHTML is undefined or empty string
  if (!innerHTML) return null

  return (
    <div
      className='slime2-event'
      data-event-id={renderableEvent.data.id}
      data-event-type={renderableEvent.type}
      data-event-source={renderableEvent.source}
      dangerouslySetInnerHTML={{ __html: innerHTML }}
      ref={divRef}
    ></div>
  )
}

// memo necessary so that messages don't get re-rendered
// when the message list is updated
const MemoEvent = memo(Event)
export default MemoEvent

function generateInnerHTML(clientFragment?: Slime2.Client.Fragment): string {
  if (!clientFragment) return ''

  const fragment =
    clientFragment instanceof DocumentFragment
      ? clientFragment // DocumentFragment
      : clientFragment[0] // JQuery<DocumentFragment>

  // create a temporary element to get the innerHTML of the fragment,
  // because it's not possible to directly get that from a DocumentFragment
  const tempRoot = document.createElement('div')
  tempRoot.appendChild(fragment)
  const innerHTML = tempRoot.innerHTML
  tempRoot.remove()
  return innerHTML
}
