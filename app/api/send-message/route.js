import { NextResponse } from 'next/server';

export async function POST(req) {
  const { to, message } = await req.json();
  const response = await fetch('http://localhost:3001/api/send-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, message })
  });
  const data = await response.json();
  return NextResponse.json(data);
}
