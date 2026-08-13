# Xionco AI Chatbot

A simple fullstack AI chatbot application built with Vue 3, TypeScript, Express.js, and Google Gemini API.

The application provides a chat interface where users can send messages to an AI assistant. The frontend communicates with the backend, while the backend handles communication with the Gemini API.

---

## 🤖 Features

- AI chatbot powered by Google Gemini
- Send messages to AI Assistant
- Conversation history during the current session
- Markdown response rendering
- Bold text
- Italic text
- Headings
- Ordered lists
- Unordered lists
- Code formatting
- Links
- Loading indicator while waiting for AI response
- Error handling
- Clear chat
- Auto scroll to latest message
- Responsive chat interface
- Gemini API key secured on backend

---

## 📦 Tech Stack

### Frontend

- Vue 3
- Vite
- TypeScript
- TailwindCSS
- Axios
- Marked
- DOMPurify
- Vue Router

### Backend

- Node.js
- Express.js
- Axios
- dotenv
- CORS

### AI

- Google Gemini API
- Gemini Flash Model

---

## 🏗️ Application Architecture

The application uses a simple frontend-backend architecture:

```text
┌──────────────────────┐
│      Vue 3 Client    │
│                      │
│  ChatWindow          │
│  ChatMessage         │
│  ChatInput           │
│  chatService.ts      │
└──────────┬───────────┘
           │
           │ HTTP POST
           │ /api/chat
           ▼
┌──────────────────────┐
│    Express Backend   │
│                      │
│  chatRoutes.js       │
│  chatController.js   │
│  chatModel.js        │
│  gemini.js           │
└──────────┬───────────┘
           │
           │ Gemini API
           ▼
┌──────────────────────┐
│   Google Gemini API  │
└──────────────────────┘
```

The Gemini API key is only stored and used by the backend.

The frontend never directly accesses the Gemini API key.

---

## 📁 Project Structure

```text
xionco-chatbot-test/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   └── chat/
│   │   │       ├── ChatInput.vue
│   │   │       ├── ChatMessage.vue
│   │   │       └── ChatWindow.vue
│   │   │
│   │   ├── pages/
│   │   │   └── Chat.vue
│   │   │
│   │   ├── router/
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   └── chatService.ts
│   │   │
│   │   ├── App.vue
│   │   ├── main.ts
│   │   ├── env.d.ts
│   │   └── style.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── gemini.js
│   │   │
│   │   ├── controllers/
│   │   │   └── chatController.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── models/
│   │   │   └── chatModel.js
│   │   │
│   │   ├── routes/
│   │   │   └── chatRoutes.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## 🔐 Environment Variables

The Gemini API key must only be stored in the backend.

### Backend

Create:

```text
server/.env
```

Example:

```env
PORT=3000

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Do not expose `GEMINI_API_KEY` in the frontend.

Do not use the Gemini API key inside:

```text
client/.env
```

---

### Frontend

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

The frontend only needs the URL of the backend API.

---

## 🚫 Environment Files

Do not commit real API keys to Git.

Make sure `.gitignore` contains:

```gitignore
.env
.env.local
.env.*.local
node_modules
dist
```

You can provide example environment files:

```text
.env.example
```

Example backend:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Example frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/mmyusuf48/xionco-chatbot-test.git
```

Enter the project:

```bash
cd xionco-chatbot-test
```

---

# Backend Setup

Go to the backend directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```text
server/.env
```

Add:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Run the backend:

```bash
npm start
```

Backend will run on:

```text
http://localhost:3000
```

---

# Frontend Setup

Open another terminal.

Go to the frontend:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:3000/api
```

Run the frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔄 Chat Flow

When the user sends a message:

```text
User
 │
 ▼
ChatInput.vue
 │
 ▼
ChatWindow.vue
 │
 ▼
chatService.ts
 │
 │ POST /api/chat
 ▼
Express Backend
 │
 ▼
chatController.js
 │
 ▼
Gemini Configuration
 │
 ▼
Google Gemini API
 │
 ▼
AI Response
 │
 ▼
Express Backend
 │
 ▼
chatService.ts
 │
 ▼
ChatWindow.vue
 │
 ▼
ChatMessage.vue
```

---

## 📡 API Endpoint

### Send Chat Message

```http
POST /api/chat
```

Request:

```json
{
  "message": "Halo, siapa kamu?",
  "history": []
}
```

Example with conversation history:

```json
{
  "message": "Jelaskan lebih lanjut",
  "history": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Apa itu JavaScript?"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "JavaScript adalah bahasa pemrograman..."
        }
      ]
    }
  ]
}
```

---

## 📥 API Response

Example:

```json
{
  "message": "Message sent successfully",
  "data": {
    "response": "Halo! Saya adalah AI Assistant yang dapat membantu menjawab pertanyaan Anda.",
    "model": "gemini-3.6-flash"
  }
}
```

The frontend reads the AI response from:

```text
data.response
```

---

## 🧪 Testing Backend

The API can be tested using `curl`.

Make sure the backend is running:

```bash
npm start
```

