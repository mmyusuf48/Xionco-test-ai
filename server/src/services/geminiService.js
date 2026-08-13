const {
  gemini,
  GEMINI_MODEL,
} = require("../config/gemini")

const generateResponse = async (message) => {
  if (!message || !message.trim()) {
    throw new Error("Message is required")
  }

  const response = await gemini.models.generateContent({
    model: GEMINI_MODEL,
    contents: message,
  })

  return response.text
}

module.exports = {
  generateResponse,
}