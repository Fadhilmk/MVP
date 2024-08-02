import { NextResponse } from 'next/server';

// Handling GET request for webhook verification
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    console.log('Received verification request with:', { mode, token, challenge });

    try {
        if (mode === 'subscribe' && token === 'sample') {
            console.log(challenge);
            return new NextResponse(challenge);
        } else {
            console.log('Verification failed:', { mode, token, VERIFY_TOKEN: 'sample' });
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
    } catch (error) {
        console.error('An error occurred during the verification process:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Handling POST request for webhook notifications
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);
        console.log('Incoming webhook: ' + JSON.stringify(body));

        // Process the webhook data here if needed
        // Example: Save to database or trigger some action

        return NextResponse.json({ message: 'EVENT_RECEIVED' });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
