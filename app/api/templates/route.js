// import { NextResponse } from 'next/server';

// // Replace with your WhatsApp Business Account ID and access token
// const whatsappBusinessAccountId = '321322121074843';
// const accessToken = 'EAAYbZBkW0wTYBOw8Wpr8M36iTAlC8rm5ry0wzZBJVdBTG1LJiaNxZAwfiZBL5aRCAosi0m49W2Nwev8ufAKqaK8aiwcZBcCoZCKUCKZCViQUggopnnTb65MxVA49RfKjhcWDiAs3hPRKbXug9nqnVuf4yKgg2ZA4ldyYbL7Mo74ZCY7amAOaoWT6NRmLVZCLKyZBggVoPJtKGjgE2oqZCYZBELMutVLYyqIerdEYboerLZBO7MWFUZD';

// export async function GET() {
//   try {
//     // Fetch the list of message templates
//     const response = await fetch(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}/message_templates?fields=name,status&limit=9`, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
      
//     });

//     const templates = await response.json();
    
//     // Check if fetching templates was successful
//     if (!response.ok) {
//       console.error('Failed to fetch templates:', templates);
//       return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
//     }
    
//     return NextResponse.json(templates);
//   } catch (error) {
//     console.error('Error fetching templates:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

const whatsappBusinessAccountId = '321322121074843';
const accessToken = 'EAAYbZBkW0wTYBO4XsGzZBJigcLK3LSDmw50I1u1KRV1UoPNNMkFCxa26VcW20FOYysX1rCNMcpBoWwYCPoS6ZA6EDa17GSlGrGKifQ71dco7C7mRAfQZAHAnZBj0ZAOOfxKK3Ywf9v1ciZApeLuZBpiHim1xz78UcJsM7cZAFOXvMxsoiOZBiPIHB5Fp58qQtsKZCLSYkPJoB0FzI4VhmWAt96sjTGpgYNpR44Mf9KIyxGCh6MZD';

export async function GET() {
  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/${whatsappBusinessAccountId}/message_templates?fields=name,status`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const templates = await response.json();
    
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
