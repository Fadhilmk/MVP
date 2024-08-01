// app/api/messages/route.js

export async function GET(req) {
    const url = new URL(req.url);
    const number = url.searchParams.get('number');
  
    // Example data fetching, replace with your actual data source
    const messages = [
      { id: '1', text: 'Hello!' },
      { id: '2', text: 'How are you?' },
    ]; // Example static data
  
    return new Response(JSON.stringify({ messages }), { status: 200 });
  }
  