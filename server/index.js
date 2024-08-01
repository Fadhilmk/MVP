// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());

// const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0';
// const ACCESS_TOKEN = 'EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J';
// const PHONE_NUMBER_ID = '405411442646087';
// const VERIFY_TOKEN = 'sample';

// // Endpoint to verify webhook
// app.get('/webhook', (req, res) => {
//     const mode = req.query['hub.mode'];
//     const token = req.query['hub.verify_token'];
//     const challenge = req.query['hub.challenge'];

//     if (mode && token === VERIFY_TOKEN) {
//         res.status(200).send(challenge);
//     } else {
//         res.sendStatus(403);
//     }
// });

// // Endpoint to receive webhook notifications
// app.post('/webhook', (req, res) => {
//     if (req.body.object) {
//         console.log('Webhook event received:', req.body);
//         res.status(200).send('EVENT_RECEIVED');
//     } else {
//         res.sendStatus(404);
//     }
// });

// // Endpoint to get messages for a specific phone number
// app.get('/api/messages', async (req, res) => {
//     try {
//         const response = await axios.get(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
//             params: { access_token: ACCESS_TOKEN }
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching messages:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error fetching messages');
//     }
// });

// // Endpoint to send a message
// app.post('/api/send-message', async (req, res) => {
//     const { to, message } = req.body;
//     try {
//         const response = await axios.post(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
//             messaging_product: 'whatsapp',
//             to,
//             text: { body: message }
//         }, {
//             params: { access_token: ACCESS_TOKEN },
//             headers: { 'Content-Type': 'application/json' }
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error sending message:', error.response ? error.response.data : error.message);
//         res.status(500).send('Error sending message');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const WHATSAPP_API_URL = 'https://graph.facebook.com/v20.0';
const ACCESS_TOKEN = 'EAAYbZBkW0wTYBO4nErepARo7nfxCDofrTPBXZCInXygpNRkGoxLBlivUbXKmkGQRXJIUgQ2I4S1l1neCzESDV8v3tLxTjFRq7l3nUjwD5ih9bkHuuVvtgMfvWN3isF0RhEY3I8OvFSplDjNB9P7ml8GFURZA0HRBVnhC5R0nZCNtAxETMaxHmhI4rd8zHQDZBvyRrNYkvphLO8Y6yDJD8VIDYCvjkPehiTmBuhhjRhl7J';
const PHONE_NUMBER_ID = '405411442646087';
const VERIFY_TOKEN = 'sample';

// Endpoint to verify webhook
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

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
        // Note: Adjust this endpoint as needed based on the API documentation
        const response = await axios.get(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
            params: { access_token: ACCESS_TOKEN }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching messages', message: error.message });
    }
});

// Endpoint to send a message
app.post('/api/send-message', async (req, res) => {
    const { to, message } = req.body;
    try {
        const response = await axios.post(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
            messaging_product: 'whatsapp',
            to,
            text: { body: message }
        }, {
            params: { access_token: ACCESS_TOKEN },
            headers: { 'Content-Type': 'application/json' }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error sending message', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

