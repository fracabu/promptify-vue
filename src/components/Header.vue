<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X, Settings } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import SearchBar from './SearchBar.vue'
import ThemeToggle from './ThemeToggle.vue'

const isMenuOpen = ref(false)

const navigation = [
  { name: 'Framework', href: '/' },
  // use a location object so Vue Router will keep the current route and set the hash
  { name: 'Categorie', href: { path: '/', hash: '#categories' } },
  // point to a dedicated Guide view/route
  { name: 'Guide', href: '/guide' },
  { name: 'Impostazioni', href: '/impostazioni' },
]
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
          <span class="text-[35px] font-bold hidden sm:block leading-none font-mono tracking-tight">
            <span class="text-slate-900 dark:text-white">Prompt</span>
            <span class="text-purple-600 dark:text-purple-400">ify</span>
          </span>
        </RouterLink>

        <!-- Search Bar (Desktop & Tablet) -->
        <div class="hidden md:flex flex-1 max-w-xl mx-4">
          <SearchBar />
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" as="RouterLink" to="/impostazioni" class="hidden md:flex hover:scale-110 transition-transform duration-200">
            <Settings class="h-5 w-5 text-slate-700 dark:text-slate-200" />
            <span class="sr-only">Impostazioni</span>
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
          <!-- Mobile Search -->
          <div class="mb-4">
            <SearchBar />
          </div>
          
          <!-- Mobile Nav Links -->
          <nav class="flex flex-col space-y-2">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400 rounded-md hover:bg-muted hover:scale-105"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
