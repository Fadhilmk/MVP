// app/api/numbers/route.js

export async function GET() {
    // Example data fetching, replace with your actual data source
    const numbers = ['+1234567890', '+0987654321']; // Example static data
    return new Response(JSON.stringify({ numbers }), { status: 200 });
  }
  