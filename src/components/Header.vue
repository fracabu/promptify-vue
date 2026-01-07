<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Settings, Globe } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import Button from './ui/Button.vue'
import ThemeToggle from './ThemeToggle.vue'
import { setLocale } from '../i18n'

const { t, locale } = useI18n()
const isMenuOpen = ref(false)
const isLangMenuOpen = ref(false)

const navigation = computed(() => [
  { name: t('nav.home'), href: '/' },
  { name: t('nav.categories'), href: { path: '/', hash: '#categories' } },
  { name: t('nav.howItWorks'), href: { path: '/', hash: '#how-it-works' } },
  { name: t('nav.guides'), href: '/guide' },
])

const languages = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
]

// currentLanguage can be used for displaying current lang name if needed
// const currentLanguage = computed(() => languages.find(l => l.code === locale.value) || languages[0])

const switchLanguage = (langCode: string) => {
  setLocale(langCode)
  isLangMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-1 hover:opacity-80 transition-opacity duration-200">
          <div class="relative h-[80px] w-[80px] flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 100 55" fill="none" class="h-full w-full rotate-[30deg]">
              <!-- Chat bubble outline -->
              <path d="M 20 25 Q 20 15 30 15 L 70 15 Q 80 15 80 25 L 80 55 Q 80 65 70 65 L 45 65 L 30 80 L 30 65 Q 20 65 20 55 Z" 
                    fill="none" 
                    stroke="currentColor"
                    class="text-purple-600 dark:text-purple-400"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
              
              <!-- Typing indicator dots -->
              <g id="typingDots">
                <circle cx="35" cy="40" r="3.5" class="text-orange-600 dark:text-orange-400" fill="currentColor" />
                <circle cx="50" cy="40" r="3.5" class="text-orange-600 dark:text-orange-400" fill="currentColor" />
                <circle cx="65" cy="40" r="3.5" class="text-orange-600 dark:text-orange-400" fill="currentColor" />
              </g>
            </svg>
          </div>
          <span class="text-[35px] font-bold hidden sm:block leading-none tracking-tight" style="font-family: 'Aldrich', sans-serif;">
            <span class="text-slate-900 dark:text-white">Prompt</span>
            <span class="text-purple-600 dark:text-purple-400">ify</span>
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1 flex-1 justify-center">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md hover:bg-muted"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center space-x-2 md:space-x-4">
          <!-- Language Switcher -->
          <div class="relative">
            <Button
              variant="ghost"
              size="icon"
              class="hover:scale-110 transition-transform duration-200"
              @click="isLangMenuOpen = !isLangMenuOpen"
            >
              <Globe class="h-5 w-5 text-slate-700 dark:text-slate-200" />
              <span class="sr-only">{{ t('nav.toggleMenu') }}</span>
            </Button>
            <div
              v-if="isLangMenuOpen"
              class="absolute right-0 mt-2 w-36 bg-background border border-border rounded-lg shadow-lg py-1 z-50"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="switchLanguage(lang.code)"
                class="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 transition-colors"
                :class="{ 'bg-muted': locale === lang.code }"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>

          <ThemeToggle />

          <Button variant="ghost" size="icon" as="RouterLink" to="/impostazioni" class="hidden md:flex hover:scale-110 transition-transform duration-200">
            <Settings class="h-5 w-5 text-slate-700 dark:text-slate-200" />
            <span class="sr-only">{{ t('nav.settings') }}</span>
          </Button>

          <!-- Mobile menu button -->
          <Button
            variant="ghost"
            size="icon"
            class="md:hidden hover:scale-110 transition-transform duration-200"
            @click="isMenuOpen = !isMenuOpen"
          >
            <X v-if="isMenuOpen" class="h-5 w-5 text-slate-700 dark:text-slate-200" />
            <Menu v-else class="h-5 w-5 text-slate-700 dark:text-slate-200" />
            <span class="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="md:hidden animate-fade-in">
        <div class="border-t bg-background px-4 py-4">
          <!-- Mobile Nav Links -->
          <nav class="flex flex-col space-y-2">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md hover:bg-muted"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </RouterLink>
            
            <!-- Impostazioni in mobile -->
            <RouterLink
              to="/impostazioni"
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md hover:bg-muted"
              @click="isMenuOpen = false"
            >
              <Settings class="h-4 w-4" />
              {{ t('nav.settings') }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
