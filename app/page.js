// "use client"
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { db } from '../firebase';
// import { collection, getDocs } from 'firebase/firestore';

// export default function Home() {
//     const [phoneNumbers, setPhoneNumbers] = useState([]);

//     useEffect(() => {
//         const fetchPhoneNumbers = async () => {
//             const querySnapshot = await getDocs(collection(db, 'messages'));
//             const numbers = new Set();
//             querySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 numbers.add(data.userPhoneNumber);
//             });
//             setPhoneNumbers(Array.from(numbers));
//         };

//         fetchPhoneNumbers();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Received Numbers</h1>
//             <ul>
//                 {phoneNumbers.map((number) => (
//                     <li key={number}>
//                         <Link href={`/${number}`} className="text-blue-600 hover:underline">
//                             {number}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
    const [phoneNumbers, setPhoneNumbers] = useState([]);

    useEffect(() => {
        const fetchPhoneNumbers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'messages'));
                const numbers = new Set();
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    numbers.add(data.userPhoneNumber);
                });
                setPhoneNumbers(Array.from(numbers));
            } catch (error) {
                console.error("Error fetching phone numbers:", error);
            }
        };

        fetchPhoneNumbers();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="bg-blue-700 text-white p-6 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-4xl font-bold">THE MADi Inbox</h1>
                    <nav>
                        <Link href="/" className="text-white hover:text-gray-200 font-semibold">
                            Home
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-semibold mb-8">Messages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {phoneNumbers.length > 0 ? (
                            phoneNumbers.map((number) => (
                                <Link key={number} href={`/${number}`} className="group bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                                {number.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-xl font-medium text-gray-800">{number}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600">Click to view messages and interact with the user.</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-600">No phone numbers found.</p>
                        )}
                    </div>
                </div>
            </main>
            <footer className="bg-gray-900 text-white p-4 text-center">
                <p>&copy; {new Date().getFullYear()} THE MADi. All rights reserved.</p>
            </footer>
        </div>
    );
}
