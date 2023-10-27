import { useEventList } from '@/contexts/event-list/useContext'
import Message from './Event'

export default function EventList() {
  const renderableEvents = useEventList()

  function renderEvents() {
    return renderableEvents.map(event => {
      return <Message key={event.data.id} {...event} />
    })
  }

  return <div id='slime2-event-list'>{renderEvents()}</div>
}
