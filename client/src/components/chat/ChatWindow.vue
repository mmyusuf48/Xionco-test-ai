<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import {
  sendChatMessage,
  type ChatHistory,
} from '../../services/chatService'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

const messages = ref<Message[]>([])
const loading = ref(false)
const error = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()

  if (!messagesContainer.value) {
    return
  }

  messagesContainer.value.scrollTo({
    top: messagesContainer.value.scrollHeight,
    behavior: 'smooth',
  })
}

const addMessage = (
  role: 'user' | 'assistant',
  content: string,
) => {
  messages.value.push({
    id: `${Date.now()}-${Math.random()}`,
    role,
    content,
    created_at: new Date().toISOString(),
  })
}

const getChatHistory = (): ChatHistory[] => {
  return messages.value.map(message => ({
    role:
      message.role === 'user'
        ? 'user'
        : 'model',
    parts: [
      {
        text: message.content,
      },
    ],
  }))
}

const handleSend = async (message: string) => {
  const trimmedMessage = message.trim()

  if (!trimmedMessage || loading.value) {
    return
  }

  error.value = ''

  const history = getChatHistory()

  addMessage('user', trimmedMessage)

  await scrollToBottom()

  try {
    loading.value = true

    const response = await sendChatMessage(
      trimmedMessage,
      history,
    )

    const assistantResponse =
      response.data.response

    if (!assistantResponse) {
      throw new Error(
        'Response AI tidak ditemukan.',
      )
    }

    addMessage(
      'assistant',
      assistantResponse,
    )

    await scrollToBottom()
  } catch (err: any) {
    console.error(
      'Failed to send message:',
      err,
    )

    const lastMessage =
    messages.value[messages.value.length - 1]

    if (
      lastMessage?.role === 'user' &&
      lastMessage.content === trimmedMessage
    ) {
      messages.value.pop()
    }

    if (err?.response?.status === 429) {
      error.value =
        'Batas penggunaan AI hari ini telah tercapai. Silakan coba lagi besok.'
    } else {
      error.value =
        err?.response?.data?.message ||
        err?.message ||
        'Gagal mengirim pesan. Silakan coba lagi.'
    }

  } finally {
    loading.value = false
  }
}

const clearChat = () => {
  if (loading.value) {
    return
  }

  messages.value = []
  error.value = ''
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col bg-gray-50">

    <!-- Header -->
    <div
      class="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-base font-semibold text-gray-900">
            Xionco Test AI Assistant
          </h1>

          <span
            class="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-medium text-cyan-700"
          >
            Gemini AI
          </span>
        </div>

        <p class="mt-0.5 text-xs text-gray-500">
          Chat dengan AI Assistant
        </p>
      </div>

      <button
        v-if="messages.length > 0"
        type="button"
        :disabled="loading"
        class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
        @click="clearChat"
      >
        Clear Chat
      </button>
    </div>

    <!-- Usage Info -->
    <div
      class="shrink-0 border-b border-cyan-100 bg-cyan-50 px-4 py-2.5"
    >
      <div class="mx-auto flex max-w-4xl items-center gap-2">
        <svg
          class="h-4 w-4 shrink-0 text-cyan-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>

        <p class="text-xs text-cyan-700">
          Batas penggunaan:
          <span class="font-semibold">
            20 pesan per hari
          </span>.
          Jika AI tidak merespons, kemungkinan batas harian telah tercapai.
        </p>
      </div>
    </div>

    <!-- Messages -->
    <div
      ref="messagesContainer"
      class="min-h-0 flex-1 overflow-y-auto"
    >

      <!-- Empty State -->
      <div
        v-if="messages.length === 0"
        class="flex min-h-full items-center justify-center px-6 py-10"
      >
        <div class="max-w-md text-center">

          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50"
          >
            <svg
              class="h-7 w-7 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m5-4a8 8 0 11-16 0c0 1.57.45 3.03 1.23 4.27L4 20l3.73-1.23A8 8 0 0020 12z"
              />
            </svg>
          </div>

          <h2 class="mt-4 text-lg font-semibold text-gray-900">
            Halo 👋
          </h2>

          <p class="mt-2 text-sm leading-6 text-gray-500">
            Saya siap membantu menjawab pertanyaan Anda.
          </p>

        </div>
      </div>

      <!-- Message List -->
      <div
        v-else
        class="mx-auto w-full max-w-4xl py-4"
      >

        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />

        <!-- Loading -->
        <div
          v-if="loading"
          class="flex w-full justify-start px-4 py-3"
        >
          <div class="flex items-start gap-3">

            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600"
            >
              AI
            </div>

            <div
              class="rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <div class="flex items-center gap-1.5">

                <span
                  class="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                />

                <span
                  class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]"
                />

                <span
                  class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]"
                />

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- Error -->
    <div
      v-if="error"
      class="shrink-0 border-t border-red-100 bg-red-50 px-4 py-3"
    >
      <div
        class="mx-auto flex max-w-4xl items-center justify-between gap-4"
      >

        <p class="text-sm text-red-700">
          {{ error }}
        </p>

        <button
          type="button"
          class="shrink-0 text-sm font-medium text-red-700 underline"
          @click="error = ''"
        >
          Tutup
        </button>

      </div>
    </div>

    <!-- Input -->
    <div class="shrink-0">
      <ChatInput
        :loading="loading"
        @send="handleSend"
      />
    </div>

  </div>
</template>