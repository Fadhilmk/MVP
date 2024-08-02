// app/api/phone-numbers/route.js
import store from '../store';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ phoneNumbers: store.getPhoneNumbers() });
}
