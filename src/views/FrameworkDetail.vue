<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useApiKeysStore, type ApiProvider } from '../stores/apiKeys'
import { testFramework } from '../utils/apiCalls'
import { frameworks, getDifficultyStyles, getDifficultyIcon } from '../data/frameworks'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import Button3D from '../components/ui/Button3D.vue'
import Textarea from '../components/ui/Textarea.vue'
import Select from '../components/ui/Select.vue'
import Alert from '../components/ui/Alert.vue'
import Progress from '../components/ui/Progress.vue'
import { ArrowLeft, Play, Copy, Check, AlertCircle } from 'lucide-vue-next'

const { t, te, locale } = useI18n()

// Helper functions for translated content
const getFrameworkTitle = (id: string) => t(`frameworks.items.${id}.title`)
const getFrameworkDescription = (id: string) => t(`frameworks.items.${id}.description`)
const getFrameworkExplanation = (id: string) => t(`frameworks.items.${id}.explanation`)
const getFrameworkExample = (id: string) => t(`frameworks.items.${id}.example`)
// Returns undefined if translation doesn't exist, so fallback works
const getFrameworkTemplate = (id: string) => {
  const key = `frameworks.items.${id}.template`
  return te(key) ? t(key) : undefined
}
const getTranslatedDifficulty = (difficulty: string) => {
  const map: Record<string, string> = {
    'Facile': t('difficulty.easy'),
    'Medio': t('difficulty.medium'),
    'Avanzato': t('difficulty.advanced')
  }
  return map[difficulty] || difficulty
}
const getTranslatedCategory = (category: string) => t(`frameworks.categories.${category}`)

const route = useRoute()
const apiKeysStore = useApiKeysStore()

const framework = computed(() => {
  return frameworks.find(f => f.id === route.params.id)
})

const userInput = ref('')
const selectedProvider = ref<ApiProvider>('openai')
const selectedModel = ref('')
const isLoading = ref(false)
const result = ref('')
const error = ref('')
const suggestion = ref('')
const copied = ref(false)
const generatedPrompt = ref('')
const promptCopied = ref(false)
const progress = ref(0)
const progressInterval = ref<number | null>(null)

const providers = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'zai', label: 'ZAI' }
]

const modelsByProvider = computed(() => {
  const models = {
    openai: [
      { value: 'gpt-5-2025-08-07', label: t('models.gpt5Latest') },
      { value: 'gpt-5-mini-2025-08-07', label: t('models.gpt5Mini') },
      { value: 'gpt-4.1-2025-04-14', label: t('models.gpt41') }
    ],
    gemini: [
      { value: 'gemini-2.5-flash', label: t('models.geminiFlash') },
      { value: 'gemini-2.5-pro', label: t('models.geminiPro') }
    ],
    zai: [
      { value: 'z-ai/glm-4.6', label: t('models.glm46') },
      { value: 'z-ai/glm-4.5', label: t('models.glm45') }
    ]
  }
  return models[selectedProvider.value] || []
})

// Auto-select first model when provider changes
const updateDefaultModel = () => {
  const models = modelsByProvider.value
  if (models && models.length > 0 && models[0]) {
    selectedModel.value = models[0].value
  }
}

// Initialize with first model
updateDefaultModel()

const hasApiKey = computed(() => {
  return apiKeysStore.getKey(selectedProvider.value)?.length > 0
})

// Generate the prompt preview - exactly what will be sent to the API
const generatePromptPreview = () => {
  const currentFramework = framework.value
  if (!currentFramework || !userInput.value.trim()) {
    generatedPrompt.value = ''
    return
  }

  // Use translated template
  const template = getFrameworkTemplate(currentFramework.id) || currentFramework.template || ''

  // Replace {input} placeholder with actual user input
  generatedPrompt.value = template.replace(/{input}/g, userInput.value)
}

// Simulate progress based on estimated API response time
const startProgressSimulation = () => {
  progress.value = 0
  
  // Clear any existing interval
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
  }
  
  // Estimated times by provider (in seconds)
  const estimatedTimes = {
    openai: 15,   // OpenAI typically 10-20s
    gemini: 12,   // Gemini usually faster
    zai: 18       // ZAI might be slower
  }
  
  const estimatedTime = estimatedTimes[selectedProvider.value] || 15
  const incrementInterval = 100 // Update every 100ms
  const totalIncrements = (estimatedTime * 1000) / incrementInterval
  const incrementAmount = 95 / totalIncrements // Go up to 95%, never 100% until done
  
  progressInterval.value = window.setInterval(() => {
    if (progress.value < 95) {
      // Slow down as we get closer to 95%
      const slowdownFactor = 1 - (progress.value / 100) * 0.5
      progress.value += incrementAmount * slowdownFactor
    }
  }, incrementInterval)
}

