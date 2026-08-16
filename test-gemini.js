// test-gemini.js
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

console.log("GEMINI_API_KEY starts with:", process.env.GEMINI_API_KEY?.substring(0, 10));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  try {
    console.log("Testing gemini-3.5-flash stream...");
    const geminiStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents: "Say hello",
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { includeThoughts: true },
      },
    });
    let text = '';
    for await (const chunk of geminiStream) {
      text += chunk.text || '';
    }
    console.log("✅ Success! Response:", text.substring(0, 100));
  } catch (error) {
    console.error("❌ Failed:", error.message || error);
  }
}

main();
