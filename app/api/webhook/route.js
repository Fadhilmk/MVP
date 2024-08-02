import { NextResponse } from 'next/server';

// In-memory stores
let phoneNumbers = new Set();
let messagesStore = {};

// Handle GET request for webhook verification
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === 'sample') {
        return new NextResponse(challenge);
    } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
}

// Handle POST request for webhook notifications
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Incoming webhook:', JSON.stringify(body));

        // Extract phone numbers and messages
        body.entry.flatMap(entry =>
            entry.changes.flatMap(change => {
                const contactNumbers = change.value.contacts.map(contact => contact.wa_id);
                const messages = change.value.messages || [];

                contactNumbers.forEach(number => phoneNumbers.add(number));
                console.log('Updated Phone Numbers:', Array.from(phoneNumbers)); // Log updated phone numbers

                messages.forEach(message => {
                    const number = message.from;
                    if (!messagesStore[number]) {
                        messagesStore[number] = [];
                    }
                    messagesStore[number].push({
                        id: message.id,
                        from: number,
                        text: message.text.body,
                        timestamp: message.timestamp,
                    });
                });

                return contactNumbers;
            })
        );

        // Convert Set to Array for JSON response
        const phoneNumbersArray = Array.from(phoneNumbers);
        return NextResponse.json({ message: 'EVENT_RECEIVED', phoneNumbers: phoneNumbersArray });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
