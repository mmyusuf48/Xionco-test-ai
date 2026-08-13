const {
  getGeminiClient,
  getGeminiModel,
} = require("../config/gemini")

const generateChatResponse = async ({
  message,
  history = [],
}) => {
  if (!message || !message.trim()) {
    throw new Error("MESSAGE_REQUIRED")
  }

  const ai = await getGeminiClient()

  const model = getGeminiModel()

  const validHistory = Array.isArray(history)
    ? history
        .filter(
          item =>
            item &&
            ["user", "model"].includes(item.role) &&
            Array.isArray(item.parts) &&
            item.parts.length > 0 &&
            typeof item.parts[0]?.text === "string",
        )
        .map(item => ({
          role: item.role,
          parts: [
            {
              text: item.parts[0].text,
            },
          ],
        }))
    : []

  const chat = ai.chats.create({
    model,
    history: validHistory,
    config: {
      systemInstruction:
        "Kamu adalah asisten AI yang ramah, membantu, dan menjawab dalam bahasa Indonesia kecuali pengguna meminta bahasa lain.",
    },
  })

  const response = await chat.sendMessage({
    message: message.trim(),
  })

  return {
    message: response.text || "",
    model,
  }
}

module.exports = {
  generateChatResponse,
}