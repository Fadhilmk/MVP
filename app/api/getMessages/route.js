import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const phoneNumber = searchParams.get('phoneNumber');

  const messagesCollection = collection(db, 'messages');
  const messagesQuery = query(messagesCollection, where('phoneNumber', '==', phoneNumber));
  const messagesSnapshot = await getDocs(messagesQuery);
  const messagesList = messagesSnapshot.docs.map(doc => doc.data());

  return new Response(JSON.stringify(messagesList), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
