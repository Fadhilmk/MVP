import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(`${process.env.EXPRESS_API_URL}/api/messages`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' });
    }
}
