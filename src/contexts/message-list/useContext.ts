import React, { createContext, useContext } from 'react'
import { emptyFunction } from '../common'

export function useMessageList(): Slime2.Event.Message[] {
  return useContext(MessageListContext)
}

export function useMessageListDispatch() {
  return useContext(MessageListDispatchContext)
}

export const initialState: Slime2.Event.Message[] = []

export const MessageListContext =
  createContext<Slime2.Event.Message[]>(initialState)

export const MessageListDispatchContext =
  createContext<React.Dispatch<MessageListAction>>(emptyFunction)

export function messageListReducer(
  state: Slime2.Event.Message[],
  action: MessageListAction,
): Slime2.Event.Message[] {
  switch (action.type) {
    // new message
    case 'add': {
      const newState: Slime2.Event.Message[] = [...state]
      newState.push(action.payload)

      return newState
    }

    // a user was banned or timed out, or clear chat was used if payload is null
    case 'clear': {
      const newState: Slime2.Event.Message[] = action.payload
        ? state.filter(message => message.user.id !== action.payload)
        : initialState

      return newState
    }

    // a single message was removed by a moderator or user client JS
    case 'remove': {
      const newState: Slime2.Event.Message[] = state.filter(
        message => message.id !== action.payload,
      )

      return newState
    }
  }
}

type MessageListAddAction = {
  type: 'add'
  payload: Slime2.Event.Message
}

type MessageListClearAction = {
  type: 'clear'
  payload: string | null // user ID
}

type MessageListRemoveAction = {
  type: 'remove'
  payload: string // message ID
}

type MessageListAction =
  | MessageListAddAction
  | MessageListClearAction
  | MessageListRemoveAction
