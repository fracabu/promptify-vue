<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SearchBar from '../components/SearchBar.vue'
import Card3D from '../components/ui/Card3D.vue'
import Badge from '../components/ui/Badge.vue'
import Button3D from '../components/ui/Button3D.vue'
import Icon3D from '../components/ui/Icon3D.vue'
import { frameworks, macroCategories } from '../data/frameworks'

const route = useRoute()
const router = useRouter()
const selectedCategory = ref<string | null>(null)

// Reset della categoria quando si carica la home
onMounted(() => {
  if (!route.hash) {
    selectedCategory.value = null
  }
})

const filteredFrameworks = computed(() => {
  if (!selectedCategory.value) return frameworks
  
  const category = macroCategories.find(c => c.id === selectedCategory.value)
  if (!category) return frameworks
  
  return frameworks.filter(f => category.categories.includes(f.category))
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
  router.push({ path: '/', hash: '#frameworks' })
}

const clearCategory = () => {
  selectedCategory.value = null
}

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile': return 'default'
    case 'Medio': return 'secondary'
    case 'Avanzato': return 'destructive'
    default: return 'default'
  }
}
</script>

<template>
  <div class="min-h-screen pt-16">
    <Header />

    <!-- Background gradients -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-purple-950/20" />
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
    </div>

    <!-- Hero Section -->
    <div class="min-h-screen flex items-center justify-center">
      <div class="container mx-auto px-4 py-8 relative">
        <div class="text-center mb-8">
          <h1 class="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400 animate-fade-in">
            Framework per prompt efficaci, subito.
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-12 animate-fade-in" style="animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards;">
            Oltre 30 framework professionali pronti all'uso. Testa con OpenAI, Gemini o ZAI e ottieni risultati superiori in pochi secondi.
          </p>

          <!-- Search Bar -->
          <div class="flex justify-center px-4 animate-fade-in" style="animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards;">
            <div class="w-full max-w-4xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Macro Categories Section -->
    <div id="categories" class="min-h-screen flex items-center justify-center py-20 px-4">
      <div class="container mx-auto relative">
        <h2 class="text-3xl font-bold text-center mb-12 text-foreground animate-fade-in">
          Esplora per Categoria
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <Card3D
            v-for="(category, index) in macroCategories"
            :key="category.id"
            variant="default"
            clickable
            class="animate-scale-in min-h-[180px]"
            :style="`animation-delay: ${index * 0.1}s; opacity: 0; animation-fill-mode: forwards;`"
            @click="selectCategory(category.id)"
          >
            <div class="p-6 h-full flex flex-col">
              <div class="flex items-start space-x-4 flex-1">
                <Icon3D :color="category.color" size="lg" class="flex-shrink-0">
                  <component :is="category.icon" class="text-white" />
                </Icon3D>
                <div class="flex-1 min-w-0">
                  <h3 class="text-xl font-bold mb-2">{{ category.name }}</h3>
                  <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{{ category.description }}</p>
                  <Badge variant="secondary">
                    {{ frameworks.filter(f => category.categories.includes(f.category)).length }} framework
                  </Badge>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </div>

    <!-- Frameworks Grid -->
    <div id="frameworks" class="py-20 px-4">
      <div class="container mx-auto">
        <div class="text-center mb-12 animate-fade-in">
          <h2 class="text-3xl font-bold mb-4">
            {{ selectedCategory ? macroCategories.find(c => c.id === selectedCategory)?.name : 'Tutti i Framework' }}
          </h2>
          <p v-if="selectedCategory" class="text-muted-foreground mb-4">
            {{ macroCategories.find(c => c.id === selectedCategory)?.description }}
          </p>
          <div v-if="selectedCategory" class="flex justify-center">
            <Button3D
              @click="clearCategory"
              variant="blue"
              size="sm"
            >
              ← Mostra tutti i framework
            </Button3D>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="(framework, index) in filteredFrameworks"
            :key="framework.id"
            :to="`/framework/${framework.id}`"
            class="animate-scale-in"
            :style="`animation-delay: ${index * 0.05}s; opacity: 0; animation-fill-mode: forwards;`"
          >
            <Card3D clickable variant="default" class="h-full min-h-[200px]">
              <div class="p-6 h-full flex flex-col">
                <div class="flex items-start space-x-4 mb-4">
                  <Icon3D :color="framework.color" size="md" class="flex-shrink-0">
                    <component :is="framework.icon" class="text-white" />
                  </Icon3D>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 class="font-bold text-lg">{{ framework.title }}</h3>
                      <Badge v-if="framework.id === 'calibro'" variant="default" class="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        🆕 NUOVO
                      </Badge>
                    </div>
                    <Badge :variant="getDifficultyVariant(framework.difficulty)" class="text-xs">
                      {{ framework.difficulty }}
                    </Badge>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground line-clamp-3">{{ framework.description }}</p>
              </div>
            </Card3D>
          </RouterLink>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
