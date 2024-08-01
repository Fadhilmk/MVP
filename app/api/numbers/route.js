export async function GET() {
    // Mock data, replace with actual data source or database query
    const numbers = [
      '+1234567890',
      '+0987654321'
    ];
  
    return new Response(JSON.stringify({ numbers }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  