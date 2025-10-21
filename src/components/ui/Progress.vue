<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number  // 0-100
  variant?: 'default' | 'purple' | 'blue' | 'green' | 'orange'
  showPercentage?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  variant: 'purple',
  showPercentage: false,
  indeterminate: false
})

const variantStyles = computed(() => {
  const styles = {
    default: 'bg-gradient-to-r from-purple-600 to-blue-600',
    purple: 'bg-gradient-to-r from-purple-600 to-purple-400',
    blue: 'bg-gradient-to-r from-blue-600 to-blue-400',
    green: 'bg-gradient-to-r from-green-600 to-green-400',
    orange: 'bg-gradient-to-r from-orange-600 to-orange-400'
  }
  return styles[props.variant]
})

const progressPercentage = computed(() => {
  if (props.indeterminate) return 100
  return Math.min(Math.max(props.value, 0), 100)
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-2" v-if="showPercentage && !indeterminate">
      <span class="text-sm font-medium text-foreground">Progresso</span>
      <span class="text-sm font-medium text-muted-foreground">{{ Math.round(progressPercentage) }}%</span>
    </div>
    <div class="w-full bg-muted rounded-full h-2.5 overflow-hidden shadow-inner">
      <div
        :class="[
          'h-full rounded-full transition-all duration-300 ease-out',
          variantStyles,
          indeterminate ? 'animate-progress-indeterminate' : ''
        ]"
        :style="{ width: indeterminate ? '30%' : `${progressPercentage}%` }"
        role="progressbar"
        :aria-valuenow="indeterminate ? undefined : progressPercentage"
        :aria-valuemin="0"
        :aria-valuemax="100"
      >
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}
</style>
