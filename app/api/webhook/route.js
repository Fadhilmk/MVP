// app/api/webhook/route.js

export async function GET(req) {
    const url = new URL(req.url);
    const hubMode = url.searchParams.get('hub.mode');
    const hubChallenge = url.searchParams.get('hub.challenge');
    const hubVerifyToken = url.searchParams.get('hub.verify_token');
  
    if (hubMode === 'subscribe' && hubVerifyToken === 'sample') {
      return new Response(hubChallenge, { status: 200 });
    } else {
      return new Response('Forbidden', { status: 403 });
    }
  }
  
  export async function POST(req) {
    const data = await req.json();
  
    // Log the incoming data
    console.log('Received webhook data:', data);
  
    // Ensure you have the correct structure of incoming data
    if (data.object && data.entry && data.entry[0].changes) {
      const messages = data.entry[0].changes.map(change => change.value.messages).flat();
      console.log('Parsed messages:', messages);
  
      // Process and store messages as needed
      // For example, save messages to a database
    }
  
    return new Response('OK', { status: 200 });
  }
  