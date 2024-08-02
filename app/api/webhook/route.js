// import { NextResponse } from 'next/server';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../../firebase';
// // Handle GET request for webhook verification
// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const mode = searchParams.get('hub.mode');
//     const token = searchParams.get('hub.verify_token');
//     const challenge = searchParams.get('hub.challenge');

//     if (mode === 'subscribe' && token === 'sample') {
//         return new NextResponse(challenge);
//     } else {
//         return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }
// }


// export async function POST(req) {
//     try {
//       const body = await req.json();
//       console.log('Incoming webhook: ' + JSON.stringify(body));
  
//       const entry = body.entry[0];
//       const change = entry.changes[0].value;
//       const contact = change.contacts[0];
//       const message = change.messages[0];
  
//       const userName = contact.profile.name;
//       const messageBody = message.text.body;
//       const userPhoneNumber = message.from;
//       const messageId = message.id;
//       const timestamp = message.timestamp;
  
//       const messageData = {
//         userName,
//         messageBody,
//         userPhoneNumber,
//         messageId,
//         timestamp,
//         phoneNumber: userPhoneNumber,
//       };
  
//       await addDoc(collection(db, 'messages'), messageData);
  
//       return new Response(JSON.stringify({ message: 'EVENT_RECEIVED' }), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } catch (error) {
//       console.error('Error handling webhook:', error);
//       return new Response(JSON.stringify({ error: 'Failed to process webhook' }), {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   }

// app/api/webhook/route.js

import { NextResponse } from 'next/server';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

// Handle GET request for webhook verification
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === 'sample') {
    return new NextResponse(challenge);
  } else {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Incoming webhook: ' + JSON.stringify(body));

    const entry = body.entry[0];
    const change = entry.changes[0].value;
    const contact = change.contacts[0];
    const message = change.messages[0];

    const userName = contact.profile.name;
    const messageBody = message.text.body;
    const userPhoneNumber = message.from; // Ensure this is the correct field
    const messageId = message.id;
    const timestamp = message.timestamp;

    // Store the message in Firestore
    const messageData = {
      userName,
      messageBody,
      userPhoneNumber,
      messageId,
      timestamp,
      phoneNumber: userPhoneNumber,
    };
    
    await addDoc(collection(db, 'messages'), messageData);

    // Check if the phone number is already in the phoneNumbers collection
    const phoneNumbersCollection = collection(db, 'phoneNumbers');
    const phoneNumbersQuery = query(phoneNumbersCollection, where('number', '==', userPhoneNumber));
    const phoneNumbersSnapshot = await getDocs(phoneNumbersQuery);

    if (phoneNumbersSnapshot.empty) {
      // Add phone number if not exists
      await addDoc(phoneNumbersCollection, { number: userPhoneNumber });
    }

    return new Response(JSON.stringify({ message: 'EVENT_RECEIVED' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(JSON.stringify({ error: 'Failed to process webhook' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
