"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch received messages from your server (implement accordingly)
    async function fetchMessages() {
      const response = await fetch('/api/getReceivedMessages');
      const data = await response.json();
      setReceivedMessages(data);
    }

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to: selectedNumber, message })
    });
    setMessage('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Received Messages</h1>
      <ul>
        {receivedMessages.map((msg) => (
          <li key={msg.id} className="mb-2">
            <button
              className="text-blue-500"
              onClick={() => setSelectedNumber(msg.from)}
            >
              {msg.from}
            </button>
            <p>{msg.text}</p>
          </li>
        ))}
      </ul>
      {selectedNumber && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Send a Message</h2>
          <textarea
            className="w-full p-2 border border-gray-300"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
