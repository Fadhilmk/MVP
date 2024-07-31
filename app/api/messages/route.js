import { NextResponse } from 'next/server';

let messagesByNumber = {
  "1234567890": [
    { id: 1, name: "User1", text: "Hello", sent: true },
    { id: 2, name: "User2", text: "Hi", sent: false }
  ],
  "0987654321": [
    { id: 3, name: "User3", text: "Hey", sent: true }
  ]
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number');

  if (number && messagesByNumber[number]) {
    return new NextResponse(JSON.stringify(messagesByNumber[number]), { status: 200 });
  } else {
    return new NextResponse('No messages found', { status: 404 });
  }
}

export async function POST(req) {
  const body = await req.json();
  console.log('Received webhook event:', body);

  const { messages } = body.entry[0].changes[0].value;

  messages.forEach((message) => {
    const from = message.from;
    const text = message.text.body;
    
    if (!messagesByNumber[from]) {
      messagesByNumber[from] = [];
    }

    messagesByNumber[from].push({
      id: messagesByNumber[from].length + 1,
      name: "User" + from, // Use a better identifier if available
      text: text,
      sent: false
    });
  });

  return new NextResponse('EVENT_RECEIVED');
}
