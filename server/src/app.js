require("dotenv").config()

const express = require("express")
const cors = require("cors")

const chatRoutes = require("./routes/chatRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/chat", chatRoutes)

app.get("/", (req, res) => {
  res.json({
    message: "Xionco Chatbot API",
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})