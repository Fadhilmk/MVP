// "use client"
// import { useEffect, useState } from 'react';
// import { db } from '../../firebase';
// import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

// export default function Inbox({ params }) {
//     const { phoneNumber } = params;
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     useEffect(() => {
//         const fetchMessages = async () => {
//             const q = query(collection(db, 'messages'), where('userPhoneNumber', '==', phoneNumber));
//             const querySnapshot = await getDocs(q);
//             const msgs = [];
//             querySnapshot.forEach((doc) => {
//                 msgs.push({ id: doc.id, ...doc.data() });
//             });
//             setMessages(msgs);
//         };

//         fetchMessages();
//     }, [phoneNumber]);

//     const handleSendMessage = async () => {
//         if (newMessage.trim()) {
//             // Implement sending message to WhatsApp API
//             console.log('Sending message:', newMessage);
//             // Update Firestore with the sent message status
//             setNewMessage('');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Inbox for {phoneNumber}</h1>
//             <ul className="mb-4">
//                 {messages.map((msg) => (
//                     <li key={msg.id} className={`mb-2 p-2 ${msg.read ? 'bg-gray-100' : 'bg-gray-200'}`}>
//                         {msg.messageBody}
//                     </li>
//                 ))}
//             </ul>
//             <textarea
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 placeholder="Type your message..."
//             ></textarea>
//             <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">
//                 Send
//             </button>
//         </div>
//     );
// }



"use client"
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

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
            try {
                // Send message to WhatsApp API
                const response = await fetch(`https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify({
                        messaging_product: 'whatsapp',
                        to: phoneNumber,
                        type: 'text',
                        text: { body: newMessage },
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                // Save the sent message to Firebase
                await addDoc(collection(db, 'messages'), {
                    userPhoneNumber: phoneNumber,
                    messageBody: newMessage,
                    sentAt: new Date(),
                    read: true, // Marking as read since it's sent from this user
                });

                // Clear the input field
                setNewMessage('');

                // Optionally, update the local state to include the new message
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { userPhoneNumber: phoneNumber, messageBody: newMessage, read: true, sentAt: new Date() },
                ]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
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

