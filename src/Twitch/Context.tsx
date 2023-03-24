import React, { createContext, useContext, useReducer } from 'react'

import type { TwitchMessage } from './types'

const initialState: TwitchMessage[] = []
const MessageListContext = createContext<TwitchMessage[]>(initialState)
const MessageListDispatchContext = createContext<
  React.Dispatch<MessageListAction>
>(() => null)

type MessageListProviderProps = {
  children?: React.ReactNode
}

// lets all children have easy access to the message list and message list reducer
export function MessageListProvider({ children }: MessageListProviderProps) {
  const [chat, dispatch] = useReducer(messageListReducer, initialState)
  return (
    <MessageListContext.Provider value={chat}>
      <MessageListDispatchContext.Provider value={dispatch}>
        {children}
      </MessageListDispatchContext.Provider>
    </MessageListContext.Provider>
  )
}

export function useMessageList() {
  return useContext(MessageListContext)
}

export function useMessageListDispatch() {
  return useContext(MessageListDispatchContext)
}

function messageListReducer(state: TwitchMessage[], action: MessageListAction) {
  switch (action.type) {
    // new message
    case 'add':
      const newState = [...state]
      newState.push(action.payload)
      return newState

    // a user was banned or timed out, or clear chat was used if payload is null
    case 'clear':
      return action.payload
        ? state.filter(message => message.user.id !== action.payload)
        : initialState

    // a single message was removed by a moderator
    case 'remove':
      return state.filter(message => message.id !== action.payload)
  }
}

type MessageListAddAction = {
  type: 'add'
  payload: TwitchMessage
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
