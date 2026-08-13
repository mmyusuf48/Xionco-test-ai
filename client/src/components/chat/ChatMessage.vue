<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

const props = defineProps<{
  message: Message
}>()

const formatTime = (value?: string) => {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

const renderedContent = computed(() => {
  if (!props.message.content) {
    return ''
  }

  const html = marked.parse(
    props.message.content,
    {
      breaks: true,
      gfm: true,
    },
  )

  return DOMPurify.sanitize(
    String(html),
  )
})
</script>

<template>
  <div
    class="flex w-full px-4 py-3"
    :class="
      props.message.role === 'user'
        ? 'justify-end'
        : 'justify-start'
    "
  >
    <div
      class="flex max-w-[85%] gap-3 sm:max-w-[75%]"
      :class="
        props.message.role === 'user'
          ? 'flex-row-reverse'
          : 'flex-row'
      "
    >
      <!-- Avatar -->
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
        :class="
          props.message.role === 'user'
            ? 'bg-cyan-500 text-white'
            : 'bg-gray-200 text-gray-600'
        "
      >
        <span
          v-if="
            props.message.role === 'user'
          "
        >
          U
        </span>

        <span v-else>
          AI
        </span>
      </div>

      <!-- Message -->
      <div
        class="rounded-2xl px-4 py-3 shadow-sm"
        :class="
          props.message.role === 'user'
            ? 'rounded-tr-sm bg-cyan-500 text-white'
            : 'rounded-tl-sm border border-gray-200 bg-white text-gray-800'
        "
      >
        <!-- Content -->
        <div
          class="chat-markdown break-words text-sm leading-6"
          :class="
            props.message.role === 'user'
              ? 'chat-markdown-user'
              : 'chat-markdown-assistant'
          "
          v-html="renderedContent"
        />

        <!-- Time -->
        <div
          v-if="props.message.created_at"
          class="mt-2 text-[11px]"
          :class="
            props.message.role === 'user'
              ? 'text-cyan-100'
              : 'text-gray-400'
          "
        >
          {{ formatTime(props.message.created_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-markdown :deep(p) {
  margin: 0 0 0.75rem;
}

.chat-markdown :deep(p:last-child) {
  margin-bottom: 0;
}

.chat-markdown :deep(strong) {
  font-weight: 700;
}

.chat-markdown :deep(em) {
  font-style: italic;
}

.chat-markdown :deep(h1),
.chat-markdown :deep(h2),
.chat-markdown :deep(h3) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.4;
}

.chat-markdown :deep(h1) {
  font-size: 1.25rem;
}

.chat-markdown :deep(h2) {
  font-size: 1.125rem;
}

.chat-markdown :deep(h3) {
  font-size: 1rem;
}

.chat-markdown :deep(ul) {
  margin: 0.5rem 0 0.75rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.chat-markdown :deep(ol) {
  margin: 0.5rem 0 0.75rem;
  padding-left: 1.5rem;
  list-style-type: decimal;
}

.chat-markdown :deep(li) {
  margin-bottom: 0.25rem;
}

.chat-markdown :deep(code) {
  border-radius: 0.25rem;
  background: rgb(243 244 246);
  padding: 0.125rem 0.375rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85em;
}

.chat-markdown :deep(pre) {
  margin: 0.75rem 0;
  overflow-x: auto;
  border-radius: 0.5rem;
  background: rgb(17 24 39);
  padding: 0.75rem;
}

.chat-markdown :deep(pre code) {
  background: transparent;
  padding: 0;
  color: white;
}

.chat-markdown :deep(a) {
  text-decoration: underline;
}

.chat-markdown :deep(blockquote) {
  margin: 0.75rem 0;
  border-left: 3px solid rgb(209 213 219);
  padding-left: 0.75rem;
  color: rgb(107 114 128);
}

/* User message */
.chat-markdown-user :deep(code) {
  background: rgb(6 182 212 / 0.5);
}

.chat-markdown-user :deep(a) {
  color: white;
}

/* Assistant message */
.chat-markdown-assistant :deep(a) {
  color: rgb(8 145 178);
}
</style>