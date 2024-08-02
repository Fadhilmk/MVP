import { NextResponse } from 'next/server';

// In-memory store for messages (should be the same as used in webhook handler)
let messagesStore = {}; // Replace with actual database logic

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get('number');
    
    // Get the messages for the specified phone number
    const messages = messagesStore[number] || [];
    console.log(messages)
    return NextResponse.json({ messages });
}
