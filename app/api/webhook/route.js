import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const hubMode = url.searchParams.get('hub.mode');
  const hubChallenge = url.searchParams.get('hub.challenge');
  const hubVerifyToken = url.searchParams.get('hub.verify_token');

  if (hubMode === 'subscribe' && hubVerifyToken === 'sample') {
    return NextResponse.json(hubChallenge);
  } else {
    return NextResponse.error({ status: 403 });
  }
}

export async function POST(req) {
  const data = await req.json();
  console.log('Received webhook data:', data);

  // Assuming you have a database or some storage
  if (data.object && data.entry && data.entry[0].changes) {
    const messages = data.entry[0].changes.map(change => change.value.messages).flat();
    
    // Process and store messages
    for (const message of messages) {
      console.log(`Message from ${message.from}: ${message.text.body}`);
      // Here you would save the message to your database
    }
  }

  return NextResponse.json({ status: 'ok' });
}
