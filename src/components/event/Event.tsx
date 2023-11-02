import { useClient } from '@/contexts/client/useClient'
import { useEventListDispatch } from '@/contexts/event-list/useEventList'
import { generateInnerHTML } from '@/services/helpers'
import imagesLoaded from 'imagesloaded'
import { memo, useEffect, useRef, useState } from 'react'

function Event(renderableEvent: Slime2.RenderableEvent) {
  const client = useClient()
  const { removeEvent } = useEventListDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  const clientRenderRef = useRef<Slime2.Client.OnEventReturn>()
  const eventSentRef = useRef(false)
  const [innerHTML, setInnerHTML] = useState<string>()

  function remove() {
    removeEvent(renderableEvent.type, renderableEvent.id)
  }

  useEffect(() => {
    // prevent calling sendEvent multiple times for the same event
    if (eventSentRef.current) return

    async function processFragment() {
      eventSentRef.current = true

      // send the event to the widget, getting { fragment, callback } in return
      const eventReturn = await client.sendEvent({ ...renderableEvent })

      clientRenderRef.current = eventReturn || {}

      const { fragment } = clientRenderRef.current

      setInnerHTML(fragment ? generateInnerHTML(fragment) : '')
    }

    processFragment()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  useEffect(() => {
    if (!divRef.current || !clientRenderRef.current || !innerHTML) return

    const { callback } = clientRenderRef.current

    // remove event after expiration time
    function expire(
      time: number,
      options?: Slime2.Client.EventExpirationOptions,
    ) {
      setTimeout(() => {
        if (!options || !options.animationTime) {
          remove()
        } else {
          // remove after expiration time + animation time
          const { animationTime, animationClass, animationFunction } = options

          // apply animation class and run animation function if they exist
          if (animationClass) element.classList.add(animationClass)
          if (animationFunction) animationFunction(element)

          setTimeout(remove, animationTime)
        }
      }, time)
    }

    // wait for all the images of the event to load,
    // allowing the widget to accurately get the dimensions
    const element = divRef.current.firstElementChild as HTMLElement
    imagesLoaded(element, () => {
      // runs the widget-defined callback function
      if (callback) callback(element)

      // expires the event with the widget-defined expiration time
      const { eventExpiration, eventExpirationOptions } = client
      if (eventExpiration) expire(eventExpiration, eventExpirationOptions)
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [innerHTML])

  // remove message if the widget doesn't return a fragment
  if (innerHTML === '') remove()

  // show nothing if innerHTML is undefined or empty string
  if (!innerHTML) return null

  return (
    <div
      className='slime2-event'
      data-event-id={renderableEvent.id}
      data-event-type={renderableEvent.type}
      data-event-user-id={renderableEvent.userId}
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
