// app/api/webhook/route.js
import { NextResponse } from 'next/server';

const VERIFY_TOKEN = 'sample'; // Your verification token

export async function GET(request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified!');
      return NextResponse.json(challenge, { headers: { 'Content-Type': 'text/plain' } });
    } else {
      return NextResponse.json('Forbidden', { status: 403 });
    }
  }
}