const stopProgressSimulation = () => {
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
    progressInterval.value = null
  }
  // Complete the progress
  progress.value = 100
  
  // Reset after a short delay
  setTimeout(() => {
    progress.value = 0
  }, 1000)
}

const handleTest = async () => {
  if (!framework.value || !userInput.value.trim()) return

  error.value = ''
  suggestion.value = ''
  result.value = ''
  generatedPrompt.value = ''
  isLoading.value = true

  // Start progress simulation
  startProgressSimulation()

  // Generate prompt preview
  generatePromptPreview()

  try {
    // Use translated values for API call
    const translatedTemplate = getFrameworkTemplate(framework.value.id) || framework.value.template
    const translatedExplanation = getFrameworkExplanation(framework.value.id)
    const translatedTitle = getFrameworkTitle(framework.value.id)

    const response = await testFramework({
      framework: framework.value.id,
      frameworkName: translatedTitle,
      frameworkExplanation: translatedExplanation,
      input: userInput.value,
      template: translatedTemplate,
      provider: selectedProvider.value,
      model: selectedModel.value,
      apiKey: apiKeysStore.getKey(selectedProvider.value),
      locale: locale.value as 'it' | 'en'
    })

    if (response.success && response.result) {
      result.value = response.result
    } else {
      error.value = response.error || t('common.unknownError')
      suggestion.value = response.suggestion || ''
    }
  } catch (err: any) {
    error.value = err.message || t('common.testError')
  } finally {
    stopProgressSimulation()
    isLoading.value = false
  }
}

