<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  send: [message: string]
}>()

const message = ref('')

const handleSubmit = () => {
  const value = message.value.trim()

  if (!value || props.loading) {
    return
  }

  emit('send', value)

  message.value = ''
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}
</script>

<template>
  <div class="border-t border-gray-200 bg-white p-4">
    <form
      class="mx-auto flex max-w-4xl items-end gap-3"
      @submit.prevent="handleSubmit"
    >
      <!-- Input -->
      <div class="flex-1">
        <textarea
          v-model="message"
          rows="1"
          placeholder="Ketik pesan..."
          :disabled="loading"
          class="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          @keydown="handleKeydown"
        />
      </div>

      <!-- Send Button -->
      <button
        type="submit"
        :disabled="loading || !message.trim()"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
      >
        <!-- Loading -->
        <svg
          v-if="loading"
          class="h-5 w-5 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />

          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>

        <!-- Send Icon -->
        <svg
          v-else
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19V5m0 0l-6 6m6-6l6 6"
          />
        </svg>
      </button>
    </form>

    <!-- Hint -->
    <p class="mx-auto mt-2 max-w-4xl text-xs text-gray-400">
      Tekan Enter untuk mengirim · Shift + Enter untuk baris baru
    </p>
  </div>
</template>