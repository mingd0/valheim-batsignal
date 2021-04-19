// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

function sendText(message, recipients) {
  recipients.forEach((number) => {
    client.messages
      .create({
        body: message,
        from: process.env.TWILIO_FROM_NUMBER,
        to: number,
      })
      .then((message) => console.log(message.sid));
  });
}

module.exports = { sendText };
