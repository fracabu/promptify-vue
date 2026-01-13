<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Search, X } from 'lucide-vue-next'
import { frameworks } from '../data/frameworks'
import Badge from './ui/Badge.vue'

const router = useRouter()
const { t } = useI18n()

// Helper functions for translated content
const getFrameworkTitle = (id: string) => t(`frameworks.items.${id}.title`)
const getFrameworkDescription = (id: string) => t(`frameworks.items.${id}.description`)
const getTranslatedCategory = (category: string) => t(`frameworks.categories.${category}`)
const getTranslatedDifficulty = (difficulty: string) => {
  const map: Record<string, string> = {
    'Facile': t('difficulty.easy'),
    'Medio': t('difficulty.medium'),
    'Avanzato': t('difficulty.advanced')
  }
  return map[difficulty] || difficulty
}
const searchQuery = ref('')
const isOpen = ref(false)
const selectedIndex = ref(0)
const searchInputRef = ref<HTMLInputElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)

// Computed search results with fuzzy matching (searches in both original and translated text)
const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []

  const query = searchQuery.value.toLowerCase()

  return frameworks
    .map(framework => {
      // Calculate relevance score - search in both original and translated
      let score = 0
      const title = framework.title.toLowerCase()
      const translatedTitle = getFrameworkTitle(framework.id).toLowerCase()
      const description = framework.description.toLowerCase()
      const translatedDescription = getFrameworkDescription(framework.id).toLowerCase()
      const category = framework.category.toLowerCase()
      const translatedCategory = getTranslatedCategory(framework.category).toLowerCase()

      // Exact title match gets highest score (check both original and translated)
      if (title === query || translatedTitle === query) score += 100
      else if (title.startsWith(query) || translatedTitle.startsWith(query)) score += 50
      else if (title.includes(query) || translatedTitle.includes(query)) score += 30

      // Description match (check both)
      if (description.includes(query) || translatedDescription.includes(query)) score += 20

      // Category match (check both)
      if (category.includes(query) || translatedCategory.includes(query)) score += 15

      // Difficulty match
      const translatedDifficulty = getTranslatedDifficulty(framework.difficulty).toLowerCase()
      if (framework.difficulty.toLowerCase().includes(query) || translatedDifficulty.includes(query)) score += 10

      return { framework, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8) // Show max 8 results
    .map(item => item.framework)
})

// Watch search query to open/close dropdown
watch(searchQuery, (newValue) => {
  isOpen.value = newValue.length >= 2 && searchResults.value.length > 0
  selectedIndex.value = 0
})

// Navigate to selected framework
const navigateToFramework = (frameworkId: string) => {
  router.push(`/framework/${frameworkId}`)
  closeSearch()
}

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, searchResults.value.length - 1)
      scrollToSelected()
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      scrollToSelected()
      break
    case 'Enter':
      event.preventDefault()
      const selectedResult = searchResults.value[selectedIndex.value]
      if (selectedResult) {
        navigateToFramework(selectedResult.id)
      }
      break
    case 'Escape':
      event.preventDefault()
      closeSearch()
      break
  }
}

// Scroll to selected item in dropdown
const scrollToSelected = () => {
  if (!dropdownRef.value) return
  const selectedElement = dropdownRef.value.children[selectedIndex.value] as HTMLElement
  if (selectedElement) {
    selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
}

// Close search and reset
const closeSearch = () => {
  isOpen.value = false
  searchQuery.value = ''
  selectedIndex.value = 0
  searchInputRef.value?.blur()
}

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (dropdownRef.value && !dropdownRef.value.contains(target) && 
      searchInputRef.value && !searchInputRef.value.contains(target)) {
    isOpen.value = false
  }
}

// Keyboard shortcut: Cmd/Ctrl + K to focus search
const handleGlobalKeydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault()
    searchInputRef.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleGlobalKeydown)
})

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'Medio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'Avanzato': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}
</script>

<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative">
      <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="t('search.placeholder')"
        class="w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        @keydown="handleKeydown"
        @focus="isOpen = searchQuery.length >= 2 && searchResults.length > 0"
      />
      <button
        v-if="searchQuery"
        @click="closeSearch"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
      >
        <X class="h-4 w-4 text-muted-foreground" />
      </button>
    </div>

    <!-- Search Results Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen && searchResults.length > 0"
        ref="dropdownRef"
        class="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-input rounded-lg shadow-2xl max-h-96 overflow-y-auto"
      >
        <div class="p-2">
          <div class="text-xs text-muted-foreground px-3 py-2 font-semibold">
            {{ t('search.results', { count: searchResults.length }, searchResults.length) }}
          </div>
          <div
            v-for="(framework, index) in searchResults"
            :key="framework.id"
            :class="[
              'flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors',
              index === selectedIndex 
                ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' 
                : 'hover:bg-muted'
            ]"
            @click="navigateToFramework(framework.id)"
            @mouseenter="selectedIndex = index"
          >
            <div :class="`${framework.color} p-2 rounded-lg flex-shrink-0`">
              <component :is="framework.icon" class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 mb-1">
                <h4 class="font-semibold text-sm truncate">{{ getFrameworkTitle(framework.id) }}</h4>
                <Badge :class="getDifficultyColor(framework.difficulty)" class="text-xs flex-shrink-0">
                  {{ getTranslatedDifficulty(framework.difficulty) }}
                </Badge>
              </div>
              <p class="text-xs text-muted-foreground line-clamp-2">
                {{ getFrameworkDescription(framework.id) }}
              </p>
              <div class="mt-1">
                <Badge variant="outline" class="text-xs">
                  {{ getTranslatedCategory(framework.category) }}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer with keyboard hints -->
        <div class="border-t border-input p-2 bg-muted/50">
          <div class="flex items-center justify-between text-xs text-muted-foreground px-2">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-background border border-input rounded text-xs">↑↓</kbd>
                {{ t('search.navigate') }}
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-background border border-input rounded text-xs">↵</kbd>
                {{ t('search.open') }}
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-background border border-input rounded text-xs">esc</kbd>
                {{ t('search.close') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- No results message -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="searchQuery.length >= 2 && searchResults.length === 0"
        class="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-input rounded-lg shadow-2xl p-6 text-center"
      >
        <p class="text-sm text-muted-foreground">
          {{ t('search.noResults', { query: searchQuery }) }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Custom scrollbar for dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
