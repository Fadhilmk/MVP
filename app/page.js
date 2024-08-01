'use client';

import { useState, useEffect } from 'react';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [to, setTo] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/messages')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setMessages(data.messages || []))
            .catch(error => {
                console.error('Error fetching messages:', error);
                setError('Failed to load messages');
            });
    }, []);

    const sendMessage = async () => {
        try {
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to, message })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (response.ok) {
                setMessages(prevMessages => [...prevMessages, data]);
                setMessage('');
                setTo('');
            } else {
                setError('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl mb-4">WhatsApp Messages</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
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
