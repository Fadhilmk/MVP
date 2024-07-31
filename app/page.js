"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/messages');
        console.log('Fetched contacts response:', response);
        if (response.data) {
          const contactKeys = Object.keys(response.data);
          console.log('Contact keys:', contactKeys);
          setContacts(contactKeys);
        } else {
          console.log('No data in response');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    
    fetchContacts();
    
    const interval = setInterval(fetchContacts, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const fetchMessages = async (number) => {
    try {
      const response = await axios.get(`/api/messages?number=${number}`);
      console.log(`Fetched messages for ${number}:`, response.data);
      setMessages(response.data);
      setSelectedContact(number);
    } catch (error) {
      console.error(`Error fetching messages for ${number}:`, error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('/api/send', {
        to: selectedContact,
        message: newMessage
      });
      setNewMessage('');
      fetchMessages(selectedContact);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Contacts</h2>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact} className="contact" onClick={() => fetchMessages(contact)}>
              {contact}
            </div>
          ))
        ) : (
          <div>No contacts found</div>
        )}
      </div>
      <div className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sent ? 'sent' : 'received'}`}>
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
