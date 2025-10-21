# 🤖 Promptify Vue - Documentazione Tecnica per Claude

Questa documentazione è ottimizzata per aiutare Claude (e altri LLM) a comprendere rapidamente l'architettura e lo stato attuale del progetto Promptify Vue.

---

## 📋 Overview Progetto

**Promptify Vue** è un'applicazione web Vue 3 + TypeScript per esplorare, apprendere e testare oltre 30 framework professionali di prompt engineering. Include 3 framework signature personalizzati creati da AI di ultima generazione.

### Stack Tecnologico
- **Frontend**: Vue 3.5.22 (Composition API, `<script setup>`)
- **Build Tool**: Vite 7.1.7
- **Type System**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **Icons**: Lucide Vue Next 0.546.0, Heroicons Vue
- **State**: Pinia 3.0.3
- **Router**: Vue Router 4.6.3

---

## 🎯 Stato Attuale (Ottobre 2025)

### ✅ Completato
- 30+ framework di prompt engineering implementati
- 3 framework signature personalizzati: CALIBRO (GPT-5), BCM (GLM-4.6), PRISMA (Claude Sonnet 4.5)
- Testing interattivo con OpenAI, Gemini e ZAI API
- UI 3D pushable con effetti shadow/edge/front
- Dark/Light mode con persistenza
- Menu navigabile con hamburger mobile
- Badge creator AI con Heroicons
- Sezione "Come Funziona" interattiva
- Gestione API keys con localStorage
- Supporto fino a 16K token per risposte AI
- Footer unificato con logo header
- Alert component ottimizzato per light mode

### 🚧 Known Issues
- Nessuno attualmente

---

## 📁 Struttura Chiave

```
src/
├── components/
│   ├── ui/
│   │   ├── Card3D.vue          # Card con effetto pushable 3-layer
│   │   ├── Button3D.vue        # Button con effetto pushable + flex
│   │   ├── Icon3D.vue          # Icone con effetto 3D
│   │   ├── Badge.vue           # Badge categorie/difficoltà
│   │   ├── Alert.vue           # Alert con variant success/destructive
│   │   ├── Input.vue, Textarea.vue, Select.vue
│   │   └── Button.vue          # Button standard
│   ├── Header.vue              # Menu navigabile (desktop) + hamburger (mobile)
│   ├── Footer.vue              # Footer con logo unificato
│   └── ThemeToggle.vue         # Dark/Light toggle
│
├── data/
│   ├── frameworks.ts           # 30+ framework definitions
│   │   └── Interface: Framework { id, title, description, icon, color, 
│   │                             category, difficulty, createdBy?, 
│   │                             explanation, example, template }
│   └── guides.ts               # Guide e tutorial
│
├── views/
│   ├── Home.vue                # Homepage con hero, categorie, framework grid
│   ├── FrameworkDetail.vue     # Dettaglio + testing framework
│   ├── Guide.vue, GuideDetail.vue
│   └── Settings.vue            # Gestione API keys
│
├── stores/
│   └── apiKeys.ts              # Pinia store per OpenAI, Gemini, ZAI keys
│
├── utils/
│   └── apiCalls.ts             # callOpenAI, callGemini, callZAI
│                               # max_tokens: 16000 per tutti i provider
│
└── router/
    └── index.ts                # Vue Router con hash navigation
```

---

## 🎨 Componenti UI Signature

### Card3D.vue
Effetto pushable a 3 layer:
- **Shadow**: `translateY(2px)`, color variant-based
- **Edge**: Gradient border, stesso z-index di shadow
- **Front**: `translateY(-4px)`, contenuto principale
- **Hover**: front `-6px`, shadow `+4px`, `brightness(110%)`
- **Active**: front `-2px`, shadow `+1px`

Props: `variant` (default|purple|blue|green|orange|pink)

### Button3D.vue
Same as Card3D ma per bottoni.
- Props: `variant`, `size` (sm|default|lg), `class`
- Display: `flex` con `align-items: center`, `justify-content: center`
- Size sm: `text-xs py-2 px-4 gap-2`
- Size default: `text-base py-3 px-8 gap-2`
- Size lg: `text-lg py-4 px-10 gap-3`

### Alert.vue
Alert box con 3 variant:
- **default**: `bg-background text-foreground`
- **destructive**: `border-destructive/50 text-destructive`
- **success**: `border-green-500/50 text-foreground dark:text-green-400`
  - ⚠️ IMPORTANTE: In light mode usa `text-foreground` per leggibilità

### Badge.vue
Badge con variant: default, secondary, destructive, outline, success

---

## 🧪 Testing Framework Flow

### FrameworkDetail.vue
1. User inserisce input in `<Textarea>`
2. Seleziona provider (OpenAI/Gemini/ZAI) e model
3. Click su `<Button3D>` "Testa Framework"
4. `handleTest()` chiama `testFramework()` in `apiCalls.ts`
5. API call con prompt arricchito (framework explanation + template + input)
6. Risultato mostrato in `<Alert variant="success">`

### apiCalls.ts
```typescript
export async function testFramework(request: TestFrameworkRequest): Promise<TestFrameworkResponse>

// Costruisce enrichedPrompt:
// - frameworkName + frameworkExplanation
// - template (con {input} replacement)
// - userInput

// Chiama provider-specific function:
callOpenAI(prompt, apiKey, model='gpt-5-2025-08-07') // max_tokens: 16000
callGemini(prompt, apiKey, model='gemini-2.5-flash') // maxOutputTokens: 16000
callZAI(prompt, apiKey, model='z-ai/glm-4.6')       // max_tokens: 16000
```

