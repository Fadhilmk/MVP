// "use client";
// import { useState } from 'react';
// import PhoneNumberList from './components/PhoneNumberList';
// import ChatWindow from './components/ChatWindow';
// import useFetch from '../hooks/useFetch';

// const HomePage = () => {
//   const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
//   const { data: phoneNumbers } = useFetch('/api/getPhoneNumbers');
//   const { data: messages } = useFetch(`/api/getMessages?phoneNumber=${selectedPhoneNumber}`);

//   return (
//     <div className="flex flex-col h-screen p-4">
//       <h1 className="text-3xl font-bold mb-4">WhatsApp Messaging System</h1>
//       <div className="flex flex-grow">
//         <PhoneNumberList phoneNumbers={phoneNumbers} onPhoneNumberClick={setSelectedPhoneNumber} />
//         {selectedPhoneNumber && (
//           <ChatWindow
//             phoneNumber={selectedPhoneNumber}
//             messages={messages}
//             accessToken="EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J" // Use your actual access token
//             phoneNumberId="405411442646087" // Use your actual phone number ID
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// app/page.js

"use client";
import { useState } from 'react';
import PhoneNumberList from './components/PhoneNumberList';
import ChatWindow from './components/ChatWindow';
import useFetch from '../hooks/useFetch';

const HomePage = () => {
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
  const { data: phoneNumbers, loading: phoneNumbersLoading } = useFetch('https://mvp-eight-mu.vercel.app/api/getPhoneNumbers');
  const { data: messages, loading: messagesLoading } = useFetch(`https://mvp-eight-mu.vercel.app/api/getMessages?phoneNumber=${selectedPhoneNumber}`);

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">WhatsApp Messaging System</h1>
      <div className="flex flex-grow">
        {phoneNumbersLoading ? (
          <p>Loading phone numbers...</p>
        ) : (
          <PhoneNumberList phoneNumbers={phoneNumbers} onPhoneNumberClick={setSelectedPhoneNumber} />
        )}
        {selectedPhoneNumber && (
          <ChatWindow
            phoneNumber={selectedPhoneNumber}
            messages={messages}
            accessToken="EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J" // Use your actual access token
            phoneNumberId="405411442646087" // Use your actual phone number ID
          />
        )}
        {messagesLoading && selectedPhoneNumber && <p>Loading messages...</p>}
      </div>
    </div>
  );
};

export default HomePage;
