import { useMessageList } from '@/contexts/message-list/useContext'
import Message from './Message'

export default function MessageList() {
  const chat = useMessageList()

  function renderMessages() {
    return chat.map(messageData => {
      return <Message key={messageData.id} {...messageData} />
    })
  }

  return <div id='slime2-chat-list'>{renderMessages()}</div>
}