---

## 📊 Framework Data Structure

```typescript
interface Framework {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string  // Tailwind gradient classes
  category: 'Creativo' | 'Analitico' | 'Strutturato' | 'Comunicativo' | 'Tecnico' | 'Innovativo' | 'Marketing'
  difficulty: 'Facile' | 'Medio' | 'Avanzato'
  createdBy?: string  // "GPT-5", "GLM-4.6", "Claude Sonnet 4.5"
  explanation: string  // Spiegazione dettagliata del framework
  example: string      // Esempio concreto di utilizzo
  template: string     // Meta-prompt template con {input} placeholder
}
```

### Framework Signature Personalizzati

1. **CALIBRO** (id: 'calibro')
   - Creato da: GPT-5
   - Categoria: Innovativo
   - Badge: ⭐ NUOVO + 🤖 GPT-5
   - Meta-framework modulare enterprise

2. **BCM** (id: 'bcm')
   - Creato da: GLM-4.6
   - Categoria: Marketing
   - Brief Creativo Multistile con auto-valutazione

3. **PRISMA** (id: 'prisma')
   - Creato da: Claude Sonnet 4.5
   - Categoria: Innovativo
   - Meta-framework definitivo che unisce ReAct, Tree of Thoughts, CALIBRO, CRAFT

---

## 🎯 Header Navigation

### Desktop (md+)
- Logo (sinistra)
- Menu centrale: Home, Categorie, Come Funziona, Guide
- Destra: ThemeToggle + Settings icon

### Mobile
- Logo (sinistra)
- Hamburger button (destra)
- Menu slide-down con:
  - Voci navigazione verticali
  - Link Impostazioni con icona
  - Auto-close al click

No SearchBar (rimossa in favor di menu pulito)

---

## 🌈 Macro Categorie Framework

```typescript
const macroCategories = [
  { name: 'Creativi', count: 5, color: 'from-pink-500 to-purple-500', icon: Sparkles },
  { name: 'Analitici', count: 6, color: 'from-blue-500 to-cyan-500', icon: Brain },
  { name: 'Strutturati', count: 8, color: 'from-green-500 to-emerald-500', icon: Layout },
  { name: 'Comunicativi', count: 4, color: 'from-orange-500 to-yellow-500', icon: MessageSquare },
  { name: 'Tecnici', count: 3, color: 'from-indigo-500 to-purple-500', icon: Code },
  { name: 'Innovativi', count: 3, color: 'from-purple-500 to-pink-500', icon: Zap },
  { name: 'Marketing', count: 1, color: 'from-pink-600 to-orange-600', icon: TrendingUp },
]
```

---

## 🎨 Tailwind Customization

### Colors
- Primary: Purple-600
- Secondary: Orange-600
- Accent: Blue-600, Cyan-600, Green-600, Pink-600

### Typography
- Font: System font stack
- Logo: Font-mono

### Custom CSS
- Animate-fade-in: Custom animation in `style.css`
- 3D effects: Custom shadow/transform in component styles

---

## 🔧 Environment & Config

### Vite Config
```typescript
export default defineConfig({
  server: {
    port: 5174  // Custom dev port
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

### Tailwind Config
- Content: `["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]`
- Dark mode: 'class'

---

## 📝 Development Notes

### Badge Icons (Heroicons)
- Importati da `@heroicons/vue/24/solid`
- `SparklesIcon`: Badge NEW e NUOVO
- `CpuChipIcon`: Badge creator AI

### API Keys Storage
- Salvate in localStorage via Pinia store
- Keys: `openai_api_key`, `gemini_api_key`, `zai_api_key`
- ⚠️ Client-side only, non sicuro per produzione

### Router Hash Navigation
- `/#categories` → Scroll to categories section
- `/#how-it-works` → Scroll to Come Funziona section

---

## 🚀 Recent Updates (Commits)

### Ultimo commit
```
fix: improve UI components and PRISMA template
- Fix Alert component text color in light mode (text-foreground instead of green)
- Improve Button3D component: add flex layout, custom class support, reduce sm size
- Fix button alignment in "Come Funziona" section and framework detail page
- Remove specific AI model names from PRISMA template TARGET section
- Reduce button sizes from lg to default for better proportions
```

### Commit precedente
```
feat: integrate heroicons for professional badges and increase AI response context
- Replace emoji with heroicons in badges (SparklesIcon, CpuChipIcon)
- Increase max_tokens from 8000 to 16000 for all API providers
- Add @heroicons/vue package
```

---

## 💡 Tips per Claude

1. **Quando modifichi Card3D/Button3D**: Ricorda i 3 layer (shadow, edge, front) e le transizioni hover/active
2. **Quando aggiungi framework**: Usa l'interface Framework e aggiungi a `frameworks.ts`
3. **Quando modifichi API calls**: max_tokens è 16000 per tutti i provider
4. **Quando modifichi Alert**: In light mode usa `text-foreground`, in dark `text-green-400` per success
5. **Quando modifichi Button3D**: Display è `flex`, non `block`
6. **Badge creator**: Solo per calibro, bcm, prisma (hanno `createdBy` field)

---

## 📚 Risorse

- Vue 3 Docs: https://vuejs.org/
- Tailwind CSS: https://tailwindcss.com/
- Heroicons: https://heroicons.com/
- Lucide Icons: https://lucide.dev/

---

**Ultimo aggiornamento**: 21 Ottobre 2025  
**Versione**: 1.2.0  
**Maintainer**: Francesco Caburlotto (@fracabu)
