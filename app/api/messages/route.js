// app/api/messages/route.js
import store from '../store';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number');
  if (number) {
    return NextResponse.json({ messages: store.getMessages(number) });
  } else {
    return NextResponse.json({ error: 'Number query parameter is required' }, { status: 400 });
  }
}
