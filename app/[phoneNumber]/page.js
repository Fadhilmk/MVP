"use client"
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function Inbox({ params }) {
    const { phoneNumber } = params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const q = query(collection(db, 'messages'), where('userPhoneNumber', '==', phoneNumber));
            const querySnapshot = await getDocs(q);
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
        };

        fetchMessages();
    }, [phoneNumber]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            // Implement sending message to WhatsApp API
            console.log('Sending message:', newMessage);
            // Update Firestore with the sent message status
            setNewMessage('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Inbox for {phoneNumber}</h1>
            <ul className="mb-4">
                {messages.map((msg) => (
                    <li key={msg.id} className={`mb-2 p-2 ${msg.read ? 'bg-gray-100' : 'bg-gray-200'}`}>
                        {msg.messageBody}
                    </li>
                ))}
            </ul>
            <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Type your message..."
            ></textarea>
            <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">
                Send
            </button>
        </div>
    );
}
