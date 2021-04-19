const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const translate = require("./translate");
const sendText = require("./send-text");

// Configure server
const app = express();
const port = process.env.PORT || 3000;

// Use public folder for static files
app.use(express.static(path.join(__dirname, "/public")));

// Use bodyParser
app.use(bodyParser.json());

// Serve index.html for any get request on "/" path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// For post requests to translate, pull "message" from request and call
// translateMessage. Send result as response to post call.
app.post("/translate", async (req, res) => {
  // Get message and recipients from request
  const { message, recipients } = req.body;

  // Translate the message with Google Translate API
  const translatedMessage = await translate.translateMessage(message);

  // Get recipient phone numbers
  const recipientPhoneNumbers = getRecipientPhoneNumbers(recipients);

  // Send response to front-end
  res.send({
    message: translatedMessage,
    recipients: recipients,
    recipientPhoneNumbers: recipientPhoneNumbers,
  });

  // Send translated message to recipients
  sendText.sendText(translatedMessage, recipientPhoneNumbers);
});

function getRecipientPhoneNumbers(recipientNames) {
  const phone_numbers = JSON.parse(process.env.PHONE_NUMBERS);
  let recipientPhoneNumbers = [];
  recipientNames.forEach((name) => {
    if (name in phone_numbers) {
      recipientPhoneNumbers.push(phone_numbers[name]);
    }
  });
  return recipientPhoneNumbers;
}

// Listen for requests on server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
