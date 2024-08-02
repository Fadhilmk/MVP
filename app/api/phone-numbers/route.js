import { NextResponse } from 'next/server';

// In-memory store for phone numbers (should be the same as used in webhook handler)
let phoneNumbers = new Set(); // Replace with actual database logic
console.log(phoneNumbers)
export async function GET() {
    // Convert Set to Array for JSON response
    const phoneNumbersArray = Array.from(phoneNumbers);
    return NextResponse.json({ phoneNumbers: phoneNumbersArray });
}
