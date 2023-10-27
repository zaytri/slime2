import { useMessageList } from '@/contexts/message-list/useContext'
import Message from './Message'

export default function MessageList() {
  const messageList = useMessageList()

  function renderMessages() {
    return messageList.map(messageData => {
      return <Message key={messageData.id} {...messageData} />
    })
  }

  return <div id='slime2-chat-list'>{renderMessages()}</div>
}