Then run:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Halo, siapa kamu?"}'
```

Expected response:

```json
{
  "message": "Message sent successfully",
  "data": {
    "response": "...",
    "model": "gemini-3.6-flash"
  }
}
```

---

## 💬 Frontend Chat

The frontend consists of three main chat components.

### ChatInput

Responsible for:

- Entering messages
- Sending messages
- Loading state
- Preventing multiple requests while AI is responding

### ChatMessage

Responsible for:

- Displaying user messages
- Displaying AI messages
- Displaying message time
- Rendering Markdown response

AI responses support:

```markdown
**Bold text**

*Italic text*

1. Ordered list

- Unordered list

`inline code`
```

Markdown is rendered using:

```text
marked
```

and sanitized using:

```text
DOMPurify
```

to prevent unsafe HTML from being rendered directly.

### ChatWindow

Responsible for:

- Managing chat messages
- Sending messages
- Maintaining conversation history
- Loading state
- Error handling
- Auto scrolling
- Clearing chat

---

## 🧠 Conversation History

The frontend maintains the conversation history during the current session.

Before sending a new message, the previous messages are converted into Gemini's history format:

```json
[
  {
    "role": "user",
    "parts": [
      {
        "text": "Apa itu Vue?"
      }
    ]
  },
  {
    "role": "model",
    "parts": [
      {
        "text": "Vue adalah framework JavaScript..."
      }
    ]
  }
]
```

The latest user message is sent separately as the current message.

Therefore:

```text
Previous conversation
        ↓
     history
        ↓
Current user message
        ↓
    Gemini API
```

This allows the AI to understand the context of the conversation.

---

## 🗑️ Clear Chat

The `Clear Chat` button removes the current conversation from the frontend.

After clearing:

```text
messages = []
```

The next message starts a new conversation context.

The conversation history is currently stored only in the frontend memory.

There is no database or persistent chat history.

---

## 🗄️ Database

This project does **not use a database**.

There is no:

```text
PostgreSQL
MySQL
MongoDB
Neon
Redis
```

required for this application.

The chatbot communicates directly:

```text
Frontend
   ↓
Backend
   ↓
Gemini API
```

Conversation history is temporarily stored in the frontend while the page is open.

Refreshing the browser will clear the current conversation.

---

## 🔒 Security

The Gemini API key is stored only in:

```text
server/.env
```

The frontend does not have access to:

```text
GEMINI_API_KEY
```

The frontend only knows:

```env
VITE_API_URL=http://localhost:3000/api
```

This prevents exposing the Gemini API key to the browser.

Never commit:

```text
server/.env
```

to GitHub.

---

## ⚠️ API Key Safety

If an API key has accidentally been exposed publicly, revoke or rotate the key from Google AI Studio and create a new key.

The API key should never be included in:

- GitHub repository
- README.md
- frontend source code
- screenshots
- public documentation
- browser environment variables

---

## 🌐 CORS

The backend enables CORS so the Vue frontend can communicate with the Express API.

Development environment:

```text
Frontend
http://localhost:5173

Backend
http://localhost:3000
```

API:

```text
http://localhost:3000/api/chat
```

---

## 📌 Application Pages

Currently the application contains:

```text
Chat
```

The main page provides the AI Assistant interface.

---

## 📂 Main Components

```text
client/src/components/chat/
│
├── ChatInput.vue
├── ChatMessage.vue
└── ChatWindow.vue
```

### ChatInput.vue

Handles user input and message submission.

### ChatMessage.vue

Displays chat messages and renders Markdown.

### ChatWindow.vue

Controls the overall chat conversation.

---

## 🔧 Main Service

Frontend API communication is handled by:

```text
client/src/services/chatService.ts
```

Example:

```typescript
export const sendChatMessage = async (
  message: string,
  history: ChatHistory[] = [],
): Promise<ChatResponse> => {
  const response = await axios.post<ChatResponse>(
    `${API_URL}/chat`,
    {
      message,
      history,
    },
  )

  return response.data
}
```

---

## 🛠️ Backend Structure

```text
server/src/
│
├── config/
│   └── gemini.js
│
├── controllers/
│   └── chatController.js
│
├── middlewares/
│   └── errorHandler.js
│
├── models/
│   └── chatModel.js
│
├── routes/
│   └── chatRoutes.js
│
└── app.js
```

### gemini.js

Handles Gemini API configuration.

### chatController.js

Handles incoming chat requests and sends the request to the AI service.

### chatModel.js

Handles the chat processing logic.

### chatRoutes.js

Defines the chat API endpoint.

### errorHandler.js

Handles backend errors.

---

## 🧪 Development

Start the backend first:

```bash
cd server
npm start
```

Then start the frontend:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 📋 Requirements

Before running the application, make sure you have:

- Node.js
- npm
- Google Gemini API key

No database server is required.

---

## 🔮 Future Improvements

Possible future improvements:

- Persistent conversation history
- Multiple chat sessions
- Chat session management
- Authentication
- User accounts
- Streaming AI response
- Regenerate response
- Copy AI response
- Stop generating response
- File upload
- Image input
- Voice input
- Voice output
- AI model selection
- Rate limiting
- Request logging
- Production deployment
- Better Markdown code highlighting

---

## 📄 License

This project is created for technical test and learning purposes.