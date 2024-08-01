
// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [numbers, setNumbers] = useState([]);
//   const [selectedNumber, setSelectedNumber] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get('/api/numbers');
//       setNumbers(response.data.numbers);
//     }
//     fetchData();
//   }, []);

//   const handleNumberClick = async (number) => {
//     setSelectedNumber(number);
//     const response = await axios.get(`/api/messages?number=${number}`);
//     setMessages(response.data.messages);
//   };

//   const handleSendMessage = async () => {
//     if (selectedNumber && messageInput) {
//       await axios.post('/api/whatsapp/send', {
//         to: selectedNumber,
//         message: messageInput,
//       });
//       setMessageInput('');
//       // Optionally refresh messages or add the new message to the list
//     }
//   };

//   return (
//     <div>
//       <h1>WhatsApp Messages</h1>
//       <div>
//         <h2>Numbers</h2>
//         <ul>
//           {numbers.map((number) => (
//             <li key={number} onClick={() => handleNumberClick(number)}>
//               {number}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {selectedNumber && (
//         <div>
//           <h2>Messages for {selectedNumber}</h2>
//           <ul>
//             {messages.map((msg, index) => (
//               <li key={index}>{msg.text.body}</li>
//             ))}
//           </ul>
//           <textarea
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//           />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/numbers');
        setNumbers(response.data.numbers);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
      }
    }
    fetchData();
  }, []);

  const handleNumberClick = async (number) => {
    setSelectedNumber(number);
    try {
      const response = await axios.get(`/api/messages?number=${number}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (selectedNumber && messageInput) {
      try {
        await axios.post('/api/whatsapp/send', {
          to: selectedNumber,
          message: messageInput,
        });
        setMessageInput('');
        // Optionally refresh messages
        handleNumberClick(selectedNumber);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
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
              <li key={index}>{msg.text.body}</li>
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
