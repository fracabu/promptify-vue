# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server on port 5174
npm run build    # Type-check and build for production (vue-tsc -b && vite build)
npm run preview  # Preview production build
```

No test runner is configured. TypeScript checking happens during build via `vue-tsc`.

## Architecture Overview

Promptify Vue is a Vue 3 + TypeScript application for exploring and testing 30+ prompt engineering frameworks. Users can browse frameworks by category, view detailed explanations, and test them against AI providers (OpenAI, Gemini, ZAI).

### Core Data Flow

1. **Framework definitions** in `src/data/frameworks.ts` contain id, title, category, difficulty, explanation, example, and template (with `{input}` placeholder)
2. **FrameworkDetail view** renders framework info and provides a testing interface
3. **API calls** in `src/utils/apiCalls.ts` - `testFramework()` builds enriched prompts (framework explanation + template + user input) and calls provider-specific functions (`callOpenAI`, `callGemini`, `callZAI`) with max_tokens: 16000
4. **API keys** stored in localStorage via Pinia store (`src/stores/apiKeys.ts`)

### Key Architectural Patterns

**3D Pushable UI Components** (`src/components/ui/Card3D.vue`, `Button3D.vue`):
- Three-layer effect: shadow, edge (gradient border), front (content)
- Transforms: front `translateY(-4px)`, hover `-6px`, active `-2px`
- Variants: default, purple, blue, green, orange, pink
- Button3D uses `display: flex` with centered alignment

**Theme System**:
- Dark/light mode via Tailwind `class` strategy
- CSS variables defined in `src/style.css` (`:root` for light, `.dark` for dark)
- Semantic color tokens: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- ThemeToggle component persists preference to localStorage

**Router**:
- HTML5 history mode (`createWebHistory`) for clean URLs
- Hash anchors (`/#categories`, `/#how-it-works`) scroll to sections on Home via `scrollBehavior`

**Internationalization (i18n)**:
- Vue I18n in Composition API mode (`legacy: false`)
- Supported locales: Italian (`it`, default fallback), English (`en`)
- Locale files in `src/locales/{locale}/`:
  - `ui.json` - UI strings
  - `frameworks.json` - Framework translations
  - `guides.json` - Guide content
- Locale preference saved to localStorage, with browser detection fallback
- Use `setLocale()` and `getCurrentLocale()` from `src/i18n.ts`

**Deployment**:
- Vercel configured via `vercel.json` for SPA routing (rewrites all paths to index.html)

### Framework Categories

Frameworks are categorized as: Creativo, Analitico, Strutturato, Comunicativo, Tecnico, Innovativo, Marketing

Three signature frameworks have `createdBy` field: CALIBRO (GPT-5), BCM (GLM-4.6), PRISMA (Claude Sonnet 4.5)

## Important Implementation Notes

**Alert component** (`src/components/ui/Alert.vue`):
- Success variant: use `text-foreground` in light mode for readability, `dark:text-green-400` for dark mode

**Adding new frameworks**:
- Add to `frameworks` array in `src/data/frameworks.ts`
- Must match `Framework` interface with required fields: id, title, description, icon, color, category, difficulty, explanation, example, template
- Template must contain `{input}` placeholder
- Add translations to `src/locales/it/frameworks.json` and `src/locales/en/frameworks.json`

**Adding UI translations**:
- UI strings go in `src/locales/{locale}/ui.json`
- Guide content goes in `src/locales/{locale}/guides.json`

**API calls**:
- All providers use max_tokens: 16000
- Default models: `gpt-5-2025-08-07` (OpenAI), `gemini-2.5-flash` (Gemini), `z-ai/glm-4.6` (ZAI)

**Icons**:
- Lucide Vue Next for general icons
- Heroicons (`@heroicons/vue/24/solid`) for badges: `SparklesIcon` (NEW), `CpuChipIcon` (AI creator)
