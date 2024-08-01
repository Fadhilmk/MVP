export async function GET(req) {
    const url = new URL(req.url);
    const number = url.searchParams.get('number');
  
    // Mock data, replace with actual data source or database query
    const messages = [
      { from: number, text: { body: 'Hello!' } },
      { from: number, text: { body: 'How can I help you?' } }
    ];
  
    return new Response(JSON.stringify({ messages }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  