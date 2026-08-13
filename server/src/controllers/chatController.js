const geminiService = require("../services/geminiService")

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      })
    }

    const response = await geminiService.generateResponse(
      message,
    )

    return res.json({
      message: "Message sent successfully",
      data: {
        response,
      },
    })
  } catch (err) {
    console.error("Gemini error:", err)

    return res.status(500).json({
      message: "Failed to generate response",
    })
  }
}

module.exports = {
  sendMessage,
}