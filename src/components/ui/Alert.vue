<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'destructive' | 'success'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const alertClass = computed(() => {
  const base = 'relative w-full rounded-lg border p-4'

  const variants = {
    default: 'bg-background text-foreground',
    destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    success: 'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600'
  }

  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <div :class="alertClass">
    <slot />
  </div>
</template>
