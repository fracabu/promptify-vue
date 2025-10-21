<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'purple' | 'blue' | 'green' | 'orange' | 'pink'
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  clickable: false
})

const cardColors = computed(() => {
  const colors = {
    default: {
      shadow: 'hsl(0deg 0% 0% / 0.25)',
      edge: 'linear-gradient(to left, hsl(220deg 13% 69%) 0%, hsl(220deg 13% 85%) 8%, hsl(220deg 13% 85%) 92%, hsl(220deg 13% 69%) 100%)',
      front: 'hsl(var(--card))',
      darkBorder: 'hsl(220deg 13% 30% / 0.3)'
    },
    purple: {
      shadow: 'hsla(270, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(270, 94%, 20%) 0%, hsl(270, 80%, 36%) 8%, hsl(270, 57%, 35%) 92%, hsl(270, 90%, 23%) 100%)',
      front: 'linear-gradient(135deg, hsl(270deg 60% 96%) 0%, hsl(270deg 50% 98%) 100%)',
      darkBorder: 'hsl(270deg 60% 40% / 0.3)'
    },
    blue: {
      shadow: 'hsla(222, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(261, 94%, 20%) 0%, hsl(253, 80%, 36%) 8%, hsl(252, 57%, 35%) 92%, hsl(266, 90%, 23%) 100%)',
      front: 'linear-gradient(135deg, hsl(220deg 60% 96%) 0%, hsl(220deg 50% 98%) 100%)',
      darkBorder: 'hsl(220deg 60% 40% / 0.3)'
    },
    green: {
      shadow: 'hsla(122, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(128, 94%, 20%) 0%, hsl(155, 100%, 32%) 8%, hsl(143, 62%, 23%) 92%, hsl(123, 85%, 28%) 100%)',
      front: 'linear-gradient(135deg, hsl(140deg 60% 96%) 0%, hsl(140deg 50% 98%) 100%)',
      darkBorder: 'hsl(140deg 60% 40% / 0.3)'
    },
    orange: {
      shadow: 'hsla(27, 86%, 33%, 0.25)',
      edge: 'linear-gradient(to left, hsl(27, 86%, 33%) 0%, hsl(48, 100%, 32%) 8%, hsl(23, 89%, 40%) 92%, hsl(36, 95%, 22%) 100%)',
      front: 'linear-gradient(135deg, hsl(30deg 60% 96%) 0%, hsl(30deg 50% 98%) 100%)',
      darkBorder: 'hsl(30deg 60% 40% / 0.3)'
    },
    pink: {
      shadow: 'hsl(340deg 100% 16% / 0.25)',
      edge: 'linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%)',
      front: 'linear-gradient(135deg, hsl(340deg 60% 96%) 0%, hsl(340deg 50% 98%) 100%)',
      darkBorder: 'hsl(340deg 60% 40% / 0.3)'
    }
  }
  return colors[props.variant]
})

const cardClasses = computed(() => {
  return props.clickable ? 'cursor-pointer' : ''
})
</script>

<template>
  <div :class="['card-3d', cardClasses]">
    <span class="card-shadow" :style="{ background: cardColors.shadow }"></span>
    <span class="card-edge" :style="{ background: cardColors.edge }"></span>
    <div class="card-front" :style="{ background: cardColors.front, '--dark-border-color': cardColors.darkBorder }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-3d {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  display: block;
  min-height: 120px;
}

.card-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
  border-radius: 16px;
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.card-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
  border-radius: 16px;
}

.card-front {
  display: block;
  position: relative;
  min-height: inherit;
  border-radius: 16px;
  color: hsl(var(--card-foreground));
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
  border: 1px solid hsl(var(--border) / 0.5);
  backdrop-filter: blur(8px);
}

/* Dark mode adjustments */
.dark .card-front {
  background: hsl(var(--card)) !important;
  border: 1px solid var(--dark-border-color, hsl(220deg 13% 30% / 0.3));
}

.dark .card-shadow {
  background: hsl(0deg 0% 0% / 0.5) !important;
}

/* Hover effects for clickable cards */
.card-3d.cursor-pointer:hover {
  filter: brightness(110%);
}

.card-3d.cursor-pointer:hover .card-front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.card-3d.cursor-pointer:active .card-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.card-3d.cursor-pointer:hover .card-shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.card-3d.cursor-pointer:active .card-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.card-3d:focus:not(:focus-visible) {
  outline: none;
}
</style>
