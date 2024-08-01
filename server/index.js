const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const WHATSAPP_API_URL = 'https://graph.facebook.com/v13.0';
const ACCESS_TOKEN = 'EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J';
const PHONE_NUMBER_ID = '405411442646087';
const VERIFY_TOKEN = 'sample';

// Endpoint to receive webhook notifications
app.post('/webhook', (req, res) => {
    if (req.body.object) {
        console.log('Webhook event received:', req.body);
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Endpoint to get messages for a specific phone number
app.get('/api/messages', async (req, res) => {
    try {
        const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages?access_token=${ACCESS_TOKEN}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching messages');
    }
});

// Endpoint to send a message
app.post('/api/send-message', async (req, res) => {
    const { to, message } = req.body;
    try {
        const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to,
                text: { body: message }
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error sending message');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
