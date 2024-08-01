'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const InboxPage = ({ params }) => {
  const { number } = params;
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (number) {
      // Fetch messages for the selected number from the server
      axios.get(`/messages/${number}`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [number]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post('/send', {
          recipient: number,
          message: newMessage
        });
        setMessages([...messages, { id: messages.length + 1, text: newMessage, from: 'me' }]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>Inbox for {number}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index} style={{ textAlign: message.from === 'me' ? 'right' : 'left' }}>
            {message.text}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default InboxPage;
