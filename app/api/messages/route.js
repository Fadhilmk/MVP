// app/api/messages/route.js
import { NextResponse } from 'next/server';

const messagesByNumber = {}; // Adapt to your data source

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number');

  if (number) {
    // Fetch messages for a specific phone number
    return NextResponse.json(messagesByNumber[number] || []);
  } else {
    // Fetch all messages grouped by phone number
    return NextResponse.json(messagesByNumber);
  }
}

export async function POST(req) {
  return new Response('Method Not Allowed', { status: 405 });
}
