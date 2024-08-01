const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const accessToken = 'YOUR_ACCESS_TOKEN';
const verifyToken = 'YOUR_VERIFY_TOKEN';
const phoneNumberId = 'YOUR_PHONE_NUMBER_ID';

app.use(bodyParser.json());

// Webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === verifyToken) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle incoming messages
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object) {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from;
      const text = message.text.body;

      console.log(`Received message from ${from}: ${text}`);
      // Handle storing or processing messages here
    }

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Send a message
app.post('/send', async (req, res) => {
  const { recipient, message } = req.body;

  try {
    await axios.post(
      `https://graph.facebook.com/v14.0/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: recipient,
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).send('Message sent');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
