const axios = require('axios');

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

// Set up URL for API request
const API_URL = "https://translation.googleapis.com/language/translate/v2/"
const URL = `${API_URL}?key=${process.env.TRANSLATE_API_KEY}`

// Function to call Google Cloud Translate API
async function translateMessage(message) {
    // Translate into Norwegian
    const target = "no";
    try {
        const response = await axios.post(URL, {q: message, target: target});
        return (response.data.data.translations[0].translatedText);
    } catch (error) {
        console.error("error", error)
    }
}

module.exports = {translateMessage};