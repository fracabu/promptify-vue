<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ChevronDown, Play } from 'lucide-vue-next'
import { SparklesIcon, CpuChipIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SearchBar from '../components/SearchBar.vue'
import Card3D from '../components/ui/Card3D.vue'
import Badge from '../components/ui/Badge.vue'
import Button3D from '../components/ui/Button3D.vue'
import Icon3D from '../components/ui/Icon3D.vue'
import { frameworks, macroCategories } from '../data/frameworks'

const { t } = useI18n()

// Helper functions for translated content
const getFrameworkTitle = (id: string) => t(`frameworks.items.${id}.title`)
const getFrameworkDescription = (id: string) => t(`frameworks.items.${id}.description`)
const getMacroCategoryName = (id: string) => t(`frameworks.macroCategories.${id}.name`)
const getMacroCategoryDescription = (id: string) => t(`frameworks.macroCategories.${id}.description`)
const getTranslatedDifficulty = (difficulty: string) => {
  const map: Record<string, string> = {
    'Facile': t('difficulty.easy'),
    'Medio': t('difficulty.medium'),
    'Avanzato': t('difficulty.advanced')
  }
  return map[difficulty] || difficulty
}

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

const getDifficultyVariant = (): "outline" => {
  return 'outline'
}

const getDifficultyStyles = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile': 
      return 'border-emerald-500/50 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
    case 'Medio': 
      return 'border-amber-500/50 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30'
    case 'Avanzato': 
      return 'border-rose-500/50 text-rose-700 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30'
    default: 
      return 'border-slate-500/50 text-slate-700 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-950/30'
  }
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile': return '○'
    case 'Medio': return '◐'
    case 'Avanzato': return '●'
    default: return '○'
  }
}

