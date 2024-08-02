import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

export async function GET(req, res) {
  const phoneNumbersCollection = collection(db, 'phoneNumbers');
  const phoneNumbersSnapshot = await getDocs(phoneNumbersCollection);
  const phoneNumbersList = phoneNumbersSnapshot.docs.map(doc => doc.data().number);

  return new Response(JSON.stringify(phoneNumbersList), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
