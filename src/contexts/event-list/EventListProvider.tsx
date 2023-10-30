import { useReducer } from 'react'
import {
  EventListContext,
  EventListDispatchContext,
  eventListReducer,
  initialState,
} from './useEventList'

export function EventListProvider({ children }: React.PropsWithChildren) {
  const [messageList, dispatch] = useReducer(eventListReducer, initialState)
  return (
    <EventListContext.Provider value={messageList}>
      <EventListDispatchContext.Provider value={dispatch}>
        {children}
      </EventListDispatchContext.Provider>
    </EventListContext.Provider>
  )
}
