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
}

export interface TestFrameworkResponse {
  success: boolean
  result?: string
  error?: string
  suggestion?: string
}

// OpenAI API call
async function callOpenAI(prompt: string, apiKey: string, model: string = 'gpt-5-2025-08-07'): Promise<string> {
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
          content: 'Sei un assistente AI specializzato nel prompt engineering. Rispondi sempre applicando correttamente i framework e fornendo risposte dettagliate e complete.'
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
async function callGemini(prompt: string, apiKey: string, model: string = 'gemini-2.5-flash'): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Sei un assistente AI specializzato nel prompt engineering. Rispondi sempre applicando correttamente i framework e fornendo risposte dettagliate e complete.\n\n${prompt}`
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
async function callZAI(prompt: string, apiKey: string, model: string = 'z-ai/glm-4.6'): Promise<string> {
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
            content: 'Sei un assistente AI specializzato nel prompt engineering. Rispondi sempre applicando correttamente i framework e fornendo risposte dettagliate e complete.'
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

// Main test framework function
export async function testFramework(request: TestFrameworkRequest): Promise<TestFrameworkResponse> {
  try {
    const { frameworkName, frameworkExplanation, input, template, provider, model, apiKey } = request

    if (!apiKey) {
      return {
        success: false,
        error: 'Chiave API mancante',
        suggestion: 'Configura la chiave API nelle impostazioni'
      }
    }

    // Build enriched prompt with framework context
    let enrichedPrompt = ''
    
    if (frameworkName && frameworkExplanation) {
      enrichedPrompt = `Stai utilizzando il framework di prompt engineering: "${frameworkName}"

SPIEGAZIONE DEL FRAMEWORK:
${frameworkExplanation}

ISTRUZIONI:
Applica questo framework alla richiesta dell'utente seguendo la struttura e i principi spiegati sopra.
${template ? `Usa questo template come guida: ${template}` : ''}

RICHIESTA DELL'UTENTE:
${input}

Fornisci una risposta dettagliata e ben strutturata applicando correttamente il framework.`
    } else {
      // Fallback to basic template application
      enrichedPrompt = template ? template.replace('{input}', input) : input
    }

    let result: string

    // Call appropriate provider
    switch (provider) {
      case 'openai':
        result = await callOpenAI(enrichedPrompt, apiKey, model || 'gpt-5-2025-08-07')
        break
      case 'gemini':
        result = await callGemini(enrichedPrompt, apiKey, model || 'gemini-2.5-flash')
        break
      case 'zai':
        result = await callZAI(enrichedPrompt, apiKey, model || 'z-ai/glm-4.6')
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
