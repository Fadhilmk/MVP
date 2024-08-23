// import { NextResponse } from 'next/server';
// import { db } from '../../../firebase';
// import { collection, addDoc } from 'firebase/firestore';

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

// // Handle POST request for webhook notifications
// export async function POST(req) {
//     try {
//         const body = await req.json();
        
//         console.log('Full webhook event:', JSON.stringify(body, null, 2));

//         // Extracting the required data
//         const entry = body.entry[0];
//         const change = entry.changes[0].value;
//         const contact = change.contacts[0];
//         const message = change.messages[0];

//         const userName = contact.profile.name;
//         const messageBody = message.text.body;
//         const userPhoneNumber = message.from;
//         const messageId = message.id;
//         const timestamp = new Date(message.timestamp * 1000); // Convert Unix timestamp to JavaScript Date

//         // Save the message to Firebase
//         await addDoc(collection(db, 'messages'), {
//             userName,
//             messageBody,
//             userPhoneNumber,
//             messageId,
//             timestamp,
//             read: false,
//             recieved:true,
//         });

//         return NextResponse.json({ message: 'EVENT_RECEIVED' });
//     } catch (error) {
//         console.error('Error handling webhook:', error);
//         return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
//     }
// }


import { NextResponse } from 'next/server';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

async function fetchAudioUrl(audioId) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/${audioId}?access_token=EAAYbZBkW0wTYBO8MufpJln3szUjyPx8aesb2USJgmYgd9jnqoOwTA7lGASvmv9sVtEDUyQNTZC3KAtZCj6im6eZAtdFYYxeRe0Hag86tUP8ODmNUR7s5uI1VavN712iuUpBAyQPZCCQOsMXu5oX0UY72B8kAvy1L65Er2XoATfT0CFAzOELTzVnL3YuYsfMSXogZDZD`,
        {
          headers: {
            "Accept": "audio/ogg",
            "X-Checksum": "GyXxzqtkFJ5ROGu3Dbptqwexix/uJKNovEXwRrzJ9GA="
          }
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching audio URL: ${response.statusText}`);
      }
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching audio URL:", error);
      return null; // Return null if there's an error
    }
  }
  

export async function POST(req) {
  try {
    const body = await req.json(); // Properly parse the JSON body
    console.log('Full webhook event:', JSON.stringify(body, null, 2));

    const entry = body.entry[0];
    const change = entry.changes[0].value;
    const contact = change.contacts[0];
    const message = change.messages[0];

    const userName = contact.profile.name;
    const userPhoneNumber = message.from;
    const messageId = message.id;
    const timestamp = new Date(message.timestamp * 1000);

    if (message.type === 'audio') {
      const audioData = {
        mimeType: message.audio.mime_type,
        sha256: message.audio.sha256,
        audioId: message.audio.id,
        isVoice: message.audio.voice,
      };

      const audioUrl = await fetchAudioUrl(message.audio.id);

      await addDoc(collection(db, 'messages'), {
        userName,
        userPhoneNumber,
        messageId,
        timestamp,
        messageType: 'audio',
        audioData: { ...audioData, audioUrl },
        read: false,
        received: true,
      });
    } else {
      const messageBody = message.text?.body || 'Unsupported message type';

      await addDoc(collection(db, 'messages'), {
        userName,
        messageBody,
        userPhoneNumber,
        messageId,
        timestamp,
        messageType: message.type,
        read: false,
        received: true,
      });
    }

    return NextResponse.json({ message: 'EVENT_RECEIVED' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}
