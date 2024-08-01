import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { to, message } = await req.json();
        const response = await fetch(`${process.env.EXPRESS_API_URL}/api/send-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, message })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Failed to send message' });
    }
}
