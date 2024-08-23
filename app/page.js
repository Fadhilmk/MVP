
// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { db } from '../firebase';
// import { collection, onSnapshot } from 'firebase/firestore';

// export default function Home() {
//     const [phoneNumbers, setPhoneNumbers] = useState([]);

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
//             const numbers = new Set();
//             snapshot.forEach((doc) => {
//                 const data = doc.data();
//                 numbers.add(data.userPhoneNumber);
//             });
//             setPhoneNumbers(Array.from(numbers));
//         }, (error) => {
//             console.error("Error fetching phone numbers:", error);
//         });

//         return () => unsubscribe();
//     }, []);

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             <header className="bg-blue-700 text-white p-6 shadow-md">
//                 <div className="container mx-auto flex justify-between items-center">
//                     <h1 className="text-4xl font-bold">THE MADi Inbox</h1>
//                     <nav>
//                         <Link href="/" className="text-white hover:text-gray-200 font-semibold">
//                             Home
//                         </Link>
//                     </nav>
//                 </div>
//             </header>
//             <main className="flex-1 p-6">
//                 <div className="container mx-auto max-w-6xl">
//                     <h2 className="text-3xl font-semibold mb-8">Messages</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                         {phoneNumbers.length > 0 ? (
//                             phoneNumbers.map((number) => (
//                                 <Link key={number} href={`/${number}`} className="group bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//                                     <div className="p-6">
//                                         <div className="flex items-center mb-4">
//                                             <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
//                                                 {number.charAt(0)}
//                                             </div>
//                                             <div className="ml-4">
//                                                 <h3 className="text-xl font-medium text-gray-800">{number}</h3>
//                                             </div>
//                                         </div>
//                                         <p className="text-gray-600">Click to view messages</p>
//                                     </div>
//                                 </Link>
//                             ))
//                         ) : (
//                             <p className="text-gray-600">No phone numbers available.</p>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }


// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { db } from '../firebase';
// import { collection, onSnapshot } from 'firebase/firestore';

// export default function Home() {
//     const [phoneNumbers, setPhoneNumbers] = useState([]);

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
//             const numbers = new Set();
//             snapshot.forEach((doc) => {
//                 const data = doc.data();
//                 numbers.add(data.userPhoneNumber);
//             });
//             setPhoneNumbers(Array.from(numbers));
//         }, (error) => {
//             console.error("Error fetching phone numbers:", error);
//         });

//         return () => unsubscribe();
//     }, []);

//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             <header className="flex justify-center items-center my-6">
//                 <div className="relative w-11/12 md:w-10/12 lg:w-10/12 xl:w-11/12 h-20 rounded-full flex items-center justify-center shadow-xl px-6 md:px-12">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-60 rounded-full"></div>
//                     <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-full shadow-2xl"></div>
//                     <h1 className="relative text-4xl font-bold text-white z-10">THE MADi Inbox</h1>
//                 </div>
//             </header>
//             <main className="flex-1 p-6">
//                 <div className="container mx-auto max-w-6xl">
//                     <h2 className="text-3xl font-semibold mb-8">Messages</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                         {phoneNumbers.length > 0 ? (
//                             phoneNumbers.map((number) => (
//                                 <Link key={number} href={`/${number}`} className="group bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//                                     <div className="p-6">
//                                         <div className="flex items-center mb-4">
//                                             <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
//                                                 {number.charAt(0)}
//                                             </div>
//                                             <div className="ml-4">
//                                                 <h3 className="text-xl font-medium text-gray-800">{number}</h3>
//                                             </div>
//                                         </div>
//                                         <p className="text-gray-600">Click to view messages</p>
//                                     </div>
//                                 </Link>
//                             ))
//                         ) : (
//                             <p className="text-gray-600">No phone numbers available.</p>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }


"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../firebase';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function Home() {
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [activeTab, setActiveTab] = useState('received'); // Track active tab
    const [conversations, setConversations] = useState(new Map());

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
            const numbers = new Map();
            const convos = new Map();
            snapshot.forEach((doc) => {
                const data = doc.data();
                const userPhoneNumber = data.userPhoneNumber;
                const isReceived = data.recieved;

                if (isReceived) {
                    if (!numbers.has(userPhoneNumber)) {
                        numbers.set(userPhoneNumber, { count: 0 });
                    }
                    numbers.get(userPhoneNumber).count += 1;
                } else {
                    if (!convos.has(userPhoneNumber)) {
                        convos.set(userPhoneNumber, { count: 0 });
                    }
                    convos.get(userPhoneNumber).count += 1;
                }
            });

            setPhoneNumbers(Array.from(numbers.entries()));
            setConversations(Array.from(convos.entries()));
        }, (error) => {
            console.error("Error fetching phone numbers:", error);
        });

        return () => unsubscribe();
    }, []);

    const handleCardClick = async (number) => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'messages'), where('userPhoneNumber', '==', number)));
            const batch = writeBatch(db);
            
            querySnapshot.forEach(doc => {
                batch.update(doc.ref, { recieved: false });
            });

            await batch.commit();
            
            setConversations(prev => new Map(prev).set(number, { count: (prev.get(number)?.count || 0) + 1 }));
            setPhoneNumbers(prev => prev.filter(([num]) => num !== number));
        } catch (error) {
            console.error("Error updating message status:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="relative w-full h-24 bg-blue-500 flex items-center justify-center">
                <div className="absolute inset-0 blur-md">
                    <div className="bg-[url('/header-bg.jpg')] bg-cover bg-center h-full w-full opacity-60"></div>
                </div>
                <div className="relative z-10 flex items-center justify-center p-4">
                    <h1 className="text-4xl font-bold text-white">Inbox</h1>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200 mb-4">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('received')}
                                className={`flex-1 py-2 text-center ${activeTab === 'received' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                            >
                                Received Messages
                            </button>
                            <button
                                onClick={() => setActiveTab('conversations')}
                                className={`flex-1 py-2 text-center ${activeTab === 'conversations' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                            >
                                Conversations
                            </button>
                        </div>
                    </div>

                    {activeTab === 'received' ? (
                        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                            {phoneNumbers.length > 0 ? (
                                phoneNumbers.map(([number, { count }]) => (
                                    <Link
                                        key={number}
                                        href={`/${number}`}
                                        className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
                                        onClick={() => handleCardClick(number)}
                                    >
                                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                            {number.charAt(0)}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
                                            <p className="text-gray-600 text-sm">{count} new messages</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center py-4">No phone numbers available.</p>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                            {conversations.length > 0 ? (
                                conversations.map(([number, { count }]) => (
                                    <Link
                                        key={number}
                                        href={`/${number}`}
                                        className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                            {number.charAt(0)}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{number}</h3>
                                            <p className="text-gray-600 text-sm">View conversation</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6m-9 9l-4 4m0 0l-4-4m4 4V10" />
                                            </svg>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center py-4">No conversations available.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
