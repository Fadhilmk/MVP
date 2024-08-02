import { NextResponse } from 'next/server';

// In-memory store for phone numbers
let phoneNumbers = new Set(); // Should be the same as used in webhook handler

export async function GET() {
    // Convert Set to Array for JSON response
    const phoneNumbersArray = Array.from(phoneNumbers);
    return NextResponse.json({ phoneNumbers: phoneNumbersArray });
}
