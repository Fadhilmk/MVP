const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const accessToken = 'EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J';
const verifyToken = 'sample';
const phoneNumberId = '405411442646087';

// Store received messages in memory (for demonstration purposes)
let receivedMessages = {};

app.use(bodyParser.json());

// Verify webhook
app.get('/webhook', (req, res) => {
  console.log('Received verification request:', req.query);
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

      if (!receivedMessages[from]) {
        receivedMessages[from] = [];
      }
      receivedMessages[from].push({ text, from: 'user' });

      console.log(`Received message from ${from}: ${text}`);
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
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
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

    if (!receivedMessages[recipient]) {
      receivedMessages[recipient] = [];
    }
    receivedMessages[recipient].push({ text: message, from: 'me' });

    res.status(200).send('Message sent');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

// Endpoint to get messages for a specific number
app.get('/messages/:number', (req, res) => {
  const number = req.params.number;
  const messages = receivedMessages[number] || [];
  res.json(messages);
});

// Endpoint to get the list of received numbers
app.get('/messages', (req, res) => {
  res.json(receivedMessages);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
