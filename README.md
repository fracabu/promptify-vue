# 🎯 Promptify Vue

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Applicazione web interattiva per esplorare e testare 28 framework di Prompt Engineering**

[Demo Live](#) • [Documentazione](#features) • [Contribuisci](#contributing)

</div>

---

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Framework Disponibili](#-framework-disponibili)
- [Tecnologie](#️-tecnologie)
- [Installazione](#-installazione)
- [Sviluppo](#️-sviluppo)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

---

## ✨ Caratteristiche

### 🎨 UI/UX Moderna
- **Card 3D Pushable**: Effetto push interattivo con tre layer (shadow, edge, front)
- **Dark/Light Mode**: Tema scuro/chiaro con persistenza localStorage
- **Animazioni Fluide**: Transizioni CSS ottimizzate per un'esperienza premium
- **Responsive Design**: Layout ottimizzato per mobile, tablet e desktop

### 🔍 Esplorazione Framework
- **28 Framework**: Collezione completa dei migliori framework di prompt engineering
- **Filtri per Categoria**: Creativi, Analitici, Strutturati, Comunicativi, Tecnici, Innovativi
- **Ricerca Avanzata**: Cerca per nome, descrizione o caratteristiche
- **Badge Visivi**: Difficoltà e categorie visualizzate con badge colorati

### 🧪 Testing Interattivo
- **Prova i Prompt**: Interfaccia per testare ogni framework con input personalizzati
- **Preview Generato**: Visualizza il prompt finale prima dell'invio
- **Copy to Clipboard**: Copia rapidamente i prompt generati
- **Meta-Prompts**: Template intelligenti che guidano l'AI nella generazione

### 🔧 Funzionalità Tecniche
- **API Integration**: Supporto per OpenAI, Anthropic, Gemini
- **Gestione API Keys**: Storage sicuro delle chiavi API in localStorage
- **Router Vue**: Navigazione SPA con Vue Router
- **State Management**: Pinia per la gestione dello stato globale

---

## 🎯 Framework Disponibili

### 📚 Completati con Meta-Prompts (7/28)
1. **APE** - Action, Purpose, Expectation
2. **AIDA** - Attention, Interest, Desire, Action
3. **BAB** - Before, After, Bridge
4. **CARE** - Context, Action, Result, Example
5. **COAST** - Context, Objective, Actions, Scenario, Task
6. **COSTAR** - Context, Objective, Style, Tone, Audience, Response
7. **CRISPE** - Capacity, Insight, Statement, Personality, Experiment

### 🆕 Novità
- **CALIBRO** - Framework innovativo per calibrare precisione delle risposte AI

### 📝 Altri Framework Inclusi
- Chain of Thought
- CRAFT (Context, Role, Action, Format, Target)
- Few Shot Learning
- GRADE, PAR, RACE, SMART, STAR
- E molti altri... (21 in arrivo)

---

## 🛠️ Tecnologie

### Frontend
- **Vue 3** (3.5.22) - Composition API, `<script setup>`, Reactivity System
- **TypeScript** (5.6.3) - Type safety e IntelliSense
- **Vite** (7.1.11) - Build tool ultra-veloce con HMR
- **Vue Router** (4.5.0) - Routing SPA

### Styling
- **Tailwind CSS** (3.4.18) - Utility-first CSS framework
- **PostCSS** - Autoprefixer e ottimizzazioni CSS
- **Lucide Icons** - Libreria icone moderne e leggere

### State & Utils
- **Pinia** (2.3.0) - Store management
- **Axios** (optional) - HTTP client per API calls

---

## 📦 Installazione

### Prerequisiti
- **Node.js** >= 18.x
- **npm** >= 9.x o **yarn** >= 1.22

### Setup

```bash
# Clone del repository
git clone https://github.com/fracabu/promptify-vue.git
cd promptify-vue

# Installazione dipendenze
npm install

# Avvio dev server
npm run dev
```

Il server di sviluppo sarà disponibile su `http://localhost:5173` (o altra porta se 5173 è occupata).

---

## 🖥️ Sviluppo

### Comandi Disponibili

```bash
# Sviluppo con HMR
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview

# Lint e check TypeScript
npm run type-check

# Build TypeScript
npm run build-only
```

### Variabili d'Ambiente

Crea un file `.env.local` (non committato) per le tue chiavi API:

```env
VITE_OPENAI_API_KEY=your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
VITE_GEMINI_API_KEY=your_gemini_key
```

**⚠️ Nota**: Le chiavi API sono gestite lato client. Per produzione, implementa un backend proxy.

---

## 📁 Struttura del Progetto

```
promptify-vue/
├── public/              # Asset statici
├── src/
│   ├── assets/         # Immagini, font, SVG
│   ├── components/
│   │   ├── ui/         # Componenti UI riutilizzabili
│   │   │   ├── Card3D.vue       # Card con effetto 3D pushable
│   │   │   ├── Button3D.vue     # Button con effetto push
│   │   │   ├── Icon3D.vue       # Icone con effetto 3D
│   │   │   ├── Badge.vue        # Badge per categorie
│   │   │   ├── Input.vue        # Input field
│   │   │   ├── Textarea.vue     # Textarea
│   │   │   └── Select.vue       # Select dropdown
│   │   ├── Header.vue           # Header con navigazione
│   │   ├── Footer.vue           # Footer
│   │   ├── SearchBar.vue        # Barra di ricerca
│   │   └── ThemeToggle.vue      # Toggle dark/light mode
│   ├── data/
│   │   ├── frameworks.ts        # Dati dei 28 framework
│   │   └── guides.ts            # Guide e tutorial
│   ├── router/
│   │   └── index.ts             # Configurazione Vue Router
│   ├── stores/
│   │   └── apiKeys.ts           # Store Pinia per API keys
│   ├── utils/
│   │   └── apiCalls.ts          # Utility per chiamate API
│   ├── views/
│   │   ├── Home.vue             # Homepage con grid framework
│   │   ├── FrameworkDetail.vue  # Dettaglio singolo framework
│   │   ├── Guide.vue            # Lista guide
│   │   ├── GuideDetail.vue      # Dettaglio guida
│   │   └── Settings.vue         # Impostazioni e API keys
│   ├── App.vue                  # Componente root
│   ├── main.ts                  # Entry point
│   └── style.css                # Stili globali Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🎨 Componenti Principali

### Card3D.vue
Card con effetto pushable a tre layer:
- **Shadow Layer**: Ombra con `translateY(2px)`
- **Edge Layer**: Bordo colorato con gradiente
- **Front Layer**: Superficie principale con `translateY(-4px)`

Props:
- `variant`: `default | purple | blue | green | orange | pink`
- Hover: `brightness(110%)`, front `-6px`, shadow `+4px`
- Active: front `-2px`, shadow `+1px`

### Button3D.vue
Button interattivo con stesso effetto pushable delle card.

### Icon3D.vue
Icone con effetto 3D e animazioni hover/active.

---

## 🤝 Contribuire

I contributi sono benvenuti! 

### Come Contribuire

1. **Fork** il progetto
2. **Crea** un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. **Apri** una Pull Request

### Aree di Contributo

- 📝 **Meta-Prompts**: Completa i 21 framework rimanenti
- 🎨 **UI/UX**: Migliora componenti e animazioni
- 🐛 **Bug Fix**: Risolvi issue aperti (es. CRAFT/CRISPE styling)
- 📚 **Documentazione**: Aggiungi guide e tutorial
- 🌐 **i18n**: Traduzioni in altre lingue
- 🧪 **Testing**: Aggiungi unit test e e2e test

---

## 🐛 Issue Noti

- **CRAFT & CRISPE Cards**: Background color leggermente diverso dalle altre card (in investigazione)

---

## 📄 Licenza

Questo progetto è distribuito sotto licenza **MIT**. Vedi il file `LICENSE` per i dettagli.

---

## 👨‍💻 Autore

**Francesco Caburlotto**
- GitHub: [@fracabu](https://github.com/fracabu)
- Repository: [promptify-vue](https://github.com/fracabu/promptify-vue)

---

## 🙏 Ringraziamenti

- **Vue.js Team** - Framework reattivo fantastico
- **Tailwind CSS** - Utility classes che accelerano lo sviluppo
- **Lucide Icons** - Icone pulite e moderne
- **Community AI** - Per i framework di prompt engineering

---

<div align="center">

**⭐ Se trovi utile questo progetto, lascia una stella su GitHub! ⭐**

Made with ❤️ and Vue 3

</div>
