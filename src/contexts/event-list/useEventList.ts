import React, { createContext, useContext } from 'react'
import { useClient } from '../client/useClient'
import { emptyFunction } from '../common'

export function useEventList(): Slime2.RenderableEvent[] {
  return useContext(EventListContext)
}

export function useEventListDispatch() {
  const dispatch = useContext(EventListDispatchContext)
  const previousEventList = useEventList()
  const client = useClient()
  const { maxEvents, eventDelay } = client

  function removeEvent(type: Slime2.RenderableEvent['type'], id: string) {
    dispatch({ type: 'remove', eventType: type, eventId: id })
  }

  function addEvent(
    event: MappedOmit<Slime2.RenderableEvent, 'remove' | 'renderable'>,
  ) {
    const previousListCopy = [...previousEventList]
    const eventOverflow = previousEventList.length + 1 - (maxEvents || 100)
    for (let i = 0; i < eventOverflow; i++) {
      const oldestEvent = previousListCopy.shift()
      if (oldestEvent) removeEvent(oldestEvent.type, oldestEvent.id)
    }

    function dispatchAddEvent() {
      dispatch({
        type: 'add',
        event: {
          ...event,
          renderable: true,
          remove: () => removeEvent(event.type, event.id),
        },
      })
    }

    if (eventDelay) setTimeout(dispatchAddEvent, eventDelay)
    else dispatchAddEvent()
  }

  function removeUser(userId: string) {
    dispatch({ type: 'remove-user', userId })
  }

  function removeMessages() {
    dispatch({ type: 'remove-messages' })
  }

  return { removeEvent, addEvent, removeUser, removeMessages }
}

export const initialState: Slime2.RenderableEvent[] = []

export const EventListContext =
  createContext<Slime2.RenderableEvent[]>(initialState)

export const EventListDispatchContext =
  createContext<React.Dispatch<EventListAction>>(emptyFunction)

export function eventListReducer(
  state: Slime2.RenderableEvent[],
  action: EventListAction,
): Slime2.RenderableEvent[] {
  switch (action.type) {
    // new event
    case 'add':
      return [...state, action.event]

    // remove specifc event by type and ID
    case 'remove':
      return state.filter(
        event => event.type !== action.eventType || event.id !== action.eventId,
      )

    // user banned or timed out, remove all events from that user
    case 'remove-user':
      return state.filter(event => event.userId !== action.userId)

    // clear chat was used, remove all message events
    case 'remove-messages':
      return state.filter(event => event.type !== 'message')
  }
}

type EventListAction =
  | { type: 'add'; event: Slime2.RenderableEvent }
  | {
      type: 'remove'
      eventId: string
      eventType: Slime2.RenderableEvent['type']
    }
  | { type: 'remove-user'; userId: string }
  | { type: 'remove-messages' }
