import { BookOpen, Rocket, Lightbulb, Code2, TrendingUp, CheckCircle, Sparkles, Target } from 'lucide-vue-next'

export interface GuideSection {
  title: string
  content: string
  example?: string
  code?: string
}

export interface Guide {
  id: string
  title: string
  description: string
  icon: any
  color: string
  difficulty: 'Facile' | 'Medio' | 'Avanzato'
  topics: string[]
  introduction: string
  sections: GuideSection[]
  relatedFrameworks?: string[]
}

export const guides: Guide[] = [
  {
    id: 'introduzione',
    title: 'Introduzione ai Prompt',
    description: 'Scopri i concetti fondamentali del prompt engineering e come strutturare richieste efficaci per ottenere risultati superiori.',
    icon: BookOpen,
    color: 'bg-blue-500',
    difficulty: 'Facile',
    topics: ['Cos\'è un prompt', 'Struttura base', 'Best practices', 'Errori comuni'],
    introduction: 'Il prompt engineering è l\'arte e la scienza di comunicare efficacemente con i modelli di linguaggio AI. Un buon prompt può fare la differenza tra una risposta generica e un risultato eccezionale.',
    sections: [
      {
        title: 'Cos\'è un Prompt?',
        content: 'Un prompt è l\'input testuale che fornisci a un modello AI per ottenere una risposta. Può essere una semplice domanda, un\'istruzione complessa o un template strutturato. La qualità del prompt determina direttamente la qualità dell\'output.',
        example: 'Prompt base: "Scrivi un articolo sul marketing"\nPrompt migliorato: "Scrivi un articolo di 500 parole sul marketing digitale per PMI, con focus su social media e SEO. Tono professionale ma accessibile, include 3 esempi pratici."'
      },
      {
        title: 'Elementi di un Buon Prompt',
        content: 'Un prompt efficace contiene: Contesto (chi sei, qual è la situazione), Compito (cosa vuoi che faccia il modello), Vincoli (limitazioni, formato, lunghezza), Esempi (quando possibile) e Output desiderato (formato specifico della risposta).',
        example: 'Contesto: "Sono un marketing manager di una startup tech"\nCompito: "Crea 5 headline per una campagna LinkedIn"\nVincoli: "Max 100 caratteri, tono innovativo"\nOutput: "Lista numerata con rationale per ogni headline"'
      },
      {
        title: 'Errori Comuni da Evitare',
        content: 'Evita prompt troppo vaghi ("dimmi qualcosa su X"), senza contesto, con istruzioni contraddittorie, o aspettative non realistiche. Ricorda: il modello non conosce il tuo background o le tue esigenze specifiche se non gliele comunichi.',
        example: '❌ Male: "Scrivi codice"\n✅ Bene: "Scrivi una funzione Python che ordina una lista di dizionari per chiave \'date\' in ordine decrescente. Includi docstring e type hints."'
      },
      {
        title: 'Iterazione e Raffinamento',
        content: 'Il primo prompt raramente è perfetto. Parti con una versione base, analizza l\'output, identifica cosa manca o cosa va migliorato, e raffina il prompt. Questo processo iterativo è fondamentale per ottenere risultati ottimali.',
        example: 'Iterazione 1: "Scrivi una email"\nIterazione 2: "Scrivi una email professionale"\nIterazione 3: "Scrivi una email professionale di follow-up post-meeting, tono cordiale, max 150 parole, con CTA per fissare prossimo appuntamento"'
      }
    ],
    relatedFrameworks: ['ape', 'rtf', 'tag']
  },
  {
    id: 'integrazione-llm',
    title: 'Integrazione con LLM',
    description: 'Impara a utilizzare i framework con OpenAI, Gemini, Claude e ZAI. Configurazione API, parametri e ottimizzazione.',
    icon: Rocket,
    color: 'bg-emerald-500',
    difficulty: 'Medio',
    topics: ['Setup API keys', 'Temperature & Top-p', 'System prompts', 'Token management'],
    introduction: 'Integrare i framework di prompt con diversi Large Language Models richiede comprensione dei parametri API, gestione dei token e configurazione ottimale per ogni provider.',
    sections: [
      {
        title: 'Setup API Keys',
        content: 'Ogni provider richiede una API key per autenticare le richieste. Conserva le chiavi in modo sicuro usando variabili d\'ambiente o gestori di segreti. Non includere mai le API keys direttamente nel codice.',
        code: `// Esempio con OpenAI
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Il tuo prompt" }]
});`
      },
      {
        title: 'Temperature e Top-p',
        content: 'Temperature (0-2) controlla la creatività: valori bassi (0.2-0.5) per task deterministici, valori alti (0.7-1.5) per contenuti creativi. Top-p (0-1) è un\'alternativa che controlla la diversità delle risposte tramite nucleus sampling.',
        example: 'Temperature 0.2: Perfetto per traduzioni, analisi dati, codice\nTemperature 0.8: Ideale per brainstorming, scrittura creativa\nTemperature 1.5: Massima creatività per poesie, storytelling'
      },
      {
        title: 'System Prompts',
        content: 'I system prompts definiscono il comportamento generale del modello prima di ogni conversazione. Usa system prompts per impostare ruolo, tono, stile e vincoli globali che valgono per tutta la sessione.',
        code: `const messages = [
  {
    role: "system",
    content: "Sei un esperto di marketing digitale con 10 anni di esperienza. Rispondi sempre con esempi pratici e dati quando possibile."
  },
  {
    role: "user",
    content: "Come posso migliorare la mia strategia social?"
  }
];`
      },
      {
        title: 'Token Management',
        content: 'Ogni modello ha limiti di token (input + output). Monitora l\'uso dei token per ottimizzare costi e performance. Usa chunking per documenti lunghi e riassumi conversazioni precedenti quando necessario.',
        example: 'GPT-4: 8K-128K token\nGPT-3.5: 4K-16K token\nGemini Pro: fino a 1M token\n\n1 token ≈ 0.75 parole in inglese\n1 token ≈ 0.5 parole in italiano (più caratteri)'
      }
    ],
    relatedFrameworks: ['coast', 'costar', 'trace']
  },
  {
    id: 'scegliere-framework',
    title: 'Scegliere il Framework Giusto',
    description: 'Guida pratica per selezionare il framework più adatto al tuo caso d\'uso: business, creativo, tecnico o problem solving.',
    icon: Lightbulb,
    color: 'bg-purple-500',
    difficulty: 'Facile',
    topics: ['Framework per categoria', 'Quando usare cosa', 'Comparazioni', 'Casi d\'uso'],
    introduction: 'Con oltre 30 framework disponibili, scegliere quello giusto può sembrare complesso. Questa guida ti aiuterà a identificare il framework perfetto per ogni situazione.',
    sections: [
      {
        title: 'Framework per Principianti',
        content: 'Se stai iniziando con il prompt engineering, parti con framework semplici e intuitivi come APE (Action-Purpose-Expectation), RTF (Role-Task-Finish) o TAG (Task-Action-Goal). Questi hanno pochi elementi e sono facili da ricordare.',
        example: 'APE - Perfetto per content creation rapida\nRTF - Ideale per task con deliverable chiaro\nTAG - Ottimo per definire obiettivi specifici'
      },
      {
        title: 'Framework Business e Professionale',
        content: 'Per contesti aziendali usa COAST (Context-Objective-Audience-Style-Tone), COSTAR per progetti complessi o TRACE per task professionali avanzati. Questi framework includono elementi come audience e tone essenziali nel business.',
        example: 'Report aziendali: COSTAR\nPresentazioni clienti: COAST\nDocumentazione tecnica: RASCEF\nStrategia marketing: AIDA'
      },
      {
        title: 'Framework Creativi',
        content: 'Per contenuti creativi e marketing scegli AIDA (Attention-Interest-Desire-Action), ROSES (Role-Objective-Style-Example-Scenario) o framework con personalità come CRISPE. Questi enfatizzano stile e tono.',
        example: 'Copy pubblicitario: AIDA\nStorytelling: ROSES\nPersonal branding: CRISPE\nSocial media: TRACI'
      },
      {
        title: 'Framework Avanzati',
        content: 'Per ragionamento complesso usa Chain of Thought o Tree of Thoughts. Per task multi-step SPARC System. Per apprendimento contestuale Few-Shot Learning. Questi richiedono più esperienza ma offrono risultati superiori.',
        example: 'Problemi matematici: Chain of Thought\nDecisioni complesse: Tree of Thoughts\nSistemi multi-agente: SPARC\nTask con esempi: Few-Shot Learning'
      }
    ],
    relatedFrameworks: ['ape', 'coast', 'aida', 'chain-of-thought']
  },
  {
    id: 'prompt-avanzati',
    title: 'Tecniche Avanzate',
    description: 'Chain of Thought, Few-Shot Learning, Tree of Thoughts e altre tecniche avanzate per task complessi.',
    icon: Code2,
    color: 'bg-red-500',
    difficulty: 'Avanzato',
    topics: ['CoT reasoning', 'Multi-step prompts', 'Self-consistency', 'Prompt chaining'],
    introduction: 'Le tecniche avanzate di prompt engineering sbloccano capacità sofisticate dei modelli AI, permettendo ragionamento complesso, problem solving strutturato e output di qualità superiore.',
    sections: [
      {
        title: 'Chain of Thought (CoT)',
        content: 'Invece di chiedere direttamente la risposta, guida il modello a "pensare ad alta voce" mostrando i passaggi del ragionamento. Aggiungi "Pensa passo dopo passo" o "Mostra il tuo ragionamento" al prompt.',
        example: 'Senza CoT: "Quanto fa 23 × 47?"\n\nCon CoT: "Calcola 23 × 47. Mostra ogni passaggio del calcolo:\n1. Scomponi la moltiplicazione\n2. Esegui i calcoli parziali\n3. Somma i risultati\n4. Fornisci la risposta finale"'
      },
      {
        title: 'Few-Shot Learning',
        content: 'Fornisci 2-5 esempi del formato di output desiderato prima di fare la richiesta vera. Il modello imparerà il pattern e lo replicherà. Estremamente efficace per task con formato specifico.',
        code: `Prompt Few-Shot:

Converti queste frasi in JSON con sentiment analysis:

Input: "Adoro questo prodotto!"
Output: {"text": "Adoro questo prodotto!", "sentiment": "positive", "score": 0.95}

Input: "Non funziona affatto."
Output: {"text": "Non funziona affatto.", "sentiment": "negative", "score": 0.88}

Input: "È nella media."
Output: {"text": "È nella media.", "sentiment": "neutral", "score": 0.50}

Ora analizza: "Esperienza fantastica, lo consiglio!"`
      },
      {
        title: 'Tree of Thoughts',
        content: 'Esplora multiple vie di ragionamento in parallelo, valuta ogni percorso e scegli il migliore. Utile per decisioni complesse o problemi con più soluzioni possibili.',
        example: 'Problema: "Come aumentare le vendite del 30%?"\n\nPercorso 1: Ottimizzazione pricing\n→ Pro: Immediato, controllabile\n→ Contro: Rischio riduzione margini\n\nPercorso 2: Espansione canali\n→ Pro: Nuovi segmenti\n→ Contro: Investimento iniziale alto\n\nPercorso 3: Miglioramento prodotto\n→ Pro: Valore aggiunto duraturo\n→ Contro: Tempo sviluppo lungo'
      },
      {
        title: 'Prompt Chaining',
        content: 'Dividi task complessi in sequenze di prompt collegati. L\'output di un prompt diventa input del successivo. Permette di gestire task che superano i limiti di token o richiedono elaborazioni multiple.',
        example: 'Step 1: "Riassumi questo report di 50 pagine"\n→ Output: Riassunto 2 pagine\n\nStep 2: "Da questo riassunto, estrai 5 insight chiave"\n→ Output: Lista 5 punti\n\nStep 3: "Per ogni insight, crea una slide con titolo e bullet point"\n→ Output: 5 slide formattate'
      }
    ],
    relatedFrameworks: ['chain-of-thought', 'few-shot', 'tree-of-thoughts', 'sparc']
  },
  {
    id: 'ottimizzazione',
    title: 'Ottimizzazione e Testing',
    description: 'Come testare, misurare e ottimizzare i tuoi prompt per ottenere risultati consistenti e di alta qualità.',
    icon: TrendingUp,
    color: 'bg-orange-500',
    difficulty: 'Medio',
    topics: ['A/B testing', 'Metriche di qualità', 'Iterazione', 'Versioning'],
    introduction: 'L\'ottimizzazione sistematica dei prompt attraverso testing e misurazione è essenziale per ottenere risultati consistenti e di alta qualità in produzione.',
    sections: [
      {
        title: 'A/B Testing dei Prompt',
        content: 'Testa varianti del prompt sullo stesso input per comparare risultati. Cambia un elemento alla volta (temperatura, struttura, esempi) per isolare l\'impatto di ogni modifica.',
        example: 'Variante A: "Scrivi una email professionale"\nVariante B: "Scrivi una email professionale in tono cordiale ma formale"\nVariante C: "Scrivi una email professionale. Usa questo template: [Saluto]-[Contenuto]-[CTA]-[Chiusura]"\n\nTesta su 10 casi diversi e misura quale produce output migliori'
      },
      {
        title: 'Metriche di Qualità',
        content: 'Definisci metriche oggettive: accuratezza (contenuto corretto), rilevanza (risponde alla domanda), completezza (include tutti gli elementi), formato (rispetta le specifiche), tono (appropriato al contesto).',
        example: 'Scorecard (1-5):\n✓ Accuratezza: 5/5 (fatti corretti)\n✓ Rilevanza: 4/5 (leggera deviazione)\n✓ Completezza: 5/5 (tutti i punti)\n✓ Formato: 3/5 (formattazione parziale)\n✓ Tono: 5/5 (perfettamente professionale)\n\nScore totale: 22/25 (88%)'
      },
      {
        title: 'Iterazione Sistematica',
        content: 'Procedi con cicli: Test → Misura → Analizza → Modifica → Ripeti. Documenta ogni iterazione e i risultati. Mantieni una baseline per confrontare i miglioramenti.',
        example: 'Baseline (v1.0): Score 65%\n→ Aggiunti esempi (v1.1): Score 72% (+7%)\n→ Specificato formato (v1.2): Score 78% (+6%)\n→ Ottimizzata temperature (v1.3): Score 85% (+7%)\n→ Raffinato contesto (v2.0): Score 91% (+6%)'
      },
      {
        title: 'Versioning e Documentazione',
        content: 'Usa versioning semantico (v1.0, v1.1, v2.0) per i prompt. Documenta: scopo, parametri, esempi di input/output, performance, date modifiche. Conserva le versioni precedenti per rollback.',
        code: `// Esempio di prompt versionato

/**
 * Email Follow-up Template v2.1
 * 
 * Purpose: Generate professional follow-up emails
 * Created: 2025-01-15
 * Last Updated: 2025-03-10
 * Performance: 91% accuracy on test set (n=100)
 * 
 * Parameters:
 * - temperature: 0.7
 * - max_tokens: 300
 * - model: gpt-4
 * 
 * Changelog:
 * v2.1 - Added tone specification
 * v2.0 - Restructured with COAST framework
 * v1.0 - Initial version
 */

const promptTemplate = \`...\`;`
      }
    ],
    relatedFrameworks: ['grade', 'smart', 'trace']
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    description: 'Regole d\'oro, pattern comprovati e suggerimenti pratici per scrivere prompt che funzionano sempre.',
    icon: CheckCircle,
    color: 'bg-green-500',
    difficulty: 'Facile',
    topics: ['Chiarezza', 'Specificità', 'Contesto', 'Formato output'],
    introduction: 'Seguire best practices consolidate nel prompt engineering garantisce risultati migliori, più consistenti e predicibili in ogni situazione.',
    sections: [
      {
        title: 'Sii Chiaro e Specifico',
        content: 'Evita ambiguità. Usa linguaggio preciso. Specifica esattamente cosa vuoi, in che formato, con quale tono. Più dettagli = risultati migliori.',
        example: '❌ "Scrivi qualcosa sul marketing"\n\n✅ "Scrivi un articolo di 800 parole sul marketing digitale per e-commerce B2C. Include: introduzione (100 parole), 3 strategie con esempi (200 parole ciascuna), conclusione con CTA (100 parole). Tono: professionale ma accessibile. Target: piccoli imprenditori italiani."'
      },
      {
        title: 'Fornisci Contesto Sufficiente',
        content: 'Il modello non conosce il tuo background, settore, audience o obiettivi. Fornisci sempre contesto rilevante: chi sei, per chi è l\'output, qual è lo scopo.',
        example: '❌ "Crea una presentazione"\n\n✅ "Sono il CMO di una startup SaaS B2B nel settore HR tech. Devo presentare la nostra nuova feature di AI recruiting a 50 HR manager di aziende Fortune 500. Crea una struttura di presentazione di 15 slide per una sessione di 20 minuti."'
      },
      {
        title: 'Specifica il Formato Output',
        content: 'Non lasciare che il modello decida il formato. Specifica: lista numerata, bullet point, JSON, tabella, paragrafo narrativo, ecc. Includi un esempio se possibile.',
        example: 'Richiesta: "Analizza questi dati di vendita"\n\nFormato richiesto:\n```\n{\n  "periodo": "Q1 2025",\n  "revenue_totale": 1250000,\n  "crescita_yoy": "+15%",\n  "top_3_prodotti": [...],\n  "insight_chiave": [...]\n}\n```'
      },
      {
        title: 'Usa Delimitatori e Struttura',
        content: 'Usa delimitatori chiari (###, ---, """) per separare sezioni del prompt. Usa numeri per liste. Questo aiuta il modello a distinguere istruzioni, esempi e input.',
        code: `Prompt strutturato:

### RUOLO
Sei un copywriter esperto con 10 anni di esperienza.

### TASK
Crea 5 headline per campagna LinkedIn.

### VINCOLI
- Max 100 caratteri
- Tono: innovativo e data-driven
- Include almeno 1 numero/statistica

### INPUT
"""
Prodotto: Software AI per recruitment
Target: HR Director aziende tech
USP: Riduce tempo hiring del 60%
"""

### OUTPUT FORMATO
1. [Headline] - [Rationale]`
      },
      {
        title: 'Itera e Raffina',
        content: 'Il primo prompt raramente è perfetto. Analizza l\'output, identifica cosa manca o va male, e raffina. È un processo iterativo normale e necessario.',
        example: 'V1: Output troppo generico\n→ Aggiungi esempi specifici\n\nV2: Tono troppo formale\n→ Specifica "tono conversazionale"\n\nV3: Mancano dettagli tecnici\n→ Aggiungi "includi specifiche tecniche"\n\nV4: Perfetto! ✅'
      },
      {
        title: 'Gestisci le Aspettative',
        content: 'I modelli AI hanno limiti: possono inventare fatti (hallucination), non conoscono eventi recenti, non hanno opinioni reali. Non chiedere l\'impossibile e valida sempre output critici.',
        example: '❌ "Dimmi il prezzo delle azioni Tesla oggi"\n(Il modello non ha dati in tempo reale)\n\n✅ "Spiega i fattori che influenzano il prezzo delle azioni Tesla basandoti su analisi storiche fino a ottobre 2023"'
      }
    ],
    relatedFrameworks: ['ape', 'care', 'craft']
  },
  {
    id: 'casi-uso',
    title: 'Casi d\'Uso Pratici',
    description: 'Esempi reali di applicazione: content marketing, documentazione tecnica, customer service e coding assistant.',
    icon: Sparkles,
    color: 'bg-pink-500',
    difficulty: 'Medio',
    topics: ['Marketing copy', 'Code generation', 'Data analysis', 'Creative writing'],
    introduction: 'Esempi pratici e concreti di come applicare i framework di prompt engineering in scenari reali del mondo professionale.',
    sections: [
      {
        title: 'Content Marketing',
        content: 'Usa framework come AIDA o ROSES per creare contenuti marketing coinvolgenti. Specifica sempre audience, tono, lunghezza e CTA desiderato.',
        code: `Framework AIDA per Post LinkedIn:

**Context**: Sono growth marketing manager di SaaS B2B
**Objective**: Generare engagement su nuovo feature release
**Audience**: Decision maker e tech leader

**Attention**: Statistiche shocking o domanda provocatoria
**Interest**: Problema comune del target
**Desire**: Beneficio emozionale della soluzione
**Action**: CTA chiara per trial/demo

Scrivi post 200 parole, tono: professionale ma umano, includi 3 emoji strategici, 5 hashtag rilevanti.`
      },
      {
        title: 'Code Generation',
        content: 'Per generare codice, sii estremamente specifico: linguaggio, versione, librerie, pattern, gestione errori, test. Usa esempi di input/output attesi.',
        code: `Prompt per codice:

Scrivi una funzione Python 3.11+ che:

**Scopo**: Valida indirizzi email usando regex

**Requisiti**:
- Type hints completi
- Docstring formato Google
- Gestione eccezioni
- Return True/False
- Supporta email internazionali (Unicode)

**Test cases**:
- "user@example.com" → True
- "invalid.email" → False
- "user+tag@subdomain.example.co.uk" → True

**Output**: Funzione + 3 unit test con pytest`
      },
      {
        title: 'Data Analysis',
        content: 'Per analisi dati, fornisci contesto sul dataset, metriche importanti e tipo di insight cercati. Specifica formato output (tabella, grafico, narrative).',
        example: `Analizza questi dati di vendita Q1-Q4 2024:

**Dataset**: CSV con colonne [data, prodotto, categoria, quantità, revenue, regione]

**Analisi richiesta**:
1. Top 5 prodotti per revenue
2. Trend mensile per categoria
3. Confronto performance regioni
4. Correlazioni interessanti

**Output formato**:
- Executive summary (100 parole)
- 3 insight chiave con evidenza dati
- 2 raccomandazioni actionable
- Tabella riassuntiva markdown`
      },
      {
        title: 'Customer Service',
        content: 'Per automatizzare risposte customer service, definisci tono, policy aziendali, template risposta. Usa Few-Shot con esempi di conversazioni reali.',
        code: `Framework Customer Service:

**Role**: Customer support specialist, tono empatico e risolutivo

**Policy**:
- Rimborso: 30 giorni senza domande
- Spedizione: Gratis sopra 50€
- Tempi risposta: Max 24h

**Template risposta**:
1. Saluto personalizzato
2. Riconoscimento problema
3. Soluzione chiara con steps
4. Offer extra (sconto/omaggio)
5. Chiusura con follow-up

**Esempi**:
[Includi 2-3 esempi di ticket risolti]

**Nuovo ticket**: [Input cliente]`
      }
    ],
    relatedFrameworks: ['aida', 'roses', 'coast', 'few-shot']
  },
  {
    id: 'troubleshooting',
    title: 'Risoluzione Problemi',
    description: 'Soluzioni rapide ai problemi più comuni: output inconsistenti, hallucinations, formattazione e limiti dei modelli.',
    icon: Target,
    color: 'bg-cyan-500',
    difficulty: 'Medio',
    topics: ['Debugging prompts', 'Hallucination fix', 'Format enforcement', 'Edge cases'],
    introduction: 'Quando i prompt non funzionano come previsto, una diagnosi sistematica e l\'applicazione delle giuste tecniche di troubleshooting risolvono la maggior parte dei problemi.',
    sections: [
      {
        title: 'Output Inconsistenti',
        content: 'Se ottieni risultati diversi ogni volta: riduci temperature (0.2-0.5), aggiungi più vincoli e esempi, usa formato strutturato, specifica lunghezza esatta.',
        example: 'Problema: Ogni run produce lunghezza diversa\n\nSoluzione:\n❌ "Scrivi un riassunto"\n✅ "Scrivi un riassunto di ESATTAMENTE 150 parole (±5 parole). Se il conteggio non è esatto, riformula."\n\nAggiungi: temperature=0.3, top_p=0.9'
      },
      {
        title: 'Hallucinations (Fatti Inventati)',
        content: 'Il modello inventa informazioni? Chiedi fonti, usa "basati solo su", fornisci contesto completo, abilita "search" se disponibile, valida sempre output critici.',
        example: 'Problema: Inventa statistiche o citazioni\n\nSoluzione:\n"Analizza questo report. IMPORTANTE:\n- Usa SOLO dati presenti nel documento fornito\n- Se un\'informazione non è nel testo, scrivi \'N/A\'\n- NON fare assunzioni o stime\n- Cita la sezione esatta per ogni dato"\n\nValidazione: Cross-check manuale dei fatti chiave'
      },
      {
        title: 'Formato Non Rispettato',
        content: 'Se il modello ignora il formato richiesto: usa delimitatori chiari, fornisci esempio esatto del formato, richiedi validazione, usa regex o schema JSON per parsing.',
        code: `Problema: Output non è JSON valido

Soluzione nel prompt:

"Rispondi SOLO con JSON valido, nessun testo prima o dopo.

Schema richiesto:
{
  "title": "string",
  "items": ["string"],
  "score": number
}

Esempio output corretto:
{"title": "Test", "items": ["a", "b"], "score": 85}

La tua risposta deve essere parsabile con JSON.parse()
NON includere markdown code blocks (\`\`\`json)."`
      },
      {
        title: 'Gestione Edge Cases',
        content: 'Per input inaspettati o edge cases: aggiungi validazione input, specifica comportamento per casi limite, testa su dataset diversificato.',
        example: 'Edge cases comuni:\n\n1. Input vuoto\n→ "Se input è vuoto, ritorna: {error: \'No input provided\'}"\n\n2. Input troppo lungo\n→ "Se input > 5000 parole, riassumi prima, poi processa"\n\n3. Lingua inaspettata\n→ "Se input non è in italiano, prima traduci, poi processa"\n\n4. Formato malformato\n→ "Se CSV non è valido, ritorna errori di validazione"'
      },
      {
        title: 'Limiti di Token',
        content: 'Se superi i limiti: usa chunking (dividi input), riassumi progressivamente, usa modelli con context window maggiore, implementa prompt chaining.',
        example: 'Problema: Documento 50 pagine, limite 8K token\n\nSoluzione con chunking:\n1. Dividi in 10 chunk da 5 pagine\n2. Riassumi ogni chunk (10 riassunti)\n3. Combina riassunti in summary finale\n4. Da summary estrai insight\n\nAlternativa: Usa modello con 128K token (GPT-4 Turbo) o 1M (Gemini 1.5)'
      },
      {
        title: 'Debugging Sistematico',
        content: 'Approccio metodico: 1) Isola il problema (quale parte fallisce?), 2) Semplifica il prompt al minimo, 3) Aggiungi complessità gradualmente, 4) Testa ogni modifica, 5) Documenta cosa funziona.',
        example: 'Debug workflow:\n\n1. Versione minimale funzionante\n"Riassumi questo testo" → OK\n\n2. Aggiungi vincolo 1\n"Riassumi in 100 parole" → OK\n\n3. Aggiungi vincolo 2\n"Riassumi in 100 parole, bullet point" → FAIL\n\n→ Problema identificato: conflitto formato\n→ Soluzione: "10 bullet point, ~10 parole ciascuno"'
      }
    ],
    relatedFrameworks: ['chain-of-thought', 'few-shot', 'craft']
  }
]

export const getGuideById = (id: string) => {
  return guides.find(guide => guide.id === id)
}
