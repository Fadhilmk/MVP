import { NextResponse } from 'next/server';

// In-memory store for messages
let messagesStore = {}; // Should be the same as used in webhook handler

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get('number');
    
    // Get the messages for the specified phone number
    const messages = messagesStore[number] || [];
    return NextResponse.json({ messages });
}
