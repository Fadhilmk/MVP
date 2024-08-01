import { NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // Read from environment variable

export async function GET(request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return NextResponse.json(challenge);
    } else {
      return NextResponse.json('Forbidden', { status: 403 });
    }
  }
  
  return NextResponse.json('Bad Request', { status: 400 });
}

export async function POST(request) {
  const data = await request.json();
  console.log('Received data:', data);
  // Process the data as needed
  return NextResponse.json('Event received');
}
