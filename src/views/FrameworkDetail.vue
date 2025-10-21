<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
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
import { ArrowLeft, Play, Copy, Check, AlertCircle } from 'lucide-vue-next'

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

const providers = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'zai', label: 'ZAI' }
]

const modelsByProvider = computed(() => {
  const models = {
    openai: [
      { value: 'gpt-5-2025-08-07', label: 'GPT-5 (Più recente)' },
      { value: 'gpt-5-mini-2025-08-07', label: 'GPT-5 Mini (Veloce)' },
      { value: 'gpt-4.1-2025-04-14', label: 'GPT-4.1' }
    ],
    gemini: [
      { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Veloce)' },
      { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Più potente)' }
    ],
    zai: [
      { value: 'z-ai/glm-4.6', label: 'GLM-4.6' },
      { value: 'z-ai/glm-4.5', label: 'GLM-4.5' }
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

  const template = currentFramework.template || ''
  
  // Replace {input} placeholder with actual user input
  generatedPrompt.value = template.replace(/{input}/g, userInput.value)
}

const handleTest = async () => {
  if (!framework.value || !userInput.value.trim()) return

  error.value = ''
  suggestion.value = ''
  result.value = ''
  generatedPrompt.value = ''
  isLoading.value = true

  // Generate prompt preview
  generatePromptPreview()

  try {
    const response = await testFramework({
      framework: framework.value.id,
      frameworkName: framework.value.title,
      frameworkExplanation: framework.value.explanation,
      input: userInput.value,
      template: framework.value.template,
      provider: selectedProvider.value,
      model: selectedModel.value,
      apiKey: apiKeysStore.getKey(selectedProvider.value)
    })

    if (response.success && response.result) {
      result.value = response.result
    } else {
      error.value = response.error || 'Errore sconosciuto'
      suggestion.value = response.suggestion || ''
    }
  } catch (err: any) {
    error.value = err.message || 'Errore durante il test'
  } finally {
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
        Framework non trovato
      </Alert>
      <RouterLink to="/" class="mt-4 inline-block">
        <Button variant="ghost">
          <ArrowLeft class="h-4 w-4 mr-2" />
          Torna alla home
        </Button>
      </RouterLink>
    </div>

    <div v-else class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Back button -->
      <RouterLink to="/" class="inline-block mb-6 animate-slide-in-left">
        <Button variant="ghost" size="sm" class="hover:scale-105 transition-transform duration-200">
          <ArrowLeft class="h-4 w-4 mr-2" />
          Torna alla home
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
              <h1 class="text-4xl font-bold">{{ framework.title }}</h1>
              <Badge v-if="framework.id === 'calibro'" variant="default" class="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white animate-pulse">
                🆕 NUOVO
              </Badge>
            </div>
            <p class="text-xl text-muted-foreground mb-3">{{ framework.description }}</p>
            <div class="flex space-x-2">
              <Badge variant="outline" :class="['font-medium', getDifficultyStyles(framework.difficulty)]">
                <span class="mr-1">{{ getDifficultyIcon(framework.difficulty) }}</span>
                {{ framework.difficulty }}
              </Badge>
              <Badge variant="outline">{{ framework.category }}</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div v-if="framework.example" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card class="p-6 animate-slide-in-left hover:shadow-lg transition-all duration-300" style="animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards;">
          <h2 class="text-2xl font-bold mb-4">Spiegazione</h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ framework.explanation }}
          </p>
        </Card>

        <Card class="p-6 animate-slide-in-right hover:shadow-lg transition-all duration-300" style="animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards;">
          <h2 class="text-2xl font-bold mb-4">Esempio</h2>
          <pre class="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-4 rounded-lg overflow-x-auto">{{ framework.example }}</pre>
        </Card>
      </div>

      <div v-else class="mb-8">
        <Card class="p-6 animate-fade-in hover:shadow-lg transition-all duration-300" style="animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards;">
          <h2 class="text-2xl font-bold mb-4">Spiegazione</h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ framework.explanation }}
          </p>
        </Card>
      </div>

      <div v-if="framework.template" class="mb-8 animate-fade-in" style="animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards;">
        <Card class="p-6 hover:shadow-lg transition-all duration-300">
          <h2 class="text-2xl font-bold mb-4">Template</h2>
          <pre class="text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-4 rounded-lg overflow-x-auto">{{ framework.template }}</pre>
        </Card>
      </div>

      <!-- Test Section - Full Width -->
      <Card class="p-6 animate-scale-in hover:shadow-lg transition-all duration-300" style="animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards;">
        <h2 class="text-2xl font-bold mb-6">Testa il Framework</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Provider selection -->
            <div>
              <label class="text-sm font-medium mb-2 block">Provider AI</label>
              <Select
                v-model="selectedProvider"
                :options="providers"
                placeholder="Seleziona provider..."
                @update:modelValue="updateDefaultModel"
              />
              <p v-if="!hasApiKey" class="text-sm text-destructive mt-2">
                ⚠️ Configura la chiave API nelle <RouterLink to="/impostazioni" class="underline">impostazioni</RouterLink>
              </p>
            </div>

            <!-- Model selection -->
            <div>
              <label class="text-sm font-medium mb-2 block">Modello</label>
              <Select
                v-model="selectedModel"
                :options="modelsByProvider"
                placeholder="Seleziona modello..."
              />
            </div>
        </div>

        <div class="mb-6">
          <label class="text-sm font-medium mb-2 block">Il tuo input</label>
          <Textarea
            v-model="userInput"
            placeholder="Inserisci il tuo prompt o problema..."
            :rows="6"
          />
        </div>

        <!-- Test button -->
        <Button3D
          @click="handleTest"
          :disabled="!userInput.trim() || !hasApiKey || isLoading"
          variant="purple"
          size="lg"
        >
          <Play v-if="!isLoading" class="h-5 w-5 mr-2 inline" />
          <span v-if="isLoading">Testing...</span>
          <span v-else>Testa Framework</span>
        </Button3D>

        <!-- Generated Prompt Preview -->
        <div v-if="generatedPrompt" class="mt-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold">Prompt Generato</h3>
            <Button
              @click="copyPrompt"
              variant="ghost"
              size="sm"
            >
              <Check v-if="promptCopied" class="h-4 w-4 mr-2" />
              <Copy v-else class="h-4 w-4 mr-2" />
              {{ promptCopied ? 'Copiato!' : 'Copia Prompt' }}
            </Button>
          </div>
          <Alert variant="default" class="bg-muted">
            <pre class="whitespace-pre-wrap text-xs leading-relaxed font-mono">{{ generatedPrompt }}</pre>
          </Alert>
          <p class="text-xs text-muted-foreground mt-2">
            👆 Questo è il prompt completo che verrà inviato all'AI
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
            <h3 class="text-lg font-semibold">Risultato</h3>
            <Button
              @click="copyResult"
              variant="ghost"
              size="sm"
            >
              <Check v-if="copied" class="h-4 w-4 mr-2" />
              <Copy v-else class="h-4 w-4 mr-2" />
              {{ copied ? 'Copiato!' : 'Copia' }}
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