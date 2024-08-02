import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

export async function GET(req) {
  const phoneNumbersCollection = collection(db, 'phoneNumbers');
  const phoneNumbersSnapshot = await getDocs(phoneNumbersCollection);
  const phoneNumbersList = phoneNumbersSnapshot.docs.map(doc => doc.data().number);

  return new Response(JSON.stringify(phoneNumbersList), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow requests from all origins
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
