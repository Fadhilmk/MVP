import { NextResponse } from 'next/server';

const WHATSAPP_TOKEN = 'EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J';
const PHONE_NUMBER_ID = '405411442646087';

export async function POST(req) {
    try {
        const { to, message } = await req.json();
        const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to,
                text: { body: message }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
