<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'

const isDark = ref(false)

// Initialize theme from localStorage or system preference
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  applyTheme()
}

// Apply theme to document
const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Toggle theme
const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(() => {
  initTheme()
})
</script>

<template>
  <button
    @click="toggleTheme"
    class="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition
      enter-active-class="transition-all duration-300 ease-in-out"
      enter-from-class="opacity-0 rotate-90 scale-0"
      enter-to-class="opacity-100 rotate-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in-out"
      leave-from-class="opacity-100 rotate-0 scale-100"
      leave-to-class="opacity-0 -rotate-90 scale-0"
      mode="out-in"
    >
      <Sun v-if="!isDark" :key="'sun'" class="h-5 w-5 text-amber-500" />
      <Moon v-else :key="'moon'" class="h-5 w-5 text-blue-400" />
    </Transition>
  </button>
</template>
