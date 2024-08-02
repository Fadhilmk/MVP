// 'use client';
// import { useEffect, useState } from 'react';

// const HomePage = () => {
//     const [phoneNumbers, setPhoneNumbers] = useState([]);
//     const [selectedNumber, setSelectedNumber] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     useEffect(() => {
//         fetchPhoneNumbers();
//     }, []);

//     const fetchPhoneNumbers = async () => {
//         try {
//             const response = await fetch('/api/phone-numbers');
//             const data = await response.json();
//             setPhoneNumbers(data.phoneNumbers);
//         } catch (error) {
//             console.error('Error fetching phone numbers:', error);
//         }
//     };

//     const fetchMessages = async (number) => {
//         try {
//             const response = await fetch(`/api/messages?number=${number}`);
//             const data = await response.json();
//             setMessages(data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     const handleSendMessage = async () => {
//         if (!selectedNumber || !newMessage.trim()) return;

//         try {
//             await fetch('/api/send-message', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ to: selectedNumber, message: newMessage })
//             });
//             setNewMessage('');
//             fetchMessages(selectedNumber);
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">WhatsApp Dashboard</h1>
//             <ul className="mt-4 space-y-2">
//                 {phoneNumbers.map((number) => (
//                     <li key={number} className="p-4 border rounded shadow-sm">
//                         <button onClick={() => { 
//                             setSelectedNumber(number);
//                             fetchMessages(number); 
//                         }} className="text-blue-500">
//                             {number}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {selectedNumber && (
//                 <div className="mt-6">
//                     <h2 className="text-xl font-semibold">Inbox for {selectedNumber}</h2>
//                     <div className="mt-4 space-y-2">
//                         {messages.map((msg) => (
//                             <div key={msg.id} className="p-4 border rounded shadow-sm">
//                                 <p><strong>From:</strong> {msg.from}</p>
//                                 <p><strong>Message:</strong> {msg.text}</p>
//                                 <p><strong>Time:</strong> {new Date(msg.timestamp * 1000).toLocaleString()}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-4 flex">
//                         <input
//                             type="text"
//                             placeholder="Type your message..."
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             className="p-2 border rounded flex-grow"
//                         />
//                         <button
//                             onClick={handleSendMessage}
//                             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
//                         >
//                             Send
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HomePage;

'use client';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchPhoneNumbers();
    }, []);

    const fetchPhoneNumbers = async () => {
        try {
            const response = await fetch('/api/phone-numbers');
            const data = await response.json();
            setPhoneNumbers(data.phoneNumbers);
        } catch (error) {
            console.error('Error fetching phone numbers:', error);
        }
    };

    const fetchMessages = async (number) => {
        try {
            const response = await fetch(`/api/messages?number=${number}`);
            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!selectedNumber || !newMessage.trim()) return;

        try {
            await fetch('/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ to: selectedNumber, message: newMessage })
            });
            setNewMessage('');
            fetchMessages(selectedNumber);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">WhatsApp Dashboard</h1>
            <ul className="mt-4 space-y-2">
                {phoneNumbers.map((number) => (
                    <li key={number} className="p-4 border rounded shadow-sm">
                        <button onClick={() => { 
                            setSelectedNumber(number);
                            fetchMessages(number); 
                        }} className="text-blue-500">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedNumber && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Inbox for {selectedNumber}</h2>
                    <div className="mt-4 space-y-2">
                        {messages.map((msg) => (
                            <div key={msg.id} className="p-4 border rounded shadow-sm">
                                <p><strong>From:</strong> {msg.from}</p>
                                <p><strong>Message:</strong> {msg.text}</p>
                                <p><strong>Time:</strong> {new Date(msg.timestamp * 1000).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="p-2 border rounded flex-grow"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
