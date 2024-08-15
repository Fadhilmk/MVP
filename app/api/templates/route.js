import { NextResponse } from 'next/server';

// Replace with your WhatsApp Business Account ID and access token
const whatsappBusinessAccountId = '321322121074843';
const accessToken = 'EAAYbZBkW0wTYBO2yP2ZCliYgqaw3edFcOdFKFACoKKu9tSIbtiIQ1OnO7m5OcFGUlI8BxS5QgqSYMO4sphpYCThCfjeG4ByZB3jwYwgh8oVZC1eO260yRMSK7W7N0C9ypfRvMBxXwHYz76v97OQKX6ZAwSPkASzYZBgaXUkPZASBnvMW7shgCIC5c5m0LhaQoadjqX3ZAP93DdZBLxJj6IBls4LOuX9gPleqFRRw8uB4ScQUZD';

export async function GET() {
  try {
    // Fetch the list of message templates
    const response = await fetch(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}/message_templates?fields=name,status&limit=100`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      
    });

    const templates = await response.json();
    
    // Check if fetching templates was successful
    if (!response.ok) {
      console.error('Failed to fetch templates:', templates);
      return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }
    
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

