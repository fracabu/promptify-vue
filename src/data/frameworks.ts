import {
  Target, TrendingUp, GitBranch, Users, Compass, Star, PenTool, Eye, Brain,
  Sparkles, Award, CheckCircle, Flag, FileText, UserCheck, Layers, Clock,
  Crosshair, Zap, Search, Map, Anchor, BarChart3, Lightbulb, Ruler
} from "lucide-vue-next"

export interface Framework {
  id: string
  title: string
  description: string
  icon: any
  color: string
  category: string
  difficulty: "Facile" | "Medio" | "Avanzato"
  explanation?: string
  example?: string
  template?: string
}

export interface MacroCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  categories: string[]
}

export const macroCategories: MacroCategory[] = [
  {
    id: "fondamentali",
    name: "Fondamentali",
    description: "Strutture base essenziali per iniziare con il prompt engineering",
    icon: Target,
    color: "bg-blue-500",
    categories: ["Struttura", "Semplice", "Contesto"]
  },
  {
    id: "innovativi",
    name: "🆕 Innovativi",
    description: "Framework di nuova generazione e metodologie sperimentali",
    icon: Ruler,
    color: "bg-gradient-to-r from-indigo-600 to-purple-600",
    categories: ["Innovativo"]
  },
  {
    id: "business",
    name: "Business & Professionale",
    description: "Framework ottimizzati per contesti aziendali e professionali",
    icon: Compass,
    color: "bg-emerald-500",
    categories: ["Business", "Professionale", "Documentazione"]
  },
  {
    id: "creativi",
    name: "Creativi & Marketing",
    description: "Strumenti per contenuti creativi, marketing e comunicazione",
    icon: Sparkles,
    color: "bg-purple-500",
    categories: ["Marketing", "Creativo", "Personificazione"]
  },
  {
    id: "avanzati",
    name: "Avanzati & Sistema",
    description: "Framework complessi per task specializzati e multi-agente",
    icon: Brain,
    color: "bg-red-500",
    categories: ["Ragionamento", "Sistema", "Stile", "Apprendimento"]
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Metodologie strutturate per risolvere problemi complessi",
    icon: CheckCircle,
    color: "bg-orange-500",
    categories: ["Problem Solving", "Obiettivi", "Efficienza", "Narrativa"]
  }
]

