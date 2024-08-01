import { NextResponse } from 'next/server';

const VERIFY_TOKEN = 'sample'; // Your verification token

export async function GET(request) {
  console.log("hey")
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified!');
      return NextResponse.json(challenge);
    } else {
      return NextResponse.json('Forbidden', { status: 403 });
    }
  }
}

export async function POST(request) {
  const data = await request.json();
  console.log('Received data:', data);
  // Save or process the data as needed
  return NextResponse.json('Event received');
}
