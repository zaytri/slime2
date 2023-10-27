import { useReducer } from 'react'
import {
  MessageListContext,
  MessageListDispatchContext,
  initialState,
  messageListReducer,
} from './useContext'

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
