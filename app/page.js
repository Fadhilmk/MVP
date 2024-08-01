'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));
  }, []);

  const sendMessage = async () => {
    await fetch('/api/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message })
    });
    setMessage('');
    setTo('');
    // Optionally fetch messages again
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">WhatsApp Messages</h1>
      <div>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient Number"
          className="border p-2 mb-2"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
          className="border p-2 mb-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2">Send Message</button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg">Received Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="border p-2 mb-2">
              {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
