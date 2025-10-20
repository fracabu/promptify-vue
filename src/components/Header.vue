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
        <RouterLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 hover:scale-105">
          <div class="relative h-8 w-8 flex items-center justify-center bg-purple-600 rounded-lg">
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9h7V2.99c3.72 1.15 6.47 4.82 7 8.94v.06h-7z"/>
            </svg>
          </div>
          <span class="text-xl font-bold hidden sm:inline-block">
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