const formatTitle = (title: string) => {
  // Eccezioni: titoli che non vanno puntati
  const exceptions = ['Crafting AI', 'CRAFTING AI']
  if (exceptions.includes(title)) {
    return title
  }
  
  // Se il titolo è tutto maiuscolo (acronimo), separa con punti
  if (title === title.toUpperCase() && /^[A-Z\s\.\-]+$/.test(title)) {
    return title.replace(/\s/g, '').split('').join('.').replace(/\.+/g, '.')
  }
  return title
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column - Text & CTA -->
          <div class="space-y-8 animate-fade-in">
            <h1 class="text-5xl md:text-7xl font-bold leading-tight pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400">
              {{ t('hero.title') }}
            </h1>
            <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light animate-fade-in" style="animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards;">
              {{ t('hero.subtitle') }}
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 animate-fade-in" style="animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards;">
              <a href="#categories">
                <Button3D variant="purple" size="default">
                  <Play class="h-5 w-5" />
                  <span>{{ t('hero.exploreFrameworks') }}</span>
                </Button3D>
              </a>
              <RouterLink to="/guide">
                <Button3D variant="blue" size="default">
                  <span>{{ t('hero.readGuides') }}</span>
                </Button3D>
              </RouterLink>
            </div>

            <!-- Scroll Down Arrow -->
            <a
              href="#categories"
              class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer group animate-fade-in"
              style="animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards;"
            >
              <span class="font-medium">{{ t('hero.discoverFrameworks') }}</span>
              <ChevronDown class="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          <!-- Right Column - Search Bar -->
          <div class="animate-fade-in" style="animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards;">
            <div class="bg-background/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-2xl">
              <h3 class="text-2xl font-bold mb-4 text-foreground">{{ t('hero.searchTitle') }}</h3>
              <p class="text-muted-foreground mb-6">{{ t('hero.searchSubtitle') }}</p>
              <SearchBar />

              <!-- Quick Stats -->
              <div class="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                <div class="text-center">
                  <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">30+</div>
                  <div class="text-xs text-muted-foreground mt-1">{{ t('hero.stats.frameworks') }}</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">7</div>
                  <div class="text-xs text-muted-foreground mt-1">{{ t('hero.stats.categories') }}</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">3</div>
                  <div class="text-xs text-muted-foreground mt-1">{{ t('hero.stats.providers') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Come Funziona Section -->
    <div id="how-it-works" class="py-20 px-4 pb-32 bg-gradient-to-b from-background via-purple-50/20 to-background dark:via-purple-950/10">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-5xl md:text-7xl font-bold text-center mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400 animate-fade-in">
          {{ t('howItWorks.title') }}
        </h2>
        <p class="text-xl md:text-2xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto font-light leading-relaxed">
          {{ t('howItWorks.subtitle') }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <!-- Step 1 -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div class="relative bg-background border-2 border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-shadow">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-5 text-white font-bold text-2xl shadow-lg">
                1
              </div>
              <h3 class="text-xl font-bold mb-3 text-foreground">{{ t('howItWorks.step1.title') }}</h3>
              <p class="text-muted-foreground mb-4">
                {{ t('howItWorks.step1.description') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <Badge variant="outline" class="text-xs">APE</Badge>
                <Badge variant="outline" class="text-xs">COSTAR</Badge>
                <Badge variant="outline" class="text-xs">CALIBRO</Badge>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div class="relative bg-background border-2 border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-shadow">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-orange-600 rounded-xl flex items-center justify-center mb-5 text-white font-bold text-2xl shadow-lg">
                2
              </div>
              <h3 class="text-xl font-bold mb-3 text-foreground">{{ t('howItWorks.step2.title') }}</h3>
              <p class="text-muted-foreground mb-4">
                {{ t('howItWorks.step2.description') }}
              </p>
              <div class="bg-muted/50 p-3 rounded-lg text-xs font-mono">
                sk-proj-abcd1234...
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div class="relative bg-background border-2 border-orange-200/50 dark:border-orange-800/50 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-shadow">
              <div class="w-14 h-14 bg-gradient-to-br from-orange-600 to-purple-600 rounded-xl flex items-center justify-center mb-5 text-white font-bold text-2xl shadow-lg">
                3
              </div>
              <h3 class="text-xl font-bold mb-3 text-foreground">{{ t('howItWorks.step3.title') }}</h3>
              <p class="text-muted-foreground mb-4">
                {{ t('howItWorks.step3.description') }}
              </p>
              <div class="flex gap-2 items-center text-purple-600 dark:text-purple-400">
                <Icon3D icon="Sparkles" size="sm" />
                <span class="text-sm font-medium">{{ t('howItWorks.promptReady') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dettagli API Keys -->
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-8">
          <h3 class="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Come inserire le chiavi API
          </h3>
          <div class="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 class="font-semibold mb-2 text-foreground">OpenAI (GPT-5, GPT-4.1)</h4>
              <ol class="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Vai su <a href="https://platform.openai.com/api-keys" target="_blank" class="text-purple-600 dark:text-purple-400 hover:underline">platform.openai.com</a></li>
                <li>Crea una nuova API key</li>
                <li>Copia la chiave che inizia con "sk-proj-"</li>
                <li>Incollala nelle impostazioni</li>
              </ol>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-foreground">Google Gemini</h4>
              <ol class="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Vai su <a href="https://aistudio.google.com/apikey" target="_blank" class="text-purple-600 dark:text-purple-400 hover:underline">aistudio.google.com</a></li>
                <li>Genera una nuova API key</li>
                <li>Copia la chiave</li>
                <li>Incollala nelle impostazioni</li>
              </ol>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-foreground">ZAI (GLM-4.6)</h4>
              <ol class="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Vai su <a href="https://open.bigmodel.cn" target="_blank" class="text-purple-600 dark:text-purple-400 hover:underline">open.bigmodel.cn</a></li>
                <li>Registrati e crea una key</li>
                <li>Copia la tua API key</li>
                <li>Incollala nelle impostazioni</li>
              </ol>
            </div>
          </div>
          <div class="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p class="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>
                <strong>Privacy garantita:</strong> Le tue chiavi API vengono salvate solo nel localStorage del tuo browser e non vengono mai inviate ai nostri server. Sono utilizzate solo per comunicare direttamente con i provider AI che hai scelto.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Macro Categories Section -->
    <div id="categories" class="min-h-screen flex items-center justify-center py-20 px-4">
      <div class="container mx-auto relative">
        <h2 class="text-5xl md:text-7xl font-bold text-center mb-12 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400 animate-fade-in">
          {{ t('categories.title') }}
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
                  <h3 class="text-xl font-bold mb-2">{{ getMacroCategoryName(category.id) }}</h3>
                  <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{{ getMacroCategoryDescription(category.id) }}</p>
                  <Badge variant="secondary">
                    {{ frameworks.filter(f => category.categories.includes(f.category)).length }} {{ t('categories.frameworks') }}
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
          <h2 class="text-5xl md:text-7xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400">
            {{ selectedCategory ? getMacroCategoryName(selectedCategory) : t('categories.allFrameworks') }}
          </h2>
          <p v-if="selectedCategory" class="text-xl md:text-2xl text-muted-foreground mb-6 font-light leading-relaxed">
            {{ getMacroCategoryDescription(selectedCategory) }}
          </p>
          <div v-if="selectedCategory" class="flex justify-center">
            <Button3D
              @click="clearCategory"
              variant="blue"
              size="sm"
            >
              {{ t('categories.showAll') }}
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
            <Card3D clickable variant="default" class="h-full min-h-[200px] relative overflow-visible">
              <!-- Sticker "NEW" nell'angolo in alto a destra -->
              <div 
                v-if="['calibro', 'bcm', 'prisma'].includes(framework.id)" 
                class="absolute -top-2 -right-2 z-20 bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs px-3 py-2 rounded-full shadow-xl transform rotate-12 border-2 border-white flex items-center gap-1"
                style="box-shadow: 0 4px 15px rgba(251, 146, 60, 0.5);"
              >
                <SparklesIcon class="w-3 h-3" />
                NEW
              </div>
              
              <div class="p-6 h-full flex flex-col">
                <div class="flex items-start space-x-4 mb-4">
                  <Icon3D :color="framework.color" size="md" class="flex-shrink-0">
                    <component :is="framework.icon" class="text-white" />
                  </Icon3D>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 class="font-bold text-lg tracking-wider">{{ formatTitle(getFrameworkTitle(framework.id)) }}</h3>
                      <Badge v-if="framework.id === 'calibro'" variant="default" class="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center gap-1">
                        <SparklesIcon class="w-3 h-3" />
                        {{ t('framework.new') }}
                      </Badge>
                      <Badge v-if="framework.createdBy" variant="outline" class="text-xs border-purple-400 text-purple-700 dark:text-purple-300 flex items-center gap-1">
                        <CpuChipIcon class="w-3 h-3" />
                        {{ framework.createdBy }}
                      </Badge>
                    </div>
                    <Badge :variant="getDifficultyVariant()" :class="['text-xs font-medium', getDifficultyStyles(framework.difficulty)]">
                      <span class="mr-1">{{ getDifficultyIcon(framework.difficulty) }}</span>
                      {{ getTranslatedDifficulty(framework.difficulty) }}
                    </Badge>
                  </div>
                </div>
                <p class="text-sm text-muted-foreground line-clamp-3">{{ getFrameworkDescription(framework.id) }}</p>
              </div>
            </Card3D>
          </RouterLink>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
