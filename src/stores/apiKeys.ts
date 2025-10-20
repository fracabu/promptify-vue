import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ApiProvider = 'openai' | 'gemini' | 'zai'

export const useApiKeysStore = defineStore('apiKeys', () => {
  // State
  const keys = ref<Record<ApiProvider, string>>({
    openai: '',
    gemini: '',
    zai: ''
  })

  // Load from localStorage on init
  const loadKeys = () => {
    try {
      const stored = localStorage.getItem('promptify-api-keys')
      if (stored) {
        const parsed = JSON.parse(stored)
        keys.value = { ...keys.value, ...parsed }
      }
    } catch (error) {
      console.error('Error loading API keys:', error)
    }
  }

  // Save to localStorage
  const saveKeys = () => {
    try {
      localStorage.setItem('promptify-api-keys', JSON.stringify(keys.value))
    } catch (error) {
      console.error('Error saving API keys:', error)
    }
  }

  // Actions
  const setKey = (provider: ApiProvider, key: string) => {
    keys.value[provider] = key
    saveKeys()
  }

  const getKey = (provider: ApiProvider): string => {
    return keys.value[provider] || ''
  }

  const clearKey = (provider: ApiProvider) => {
    keys.value[provider] = ''
    saveKeys()
  }

  const clearAllKeys = () => {
    keys.value = { openai: '', gemini: '', zai: '' }
    saveKeys()
  }

  // Computed
  const hasKey = computed(() => (provider: ApiProvider) => {
    return keys.value[provider].length > 0
  })

  const hasAnyKey = computed(() => {
    return Object.values(keys.value).some(key => key.length > 0)
  })

  // Load keys on store creation
  loadKeys()

  return {
    keys,
    setKey,
    getKey,
    clearKey,
    clearAllKeys,
    hasKey,
    hasAnyKey
  }
})
