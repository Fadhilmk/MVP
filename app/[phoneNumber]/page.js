
"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// Hard-coded values
const PHONE_NUMBER_ID = '405411442646087';
const ACCESS_TOKEN = 'EAAYbZBkW0wTYBOxdVupkFxF9TStSVmsZASkmdkZBHsE3Y34FyAj6AV30sO8tKIWOi8z5K6F5p3LFacFiIDlCLPrlUrCKhEBQgZA2GmspPZBvgtZABre2n5KIwGQ1oORQHKDA3Pe2Yw4TnoBYlrxRrPPZB43EFlZCsU45QZCK1J5lqfPLUWiZBNZCE7sb4AEELOVYwlvLJ4HX1g5zORUCbY0jccG3SR5jmoogyWRuC33FcHRL81b';

export default function Inbox({ params }) {
    const { phoneNumber } = params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            const q = query(collection(db, "messages"), where("userPhoneNumber", "==", phoneNumber));
            const querySnapshot = await getDocs(q);
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });

            // Sort messages by timestamp
            msgs.sort((a, b) => (a.sentAt || a.timestamp) - (b.sentAt || b.timestamp));

            setMessages(msgs);
        };

        fetchMessages();
    }, [phoneNumber]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                // Send message to WhatsApp API
                const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                    body: JSON.stringify({
                        messaging_product: "whatsapp",
                        to: phoneNumber,
                        type: "text",
                        text: { body: newMessage },
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                // Save the sent message to Firebase
                const docRef = await addDoc(collection(db, "messages"), {
                    userPhoneNumber: phoneNumber,
                    messageBody: newMessage,
                    sentAt: new Date(), // Ensure this is a valid Date object
                    read: true,
                });

                // Clear the input field
                setNewMessage("");

                // Optionally, update the local state to include the new message
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { id: docRef.id, userPhoneNumber: phoneNumber, messageBody: newMessage, read: true, sentAt: new Date() },
                ]);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'Unknown time'; // Handle missing timestamp
        const isUnixTimestamp = !isNaN(timestamp) && timestamp.length <= 10; // Check if timestamp is Unix (seconds)
    
        let date;
        if (isUnixTimestamp) {
            // Convert Unix timestamp (in seconds) to JavaScript Date
            date = new Date(parseInt(timestamp) * 1000);
        } else {
            // Convert Firebase Timestamp to JavaScript Date
            date = new Date(timestamp.seconds * 1000);
        }
    
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return isNaN(date.getTime()) ? 'Invalid time' : date.toLocaleTimeString([], options);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Inbox for {phoneNumber}</h1>
            <ul className="mb-4">
                {messages.map((msg) => (
                    <li key={msg.id} className={`mb-2 p-2 max-w-xs ${msg.read ? "bg-blue-100 self-end text-right" : "bg-gray-200 self-start text-left"}`}>
                        <p>{msg.messageBody}</p>
                        <span className="text-gray-500 text-sm">{formatTimestamp(msg.sentAt || msg.timestamp)}</span>
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
