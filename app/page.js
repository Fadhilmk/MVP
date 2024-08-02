"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
    const [phoneNumbers, setPhoneNumbers] = useState([]);

    useEffect(() => {
        const fetchPhoneNumbers = async () => {
            const querySnapshot = await getDocs(collection(db, 'messages'));
            const numbers = new Set();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                numbers.add(data.userPhoneNumber);
            });
            setPhoneNumbers(Array.from(numbers));
        };

        fetchPhoneNumbers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Received Numbers</h1>
            <ul>
                {phoneNumbers.map((number) => (
                    <li key={number}>
                        <Link href={`/${number}`} className="text-blue-600 hover:underline">
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
