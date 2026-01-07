<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import { guides } from '../data/guides'

const { t, tm } = useI18n()

// Helper functions for translated content
const getGuideTitle = (id: string) => t(`guides.items.${id}.title`)
const getGuideDescription = (id: string) => t(`guides.items.${id}.description`)
const getGuideTopics = (id: string): string[] => {
  const topics = tm(`guides.items.${id}.topics`) as unknown
  return Array.isArray(topics) ? topics as string[] : []
}
const getTranslatedDifficulty = (difficulty: string) => {
  const map: Record<string, string> = {
    'Facile': t('difficulty.easy'),
    'Medio': t('difficulty.medium'),
    'Avanzato': t('difficulty.advanced')
  }
  return map[difficulty] || difficulty
}

const getDifficultyVariant = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile': return 'default'
    case 'Medio': return 'secondary'
    case 'Avanzato': return 'destructive'
    default: return 'default'
  }
}
</script>

<template>
  <div class="min-h-screen pt-16">
    <Header />

    <!-- Background gradients (consistent with Home) -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-purple-950/20" />
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
    </div>

    <main class="container mx-auto px-4 py-20">
      <section id="guide">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl font-bold mb-8 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400">
            {{ t('guides.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-12">
            {{ t('guides.subtitle') }}
          </p>
        </div>

        <!-- Guide Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <RouterLink
            v-for="guide in guides"
            :key="guide.id"
            :to="`/guide/${guide.id}`"
          >
            <Card class="p-6 h-full hover:shadow-xl transition-all cursor-pointer group">
              <div class="flex items-start space-x-4 mb-4">
                <div :class="`${guide.color} p-3 rounded-lg group-hover:scale-110 transition-transform`">
                  <component :is="guide.icon" class="h-6 w-6 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">{{ getGuideTitle(guide.id) }}</h3>
                  <Badge :variant="getDifficultyVariant(guide.difficulty)" class="text-xs">
                    {{ getTranslatedDifficulty(guide.difficulty) }}
                  </Badge>
                </div>
              </div>

              <p class="text-sm text-muted-foreground mb-4">
                {{ getGuideDescription(guide.id) }}
              </p>

              <div class="flex flex-wrap gap-2">
                  <Badge
                    v-for="topic in getGuideTopics(guide.id)"
                    :key="topic"
                    variant="outline"
                    class="text-xs"
                  >
                    {{ topic }}
                  </Badge>
              </div>
            </Card>
          </RouterLink>
        </div>

        <!-- Quick Tips Section -->
        <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-2xl p-8 md:p-12">
          <h2 class="text-5xl md:text-7xl font-bold mb-12 leading-relaxed text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400">
            {{ t('guides.quickTips.title') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ t('guides.quickTips.tip1.title') }}</h3>
                <p class="text-sm text-muted-foreground">{{ t('guides.quickTips.tip1.description') }}</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ t('guides.quickTips.tip2.title') }}</h3>
                <p class="text-sm text-muted-foreground">{{ t('guides.quickTips.tip2.description') }}</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ t('guides.quickTips.tip3.title') }}</h3>
                <p class="text-sm text-muted-foreground">{{ t('guides.quickTips.tip3.description') }}</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ t('guides.quickTips.tip4.title') }}</h3>
                <p class="text-sm text-muted-foreground">{{ t('guides.quickTips.tip4.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
