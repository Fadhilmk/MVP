// // app/api/messages/route.js
// import { NextResponse } from 'next/server';

// const messagesByNumber = {}; // Adapt to your data source

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const number = searchParams.get('number');

//   if (number) {
//     // Fetch messages for a specific phone number
//     return NextResponse.json(messagesByNumber[number] || []);
//   } else {
//     // Fetch all messages grouped by phone number
//     return NextResponse.json(messagesByNumber);
//   }
// }

// export async function POST(req) {
//   return new Response('Method Not Allowed', { status: 405 });
// }

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
  const mode = searchParams.get('hub.mode');
  const challenge = searchParams.get('hub.challenge');
  const verifyToken = searchParams.get('hub.verify_token');

  // Verify the webhook subscription
  if (mode === 'subscribe' && verifyToken === process.env.VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse('Forbidden', { status: 403 });
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

export { messagesByNumber }; // Export for use in other modules
