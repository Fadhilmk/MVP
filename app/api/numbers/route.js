// Example in-memory storage (Replace with database logic)
let storedNumbers = [];

export async function GET() {
  return new Response(JSON.stringify({ numbers: storedNumbers }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(req) {
  const data = await req.json();
  // Assuming you're getting phone numbers from the data
  if (data.numbers) {
    storedNumbers = [...new Set([...storedNumbers, ...data.numbers])]; // Deduplicate numbers
  }
  return new Response('OK', { status: 200 });
}
