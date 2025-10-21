<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Heart } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t bg-background">
    <div class="container px-4 py-8">
      <div class="flex flex-col items-center space-y-4">
        <!-- Brand -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <div class="relative h-8 w-8 flex items-center justify-center bg-purple-600 rounded-lg">
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9h7V2.99c3.72 1.15 6.47 4.82 7 8.94v.06h-7z"/>
            </svg>
          </div>
          <span class="text-xl font-bold">
            <span class="text-foreground">Prompt</span>
            <span class="text-purple-600 dark:text-purple-400">ify</span>
          </span>
        </RouterLink>

        <p class="text-sm text-muted-foreground text-center max-w-md">
          La piattaforma professionale per scoprire e testare i framework AI più efficaci
        </p>

        <!-- Bottom bar -->
        <div class="w-full pt-4 border-t">
          <div class="flex flex-col items-center space-y-2">
            <p class="text-sm text-muted-foreground text-center flex items-center justify-center flex-wrap gap-1">
              © {{ currentYear }} Promptify. Creato con <Heart class="h-4 w-4 text-red-500" /> per la community AI
            </p>
            <p class="text-xs text-muted-foreground/70 text-center">
              Sviluppato da <span class="font-medium">Claude Sonnet 4.5</span>, <span class="font-medium">GLM 4.6</span> e <span class="font-medium">Gemini 2.5 Pro</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
