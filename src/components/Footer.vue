<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Heart } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t bg-background">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col items-center space-y-4">
        <!-- Brand -->
        <RouterLink to="/" class="flex items-center space-x-1">
          <div class="relative h-[60px] w-[60px] flex items-center justify-center flex-shrink-0">
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
          <span class="text-xl font-bold font-mono tracking-tight">
            <span class="text-foreground">Prompt</span>
            <span class="text-purple-600 dark:text-purple-400">ify</span>
          </span>
        </RouterLink>

        <p class="text-sm text-muted-foreground text-center max-w-md">
          {{ t('footer.description') }}
        </p>

        <!-- Bottom bar -->
        <div class="w-full pt-4 border-t">
          <div class="flex flex-col items-center space-y-2">
            <p class="text-sm text-muted-foreground text-center flex items-center justify-center flex-wrap gap-1">
              © {{ currentYear }} Promptify. {{ t('footer.createdWith') }} <Heart class="h-4 w-4 text-red-500" /> {{ t('footer.forCommunity') }}
            </p>
            <p class="text-xs text-muted-foreground/70 text-center">
              {{ t('footer.developedBy') }} <span class="font-medium">Claude Sonnet 4.5</span>, <span class="font-medium">GLM 4.6</span> e <span class="font-medium">Gemini 2.5 Pro</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
