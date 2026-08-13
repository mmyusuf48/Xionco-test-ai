const { GoogleGenAI } = require("@google/genai")

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const GEMINI_MODEL = process.env.GEMINI_MODEL

module.exports = {
  gemini,
  GEMINI_MODEL,
}