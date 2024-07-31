// app/page.jsx
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('/api/messages');
      setContacts(Object.keys(response.data));
    };
    fetchContacts();
  }, []);

  const fetchMessages = async (number) => {
    const response = await axios.get(`/api/messages?number=${number}`);
    setMessages(response.data);
    setSelectedContact(number);
  };

  const sendMessage = async () => {
    await axios.post('/api/send', {
      to: selectedContact,
      message: newMessage
    });
    setNewMessage('');
    fetchMessages(selectedContact);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Contacts</h2>
        {contacts.map((contact) => (
          <div key={contact} className="contact" onClick={() => fetchMessages(contact)}>
            {contact}
          </div>
        ))}
      </div>
      <div className="chat">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
              {msg.name}: {msg.text}
            </div>
          ))}
        </div>
        {selectedContact && (
          <div className="input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .sidebar {
          width: 200px;
          border-right: 1px solid #ddd;
          padding: 10px;
        }
        .contact {
          cursor: pointer;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .chat {
          flex: 1;
          padding: 10px;
        }
        .messages {
          height: 400px;
          overflow-y: scroll;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }
        .message {
          margin-bottom: 10px;
        }
        .sent {
          text-align: right;
        }
        .input {
          display: flex;
        }
        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
        }
        button {
          padding: 10px;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}
