// // app/api/import/route.js
// import { NextResponse } from 'next/server';
// import { parse } from 'papaparse';
// import ExcelJS from 'exceljs';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../../firebase';

// // WhatsApp Cloud API configuration
// const accessToken = 'EAAYbZBkW0wTYBO3ZAOwOFpqtzEI4iEdJKCTpaOI2SBHwjiynRX2ZA1ajvohfjRO3zzyih26WrZB5771PwIuyVjLoIMRCo8365GMafLU2BJTxeeFL0nZCAktVO4GZAHD0crME2aMoeqC2n8fN2wPvI6pxvqXyxLmBydQ9mnB7C4gm004SHy2bfZBwqP1oRUY1oTZCi78xZCTwXZAyuvcGYsPiSG3vXXegDkhtm2Wv4laFMHlngZD';
// const phoneNumberId = '321322121074843';

// const sendMessage = async (phoneNumber, templateData) => {
//   const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({
//       messaging_product: 'whatsapp',
//       recipient_type: 'individual',
//       to: phoneNumber,
//       type: 'template',
//       template: templateData,
//     }),
//   });
//   return response.json();
// };

// export async function POST(request) {
//   const formData = await request.formData();
//   const file = formData.get('file');

//   if (!file) {
//     return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//   }

//   const fileBuffer = await file.arrayBuffer();
//   let jsonData;

//   if (file.type === 'text/csv') {
//     jsonData = await new Promise((resolve, reject) => {
//       parse(fileBuffer, {
//         header: true,
//         complete: results => resolve(results.data),
//         error: error => reject(error),
//       });
//     });
//   } else {
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.load(fileBuffer);
//     const worksheet = workbook.worksheets[0];
//     jsonData = worksheet.getSheetValues().slice(1).map(row => ({
//       phoneNumber: row[1],
//     }));
//   }

//   const phoneNumbers = jsonData.map(item => item.phoneNumber).filter(number => number);

//   for (const number of phoneNumbers) {
//     try {
//       await addDoc(collection(db, 'subscribers'), { phoneNumber: number });
//       await sendMessage(number, {
//         name: 'order_action_required_1',
//         language: { code: 'en_US' },
//         components: [
//           {
//             type: 'header',
//             parameters: [
//               {
//                 type: 'image',
//                 image: {
//                   link: 'https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed'
//                 },
//               },
//             ],
//           },
//           {
//             type: 'body',
//             parameters: [
//               { type: 'text', text: 'Rashad' },
//               { type: 'text', text: 'M' },
//             ],
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Error processing phone number:', number, error);
//     }
//   }

//   return NextResponse.json({ success: true });
// }
// app/api/import/route.js
import { NextResponse } from 'next/server';
import { parse } from 'papaparse';
import ExcelJS from 'exceljs';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

// WhatsApp Cloud API configuration
const accessToken = 'EAAYbZBkW0wTYBO3ZAOwOFpqtzEI4iEdJKCTpaOI2SBHwjiynRX2ZA1ajvohfjRO3zzyih26WrZB5771PwIuyVjLoIMRCo8365GMafLU2BJTxeeFL0nZCAktVO4GZAHD0crME2aMoeqC2n8fN2wPvI6pxvqXyxLmBydQ9mnB7C4gm004SHy2bfZBwqP1oRUY1oTZCi78xZCTwXZAyuvcGYsPiSG3vXXegDkhtm2Wv4laFMHlngZD';
const phoneNumberId = '405411442646087';

const sendMessage = async (phoneNumber, templateData) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'template',
        template: templateData,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Failed to send message:', data);
    }
    
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  let jsonData;

  if (file.type === 'text/csv') {
    jsonData = await new Promise((resolve, reject) => {
      parse(fileBuffer, {
        header: true,
        complete: results => resolve(results.data),
        error: error => reject(error),
      });
    });
  } else {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];
    jsonData = worksheet.getSheetValues().slice(1).map(row => ({
      phoneNumber: row[1],
    }));
  }

  const phoneNumbers = jsonData.map(item => item.phoneNumber).filter(number => number);

  for (const number of phoneNumbers) {
    try {
      await addDoc(collection(db, 'subscribers'), { phoneNumber: number });
      await sendMessage(number, {
        name: 'order_action_required_1',
        language: { code: 'en_US' },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: 'https://firebasestorage.googleapis.com/v0/b/thermofishernew.appspot.com/o/Images%2Fproduct-image%2FNiton%E2%84%A2%20XL2%20XRF%20Analyzer~p.eps-650.jpg?alt=media&token=b573e35d-6dfa-4cc9-9852-1f22befc9bed'
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              { type: 'text', text: 'Rashad' },
              { type: 'text', text: 'M' },
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Error processing phone number:', number, error);
    }
  }

  return NextResponse.json({ success: true });
}
