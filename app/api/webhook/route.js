// app/api/webhook/route.js
import axios from 'axios';

const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN;
const BUSINESS_PHONE_NUMBER_ID = process.env.BUSINESS_PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

export async function POST(req) {
  const { headers, body } = await req.json();

  // Optional: Verify the request source (if needed)
  if (headers['x-verification-token'] !== VERIFY_TOKEN) {
    return new Response('Forbidden', { status: 403 });
  }

  if (body.object) {
    // Process the webhook
    for (const entry of body.entry) {
      for (const messaging of entry.messaging) {
        const from = messaging.sender.id; // Phone number or ID of the sender
        const text = messaging.message && messaging.message.text ? messaging.message.text : ""; // Text of the received message

        console.log("Received message:", text);

        // Optionally mark the message as read
        await axios.post(`https://graph.facebook.com/v20.0/${BUSINESS_PHONE_NUMBER_ID}/messages`, {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messaging.message.id,
        }, {
          headers: {
            Authorization: `Bearer ${GRAPH_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Message marked as read");
      }
    }

    return new Response('EVENT_RECEIVED', { status: 200 });
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
