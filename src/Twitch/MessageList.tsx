import { useMessageList } from './Context'
import Message from './Message'

export default function MessageList() {
  const chat = useMessageList()

  function renderMessages() {
    return chat.map(messageData => {
      return <Message key={messageData.id} data={messageData} />
    })
  }

  return <slime-chat-message-list>{renderMessages()}</slime-chat-message-list>
}
