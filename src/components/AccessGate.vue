<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Mail, Lock } from 'lucide-vue-next'

const { t } = useI18n()

const CONTACT_EMAIL = 'info@codecraft.it'
const mailto = computed(
  () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t('accessGate.mailSubject'))}&body=${encodeURIComponent(t('accessGate.mailBody'))}`
)
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-background px-4 py-16">
    <div class="w-full max-w-lg text-center">
      <div class="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
        <Lock class="h-7 w-7 text-purple-600 dark:text-purple-400" />
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-foreground" style="font-family: 'Aldrich', sans-serif;">
        <span>Prompt</span><span class="text-purple-600 dark:text-purple-400">ify</span>
      </h1>

      <p class="mt-4 text-lg font-medium text-foreground">
        {{ t('accessGate.title') }}
      </p>
      <p class="mt-3 text-muted-foreground">
        {{ t('accessGate.description') }}
      </p>

      <a
        :href="mailto"
        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
      >
        <Mail class="h-5 w-5" />
        {{ t('accessGate.cta') }}
      </a>

      <p class="mt-4 text-sm text-muted-foreground">
        {{ t('accessGate.orWrite') }}
        <a :href="`mailto:${CONTACT_EMAIL}`" class="font-medium text-purple-600 underline-offset-2 hover:underline dark:text-purple-400">{{ CONTACT_EMAIL }}</a>
      </p>

      <p class="mt-10 text-xs text-muted-foreground/70">© CodeCraft Studio</p>
    </div>
  </main>
</template>
