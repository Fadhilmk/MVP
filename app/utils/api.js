import axios from 'axios';

const API_URL = 'https://graph.facebook.com/v20.0';

export const sendMessage = async (phoneNumberId, to, messageText, accessToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: messageText },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw error;
  }
};
