<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApiKeysStore, type ApiProvider } from '../stores/apiKeys'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/ui/Card.vue'
import Input from '../components/ui/Input.vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'
import { Key, Trash2, Save, Eye, EyeOff } from 'lucide-vue-next'

const { t } = useI18n()
const apiKeysStore = useApiKeysStore()

const providers = computed(() => [
  {
    id: 'openai' as ApiProvider,
    name: t('settings.providers.openai.name'),
    description: t('settings.providers.openai.description')
  },
  {
    id: 'gemini' as ApiProvider,
    name: t('settings.providers.gemini.name'),
    description: t('settings.providers.gemini.description')
  },
  {
    id: 'zai' as ApiProvider,
    name: t('settings.providers.zai.name'),
    description: t('settings.providers.zai.description')
  }
])

const tempKeys = ref<Record<ApiProvider, string>>({
  openai: apiKeysStore.getKey('openai'),
  gemini: apiKeysStore.getKey('gemini'),
  zai: apiKeysStore.getKey('zai')
})

const showKeys = ref<Record<ApiProvider, boolean>>({
  openai: false,
  gemini: false,
  zai: false
})

const saveKey = (provider: ApiProvider) => {
  apiKeysStore.setKey(provider, tempKeys.value[provider])
}

const clearKey = (provider: ApiProvider) => {
  tempKeys.value[provider] = ''
  apiKeysStore.clearKey(provider)
}

const toggleShowKey = (provider: ApiProvider) => {
  showKeys.value[provider] = !showKeys.value[provider]
}
</script>

<template>
  <div class="min-h-screen bg-background pt-16">
    <Header />

    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">{{ t('settings.title') }}</h1>
        <p class="text-muted-foreground">
          {{ t('settings.subtitle') }}
        </p>
      </div>

      <div class="space-y-6">
        <Card
          v-for="provider in providers"
          :key="provider.id"
          class="p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-purple-600 rounded-lg">
                <Key class="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 class="font-bold text-lg">{{ provider.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ provider.description }}</p>
              </div>
            </div>
            <Badge v-if="apiKeysStore.getKey(provider.id)" variant="default">
              {{ t('settings.configured') }}
            </Badge>
            <Badge v-else variant="outline">
              {{ t('settings.notConfigured') }}
            </Badge>
          </div>

          <div class="space-y-3">
            <div class="relative">
              <Input
                v-model="tempKeys[provider.id]"
                :type="showKeys[provider.id] ? 'text' : 'password'"
                :placeholder="t('settings.inputPlaceholder', { provider: provider.name })"
                class="pr-10"
              />
              <button
                @click="toggleShowKey(provider.id)"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Eye v-if="!showKeys[provider.id]" class="h-4 w-4" />
                <EyeOff v-else class="h-4 w-4" />
              </button>
            </div>

            <div class="flex space-x-2">
              <Button @click="saveKey(provider.id)" :disabled="!tempKeys[provider.id]">
                <Save class="h-4 w-4 mr-2" />
                {{ t('settings.save') }}
              </Button>
              <Button
                v-if="apiKeysStore.getKey(provider.id)"
                @click="clearKey(provider.id)"
                variant="destructive"
              >
                <Trash2 class="h-4 w-4 mr-2" />
                {{ t('settings.remove') }}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div class="mt-8 p-4 border border-muted rounded-lg bg-muted/50">
        <h4 class="font-semibold mb-2 flex items-center">
          <svg class="h-5 w-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ t('settings.privacyTitle') }}
        </h4>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li v-for="(item, index) in t('settings.privacyItems')" :key="index">• {{ item }}</li>
        </ul>
      </div>
    </div>

    <Footer />
  </div>
</template>
