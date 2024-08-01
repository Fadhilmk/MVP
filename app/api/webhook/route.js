// app/api/webhook/route.js

export async function GET(req) {
    const url = new URL(req.url);
    const hubMode = url.searchParams.get('hub.mode');
    const hubChallenge = url.searchParams.get('hub.challenge');
    const hubVerifyToken = url.searchParams.get('hub.verify_token');
  
    // Verify the token used by WhatsApp to validate the webhook subscription
    if (hubMode === 'subscribe' && hubVerifyToken === 'sample') {
      return new Response(hubChallenge, { status: 200 });
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
  
  export async function POST(req) {
    const data = await req.json();
  
    // Process incoming messages here
    if (data.object && data.entry) {
      console.log('Webhook data:', data);
      // Handle the incoming message here
    }
  
    return new Response('OK', { status: 200 });
  }
  