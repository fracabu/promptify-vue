<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'green' | 'orange' | 'blue' | 'purple'
  size?: 'default' | 'sm' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'default'
})

const buttonColors = computed(() => {
  const colors = {
    primary: {
      shadow: 'hsl(340deg 100% 16% / 0.25)',
      edge: 'linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%)',
      front: 'hsl(345deg 100% 47%)'
    },
    green: {
      shadow: 'hsla(122, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(128, 94%, 20%) 0%, hsl(155, 100%, 32%) 8%, hsl(143, 62%, 23%) 92%, hsl(123, 85%, 28%) 100%)',
      front: '#10b981'
    },
    orange: {
      shadow: 'hsla(27, 86%, 33%, 0.25)',
      edge: 'linear-gradient(to left, hsl(27, 86%, 33%) 0%, hsl(48, 100%, 32%) 8%, hsl(23, 89%, 40%) 92%, hsl(36, 95%, 22%) 100%)',
      front: '#f97316'
    },
    blue: {
      shadow: 'hsla(222, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(261, 94%, 20%) 0%, hsl(253, 80%, 36%) 8%, hsl(252, 57%, 35%) 92%, hsl(266, 90%, 23%) 100%)',
      front: '#3b82f6'
    },
    purple: {
      shadow: 'hsla(270, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(270, 94%, 20%) 0%, hsl(270, 80%, 36%) 8%, hsl(270, 57%, 35%) 92%, hsl(270, 90%, 23%) 100%)',
      front: '#a855f7'
    }
  }
  return colors[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-sm py-2 px-6',
    default: 'text-base py-3 px-8',
    lg: 'text-lg py-4 px-10'
  }
  return sizes[props.size]
})
</script>

<template>
  <button class="pushable-3d">
    <span class="shadow-3d" :style="{ background: buttonColors.shadow }"></span>
    <span class="edge-3d" :style="{ background: buttonColors.edge }"></span>
    <span class="front-3d" :class="sizeClasses" :style="{ background: buttonColors.front }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.pushable-3d {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
}

.shadow-3d {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.edge-3d {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.front-3d {
  display: block;
  position: relative;
  border-radius: 12px;
  font-weight: 600;
  color: white;
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.pushable-3d:hover {
  filter: brightness(110%);
}

.pushable-3d:hover .front-3d {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.pushable-3d:active .front-3d {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.pushable-3d:hover .shadow-3d {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.pushable-3d:active .shadow-3d {
  transform: translateY(1px);
  transition: transform 34ms;
}

.pushable-3d:focus:not(:focus-visible) {
  outline: none;
}

.pushable-3d:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.pushable-3d:disabled:hover .front-3d {
  transform: translateY(-4px);
}

.pushable-3d:disabled:hover .shadow-3d {
  transform: translateY(2px);
}
</style>