const copyPrompt = async () => {
  if (!generatedPrompt.value) return
  
  try {
    await navigator.clipboard.writeText(generatedPrompt.value)
    promptCopied.value = true
    setTimeout(() => {
      promptCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy prompt:', err)
  }
}

const copyResult = async () => {
  if (!result.value) return

  try {
    await navigator.clipboard.writeText(result.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-background pt-16">
    <Header />

    <div v-if="!framework" class="container mx-auto px-4 py-12">
      <Alert variant="destructive">
        <AlertCircle class="h-4 w-4 inline mr-2" />
        {{ t('framework.notFound') }}
      </Alert>
      <RouterLink to="/" class="mt-4 inline-block">
        <Button variant="ghost">
          <ArrowLeft class="h-4 w-4 mr-2" />
          {{ t('framework.backHome') }}
        </Button>
      </RouterLink>
    </div>

    <div v-else class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Back button -->
      <RouterLink to="/" class="inline-block mb-6 animate-slide-in-left">
        <Button variant="ghost" size="sm" class="hover:scale-105 transition-transform duration-200">
          <ArrowLeft class="h-4 w-4 mr-2" />
          {{ t('framework.backHome') }}
        </Button>
      </RouterLink>

      <!-- Framework Header -->
      <div class="mb-8 animate-fade-in">
        <div class="flex items-start space-x-4 mb-4">
          <div :class="`${framework.color} p-4 rounded-xl`">
            <component :is="framework.icon" class="h-8 w-8 text-white" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-4xl font-bold">{{ getFrameworkTitle(framework.id) }}</h1>
              <Badge v-if="framework.id === 'calibro'" variant="default" class="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white animate-pulse">
                {{ t('framework.new') }}
              </Badge>
            </div>
            <p class="text-xl text-muted-foreground mb-3">{{ getFrameworkDescription(framework.id) }}</p>
            <div class="flex space-x-2">
              <Badge variant="outline" :class="['font-medium', getDifficultyStyles(framework.difficulty)]">
                <span class="mr-1">{{ getDifficultyIcon(framework.difficulty) }}</span>
                {{ getTranslatedDifficulty(framework.difficulty) }}
              </Badge>
              <Badge variant="outline">{{ getTranslatedCategory(framework.category) }}</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div v-if="framework.example" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card class="p-6 animate-slide-in-left hover:shadow-lg transition-all duration-300" style="animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards;">
          <h2 class="text-2xl font-bold mb-4">{{ t('framework.explanation') }}</h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ getFrameworkExplanation(framework.id) }}
          </p>
        </Card>

        <Card class="p-6 animate-slide-in-right hover:shadow-lg transition-all duration-300" style="animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards;">
          <h2 class="text-2xl font-bold mb-4">{{ t('framework.example') }}</h2>
          <pre class="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-4 rounded-lg overflow-x-auto">{{ getFrameworkExample(framework.id) }}</pre>
        </Card>
      </div>

      <div v-else class="mb-8">
        <Card class="p-6 animate-fade-in hover:shadow-lg transition-all duration-300" style="animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards;">
          <h2 class="text-2xl font-bold mb-4">{{ t('framework.explanation') }}</h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ getFrameworkExplanation(framework.id) }}
          </p>
        </Card>
      </div>

      <div v-if="framework.template" class="mb-8 animate-fade-in" style="animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards;">
        <Card class="p-6 hover:shadow-lg transition-all duration-300">
          <h2 class="text-2xl font-bold mb-4">{{ t('framework.template') }}</h2>
          <pre class="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-4 rounded-lg overflow-x-auto">{{ getFrameworkTemplate(framework.id) || framework.template }}</pre>
        </Card>
      </div>

      <!-- Test Section - Full Width -->
      <Card class="p-6 animate-scale-in hover:shadow-lg transition-all duration-300" style="animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards;">
        <h2 class="text-2xl font-bold mb-6">{{ t('framework.testFramework') }}</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Provider selection -->
            <div>
              <label class="text-sm font-medium mb-2 block">{{ t('framework.aiProvider') }}</label>
              <Select
                v-model="selectedProvider"
                :options="providers"
                :placeholder="t('framework.selectProvider')"
                @update:modelValue="updateDefaultModel"
              />
              <p v-if="!hasApiKey" class="text-sm text-destructive mt-2">
                {{ t('framework.configureApiKey') }}
              </p>
            </div>

            <!-- Model selection -->
            <div>
              <label class="text-sm font-medium mb-2 block">{{ t('framework.model') }}</label>
              <Select
                v-model="selectedModel"
                :options="modelsByProvider"
                :placeholder="t('framework.selectModel')"
              />
            </div>
        </div>

        <div class="mb-6">
          <label class="text-sm font-medium mb-2 block">{{ t('framework.yourInput') }}</label>
          <Textarea
            v-model="userInput"
            :placeholder="t('framework.inputPlaceholder')"
            :rows="6"
          />
        </div>

        <!-- Test button -->
        <Button3D
          @click="handleTest"
          :disabled="!userInput.trim() || !hasApiKey || isLoading"
          variant="purple"
          size="default"
        >
          <Play v-if="!isLoading" class="h-5 w-5" />
          <span v-if="isLoading">{{ t('framework.testing') }}</span>
          <span v-else>{{ t('framework.testButton') }}</span>
        </Button3D>

        <!-- Progress Bar -->
        <div v-if="isLoading" class="mt-6 animate-fade-in">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <p class="text-sm font-medium text-muted-foreground">
                {{ t('framework.generatingWith', { provider: selectedProvider === 'openai' ? 'OpenAI' : selectedProvider === 'gemini' ? 'Google Gemini' : 'ZAI' }) }}
              </p>
            </div>
            <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {{ Math.round(progress) }}%
            </span>
          </div>
          <Progress variant="purple" :value="progress" :showPercentage="false" />
          <p class="text-xs text-muted-foreground mt-2 text-center">
            {{ progress < 30 ? t('framework.progress.sending') : progress < 60 ? t('framework.progress.processing') : progress < 90 ? t('framework.progress.almostReady') : t('framework.progress.finalizing') }}
          </p>
        </div>

        <!-- Generated Prompt Preview -->
        <div v-if="generatedPrompt" class="mt-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold">{{ t('framework.generatedPrompt') }}</h3>
            <Button
              @click="copyPrompt"
              variant="ghost"
              size="sm"
            >
              <Check v-if="promptCopied" class="h-4 w-4 mr-2" />
              <Copy v-else class="h-4 w-4 mr-2" />
              {{ promptCopied ? t('framework.copied') : t('framework.copyPrompt') }}
            </Button>
          </div>
          <Alert variant="default" class="bg-muted">
            <pre class="whitespace-pre-wrap text-xs leading-relaxed font-mono">{{ generatedPrompt }}</pre>
          </Alert>
          <p class="text-xs text-muted-foreground mt-2">
            {{ t('framework.promptSentInfo') }}
          </p>
        </div>

        <!-- Error -->
        <Alert v-if="error" variant="destructive" class="mt-6">
          <AlertCircle class="h-4 w-4 inline mr-2" />
          <strong>{{ error }}</strong>
          <p v-if="suggestion" class="text-sm mt-1">{{ suggestion }}</p>
        </Alert>

        <!-- Result - Full Width -->
        <div v-if="result" class="mt-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold">{{ t('framework.result') }}</h3>
            <Button
              @click="copyResult"
              variant="ghost"
              size="sm"
            >
              <Check v-if="copied" class="h-4 w-4 mr-2" />
              <Copy v-else class="h-4 w-4 mr-2" />
              {{ copied ? t('framework.copied') : t('framework.copy') }}
            </Button>
          </div>
          <Alert variant="success">
            <pre class="whitespace-pre-wrap text-sm leading-relaxed">{{ result }}</pre>
          </Alert>
        </div>
      </Card>
    </div>

    <Footer />
  </div>
</template>