import React, { createContext, useContext, useReducer } from 'react'

const initialState: Slime2.Event.Message[] = []

export function useMessageList(): Slime2.Event.Message[] {
  return useContext(MessageListContext)
}

export function useMessageListDispatch() {
  return useContext(MessageListDispatchContext)
}

export function MessageListProvider({ children }: React.PropsWithChildren) {
  const [messageList, dispatch] = useReducer(messageListReducer, initialState)
  return (
    <MessageListContext.Provider value={messageList}>
      <MessageListDispatchContext.Provider value={dispatch}>
        {children}
      </MessageListDispatchContext.Provider>
    </MessageListContext.Provider>
  )
}

const MessageListContext = createContext<Slime2.Event.Message[]>(initialState)

const MessageListDispatchContext =
  createContext<React.Dispatch<MessageListAction>>(emptyFunction)

function messageListReducer(
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

function emptyFunction() {}

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
