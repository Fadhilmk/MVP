// app/page.js

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Fetch the list of numbers and messages
    async function fetchData() {
      // Example data fetching, replace with your data source
      const response = await axios.get('/api/numbers');
      setNumbers(response.data.numbers);
    }
    fetchData();
  }, []);

  const handleNumberClick = async (number) => {
    setSelectedNumber(number);
    // Fetch messages for the selected number
    const response = await axios.get(`/api/messages?number=${number}`);
    setMessages(response.data.messages);
  };

  const handleSendMessage = async () => {
    if (selectedNumber && messageInput) {
      await axios.post('/api/whatsapp/send', {
        to: selectedNumber,
        message: messageInput,
      });
      setMessageInput('');
    }
  };

  return (
    <div>
      <h1>WhatsApp Messages</h1>
      <div>
        <h2>Numbers</h2>
        <ul>
          {numbers.map((number) => (
            <li key={number} onClick={() => handleNumberClick(number)}>
              {number}
            </li>
          ))}
        </ul>
      </div>
      {selectedNumber && (
        <div>
          <h2>Messages for {selectedNumber}</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}
