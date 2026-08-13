import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL

export interface ChatHistory {
  role: 'user' | 'model'
  parts: {
    text: string
  }[]
}

export interface ChatResponseData {
  response: string
  model: string
}

export interface ChatResponse {
  message: string
  data: ChatResponseData
}

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