import Bull from "bull";
import axios from "axios";

// Redis connection configuration for the Bull queue
const queue = new Bull("whatsapp-messages", { redis: { port: 6379 } });

// WhatsApp API credentials and configurations
const accessToken = 'EAAYbZBkW0wTYBO9iOeKzFgZBocVZBuuVQgrSgwg3mfp2DoEYllnasr5oMLlzMecumXGDbzAZBF1W8SAHv8sqW8yuST3zdLzLhzw3wGZCAL8SI9zCfIQLpZCE3Pl3NSyIGeQZA7P5eiIepTjpQZCNiOmgx1y9ng3C9rH2T7Jx5bCZBZCKH6ZCXOC9fOhKyIC787qOl0cyOQirR6DrAlNozRbWuapu2UcfA5QsPkt9tW6ArEgkXQZD';
const phoneNumberId = '405411442646087';

// Job processor
queue.process(async (job) => {
  const { phoneNumber, messageTemplate } = job.data;
  console.log(`Processing job for phone number: ${phoneNumber}`);

  const messageData = {
    messaging_product: "whatsapp",
    to: {phoneNumber},
    type: "template",
    template: {
      name: messageTemplate,
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "Your order #12345 is ready for pickup." },
            { type: "text", text: "Please visit our store within 24 hours." },
          ],
        },
      ],
    },
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      messageData,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Message sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending message:", error.response ? error.response.data : error.message);
  }
});

// Log job failures for better diagnostics
queue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

// Export the queue for manual job triggering
export default queue;


// Manually trigger a job (for testing purposes)
queue.add({ phoneNumber: "918891998795", messageTemplate: "order_action_required_1" })
  .then(job => {
    console.log(`Manually triggered job with ID: ${job.id}`);
  })
  .catch(err => {
    console.error(`Failed to trigger job manually: ${err.message}`);
  });
