import { useState } from 'react';
import { sendMessage } from '../utils/api';
import MessageList from './MessageList';

const ChatWindow = ({ phoneNumber, messages, accessToken, phoneNumberId }) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = async () => {
    await sendMessage(phoneNumberId, phoneNumber, messageText, accessToken);
    setMessageText('');
  };

  return (
    <div className="p-4">
      <h2>Chat with {phoneNumber}</h2>
      <MessageList messages={messages} />
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded">
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
