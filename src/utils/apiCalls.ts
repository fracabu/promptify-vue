import type { ApiProvider } from '../stores/apiKeys'

export interface TestFrameworkRequest {
  framework: string
  frameworkName?: string
  frameworkExplanation?: string
  input: string
  template?: string
  provider: ApiProvider
  model?: string
  apiKey: string
  locale?: 'it' | 'en'
}

// System prompts by locale
const systemPrompts = {
  it: 'Sei un assistente AI specializzato nel prompt engineering. Rispondi sempre applicando correttamente i framework e fornendo risposte dettagliate e complete.',
  en: 'You are an AI assistant specialized in prompt engineering. Always respond by correctly applying the frameworks and providing detailed and complete answers.'
}

export interface TestFrameworkResponse {
  success: boolean
  result?: string
  error?: string
  suggestion?: string
}

// OpenAI API call
async function callOpenAI(prompt: string, apiKey: string, model: string = 'gpt-5-2025-08-07', locale: 'it' | 'en' = 'it'): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: systemPrompts[locale]
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 16000
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || 'Errore chiamata OpenAI')
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'Nessuna risposta generata'
}

// Gemini API call
async function callGemini(prompt: string, apiKey: string, model: string = 'gemini-2.5-flash', locale: 'it' | 'en' = 'it'): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${systemPrompts[locale]}\n\n${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 16000
      }
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || 'Errore chiamata Gemini')
  }

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || 'Nessuna risposta generata'
}

// ZAI API call
async function callZAI(prompt: string, apiKey: string, model: string = 'z-ai/glm-4.6', locale: 'it' | 'en' = 'it'): Promise<string> {
  try {
    const response = await fetch('https://api.zukijourney.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompts[locale]
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 16000
      })
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error?.message || `Errore ZAI: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || 'Nessuna risposta generata'
  } catch (error: any) {
    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_NAME_NOT_RESOLVED')) {
      throw new Error('Impossibile connettersi al servizio ZAI. Verifica la connessione o prova con un altro provider (OpenAI o Gemini).')
    }
    throw error
  }
}

// Prompt templates by locale
const promptTemplates = {
  it: {
    usingFramework: 'Stai utilizzando il framework di prompt engineering',
    frameworkExplanation: 'SPIEGAZIONE DEL FRAMEWORK',
    instructions: 'ISTRUZIONI',
    applyFramework: 'Applica questo framework alla richiesta dell\'utente seguendo la struttura e i principi spiegati sopra.',
    useTemplate: 'Usa questo template come guida',
    userRequest: 'RICHIESTA DELL\'UTENTE',
    provideResponse: 'Fornisci una risposta dettagliata e ben strutturata applicando correttamente il framework.',
    missingApiKey: 'Chiave API mancante',
    configureApiKey: 'Configura la chiave API nelle impostazioni'
  },
  en: {
    usingFramework: 'You are using the prompt engineering framework',
    frameworkExplanation: 'FRAMEWORK EXPLANATION',
    instructions: 'INSTRUCTIONS',
    applyFramework: 'Apply this framework to the user\'s request following the structure and principles explained above.',
    useTemplate: 'Use this template as a guide',
    userRequest: 'USER REQUEST',
    provideResponse: 'Provide a detailed and well-structured response by correctly applying the framework.',
    missingApiKey: 'Missing API key',
    configureApiKey: 'Configure the API key in settings'
  }
}

// Main test framework function
export async function testFramework(request: TestFrameworkRequest): Promise<TestFrameworkResponse> {
  try {
    const { frameworkName, frameworkExplanation, input, template, provider, model, apiKey, locale = 'it' } = request
    const texts = promptTemplates[locale]

    if (!apiKey) {
      return {
        success: false,
        error: texts.missingApiKey,
        suggestion: texts.configureApiKey
      }
    }

    // Build enriched prompt with framework context
    let enrichedPrompt = ''

    if (frameworkName && frameworkExplanation) {
      enrichedPrompt = `${texts.usingFramework}: "${frameworkName}"

${texts.frameworkExplanation}:
${frameworkExplanation}

${texts.instructions}:
${texts.applyFramework}
${template ? `${texts.useTemplate}: ${template}` : ''}

${texts.userRequest}:
${input}

${texts.provideResponse}`
    } else {
      // Fallback to basic template application
      enrichedPrompt = template ? template.replace('{input}', input) : input
    }

    let result: string

    // Call appropriate provider
    switch (provider) {
      case 'openai':
        result = await callOpenAI(enrichedPrompt, apiKey, model || 'gpt-5-2025-08-07', locale)
        break
      case 'gemini':
        result = await callGemini(enrichedPrompt, apiKey, model || 'gemini-2.5-flash', locale)
        break
      case 'zai':
        result = await callZAI(enrichedPrompt, apiKey, model || 'z-ai/glm-4.6', locale)
        break
      default:
        throw new Error(`Provider ${provider} non supportato`)
    }

    return {
      success: true,
      result
    }
  } catch (error: any) {
    console.error('Framework test error:', error)

    let errorMessage = 'Errore durante il test del framework'
    let suggestion = ''

    if (error.message) {
      if (error.message.includes('fetch failed') || error.message.includes('UNABLE_TO_VERIFY')) {
        errorMessage = 'Errore di connessione SSL con il provider'
        suggestion = 'Prova con un provider diverso o verifica la tua connessione'
      } else if (error.message.includes('invalid') || error.message.includes('unauthorized')) {
        errorMessage = 'Chiave API non valida'
        suggestion = 'Verifica la tua chiave API nelle impostazioni'
      } else if (error.message.includes('quota')) {
        errorMessage = 'Quota API esaurita'
        suggestion = 'Controlla i limiti del tuo piano API'
      } else {
        errorMessage = error.message
      }
    }

    return {
      success: false,
      error: errorMessage,
      suggestion
    }
  }
}