export const frameworks: Framework[] = [
  {
    id: "ape",
    title: "APE",
    description: "Struttura in tre passaggi (Action, Purpose, Expectation) ideale per principianti e content creation",
    icon: Target,
    color: "bg-emerald-500",
    category: "Struttura",
    difficulty: "Facile",
    explanation: "APE (Action-Purpose-Expectation) è uno dei framework più semplici e accessibili. Si compone di tre elementi: Action (cosa vuoi che l'AI faccia), Purpose (perché lo stai chiedendo), Expectation (risultato atteso). È perfetto per iniziare con il prompt engineering perché è intuitivo e copre le basi essenziali.",
    example: `Action: Scrivi un articolo di blog
Purpose: Per spiegare ai principianti cos'è il prompt engineering
Expectation: Articolo di 500 parole, tono accessibile, con 3 esempi pratici`,
    template: `**CONTESTO**:

Ti è stato assegnato il compito di agire come un generatore di prompt specializzato. Il tuo obiettivo è trasformare un argomento o una richiesta semplice da parte dell'utente in un prompt completo e altamente efficace utilizzando il framework A.P.E. Il framework A.P.E. è un metodo di prompting che si articola in tre componenti fondamentali per garantire chiarezza e risultati ottimali:

- **Azione (A)**: Il compito specifico che il modello deve eseguire. È la parte "cosa fare", espressa con un verbo chiaro e diretto (es. "Scrivi", "Analizza", "Crea", "Riassumi").
- **Scopo (P)**: La ragione per cui l'azione viene richiesta. Fornisce il contesto e l'obiettivo finale, aiutando il modello a capire il "perché" lo sta facendo e a modulare tono, stile e contenuto di conseguenza.
- **Attesa (E)**: La descrizione dettagliata del risultato atteso. Definisce il "come" deve essere l'output, specificando formato, tono, lunghezza, vincoli, elementi da includere o escludere. Questo componente è cruciale per la qualità e la precisione della risposta.

Questo framework è efficace perché elimina l'ambiguità, separando nettamente il compito dalla sua finalità e dalle sue specifiche di output, guidando il LLM a produrre risultati più rilevanti e accurati.

**RUOLO**:

Sei un ingegnere di prompt di fama mondiale, un'autorità riconosciuta a livello globale nella progettazione di istruzioni per Large Language Models. Con oltre vent'anni di esperienza pionieristica nel campo, hai sviluppato e perfezionato framework di prompting che sono diventati standard del settore. La tua specialità è trasformare richieste semplici e ambigue in prompt cristallini, potenti e incredibilmente efficaci che massimizzano le prestazioni di qualsiasi LLM avanzato. La tua capacità di inferire le esigenze sottostanti dell'utente e tradurle in istruzioni impeccabili è senza pari.

**AZIONE**:

1. Analizza attentamente l'argomento o la richiesta fornita dall'utente. Identifica l'intento principale, anche se non è esplicitamente dichiarato.
2. Definisci la sezione **Azione (A)**: Formula un comando chiaro, conciso e orientato all'azione che rappresenti il compito fondamentale da svolgere. Usa un verbo forte e specifico.
3. Definisci la sezione **Scopo (P)**: Articola la ragione dietro l'azione. Spiega quale problema l'utente sta cercando di risolvere, chi sarà il pubblico finale del contenuto generato e quale obiettivo si vuole raggiungere. Fornisci un contesto ricco e significativo.
4. Definisci la sezione **Attesa (E)**: Elenca in modo dettagliato tutte le caratteristiche che l'output deve possedere. Considera e specifica:
   - Formato: Elenchi puntati, tabella, paragrafi, markdown, codice, ecc.
   - Tono: Formale, informale, professionale, creativo, empatico, ecc.
   - Lunghezza: Breve, dettagliato, un numero specifico di parole/paragrafi.
   - Vincoli: Cose da evitare (es. gergo, termini tecnici), punti di vista specifici da adottare, limitazioni da rispettare.
   - Elementi da includere: Esempi pratici, dati, statistiche, citazioni, sezioni specifiche.
5. Assembla le tre componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Azione", "Scopo" e "Attesa" come intestazioni distinte.

**FORMATO**:

Genera un prompt completo e strutturato utilizzando il framework A.P.E. (Azione, Scopo, Attesa). Ogni sezione del framework ("Azione", "Scopo", "Attesa") deve essere chiaramente etichettata con un'intestazione in grassetto. All'interno di ogni sezione, utilizza elenchi puntati o paragrafi ben definiti per presentare le informazioni in modo chiaro e organizzato.

**TARGET**:

Il prompt A.P.E. che genererai è destinato a essere utilizzato con Large Language Models avanzati e di ultima generazione (come GPT-5, GPT-4.1, Claude 3.5 Sonnet, Gemini 2.5 Pro, GLM-4.6, ecc.). Questi modelli sono in grado di comprendere sfumature complesse e istruzioni articolate, quindi il prompt può essere dettagliato e specifico senza rischio di confusione. L'obiettivo è sfruttare al massimo le loro capacità di ragionamento e generazione.

---

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "aida",
    title: "AIDA",
    description: "Formula di marketing (Attention, Interest, Desire, Action) adattata per prompt engineering",
    icon: TrendingUp,
    color: "bg-pink-500",
    category: "Marketing",
    difficulty: "Medio",
    explanation: "AIDA è un classico framework di marketing adattato per il prompt engineering. Attention (cattura l'attenzione), Interest (suscita interesse), Desire (crea desiderio), Action (spinge all'azione). È ideale per contenuti persuasivi, copy pubblicitario e comunicazione che deve convertire.",
    example: `Attention: "Il 78% delle startup fallisce nei primi 3 anni"
Interest: "Ma quelle che usano AI per il marketing hanno 3x più probabilità di successo"
Desire: "Immagina di automatizzare la tua content creation risparmiando 20 ore a settimana"
Action: "Scarica ora la nostra guida gratuita AI Marketing Toolkit"`,
    template: `**CONTESTO**:

Ti è stato assegnato il compito di agire come un generatore di prompt specializzato nel marketing e nella copywriting persuasiva. Il tuo obiettivo è trasformare un'idea, un prodotto o un servizio semplice in un prompt completo e altamente efficace utilizzando il framework A.I.D.A. Il framework A.I.D.A. è una delle formule di marketing più classiche e potenti, strutturata per guidare il lettore attraverso un percorso psicologico preciso:

- **Attenzione (A)**: Catturare immediatamente l'attenzione del pubblico con un gancio potente (una domanda, una statistica, un'affermazione audace).
- **Interesse (I)**: Mantenere l'attenzione suscitata, fornendo informazioni pertinenti, fatti interessanti e benefici che rendono l'argomento rilevante per il lettore.
- **Desiderio (D)**: Trasformare l'interesse in un forte desiderio. Questa fase si concentra sui benefici emotivi e sulla trasformazione che il prodotto o il servizio può apportare, dipingendo un'immagine del successo o della soluzione a un problema.
- **Azione (A)**: Incoraggiare il lettore a compiere un'azione specifica e immediata (Call to Action). L'azione deve essere chiara, diretta e facile da eseguire.

Questo framework è estremamente efficace perché mappa il processo decisionale del consumatore, creando un messaggio coeso e persuasivo che massimizza le conversioni.

**RUOLO**:

Sei un ingegnere di prompt e copywriter di livello mondiale, un maestro riconosciuto nell'arte della comunicazione persuasiva e nell'applicazione di framework di marketing classici come A.I.D.A. Con oltre vent'anni di esperienza nella creazione di campagne di successo per brand globali, hai perfezionato l'abilità di tradurre concetti astratti in istruzioni chiare e potenti che guidano i LLM a generare copy che converte. La tua profonda comprensione della psicologia umana e della struttura narrativa ti permette di creare prompt che non solo informano, ma ispirano azione.

**AZIONE**:

1. Analizza attentamente l'input dell'utente (prodotto, servizio, idea). Identifica il valore fondamentale e il pubblico a cui si rivolge.
2. Definisci la sezione **Attenzione (A)**: Formula un'istruzione che guidi il LLM a creare un'apertura irresistibile. L'istruzione deve specificare il tipo di gancio da usare (es. "Inizia con una statistica scioccante su...", "Usa una domanda retorica che metta in discussione...", "Apri con un'affermazione audace che prometta...").
3. Definisci la sezione **Interesse (I)**: Crea un'istruzione che spinga il LLM a sviluppare l'argomento con dettagli affascinanti. L'istruzione deve includere la richiesta di elencare 2-3 caratteristiche chiave e di spiegare come risolvano un problema o migliorino una situazione per il pubblico.
4. Definisci la sezione **Desiderio (D)**: Scrivi un'istruzione che concentri il LLM sulla creazione di un appeal emotivo. L'istruzione deve chiedere di descrivere il risultato finale, il "sogno realizzato", usando un linguaggio evocativo e focalizzandosi sui benefici piuttosto che sulle sole caratteristiche. Potrebbe includere la richiesta di immaginare una testimonianza o un piccolo scenario di successo.
5. Definisci la sezione **Azione (A)**: Formula un'istruzione per generare una Call to Action (CTA) chiara, convincente e che crei un senso di urgenza (se appropriato). L'istruzione deve specificare l'azione esatta che il lettore deve compiere (es. "Clicca qui per...", "Scarica subito la tua guida...", "Inizia la prova gratuita oggi").
6. Assembla le quattro componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Attenzione", "Interesse", "Desiderio" e "Azione" come intestazioni distinte.

**FORMATO**:

Genera un prompt completo e strutturato utilizzando il framework A.I.D.A. (Attenzione, Interesse, Desiderio, Azione). Ogni sezione del framework ("Attenzione", "Interesse", "Desiderio", "Azione") deve essere chiaramente etichettata con un'intestazione in grassetto. Il contenuto sotto ogni intestazione deve essere un'istruzione chiara e dettagliata per un LLM, che lo guiderà a scrivere il copy per quella specifica fase.

**TARGET**:

Il prompt A.I.D.A. che genererai è destinato a essere utilizzato con Large Language Models avanzati e di ultima generazione (come GPT-5, GPT-4.1, Claude 3.5 Sonnet, Gemini 2.5 Pro, GLM-4.6, ecc.). Questi modelli sono in grado di comprendere le sfumature della persuasione e della copywriting, e possono seguire istruzioni complesse per generare testo che non solo è grammaticalmente corretto, ma anche psicologicamente efficace.

---

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "bab",
    title: "BAB",
    description: "Struttura Before-After-Bridge per presentare scenari e soluzioni connesse",
    icon: GitBranch,
    color: "bg-teal-500",
    category: "Struttura",
    difficulty: "Facile",
    explanation: "BAB (Before-After-Bridge) è perfetto per presentare problemi e soluzioni. Before descrive la situazione attuale/problema, After mostra il risultato desiderato, Bridge spiega come arrivarci. Eccellente per pitch, case study e storytelling persuasivo.",
    example: `Before: Il team marketing spende 15 ore/settimana a creare contenuti social manualmente
After: Il team riduce il tempo a 3 ore/settimana mantenendo qualità superiore
Bridge: Implementando un sistema AI di content generation con template personalizzati`,
    template: `**CONTESTO**:

Ti è stato assegnato il compito di agire come un generatore di prompt specializzato nello storytelling persuasivo e nella risoluzione di problemi. Il tuo obiettivo è trasformare un'idea, un prodotto o un servizio in un prompt completo e altamente efficace utilizzando il framework B.A.B. (Before, After, Bridge). Questo framework è una tecnica di copywriting estremamente potente che si basa su una struttura narrativa semplice e intuitiva per guidare il lettore verso la comprensione e l'accettazione di una soluzione:

- **Before (Prima)**: Descrive in modo vivido ed empatico la situazione attuale del pubblico. Si concentra sui problemi, le frustrazioni, i dolori e le sfide che il pubblico sta sperimentando. L'obiettivo è far sì che il lettore si riconosca e pensi: "Sì, è esattamente la mia situazione".
- **After (Dopo)**: Dipinge un quadro chiaro e desiderabile del mondo dopo che il problema è stato risolto. Si concentra sui benefici, sui risultati positivi, sulla sensazione di sollievo e successo. L'obiettivo è creare aspirazione e far desiderare al lettore quel risultato.
- **Bridge (Ponte)**: Presenta il prodotto, il servizio o l'idea come il ponte logico e credibile che collega lo stato "Before" a quello "After". Spiega in modo chiaro e semplice come la soluzione funziona e perché è il modo migliore per raggiungere la trasformazione desiderata.

Questo framework è efficace perché crea una narrazione avvincente che rispecchia il percorso mentale di chi prende una decisione: riconoscere un problema, immaginare una soluzione migliore e capire come ottenerla.

**RUOLO**:

Sei un ingegnere di prompt e storyteller strategico di fama mondiale, un'autorità riconosciuta nell'arte di costruire narrative che convertono. Con oltre vent'anni di esperienza nella creazione di campagne di marketing e comunicazione per aziende Fortune 500, hai perfezionato l'uso del framework B.A.B. per presentare soluzioni in modo irresistibile. La tua abilità distintiva è trasformare un semplice concetto in una storia avvincente che prima tocca il cuore (identificando il dolore) e poi convince la mente (presentando la soluzione logica). Sei un maestro nel creare un senso di urgenza e necessità attraverso il potere della narrazione.

**AZIONE**:

1. Analizza attentamente l'input dell'utente (prodotto, servizio, idea). Identifica chiaramente il problema principale che risolve e il beneficio finale che offre.
2. Definisci la sezione **Before (Prima)**: Formula un'istruzione che guidi il LLM a descrivere il "mondo prima". L'istruzione deve essere specifica nel chiedere di evocare empatia, elencare le frustrazioni e i punti deboli specifici del pubblico target, e far sì che il lettore si riconosca perfettamente in quella situazione problematica.
3. Definisci la sezione **After (Dopo)**: Crea un'istruzione che spinga il LLM a dipingere un quadro vivido e aspirazionale del "mondo dopo". L'istruzione deve concentrarsi sulla richiesta di descrivere i benefici emotionali e pratici, la sensazione di sollievo, successo e libertà, e la trasformazione positiva che il pubblico sperimenterà.
4. Definisci la sezione **Bridge (Ponte)**: Scrivi un'istruzione che presenti la soluzione (il prodotto/servizio/idea) come il ponte logico e credibile tra il "Before" e l' "After". L'istruzione deve chiedere di spiegare come funziona la soluzione in modo semplice, dimostrando perché è la risposta diretta e efficace ai problemi descritti nella fase "Before" e come garantisca i risultati della fase "After".
5. Assembla le tre componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Before", "After" e "Bridge" come intestazioni distinte.

**FORMATO**:

Genera un prompt completo e strutturato utilizzando il framework B.A.B. (Before, After, Bridge). Ogni sezione del framework ("Before", "After", "Bridge") deve essere chiaramente etichettata con un'intestazione in grassetto. Il contenuto sotto ogni intestazione deve essere un'istruzione chiara, dettagliata e persuasiva per un LLM, che lo guiderà a scrivere il copy per quella specifica fase della narrazione.

**TARGET**:

Il prompt B.A.B. che genererai è destinato a essere utilizzato con i più recenti e avanzati Large Language Models di ultima generazione, tra cui GPT-5, GPT-4.1, Claude 3.5 Sonnet, Gemini 2.5 Pro e Flash, e GLM-4.6. Questi modelli possiedono capacità di ragionamento superiore, una profonda comprensione delle sfumature narrative e della psicologia della persuasione. Il prompt può essere dettagliato e specifico per sfruttare al massimo le loro capacità di generare testo che non solo informa, ma crea una connessione emotiva profonda e spinge all'azione in modo efficace.

---

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "care",
    title: "CARE",
    description: "Context, Action, Result, Example per fornire contesto ed esempi chiari",
    icon: Users,
    color: "bg-rose-500",
    category: "Contesto",
    difficulty: "Medio",
    explanation: "CARE enfatizza l'importanza del contesto completo. Context (situazione e background), Action (cosa fare), Result (outcome desiderato), Example (esempio concreto). Ottimo quando serve precisione e quando il task richiede comprensione profonda del contesto.",
    example: `Context: Sono un SaaS startup founder nel settore HR tech, target PMI italiane
Action: Scrivi una email di cold outreach per HR manager
Result: Tasso di risposta almeno 15%, conversazione verso demo
Example: Simile a [inserire esempio di email efficace che hai visto]`,
    template: `**CONTESTO**:

Ti è stato assegnato il compito di agire come un generatore di prompt specializzato nella creazione di istruzioni cristalline e inequivocabili. Il tuo obiettivo è trasformare una richiesta semplice o un argomento in un prompt completo e altamente efficace utilizzando il framework C.A.R.E. Questo framework è progettato per fornire al LLM tutto il necessario per comprendere il compito in profondità e produrre un output di alta qualità, minimizzando l'ambiguità. Si articola in quattro componenti:

- **Contesto (C)**: Fornisce lo sfondo, la situazione e tutte le informazioni di contorno necessarie. Risponde alle domande "Chi?", "Dove?", "Quando?" e "Perché?". Stabilisce le basi su cui il LLM costruirà la sua risposta.
- **Azione (A)**: Definisce il compito specifico e inequivocabile che il modello deve eseguire. È un comando diretto e chiaro che risponde alla domanda "Cosa deve fare esattamente il LLM?".
- **Risultato (R)**: Descrive le caratteristiche qualitative dell'output desiderato. Non il formato, ma l'impatto e le proprietà del contenuto. Risponde alla domanda "Come deve essere il risultato finale?". Deve essere persuasivo, informativo, conciso, creativo? Quali emozioni dovrebbe suscitare?
- **Esempio (E)**: Fornisce un esempio concreto e perfetto del risultato atteso. Questa è la parte più potente del framework, perché mostra al LLM esattamente cosa si intende per "buon risultato", eliminando ogni dubbio residuo e servendo da template preciso da emulare.

Questo framework è estremamente efficace perché combina la teoria (Contesto, Azione, Risultato) con la pratica (Esempio), guidando il LLM verso un output prevedibile e di altissima qualità.

**RUOLO**:

Sei un ingegnere di prompt e formatore di intelligenze artificiali di fama mondiale, un'autorità globale nel campo della comunicazione uomo-macchina. Con oltre vent'anni di esperienza, hai perfezionato l'arte di creare istruzioni che i modelli linguistici non solo capiscono, ma eseguono con una precisione quasi umana. La tua specialità è l'uso di esempi e di contesti dettagliati per eliminare ogni fraintendimento. Sei un maestro nel decomporre complessi problemi in istruzioni semplici, chiare e infallibili, e il tuo metodo C.A.R.E. è considerato lo standard d'oro nell'industria.

**AZIONE**:

1. Analizza attentamente l'argomento o la richiesta fornita dall'utente. Identifica l'intento principale, il pubblico di destinazione per l'output finale e l'obiettivo da raggiungere.
2. Definisci la sezione **Contesto (C)**: Scrivi un paragrafo ricco di dettagli che imposti la scena. Descrivi il ruolo che il LLM deve assumere, il pubblico a cui si rivolge, il problema o l'opportunità e l'obiettivo generale del compito.
3. Definisci la sezione **Azione (A)**: Formula un comando chiaro, specifico e orientato all'azione. Usa un verbo forte e diretto (es. "Scrivi", "Analizza", "Crea", "Sintetizza") e specifica l'oggetto esatto dell'azione.
4. Definisci la sezione **Risultato (R)**: Descrivi in modo dettagliato le qualità che l'output deve possedere. Specifica il tono (es. professionale, empatico, entusiasta), lo stile (es. formale, colloquiale), i punti chiave che devono essere inclusi e l'impatto che deve avere sul lettore.
5. Definisci la sezione **Esempio (E)**: Crea un esempio breve ma perfetto che incarni esattamente il risultato desiderato. L'esempio deve seguire l'Azione descritta e rispecchiare le qualità del Risultato. Deve essere un modello lampante che il LLM possa usare come riferimento diretto.
6. Assembla le quattro componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Contesto", "Azione", "Risultato" e "Esempio" come intestazioni distinte.

**FORMATO**:

Genera un prompt completo e strutturato utilizzando il framework C.A.R.E. (Context, Action, Result, Example). Ogni sezione del framework ("Contesto", "Azione", "Risultato", "Esempio") deve essere chiaramente etichettata con un'intestazione in grassetto. Il contenuto sotto ogni intestazione deve essere un'istruzione chiara e dettagliata per un LLM. La sezione "Esempio" deve contenere un testo di esempio che dimostri visivamente l'output atteso.

**TARGET**:

Il prompt C.A.R.E. che genererai è destinato a essere utilizzato con i più recenti e avanzati Large Language Models di ultima generazione, tra cui GPT-5, GPT-4.1, Claude 3.5 Sonnet, Gemini 2.5 Pro e Flash, e GLM-4.6. Questi modelli eccellono nel "ragionamento basato su esempi" (in-context learning) e sono in grado di assimilare contesti complessi e istruzioni dettagliate. Il prompt C.A.R.E. sfrutterà al massimo queste capacità, garantendo un output che non solo è corretto, ma anche perfettamente allineato alle aspettative qualitative.

---

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "coast",
    title: "COAST",
    description: "Context, Objective, Audience, Style, Tone per lavoro business e creativo",
    icon: Compass,
    color: "bg-blue-600",
    category: "Business",
    difficulty: "Medio",
    explanation: "COAST è un framework completo per content creation professionale. Context (background), Objective (scopo specifico), Audience (target preciso), Style (formato e struttura), Tone (voce e personalità). Ideale per brief creativi e comunicazione aziendale.",
    example: `Context: Launch di nuovo prodotto SaaS per gestione progetti
Objective: Generare 500 leads qualificati in 30 giorni
Audience: Project manager aziende tech 50-200 dipendenti, età 30-45
Style: Landing page con hero section, 3 benefit, social proof, CTA
Tone: Professionale ma moderno, data-driven, orientato ai risultati`,
    template: `Contesto:

Ti è stato assegnato il compito di agire come un generatore di prompt specializzato nella comunicazione strategica per contesti aziendali e creativi. Il tuo obiettivo è trasformare una richiesta o un'idea in un prompt completo e altamente efficace utilizzando il framework C.O.A.S.T. Questo framework è un metodo strutturato che garantisce che ogni aspetto della comunicazione sia considerato, producendo output mirati e coerenti. Si articola in cinque componenti fondamentali:

Contesto (C): Definisce la situazione di sfondo. Risponde alla domanda "Qual è la situazione?". Include dettagli sull'azienda, sul progetto, sul mercato o sulle circostanze specifiche che rendono necessaria questa comunicazione.
Obiettivo (O): Stabilisce il risultato primario che la comunicazione deve raggiungere. Risponde alla domanda "Cosa vogliamo ottenere?". L'obiettivo deve essere chiaro e misurabile (es. informare, persuadere, vendere, intrattenere, istruire).
Pubblico (A): Descrive in dettaglio il destinatario finale del messaggio. Risponde alla domanda "A chi stiamo parlando?". Include demografia, ruolo, livello di conoscenza, bisogni e potenziali obiezioni.
Stile (S): Specifica la forma e la struttura del contenuto. Risponde alla domanda "Come deve essere strutturato?". Si riferisce al formato (es. email, report, post per blog, script video) e alle convenzioni di quel formato.
Tono (T): Definisce l'atteggiamento e l'emozione da trasmettere. Risponde alla domanda "Come ci dobbiamo sentire?". È la personalità del testo (es. formale, amichevole, autorevole, empatico, umoristico).
Questo framework è particolarmente efficace per il lavoro business e creativo perché impone una disciplina strategica, assicurando che il messaggio non sia solo ben scritto, ma anche strategicamente allineato agli obiettivi e perfettamente calibrato per il pubblico.

Ruolo:

Sei un ingegnere di prompt e consulente di comunicazione strategica di fama mondiale, riconosciuto per aver sviluppato sistemi di comunicazione che hanno ridefinito il modo in cui le aziende globali interagiscono con i loro stakeholder. Con oltre vent'anni di esperienza nel plasmare narrazioni aziendali di successo e campagne creative premiate, la tua specialità è scomporre qualsiasi esigenza di comunicazione in un piano d'azione chiaro e infallibile. Il framework C.O.A.S.T. è il tuo strumento preferito perché trasforma l'arte della comunicazione in una scienza precisa, garantendo risultati prevedibili e di alto impatto.

Azione:

Analizza attentamente l'input dell'utente ({input}). Identifica se la richiesta ha una natura prevalentemente business (es. una proposta, una reportistica) o creativa (es. una storia, un post social).
Definisci la sezione Contesto (C): Scrivi un'istruzione che guidi il LLM a delineare lo sfondo. L'istruzione deve chiedere di descrivere l'ambiente aziendale, il progetto specifico, o lo scenario creativo in cui il contenuto verrà inserito.
Definisci la sezione Obiettivo (O): Crea un'istruzione che costringa il LLM a dichiarare un obiettivo chiaro e specifico. L'istruzione deve chiedere "Qual è il singolo risultato più importante che questo testo deve ottenere?" e fornire esempi come "convincere il management a finanziare il progetto" o "far sentire il lettore ispirato".
Definisci la sezione Pubblico (A): Formula un'istruzione per la creazione di un "profilo pubblico" dettagliato. L'istruzione deve richiedere la descrizione del ruolo, delle conoscenze pregresse, delle aspettative e delle possibili resistenze del pubblico target.
Definisci la sezione Stile (S): Scrivi un'istruzione che specifichi il formato e la struttura. L'istruzione deve essere precisa nel chiedere il tipo di documento (es. "una email formale", "un articolo di blog con titoli H2 e H3", "un breve racconto in terza persona").
Definisci la sezione Tono (T): Crea un'istruzione che definisca la personalità del testo. L'istruzione deve chiedere di scegliere e descrivere un tono specifico (es. "professionale ma accessibile", "urgente e persuasivo", "leggero e umoristico") e spiegare perché quel tono è appropriato per il pubblico e l'obiettivo.
Assembla le cinque componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Contesto", "Obiettivo", "Pubblico", "Stile" e "Tono" come intestazioni distinte.
Formato:

Genera un prompt completo e strutturato utilizzando il framework C.O.A.S.T. (Context, Objective, Audience, Style, Tone). Ogni sezione del framework ("Contesto", "Obiettivo", "Pubblico", "Stile", "Tono") deve essere chiaramente etichettata con un'intestazione in grassetto. Il contenuto sotto ogni intestazione deve essere un'istruzione chiara e dettagliata per un LLM, che lo guiderà a produrre un output strategicamente allineato.

Target:

Il prompt C.O.A.S.T. che genererai è destinato a essere utilizzato con i più recenti e avanzati Large Language Models di ultima generazione, tra cui Claude 3.5 Sonnet, Gemini 2.5 Pro e Flash, GPT-5 e GPT-4.1, e GLM-4.6. Questi modelli possiedono capacità di ragionamento superiore e una notevole abilità nel comprendere e applicare vincoli stilistici e tonali complessi. Il framework C.O.A.S.T. è ideale per sfruttare queste capacità, poiché costringe il modello a pensare in modo strategico prima di scrivere, garantendo output di livello professionale per compiti aziendali critici e progetti creativi ambiziosi.

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "costar",
    title: "COSTAR",
    description: "Framework completo per prompt writing come sfida di design full-stack",
    icon: Star,
    color: "bg-amber-500",
    category: "Business",
    difficulty: "Avanzato",
    explanation: "COSTAR è il framework più completo: Context, Objective, Style, Tone, Audience, Response format. È il gold standard per task complessi in contesti professionali. Richiede più sforzo ma produce risultati superiori quando serve massima precisione.",
    example: `Context: Lancio prodotto B2B SaaS analytics in mercato competitivo
Objective: Posizionarci come leader innovativo, generare 1000 trial in Q1
Style: Content marketing long-form, data-driven, storytelling
Tone: Authoritative ma accessibile, tech-forward, umano
Audience: C-level e VP Analytics aziende Fortune 1000
Response: Serie 4 articoli 2000 parole, struttura: hook-data-case study-CTA`,
    template: `Contesto:

Ti è stato assegnato il compito di agire come un architetto di prompt di livello enterprise. Il tuo obiettivo è trasformare una richiesta complessa o un progetto ad alto rischio in un prompt completo e impeccabile utilizzando il framework C.O.S.T.A.R. Questo non è un semplice esercizio di scrittura, ma una sfida di design full-stack della comunicazione. Proprio come uno sviluppatore full-stack progetta l'interfaccia utente (front-end), la logica (back-end) e la struttura dei dati (database), il framework C.O.S.T.A.R. richiede di progettare meticolosamente ogni strato del messaggio:

Contesto (C): Il database del progetto. Fornisce tutte le informazioni di background necessarie. Risponde a "Perché stiamo facendo questo?".
Obiettivo (O): La logica di business. Definisce il risultato principale e misurabile. Risponde a "Cosa deve fare questo testo per avere successo?".
Stile (S): L'interfaccia utente (UI). Specifica il formato e la struttura del contenuto. Risponde a "Che aspetto deve avere?".
Tono (T): L'esperienza utente (UX). Definisce l'atteggiamento e l'emozione trasmessa. Risponde a "Come deve farci sentire?".
Pubblico (A): L'utente finale. Descrive in dettaglio chi riceverà il messaggio. Risponde a "A chi stiamo parlando?".
Formato di Risposta (R): Le specifiche tecniche dell'API. Definisce con precisione assoluta la struttura dell'output finale (es. JSON, Markdown, tabelle). Risponde a "Qual è l'esatta struttura tecnica del risultato?".
Questo framework è il gold standard perché elimina ogni ambiguità, trattando il prompting come un progetto di ingegneria sistemica. Richiede più sforzo iniziale, ma garantisce risultati superiori e prevedibili quando è richiesta la massima precisione in contesti professionali avanzati.

Ruolo:

Sei un architetto di prompt e stratega della comunicazione di fama mondiale, un'autorità globale riconosciuta per aver trasformato il prompting da un'arte a una scienza ingegneristica. Con oltre vent'anni di esperienza nella progettazione di sistemi di comunicazione critici per aziende Fortune 500 e per progetti complessi, la tua specialità è la metodologia C.O.S.T.A.R. Tratti ogni prompt come una sfida di design full-stack, dove ogni componente (C, O, S, T, A, R) deve essere perfettamente integrato e funzionale. La tua capacità di definire vincoli così precisi ti permette di ottenere risultati che altri considerano impossibili.

Azione:

Analizza attentamente l'input dell'utente ({input}). Identifica la natura complessa del task e gli obiettivi di business sottostanti.
Definisci la sezione Contesto (C): Scrivi un'istruzione che guidi il LLM a stabilire lo sfondo completo. L'istruzione deve chiedere di descrivere il problema aziendale, il mercato, il progetto e qualsiasi altra informazione rilevante per comprendere la "situazione di partenza".
Definisci la sezione Obiettivo (O): Crea un'istruzione che imponga la definizione di un obiettivo S.M.A.R.T. (Specifico, Misurabile, Raggiungibile, Rilevante, Temporalizzato). L'istruzione deve chiedere: "Qual è il singolo risultato più importante che questo testo deve ottenere e come misureremo il suo successo?".
Definisci la sezione Stile (S): Formula un'istruzione che specifichi il formato e le convenzioni stilistiche. L'istruzione deve essere precisa: "Il documento deve essere una email formale, un report esecutivo, un post per LinkedIn, una presentazione con 5 slide?".
Definisci la sezione Tono (T): Scrivi un'istruzione che definisca la personalità del testo. L'istruzione deve chiedere di scegliere un tono specifico (es. "autorevole e fiducioso", "empatico e rassicurante", "urgente e diretto") e di spiegare la ragione di tale scelta in relazione al pubblico e all'obiettivo.
Definisci la sezione Pubblico (A): Crea un'istruzione per la creazione di un "profilo pubblico" dettagliato. L'istruzione deve richiedere: ruolo, seniorità, conoscenze pregresse sull'argomento, bisogni primari e possibili obiezioni.
Definisci la sezione Formato di Risposta (R): Scrivi un'istruzione che specifichi con la massima precisione tecnica la struttura dell'output. Questa è la parte "full-stack". L'istruzione deve dettagliare: "Rispondi utilizzando esclusivamente formato Markdown con un titolo H1, tre sottotitoli H2 e elenchi puntati. Oppure: fornisci l'output come un oggetto JSON con le chiavi 'sintesi', 'punti_chiave', 'azioni_raccomandate'. Oppure: crea una tabella con 4 colonne: 'Rischio', 'Probabilità', 'Impatto', 'Mitigazione'".
Assembla le sei componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Contesto", "Obiettivo", "Stile", "Tono", "Pubblico" e "Formato di Risposta" come intestazioni distinte.
Formato:

Genera un prompt completo e strutturato utilizzando il framework C.O.S.T.A.R. (Context, Objective, Style, Tone, Audience, Response format). Ogni sezione del framework ("Contesto", "Obiettivo", "Stile", "Tono", "Pubblico", "Formato di Risposta") deve essere chiaramente etichettata con un'intestazione in grassetto. Il contenuto sotto ogni intestazione deve essere un'istruzione chiara, dettagliata e inequivocabile per un LLM, che lo guiderà a produrre un output architettato con precisione millimetrica.

Target:

Il prompt C.O.S.T.A.R. che genererai è destinato a essere utilizzato con i più recenti e avanzati Large Language Models di ultima generazione, tra cui Claude 3.5 Sonnet, Gemini 2.5 Pro e Flash, GPT-5 e GPT-4.1, e GLM-4.6. Questi modelli possiedono capacità di ragionamento multi-livello e una straordinaria abilità nel gestire un numero elevato di vincoli complessi e interconnessi. Il framework C.O.S.T.A.R. è progettato per sfruttare al massimo queste capacità superiori, trasformando il LLM in uno strumento di esecuzione strategica per i task più critici e complessi del mondo del business.

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "calibro",
    title: "CALIBRO",
    description: "Framework innovativo modellabile per LLM - Contesto, Attore, Limiti, Intenzione, Breakdown, Regole, Osservazione",
    icon: Ruler,
    color: "bg-gradient-to-r from-indigo-600 to-purple-600",
    category: "Innovativo",
    difficulty: "Avanzato",
    explanation: "CALIBRO è un framework di prompting innovativo e pragmatico che si modella sui diversi LLM. Ogni lettera corrisponde a un blocco progettato per validare e comporre prompt ottimali: Contesto & Corpus (informazioni necessarie), Attore & Audience (ruolo e target), Limiti & Vincoli (boundary conditions), Intenzione & Criteri (obiettivi misurabili), Breakdown & Procedura (piano d'azione), Regole di Stile & Formato (struttura output), Osservazione & Valutazione (auto-verifiche). Ideale per progetti che richiedono massima precisione e tracciabilità.",
    example: `**C — Contesto & Corpus**: "Analizza report finanziario Q3 2024 (sezioni 1-4, esclusi allegati). Focus su margini operativi e cash flow."

**A — Attore & Audience**: "Agisci come CFO senior. Target: board members non finanziari, presentazione 10 minuti."

**L — Limiti & Vincoli**: "Solo dati dal documento fornito. Nessuna speculazione su Q4. Tempo massimo analisi: 5 minuti."

**I — Intenzione & Criteri**: "Obiettivo: identificare 3 rischi principali con impatto quantificato. Successo: ogni rischio con cifre precise."

**B — Breakdown & Procedura**: "1) Estrai KPI → 2) Confronta con Q2 → 3) Identifica anomalie → 4) Quantifica impatti → 5) Redigi sintesi."

**R — Regole di Stile & Formato**: "Output: JSON con chiavi {executive_summary: string, risks: [{name, impact_eur, probability}], confidence: 0-1}."

**O — Osservazione & Valutazione**: "Se dati insufficienti, chiedi max 2 chiarimenti. Se confidence < 0.7, aggiungi note metodologiche."`,
    template: `[PLACEHOLDER - In attesa del meta-prompt specifico per CALIBRO]

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "craft",
    title: "CRAFT",
    description: "Context, Role, Action, Format, Target - metodologia strutturata per prompt completi",
    icon: PenTool,
    color: "bg-purple-600",
    category: "Struttura",
    difficulty: "Medio",
    explanation: "CRAFT sta per Context, Role, Action, Format, Target. Framework professionale per creare prompt estremamente dettagliati e completi che non lasciano spazio a dubbi. Include contesto situazionale, ruolo esperto, azioni sequenziali, formato output e pubblico target. Perfetto per generare prompt di qualità superiore.",
    example: `**CONTESTO**: Azienda SaaS B2B che vuole creare contenuti educativi per aumentare engagement e demo requests.

**RUOLO**: Sei un esperto content marketing strategist con oltre 20 anni di esperienza nel settore SaaS B2B. Sei riconosciuto come autorità per la creazione di contenuti che convertono.

**AZIONE**:
1. Analizza il target audience e identifica i principali pain points
2. Crea una content strategy per 3 mesi con obiettivi SMART
3. Proponi 10 topic ideas con keyword research e search intent
4. Per ogni topic, definisci struttura, CTA e metriche di successo
5. Includi piano di distribuzione e promozione

**FORMATO**: Documento strategico in formato tabellare con sezioni separate per ogni elemento. Include checklist operativa finale.

**TARGET**: Marketing managers di PMI tecnologiche (50-200 dipendenti) con budget limitato ma ambizioni di crescita. Livello di lettura professionale.`,
    template: `**CONTESTO**:
Stiamo per creare uno dei migliori prompt mai scritti. I prompt migliori includono dettagli completi per informare pienamente il Large Language Model in merito a: obiettivi, ambiti di competenza richiesti, conoscenze settoriali, formato preferito, pubblico di destinazione, riferimenti, esempi e il miglior approccio per raggiungere l'obiettivo. Sulla base di queste informazioni, e di quelle che seguiranno, sarai in grado di scrivere un prompt eccezionale.

**RUOLO**:
Sei un esperto nella generazione di prompt per Large Language Models (prompt engineer). Sei noto per creare prompt estremamente dettagliati, in grado di generare risposte dal modello significativamente superiori rispetto a quelle standard. I prompt che scrivi non lasciano spazio a dubbi, perché sono al tempo stesso profondamente riflessivi ed estremamente completi.

**AZIONE**:

1. Prima di iniziare a scrivere il prompt, assicurati che io ti abbia fornito l'argomento o il tema. Se non ti fornisco l'argomento, oppure se le informazioni che ti fornisco sono troppo scarse o troppo generiche, ti prego di chiedere ulteriori chiarimenti. Non esitare a farmi domande che possano aiutarti a svolgere al meglio il tuo compito.
2. Una volta chiarito l'argomento o il tema del prompt, rivedi anche il Formato e l'Esempio riportati di seguito.
3. Se necessario, il prompt dovrebbe includere sezioni "da completare" che l'utente potrà personalizzare in base alle proprie esigenze.
4. Fai un respiro profondo e procedi passo dopo passo.
5. Una volta assimilate tutte le informazioni, scrivi il miglior prompt mai creato.

**FORMATO**:
Scriverai il prompt seguendo la formula "C.R.A.F.T.", in cui ogni lettera rappresenta una sezione del prompt. Il formato e le descrizioni delle sezioni sono i seguenti:
C – Contesto: Questa sezione descrive il contesto attuale e delinea la situazione per la quale è necessario il prompt. Aiuta il modello a comprendere quali conoscenze ed esperienze deve richiamare per rispondere efficacemente.
R – Ruolo: Questa sezione definisce il tipo di esperienza e il livello di specializzazione che il modello deve assumere. In tutti i casi, il ruolo descritto dovrà essere quello di un esperto leader nel settore, con oltre vent'anni di esperienza e autorevolezza riconosciuta.
A – Azione: Questa è la serie di azioni che il prompt richiederà al modello di intraprendere. Dovrebbe essere formulata come un elenco numerato di passaggi sequenziali e logici, al fine di massimizzare la probabilità di successo dell'output.
F – Formato: Si riferisce alla struttura o allo stile di presentazione dei contenuti generati dal modello. Determina come le informazioni devono essere organizzate, visualizzate o codificate per soddisfare preferenze o requisiti specifici. I formati includono: saggio, tabella, codice, testo semplice, markdown, sintesi, elenco, ecc.
T – Target Audience (Pubblico di riferimento): Questa sezione descrive l'utenza finale che utilizzerà l'output generato dal prompt. Può includere informazioni demografiche, geografiche, lingua, livello di lettura, preferenze, ecc.

TARGET:
Il pubblico di riferimento per la creazione di questo prompt sono i Large Language Models avanzati.

**ESEMPIO** – Ecco un esempio di Prompt CRAFT di riferimento:

**Contesto**: 

Ti è stato assegnato il compito di creare una guida dettagliata per aiutare le persone a fissare, monitorare e raggiungere obiettivi mensili. Lo scopo di questa guida è suddividere obiettivi più grandi in passaggi gestibili e concreti, in linea con la visione generale dell'anno. Il focus sarà sul mantenere la costanza, superare gli ostacoli e celebrare i progressi, utilizzando tecniche consolidate come gli obiettivi SMART (Specifici, Misurabili, Raggiungibili, Rilevanti, Temporalizzati).

**Ruolo**: 

Sei un esperto coach della produttività, con oltre vent'anni di esperienza nell'aiutare le persone a ottimizzare il proprio tempo, definire obiettivi chiari e ottenere successi sostenibili. Sei altamente competente nella formazione di abitudini, nelle strategie motivazionali e nei metodi di pianificazione pratica. Il tuo stile di scrittura è chiaro, motivante e orientato all'azione, e fa in modo che i lettori si sentano capaci e stimolati a seguire i tuoi consigli.

**Azione**:
Inizia con un'introduzione coinvolgente che spieghi perché fissare obiettivi mensili è efficace per la crescita personale e professionale.
Evidenzia i benefici della pianificazione a breve termine.

- Fornisci una guida passo-passo per suddividere grandi obiettivi annuali in obiettivi mensili focalizzati.
- Offri strategie pratiche per identificare le priorità più importanti ogni mese.
Introduci tecniche per mantenere la concentrazione, monitorare i progressi e modificare i piani se necessario.
- Includi esempi di obiettivi mensili per aree comuni della vita (es. salute, carriera, finanze, sviluppo personale).
- Affronta potenziali ostacoli, come la procrastinazione o imprevisti, e come superarli.
- Concludi con una sezione motivazionale che incoraggi alla riflessione e al miglioramento continuo.

**Formato**: 

Scrivi la guida in testo semplice, usando titoli e sottotitoli chiari per ogni sezione. Utilizza elenchi numerati o puntati per i passaggi operativi e includi esempi pratici o casi studio per illustrare i tuoi punti.

**Target**: 

Il pubblico include professionisti e imprenditori tra i 25 e i 55 anni, alla ricerca di strategie pratiche e dirette per migliorare la propria produttività e raggiungere i propri obiettivi. Sono persone auto-motivate che apprezzano struttura e chiarezza nel loro percorso di sviluppo personale. Preferiscono un livello di lettura semplice, equivalente a una sesta elementare.

---

Basandoti sul seguente argomento, genera un prompt C.R.A.F.T. completo e perfetto. Sii dettagliato e approfondito per ogni sezione.

Argomento: "{input}"`
  },
  {
    id: "crispe",
    title: "CRISPE",
    description: "Capacity, Insight, Statement, Personality, Experiment - definisci ruolo e personalità AI",
    icon: Eye,
    color: "bg-cyan-600",
    category: "Personificazione",
    difficulty: "Medio",
    explanation: "CRISPE enfatizza il role-playing dell'AI. Capacity/Role (expertise e ruolo), Insight (background knowledge), Statement (task specifico), Personality (tono e stile), Experiment (iterazione). Perfetto per output che richiedono expertise specifica e personalità definita.",
    example: `Capacity: Sei un senior marketing strategist con 15 anni esperienza in SaaS B2B
Insight: Conosci growth hacking, PLG (Product-Led Growth), marketing automation
Statement: Crea una strategia go-to-market per lancio prodotto analytics AI
Personality: Diretto, data-driven, focus su ROI, pragmatico
Experiment: Proponi 3 varianti strategiche con pro/contro di ciascuna`,
    template: `Contesto:

Ti è stato assegnato il compito di agire come un architetto di intelligenze artificiali, specializzato nella creazione di personaggi. Il tuo obiettivo è trasformare una richiesta o un argomento in un prompt completo e altamente efficace utilizzando il framework C.R.I.S.P.E. Questo framework è uno strumento di personificazione avanzata che va oltre la semplice assegnazione di un ruolo. Costruisce una personalità completa e coerente, garantendo che l'output non sia solo corretto, ma anche caratterizzato da una voce e uno stile unici. Si articola in cinque componenti:

Capacity/Role (Capacità/Ruolo): Definisce l'identità, l'expertise e la posizione dell'AI. Non solo "sei un esperto", ma "sei un avvocato tributarista con 15 anni di esperienza in fusioni e acquisizioni internazionali". Stabilisce le competenze fondamentali.
Insight (Intuizione/Conoscenza): Fornisce il bagaglio di conoscenze specifiche, i dati o le prospettive che il personaggio deve possedere. È la sua "memoria" e il suo punto di vista unico sul mondo.
Statement (Dichiarazione/Compito): Presenta il compito specifico in modo chiaro e diretto, come una missione affidata a quel personaggio specifico.
Personality (Personalità): Descrive i tratti caratteriali, il tono di voce, lo stile di comunicazione e le manie del personaggio. È ciò che lo rende vivo e distinguibile (es. cinico, ottimista, formale, spiritoso).
Experiment (Esperimento): Introduce un elemento di iterazione e auto-correzione. Chiede all'AI di generare una risposta e poi di rivederla alla luce della personalità definita, proponendo un miglioramento per renderla più "in carattere".
Questo framework è particolarmente potente per output che richiedono un'expertise specifica filtrata attraverso una personalità definita, come consulenze, recensioni, articoli di opinione o contenuti creativi.

Ruolo:

Sei un Architetto di Personaggi e Designer di Persona AI di fama mondiale, un'autorità riconosciuta a livello globale nel dare vita a intelligenze artificiali con personalità distintive e credibili. Con oltre vent'anni di esperienza nella creazione di personaggi per simulazioni aziendali avanzate, sviluppo di videogiochi e formazione di assistenti virtuali, hai perfezionato l'arte della personificazione AI. Il framework C.R.I.S.P.E. è il tuo strumento di lavoro quotidiano, e la tua abilità nel definire Capacity, Insight e Personality ti permette di creare interazioni così umane e coerenti da essere quasi indistinguibili da quelle con un vero esperto del settore.

Azione:

Analizza attentamente l'input dell'utente ({input}). Identifica il tipo di expertise richiesto e il tono generale desiderato per l'output.
Definisci la sezione Capacity/Role (Capacità/Ruolo): Scrivi un'istruzione che costringa il LLM a creare un ruolo dettagliato e specifico. L'istruzione deve chiedere di specificare non solo la professione, ma anche l'anzianità, le specializzazioni e un contesto professionale.
Definisci la sezione Insight (Intuizione/Conoscenza): Crea un'istruzione che elenchi le conoscenze di background essenziali per quel ruolo. L'istruzione deve chiedere di includere dati di mercato, teorie accademiche, eventi storici o filosofie di lavoro che il personaggio dovrebbe conoscere e utilizzare.
Definisci la sezione Statement (Dichiarazione/Compito): Formula un'istruzione che presenti il compito specifico. L'istruzione deve essere un comando chiaro e diretto, rivolto esplicitamente al personaggio appena creato (es. "Come [Capacità/Ruolo definito], il tuo compito è...").
Definisci la sezione Personality (Personalità): Scrivi un'istruzione che descriva in modo vivido i tratti caratteriali. L'istruzione deve chiedere di usare aggettivi specifici (es. "caustico ma brillante", "empatico e rassicurante", "laconico e diretto") e di dare esempi di come questa personalità si manifesterebbe nel linguaggio.
Definisci la sezione Experiment (Esperimento): Crea un'istruzione che guidi il LLM verso un'iterazione critica. L'istruzione deve dire: "Dopo aver generato la risposta iniziale, rivedila e proponi una piccola modifica o una riformulazione di una frase per renderla ancora più coerente con la personalità definita sopra."
Assembla le cinque componenti in un prompt finale, strutturato e coerente, utilizzando le etichette "Capacity/Role", "Insight", "Statement", "Personality" e "Experiment" come intestazioni distinte.
Formato:

Genera un prompt completo e strutturato utilizzando il framework C.R.I.S.P.E. (Capacity/Role, Insight, Statement, Personality, Experiment). Ogni sezione del framework deve essere chiaramente etichettata con un'intestazione in grassetto. Il contenuto sotto ogni intestazione deve essere un'istruzione chiara e dettagliata per un LLM, che lo guiderà a incarnare e agire come un personaggio specifico.

Target:

Il prompt C.R.I.S.P.E. che genererai è destinato a essere utilizzato con i più recenti e avanzati Large Language Models di ultima generazione, tra cui Claude 3.5 Sonnet, Gemini 2.5 Pro e Flash, GPT-5 e GPT-4.1, e GLM-4.6. Questi modelli eccellono nel mantenere una persona coerente per tutta la durata dell'interazione e possono gestire istruzioni meta-cognitive complesse come la fase "Experiment". Il framework C.R.I.S.P.E. è ideale per sfruttare queste capacità sofisticate, spingendo il LLM a produrre output che non solo sono informativi, ma anche ricchi di carattere, sfumature e una voce autentica.

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "chain-of-thought",
    title: "Chain of Thought",
    description: "Guida il modello a ragionare passo dopo passo per arrivare a una soluzione",
    icon: Brain,
    color: "bg-blue-500",
    category: "Ragionamento",
    difficulty: "Medio",
    explanation: "Chain of Thought (CoT) migliora dramatically la qualità delle risposte per task complessi. Invece di chiedere direttamente la risposta, guidi il modello a 'pensare ad alta voce', mostrando ogni passaggio logico. Fondamentale per matematica, logica, problem solving.",
    example: `Problema: Calcola il ROI di una campagna marketing
Budget: €10,000
Risultati: 500 leads, 50 conversioni, valore medio cliente €1,200

Pensa passo dopo passo:
1. Calcola revenue generata
2. Sottrai il costo
3. Dividi profitto per costo
4. Converti in percentuale
5. Interpreta il risultato`,
    template: `Contesto:

Ti è stato assegnato il compito di agire come un progettista di sistemi di ragionamento per intelligenze artificiali. Il tuo obiettivo è trasformare una domanda o un problema complesso in un prompt che guidi il LLM a utilizzare la tecnica "Chain of Thought" (Catena di Pensiero). Questa tecnica è fondamentale perché migliora drasticamente la qualità delle risposte per task che richiedono logica, calcolo o pianificazione multi-passaggio. Invece di chiedere direttamente la risposta finale, che potrebbe portare a errori logici, guidi il modello a "pensare ad alta voce", esplicitando ogni passaggio del suo ragionamento. Questo processo è essenziale per problemi di matematica, deduzione logica, pianificazione strategica e qualsiasi situazione in cui il percorso per la soluzione è tanto importante quanto la soluzione stessa.

Ruolo:

Sei un Logico e Ingegnere della Cognizione AI di fama mondiale, un'autorità riconosciuta a livello globale nel campo del ragionamento artificiale e della scienza cognitiva computazionale. Con oltre vent'anni di esperienza nello studio di come gli esseri umani e le macchine risolvono problemi complessi, hai perfezionato l'arte di tradurre enigmi ambigui in processi logici chiari e sequenziali. La tua specialità è la tecnica Chain of Thought, che consideri il ponte tra l'elaborazione del linguaggio e il vero e proprio pensiero strutturato. Sei un maestro nel decomporre problemi complessi in sottoproblemi gestibili, una skill che applichi con successo per creare prompt che costringono i modelli più avanzati a mostrare il loro lavoro.

Azione:

Analizza attentamente l'input dell'utente ({input}). Identifica la natura del problema: è un calcolo matematico, un enigma logico, una richiesta di pianificazione, un'analisi causa-effetto?
Definisci la sezione Problema: Formula una domanda chiara, concisa e inequivocabile che rappresenti perfettamente il task da risolvere. Questa sarà la prima parte del prompt CoT.
Definisci la sezione Istruzioni di Ragionamento: Scrivi un'istruzione esplicita e forte che guidi il LLM a generare la catena di pensiero. Usa frasi come "Pensa passo dopo passo", "Mostra ogni passaggio del tuo ragionamento in dettaglio", "Prima di dare la risposta finale, scomponi il problema". È cruciale che questa istruzione sia chiara e non lasci spazio a interpretazioni.
All'interno delle istruzioni, specifica che il modello deve dividere nettamente il processo di pensiero dalla risposta finale. Chiedigli di utilizzare etichette come "Ragionamento:" e "Risposta Finale:" per separare le due parti.
Assembla le due componenti in un prompt finale, strutturato e coerente, che presenti prima il problema e poi le istruzioni per il ragionamento passo-passo.
Formato:

Genera un prompt completo e strutturato per la tecnica Chain of Thought. Il prompt deve essere in testo semplice e contenere due sezioni distinte, chiaramente etichettate:

Problema: [Contiene la domanda o il task da risolvere]
Istruzioni di Ragionamento: [Contiene il comando esplicito di pensare ad alta voce e di separare il ragionamento dalla risposta finale]
L'output generato da questo prompt CoT dovrà quindi contenere una sezione di ragionamento seguita da una sezione con la risposta finale.

Target:

Il prompt Chain of Thought che genererai è destinato a essere utilizzato con i più recenti e avanzati Large Language Models di ultima generazione, tra cui Claude 3.5 Sonnet, Gemini 2.5 Pro e Flash, GPT-5 e GPT-4.1, e GLM-4.6. Questi modelli possiedono capacità di ragionamento superiore e una "finestra di attenzione" più ampia, che permette loro di gestire catene di pensiero lunghe e complesse senza perdere il filo logico. La tecnica CoT è particolarmente efficace su di loro perché sfrutta al massimo la loro capacità di elaborazione sequenziale, trasformando una semplice richiesta di informazione in un esercizio di problem solving strutturato.

Basandoti sul seguente argomento: "{input}"`
  },
  {
    id: "crafting-ai",
    title: "CRAFTING AI",
    description: "Estensione di CRAFT con fasi di validazione e raffinamento continuo",
    icon: Sparkles,
    color: "bg-violet-500",
    category: "Struttura",
    difficulty: "Avanzato",
    explanation: "CRAFTING AI estende CRAFT aggiungendo iterazione e validazione. Include fasi di testing, feedback e raffinamento. Ideale per progetti complessi che richiedono iterazioni multiple e ottimizzazione continua.",
    example: `Context: Sviluppo chatbot customer service per e-commerce
Request: Bot che gestisce resi, tracking, FAQ prodotti
Action: Progetta conversazioni, gestione errori, escalation umana
Format: Diagramma flussi + script conversazioni + KPI
Target: Clienti italiani, tutti i livelli tech literacy
Iteration: Testa con 5 scenari reali, raccogli feedback, raffina
Validation: Accuracy >90%, customer satisfaction >4/5`,
    template: `{input}

Context: [Scenario completo]
Request: [Output desiderato]
Action: [Steps implementazione]
Format: [Deliverable specifici]
Target: [Audience]

--- ITERATION LOOP ---
1. Genera prima versione
2. Identifica 3-5 scenari test
3. Valida output
4. Lista miglioramenti
5. Genera versione migliorata
6. Ripeti finché soddisfa criteri`
  },
  {
    id: "few-shot",
    title: "Few Shot Learning",
    description: "Fornisce esempi specifici per aiutare il modello a capire il compito richiesto",
    icon: Target,
    color: "bg-green-500",
    category: "Apprendimento",
    difficulty: "Facile",
    explanation: "Few-Shot Learning è semplicissimo ma potentissimo: dai 2-5 esempi del formato output desiderato, poi fai la richiesta vera. Il modello impara il pattern dagli esempi e lo replica. Essenziale per task con formato specifico.",
    example: `Converti frasi in sentiment analysis JSON:

Esempio 1:
Input: "Questo prodotto è fantastico!"
Output: {"sentiment": "positive", "score": 0.95, "emotion": "joy"}

Esempio 2:
Input: "Non funziona, molto deluso"
Output: {"sentiment": "negative", "score": 0.85, "emotion": "disappointment"}

Esempio 3:
Input: "Nella media, niente di speciale"
Output: {"sentiment": "neutral", "score": 0.50, "emotion": "indifference"}

Ora analizza: "Esperienza incredibile, super consigliato!"`,
    template: `{input}

[Fornisci 2-5 esempi con questo formato:]

Esempio 1:
Input: [esempio input 1]
Output: [esempio output 1]

Esempio 2:
Input: [esempio input 2]
Output: [esempio output 2]

Esempio 3:
Input: [esempio input 3]
Output: [esempio output 3]

Ora applica lo stesso pattern a: [il tuo input reale]`
  },
  {
    id: "grade",
    title: "GRADE",
    description: "Goal, Request, Action, Details, Example per prompt orientati agli obiettivi",
    icon: Award,
    color: "bg-indigo-500",
    category: "Obiettivi",
    difficulty: "Medio",
    explanation: "GRADE mette il Goal al centro: Goal (obiettivo finale), Request (richiesta specifica), Action (azioni da compiere), Details (dettagli implementativi), Example (esempi di riferimento). Perfetto per task goal-oriented dove il risultato misurabile è critico.",
    example: `Goal: Aumentare conversion rate landing page dal 2% al 5% in 60 giorni
Request: Riscrivi hero section e CTA principale
Action: A/B test 3 varianti, analizza heatmap, ottimizza copy
Details: Target: founder tech startup, pain: scaling senza budget, tono: aspirazionale
Example: Riferimento Stripe homepage - chiara value prop, social proof immediato`,
    template: `Goal: {input}
Request: [Cosa produrre/creare]
Action: [Steps concreti da seguire]
Details: [Specifiche tecniche, vincoli, requisiti]
Example: [Riferimenti o benchmark]`
  },
  {
    id: "par",
    title: "PAR",
    description: "Problem, Action, Result per definire problemi e risultati desiderati",
    icon: CheckCircle,
    color: "bg-lime-500",
    category: "Problem Solving",
    difficulty: "Facile",
    explanation: "PAR è il framework più essenziale per problem-solving: Problem (qual è il problema), Action (cosa fare), Result (risultato atteso). Semplice ma efficace, ottimo per situazioni dove serve chiarezza immediata.",
    example: `Problem: Email marketing ha open rate 12%, industry average 18%
Action: Analizza subject lines ultimi 50 email, proponi 10 nuovi subject ottimizzati
Result: Incremento open rate a 20%+ entro 30 giorni, mantenendo unsubscribe <2%`,
    template: `Problem: {input}
Action: [Cosa fare per risolvere]
Result: [Outcome desiderato, metriche]`
  },
  {
    id: "race",
    title: "RACE",
    description: "Role, Action, Context, Expectations per task professionali con expertise",
    icon: Flag,
    color: "bg-orange-600",
    category: "Professionale",
    difficulty: "Medio",
    explanation: "RACE enfatizza expertise e contesto professionale: Role (ruolo e expertise dell'AI), Action (compito specifico), Context (background situazionale), Expectations (criteri successo). Ideale per consulting, advisory, decisioni strategiche.",
    example: `Role: Sei un CFO esperto in SaaS B2B, specializzato in unit economics e pricing
Action: Analizza il nostro pricing model e proponi ottimizzazioni
Context: ARR €2M, CAC €1,200, LTV €5,000, churn 5% mensile, target €10M ARR in 24 mesi
Expectations: Raccomandazioni actionable, impatto su revenue e margini, timeline implementazione`,
    template: `Role: Sei un {input}
Action: [Task da compiere]
Context: [Situazione aziendale, dati rilevanti]
Expectations: [Formato output, livello dettaglio, metriche]`
  },
  {
    id: "rascef",
    title: "RASCEF",
    description: "Role, Action, Steps, Context, Examples, Format per documentazione tecnica dettagliata",
    icon: FileText,
    color: "bg-slate-600",
    category: "Documentazione",
    difficulty: "Avanzato",
    explanation: "RASCEF è il framework più completo per documentazione tecnica: Role, Action, Steps, Context, Examples, Format. Garantisce documentazione dettagliata, step-by-step, con esempi. Essenziale per guide tecniche, API docs, tutorial.",
    example: `Role: Technical writer specializzato in API documentation
Action: Documenta endpoint POST /api/users/create
Steps: 1) Authentication, 2) Request body structure, 3) Validation, 4) Response codes, 5) Error handling
Context: REST API per user management, autenticazione JWT, rate limit 100 req/min
Examples: Include curl example, Python requests, JavaScript fetch
Format: Markdown con syntax highlighting, sidebar navigation, try-it console`,
    template: `Role: {input}
Action: [Cosa documentare]
Steps: [Procedura step-by-step]
Context: [Setup, prerequisiti, environment]
Examples: [Code samples in 2-3 linguaggi]
Format: [Struttura documento, styling, interattività]`
  },
  {
    id: "rhodes",
    title: "RHODES",
    description: "Role, Objective, Details, Examples, Sense Check per output personalizzati con stile",
    icon: UserCheck,
    color: "bg-fuchsia-500",
    category: "Stile",
    difficulty: "Avanzato",
    explanation: "RHODES aggiunge validazione e quality check: Role, Objective, Details, Examples, Sense Check. Il 'Sense Check' finale chiede all'AI di auto-validare l'output. Eccellente per output critici dove serve quality assurance.",
    example: `Role: Copywriter esperto in email marketing per e-commerce fashion
Objective: Email carrello abbandonato che recuperi 25%+ carrelli
Details: Tono: amichevole ma urgente, include sconto 15%, evidenzia prodotti carrello, CTA chiaro
Examples: [Link email Asos, Zara recovery email]
Sense Check: Valida se email rispetta best practice, A/B testabile, mobile-friendly`,
    template: `Role: {input}
Objective: [Goal misurabile]
Details: [Specifiche, vincoli, requirements]
Examples: [Benchmark o riferimenti]
Sense Check: Auto-valida output contro criteri qualità, identifica possibili miglioramenti`
  },
  {
    id: "roses",
    title: "ROSES",
    description: "Role, Objective, Style, Example, Scenario per contenuti creativi e marketing",
    icon: Layers,
    color: "bg-pink-600",
    category: "Creativo",
    difficulty: "Medio",
    explanation: "ROSES è ottimizzato per contenuti creativi: Role, Objective, Style, Example, Scenario. Lo 'Scenario' aiuta a contestualizzare creativamente. Perfetto per storytelling, content marketing, campagne creative.",
    example: `Role: Creative director agenzia pubblicitaria premio
Objective: Concept campagna social per lancio sneaker sostenibili
Style: Bold, visually-driven, Gen-Z language, eco-conscious senza essere preachy
Example: Riferimento campagna Patagonia "Don't Buy This Jacket"
Scenario: Black Friday, target 18-25, budget limitato, virale su TikTok Instagram`,
    template: `Role: {input}
Objective: [Creative brief]
Style: [Tone, visual direction, voice]
Example: [Reference campaigns]
Scenario: [Context, timing, platform, constraints]`
  },
  {
    id: "rtf",
    title: "RTF",
    description: "Role, Task, Finish framework semplice per definire ruolo e stato di completamento",
    icon: Clock,
    color: "bg-stone-500",
    category: "Semplice",
    difficulty: "Facile",
    explanation: "RTF è il framework più minimal: Role (chi sei), Task (cosa fare), Finish (quando è completo). Veloce e diretto, perfetto per task semplici dove non serve complessità.",
    example: `Role: Editor professionale
Task: Correggi grammar e spelling in questo testo
Finish: Testo pulito, zero errori, mantieni tono originale`,
    template: `Role: {input}
Task: [Compito specifico]
Finish: [Criteri completamento, definition of done]`
  },
  {
    id: "smart",
    title: "SMART",
    description: "Specific, Measurable, Achievable, Relevant, Time-bound per obiettivi chiari",
    icon: Crosshair,
    color: "bg-green-600",
    category: "Obiettivi",
    difficulty: "Medio",
    explanation: "SMART trasforma obiettivi vaghi in goal concreti: Specific (preciso), Measurable (misurabile), Achievable (raggiungibile), Relevant (rilevante), Time-bound (con deadline). Standard per goal-setting e pianificazione.",
    example: `Specific: Aumentare MRR (Monthly Recurring Revenue) del prodotto SaaS
Measurable: Da €50K a €75K MRR (+50%)
Achievable: Con team corrente e budget marketing €10K/mese
Relevant: Allineato a obiettivo Series A fundraising Q4
Time-bound: Entro 6 mesi (raggiungere €75K MRR entro 30 giugno)`,
    template: `{input}

Trasforma questo in SMART goal:
Specific: [Cosa esattamente, chi, dove]
Measurable: [Metriche precise, KPI]
Achievable: [Risorse disponibili, feasibility]
Relevant: [Perché importante, allineamento strategico]
Time-bound: [Deadline specifica, milestones]`
  },
  {
    id: "sparc",
    title: "SPARC System",
    description: "Framework multi-agente con template strutturati e operazioni cognitive",
    icon: Zap,
    color: "bg-red-600",
    category: "Sistema",
    difficulty: "Avanzato",
    explanation: "SPARC è un meta-framework per sistemi multi-agente complessi: Specification, Pseudocode, Architecture, Refinement, Completion. Usato per orchestrare multiple AI in workflow complessi. Estremamente potente ma richiede expertise.",
    example: `Specification: Sistema per generare, ottimizzare e pubblicare content marketing automatico
Pseudocode: Agent1:research → Agent2:outline → Agent3:write → Agent4:SEO-optimize → Agent5:publish
Architecture: Queue-based con Redis, Node orchestrator, OpenAI API, CMS integration
Refinement: Feedback loop tra agent3 e agent4, human-in-loop per approval
Completion: 10 articoli/settimana, quality score >8/10, auto-publish se score >9`,
    template: `{input}

Specification: [Descrive sistema completo]
Pseudocode: [Workflow logic, agent interactions]
Architecture: [Tech stack, data flow, APIs]
Refinement: [Feedback loops, optimization]
Completion: [Success metrics, auto/manual triggers]`
  },
  {
    id: "spear",
    title: "SPEAR",
    description: "Start, Provide, Explain, Ask, Rinse & Repeat per richieste concise ed efficienti",
    icon: Search,
    color: "bg-sky-500",
    category: "Efficienza",
    difficulty: "Facile",
    explanation: "SPEAR è iterativo e conversazionale: Start (inizia task), Provide (fornisci info), Explain (spiega cosa ti serve), Ask (fai domande), Rinse & Repeat. Ottimo per task esplorativi dove non sai tutto in anticipo.",
    example: `Start: Voglio creare una strategia content per LinkedIn
Provide: Sono founder B2B SaaS, target CFO aziende tech
Explain: Need aumentare visibilità, generare inbound leads qualificati
Ask: Quale tipo contenuto performa meglio con CFO? Frequenza ideale posting?
[AI risponde, tu raffini, iterate]`,
    template: `Start: {input}
Provide: [Info e contesto iniziali]
Explain: [Perché e cosa vuoi ottenere]
Ask: [Domande aperte per guidance]

[Poi itera basandoti sulle risposte]`
  },
  {
    id: "star",
    title: "STAR",
    description: "Situation, Task, Action, Result per descrivere scenari e risultati",
    icon: Star,
    color: "bg-yellow-600",
    category: "Narrativa",
    difficulty: "Facile",
    explanation: "STAR è classico per storytelling e case study: Situation (contesto), Task (sfida), Action (cosa hai fatto), Result (outcome). Usato in colloqui di lavoro e per presentare successi.",
    example: `Situation: Startup SaaS con churn rate 8% mensile, insostenibile per crescita
Task: Ridurre churn a <3% mantenendo acquisition velocity
Action: Implementato onboarding proattivo, success manager dedicato, in-app guidance, NPS surveys
Result: Churn ridotto a 2.5% in 4 mesi, NPS da 32 a 58, LTV aumentato 3.2x`,
    template: `Situation: {input}
Task: [Challenge o obiettivo]
Action: [Steps concreti presi]
Result: [Outcome con metriche]`
  },
  {
    id: "tag",
    title: "TAG",
    description: "Task, Action, Goal framework per definire compiti e obiettivi finali",
    icon: Map,
    color: "bg-emerald-600",
    category: "Obiettivi",
    difficulty: "Facile",
    explanation: "TAG è essenziale e diretto: Task (cosa fare), Action (come farlo), Goal (risultato finale). Simile a PAR ma con focus su azione esplicita. Perfetto per to-do e task management.",
    example: `Task: Ottimizza pagina pricing per aumentare conversioni
Action: A/B test 3 varianti layout, test pricing psychology (anchor, decoy), semplifica tiers
Goal: Incremento conversion rate da 3% a 5%, riduzione drop-off in checkout`,
    template: `Task: {input}
Action: [Steps specifici]
Goal: [Target finale misurabile]`
  },
  {
    id: "trace",
    title: "TRACE",
    description: "Task, Requirements, Audience, Context, Evaluation per task professionali avanzati",
    icon: BarChart3,
    color: "bg-blue-700",
    category: "Professionale",
    difficulty: "Avanzato",
    explanation: "TRACE è enterprise-grade: Task, Requirements, Audience, Context, Evaluation. L''Evaluation' definisce come misurare successo. Usato in contesti corporate e progetti con stakeholder multipli.",
    example: `Task: Sviluppa business case per migrazione cloud infrastruttura
Requirements: TCO analysis 3 anni, risk assessment, migration roadmap, ROI projection
Audience: C-suite (CEO, CFO, CTO), Board
Context: Azienda 500+ dipendenti, legacy on-prem, downtime=revenue loss critico
Evaluation: Board approval entro 30gg, budget <€2M, payback <18 mesi`,
    template: `Task: {input}
Requirements: [Deliverables specifici]
Audience: [Chi decide, chi usa, skill level]
Context: [Constraints, politica, storia]
Evaluation: [Success criteria, approval process]`
  },
  {
    id: "tree-of-thoughts",
    title: "Tree of Thoughts",
    description: "Esplora multiple vie di ragionamento per trovare la soluzione migliore",
    icon: Zap,
    color: "bg-orange-500",
    category: "Ragionamento",
    difficulty: "Avanzato",
    explanation: "Tree of Thoughts è Chain of Thought evoluto: esplora MULTIPLE vie di ragionamento in parallelo, valuta ciascuna, backtrack se necessario, trova soluzione ottimale. Per decisioni complesse con più opzioni valide.",
    example: `Problema: Come scalare da 10 a 100 dipendenti in 12 mesi?

Percorso A: Hiring aggressivo
→ Pro: Veloce, capacità immediata
→ Contro: Cultura risk, costo alto, quality hire difficile
→ Rischio: 40%

Percorso B: Outsourcing + core team
→ Pro: Flessibile, cost-effective
→ Contro: Controllo minore, IP concerns
→ Rischio: 30%

Percorso C: Acquisizione team esistente (acquihire)
→ Pro: Team già affiatato, cultura fit
→ Contro: Costo upfront alto, integration complex
→ Rischio: 35%

Valutazione: Percorso B + Percorso A graduali = miglior compromesso`,
    template: `{input}

Esplora multiple soluzioni:

Opzione 1: [Approccio A]
→ Pro: [Vantaggi]
→ Contro: [Svantaggi]
→ Rischi: [Valutazione]

Opzione 2: [Approccio B]
→ Pro: [Vantaggi]
→ Contro: [Svantaggi]
→ Rischi: [Valutazione]

Opzione 3: [Approccio C]
→ Pro: [Vantaggi]
→ Contro: [Svantaggi]
→ Rischi: [Valutazione]

Raccomandazione finale: [Sintesi migliore approccio]`
  },
  {
    id: "traci",
    title: "TRACI",
    description: "Task, Role, Audience, Create, Intent per marketing, educazione e customer service",
    icon: Anchor,
    color: "bg-blue-800",
    category: "Marketing",
    difficulty: "Medio",
    explanation: "TRACI è versatile per comunicazione: Task, Role, Audience, Create, Intent. L''Intent' chiarisce obiettivo finale (educare, convertire, supportare). Ottimo per marketing content, educational material, customer communications.",
    example: `Task: Email series onboarding per nuovi utenti SaaS
Role: Customer success specialist empatico e tech-savvy
Audience: Small business owners, non-technical, time-constrained
Create: 5 email drip campaign, giorno 1-3-7-14-30
Intent: Guidare a first value moment entro 7 giorni, ridurre churn early-stage`,
    template: `Task: {input}
Role: [Chi parla, expertise]
Audience: [Chi legge, livello, needs]
Create: [Formato e struttura output]
Intent: [Obiettivo finale, cosa deve succedere dopo]`
  },
  {
    id: "zero-shot",
    title: "Zero Shot",
    description: "Richiede al modello di eseguire un compito senza esempi precedenti",
    icon: Lightbulb,
    color: "bg-yellow-500",
    category: "Apprendimento",
    difficulty: "Facile",
    explanation: "Zero-Shot è il prompt più semplice: chiedi direttamente senza esempi. Funziona bene per task comuni che il modello già conosce. Se non funziona, passa a Few-Shot. È il punto di partenza di qualsiasi prompt.",
    example: `Traduci questo testo in inglese professionale:
"Ciao, vorrei sapere quando arriva il pacco che ho ordinato ieri"

[Nessun esempio, il modello sa come tradurre]`,
    template: `{input}

[Richiesta diretta senza esempi]
[Funziona per task standard che il modello conosce]
[Se fallisce, aggiungi esempi (Few-Shot) o contesto (CARE, COAST)]`
  }
]

export const getFrameworksByMacroCategory = (macroCategoryId: string) => {
  const macroCategory = macroCategories.find(cat => cat.id === macroCategoryId)
  if (!macroCategory) return []
  
  return frameworks.filter(framework => 
    macroCategory.categories.includes(framework.category)
  )
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Facile": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Medio": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Avanzato": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}