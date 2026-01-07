<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, BookMarked } from 'lucide-vue-next'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import { getGuideById } from '../data/guides'
import { frameworks } from '../data/frameworks'

const { t, tm } = useI18n()
const route = useRoute()
const guideId = computed(() => route.params.id as string)
const guide = computed(() => getGuideById(guideId.value))

const relatedFrameworksList = computed(() => {
  if (!guide.value?.relatedFrameworks) return []
  return frameworks.filter(f => guide.value!.relatedFrameworks!.includes(f.id))
})

// Helper functions for translated content
const getGuideTitle = (id: string) => t(`guides.items.${id}.title`)
const getGuideDescription = (id: string) => t(`guides.items.${id}.description`)
const getGuideIntroduction = (id: string) => t(`guides.items.${id}.introduction`)
const getGuideTopics = (id: string): string[] => {
  const topics = tm(`guides.items.${id}.topics`) as unknown
  return Array.isArray(topics) ? topics as string[] : []
}
interface GuideSection {
  title: string
  content: string
  example?: string
  code?: string
}
const getGuideSections = (id: string): GuideSection[] => {
  const sections = tm(`guides.items.${id}.sections`) as unknown
  return Array.isArray(sections) ? sections as GuideSection[] : []
}
const getTranslatedDifficulty = (difficulty: string) => {
  const map: Record<string, string> = {
    'Facile': t('difficulty.easy'),
    'Medio': t('difficulty.medium'),
    'Avanzato': t('difficulty.advanced')
  }
  return map[difficulty] || difficulty
}
const getFrameworkTitle = (id: string) => t(`frameworks.items.${id}.title`)

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'Medio': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'Avanzato': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}
</script>

<template>
  <div class="min-h-screen pt-16">
    <Header />

    <!-- Background gradients -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-purple-950/20" />
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
    </div>

    <main class="container mx-auto px-4 py-12">
      <!-- 404 State -->
      <div v-if="!guide" class="text-center py-20">
        <h1 class="text-3xl font-bold mb-4">{{ t('guides.notFound') }}</h1>
        <p class="text-muted-foreground mb-8">{{ t('guides.notFoundDescription') }}</p>
        <RouterLink to="/guide">
          <Button>
            <ArrowLeft class="h-4 w-4 mr-2" />
            {{ t('guides.backToGuides') }}
          </Button>
        </RouterLink>
      </div>

      <!-- Guide Content -->
      <div v-else>
        <!-- Back Button -->
        <RouterLink to="/guide" class="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft class="h-4 w-4 mr-2" />
          {{ t('guides.backToGuides') }}
        </RouterLink>

        <!-- Header -->
        <div class="mb-12">
          <div class="flex items-start space-x-6 mb-6">
            <div :class="`${guide.color} p-4 rounded-xl`">
              <component :is="guide.icon" class="h-10 w-10 text-white" />
            </div>
            <div class="flex-1">
              <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400">{{ getGuideTitle(guide.id) }}</h1>
              <p class="text-xl md:text-2xl text-muted-foreground mb-6 font-light leading-relaxed">{{ getGuideDescription(guide.id) }}</p>
              <div class="flex flex-wrap gap-2">
                <Badge :class="getDifficultyColor(guide.difficulty)">
                  {{ getTranslatedDifficulty(guide.difficulty) }}
                </Badge>
                <Badge v-for="topic in getGuideTopics(guide.id)" :key="topic" variant="outline">
                  {{ topic }}
                </Badge>
              </div>
            </div>
          </div>

          <!-- Introduction -->
          <Card class="p-6 bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 border-purple-200 dark:border-purple-800">
            <div class="flex items-start space-x-3">
              <BookMarked class="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <p class="text-base leading-relaxed">{{ getGuideIntroduction(guide.id) }}</p>
            </div>
          </Card>
        </div>

        <!-- Sections -->
        <div class="space-y-8 mb-12">
          <div v-for="(section, index) in getGuideSections(guide.id)" :key="index">
            <Card class="p-8 hover:shadow-lg transition-shadow">
              <h2 class="text-2xl font-bold mb-4 flex items-center">
                <span :class="`${guide.color} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3`">
                  {{ index + 1 }}
                </span>
                {{ section.title }}
              </h2>

              <div class="prose prose-slate dark:prose-invert max-w-none mb-6">
                <p class="text-muted-foreground leading-relaxed">{{ section.content }}</p>
              </div>

              <!-- Example -->
              <div v-if="section.example" class="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border-l-4 border-blue-500">
                <p class="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">{{ t('guides.exampleLabel') }}</p>
                <pre class="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-mono">{{ section.example }}</pre>
              </div>

              <!-- Code -->
              <div v-if="section.code" class="bg-slate-900 dark:bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <p class="text-sm font-semibold text-slate-400 mb-3">{{ t('guides.codeLabel') }}</p>
                <pre class="text-sm text-slate-300"><code>{{ section.code }}</code></pre>
              </div>
            </Card>
          </div>
        </div>

        <!-- Related Frameworks -->
        <div v-if="relatedFrameworksList.length > 0" class="mb-12">
          <h2 class="text-2xl font-bold mb-6">{{ t('guides.relatedFrameworks') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RouterLink
              v-for="framework in relatedFrameworksList"
              :key="framework.id"
              :to="`/framework/${framework.id}`"
            >
              <Card class="p-4 h-full hover:shadow-lg transition-all cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div :class="`${framework.color} p-2 rounded-lg`">
                    <component :is="framework.icon" class="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold">{{ getFrameworkTitle(framework.id) }}</h3>
                    <p class="text-xs text-muted-foreground">{{ getTranslatedDifficulty(framework.difficulty) }}</p>
                  </div>
                </div>
              </Card>
            </RouterLink>
          </div>
        </div>

        <!-- Back to Guides -->
        <div class="text-center">
          <RouterLink to="/guide">
            <Button size="lg" class="group">
              <ArrowLeft class="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {{ t('guides.backToAllGuides') }}
            </Button>
          </RouterLink>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>
