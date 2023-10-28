import React, { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function useEventList(): Slime2.RenderableEvent[] {
  return useContext(EventListContext)
}

export function useEventListDispatch() {
  return useContext(EventListDispatchContext)
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

    // remove event by ID
    case 'remove':
      return state.filter(
        event =>
          event.type !== action.eventType || event.data.id !== action.eventId,
      )

    // clear chat was used
    case 'clear-all-messages':
      return state.filter(event => event.type !== 'message')

    // user banned or timed out
    case 'clear-user-messages':
      return state.filter(
        event =>
          event.type !== 'message' || event.data.user.id !== action.userId,
      )
  }
}

type EventListAddAction = {
  type: 'add'
  event: Slime2.RenderableEvent
}

type EventListRemoveAction = {
  type: 'remove'
  eventId: string
  eventType: Slime2.RenderableEvent['type']
}

type EventListClearAllMessagesAction = {
  type: 'clear-all-messages'
}

type EventListClearUserMessagesAction = {
  type: 'clear-user-messages'
  userId: string
}

type EventListAction =
  | EventListAddAction
  | EventListRemoveAction
  | EventListClearAllMessagesAction
  | EventListClearUserMessagesAction
