import { useEventList } from '@/contexts/event-list/useEventList'
import Message from './Event'

export default function EventList() {
  const renderableEvents = useEventList()

  function renderEvents() {
    return renderableEvents.map(event => {
      const key = `${event.type}-${event.id}`
      return <Message key={key} {...event} />
    })
  }

  return <div id='slime2-event-list'>{renderEvents()}</div>
}
