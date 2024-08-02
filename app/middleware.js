import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  const frontendDomain = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', frontendDomain); // Use environment variable
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': frontendDomain, // Use environment variable
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*', // Apply middleware to API routes
};
