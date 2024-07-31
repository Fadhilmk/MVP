// app/api/send/route.js
import axios from 'axios';

const { GRAPH_API_TOKEN, BUSINESS_PHONE_NUMBER_ID } = process.env;

export async function POST(req) {
  const { to, message } = await req.json();

  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/${BUSINESS_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return new Response('Message sent', { status: 200 });
  } catch (error) {
    console.error('Error sending message:', error);
    return new Response('Failed to send message', { status: 500 });
  }
}
