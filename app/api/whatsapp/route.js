// app/api/whatsapp/route.js

import axios from 'axios';

const ACCESS_TOKEN = 'EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J';
const PHONE_NUMBER_ID = '405411442646087';
const WHATSAPP_API_BASE_URL = 'https://graph.facebook.com/v20.0';

export async function POST(req) {
  const { action } = req.url.split('/').pop();
  
  if (action === 'send') {
    const { to, message } = await req.json();

    try {
      await axios.post(`${WHATSAPP_API_BASE_URL}/${PHONE_NUMBER_ID}/messages`, {
        messaging_product: 'whatsapp',
        to,
        text: { body: message },
      }, {
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  } else if (action === 'webhook') {
    const data = await req.json();
    console.log('Received data:', data);

    // Process incoming messages here
    return new Response('OK', { status: 200 });
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
