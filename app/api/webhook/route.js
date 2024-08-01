import { NextResponse } from 'next/server';


// Webhook verification
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode && token === 'sample') {
        return NextResponse.json({ challenge });
    } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
}

// Webhook notifications
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Webhook event received:', body);

        // Process the webhook data here if needed
        // Example: Save to database or trigger some action

        return NextResponse.json({ message: 'EVENT_RECEIVED' });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
