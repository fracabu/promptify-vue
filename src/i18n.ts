import { createI18n } from 'vue-i18n'

// Import locale files
import itUI from './locales/it/ui.json'
import enUI from './locales/en/ui.json'
import itFrameworks from './locales/it/frameworks.json'
import enFrameworks from './locales/en/frameworks.json'
import itGuides from './locales/it/guides.json'
import enGuides from './locales/en/guides.json'

// Merge locale messages - properly merge guides to keep UI strings and items together
const messages = {
  it: {
    ...itUI,
    frameworks: itFrameworks,
    guides: {
      ...(itUI as Record<string, unknown>).guides as Record<string, unknown>,
      ...itGuides
    }
  },
  en: {
    ...enUI,
    frameworks: enFrameworks,
    guides: {
      ...(enUI as Record<string, unknown>).guides as Record<string, unknown>,
      ...enGuides
    }
  }
}

// Get saved locale or detect from browser
const getSavedLocale = (): 'it' | 'en' => {
  const saved = localStorage.getItem('locale')
  if (saved === 'it' || saved === 'en') {
    return saved
  }
  // Detect from browser
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'en' ? 'en' : 'it'
}

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getSavedLocale(),
  fallbackLocale: 'it',
  messages
})

export default i18n

// Helper to change locale and save preference
export const setLocale = (locale: string) => {
  if (['it', 'en'].includes(locale)) {
    i18n.global.locale.value = locale as 'it' | 'en'
    localStorage.setItem('locale', locale)
  }
}

export const getCurrentLocale = () => i18n.global.locale.value
