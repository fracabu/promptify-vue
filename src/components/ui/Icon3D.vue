<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'bg-purple-600',
  size: 'md'
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  }
  return sizes[props.size]
})

const iconSizes = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }
  return sizes[props.size]
})

// Extract color for shadow and edge - using darker, more defined values like Button3D
const getColorHsl = computed(() => {
  const colorMap: Record<string, { shadow: string, edge: string }> = {
    'bg-purple-600': {
      shadow: 'hsla(270, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(270, 94%, 20%) 0%, hsl(270, 80%, 36%) 8%, hsl(270, 57%, 35%) 92%, hsl(270, 90%, 23%) 100%)'
    },
    'bg-blue-500': {
      shadow: 'hsla(222, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(222, 94%, 20%) 0%, hsl(222, 80%, 36%) 8%, hsl(222, 57%, 35%) 92%, hsl(222, 90%, 23%) 100%)'
    },
    'bg-emerald-500': {
      shadow: 'hsla(160, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(160, 94%, 20%) 0%, hsl(160, 80%, 36%) 8%, hsl(160, 57%, 35%) 92%, hsl(160, 90%, 23%) 100%)'
    },
    'bg-pink-500': {
      shadow: 'hsla(340, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(340, 94%, 20%) 0%, hsl(340, 80%, 36%) 8%, hsl(340, 57%, 35%) 92%, hsl(340, 90%, 23%) 100%)'
    },
    'bg-orange-500': {
      shadow: 'hsla(27, 86%, 33%, 0.25)',
      edge: 'linear-gradient(to left, hsl(27, 86%, 33%) 0%, hsl(48, 100%, 32%) 8%, hsl(23, 89%, 40%) 92%, hsl(36, 95%, 22%) 100%)'
    },
    'bg-red-500': {
      shadow: 'hsla(0, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(0, 94%, 20%) 0%, hsl(0, 80%, 36%) 8%, hsl(0, 57%, 35%) 92%, hsl(0, 90%, 23%) 100%)'
    },
    'bg-teal-500': {
      shadow: 'hsla(180, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(180, 94%, 20%) 0%, hsl(180, 80%, 36%) 8%, hsl(180, 57%, 35%) 92%, hsl(180, 90%, 23%) 100%)'
    },
    'bg-cyan-600': {
      shadow: 'hsla(190, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(190, 94%, 20%) 0%, hsl(190, 80%, 36%) 8%, hsl(190, 57%, 35%) 92%, hsl(190, 90%, 23%) 100%)'
    },
    'bg-rose-500': {
      shadow: 'hsla(350, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(350, 94%, 20%) 0%, hsl(350, 80%, 36%) 8%, hsl(350, 57%, 35%) 92%, hsl(350, 90%, 23%) 100%)'
    },
    'bg-amber-500': {
      shadow: 'hsla(45, 86%, 33%, 0.25)',
      edge: 'linear-gradient(to left, hsl(45, 86%, 33%) 0%, hsl(45, 100%, 32%) 8%, hsl(45, 89%, 40%) 92%, hsl(45, 95%, 22%) 100%)'
    },
    'bg-indigo-500': {
      shadow: 'hsla(240, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(240, 94%, 20%) 0%, hsl(240, 80%, 36%) 8%, hsl(240, 57%, 35%) 92%, hsl(240, 90%, 23%) 100%)'
    },
    'bg-violet-500': {
      shadow: 'hsla(260, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(260, 94%, 20%) 0%, hsl(260, 80%, 36%) 8%, hsl(260, 57%, 35%) 92%, hsl(260, 90%, 23%) 100%)'
    },
    'bg-lime-500': {
      shadow: 'hsla(85, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(85, 94%, 20%) 0%, hsl(85, 80%, 36%) 8%, hsl(85, 57%, 35%) 92%, hsl(85, 90%, 23%) 100%)'
    },
    'bg-green-600': {
      shadow: 'hsla(122, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(128, 94%, 20%) 0%, hsl(155, 100%, 32%) 8%, hsl(143, 62%, 23%) 92%, hsl(123, 85%, 28%) 100%)'
    },
    'bg-sky-500': {
      shadow: 'hsla(200, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(200, 94%, 20%) 0%, hsl(200, 80%, 36%) 8%, hsl(200, 57%, 35%) 92%, hsl(200, 90%, 23%) 100%)'
    },
    'bg-blue-600': {
      shadow: 'hsla(222, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(261, 94%, 20%) 0%, hsl(253, 80%, 36%) 8%, hsl(252, 57%, 35%) 92%, hsl(266, 90%, 23%) 100%)'
    },
    'bg-fuchsia-500': {
      shadow: 'hsla(290, 92%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(290, 94%, 20%) 0%, hsl(290, 80%, 36%) 8%, hsl(290, 57%, 35%) 92%, hsl(290, 90%, 23%) 100%)'
    },
    'bg-slate-600': {
      shadow: 'hsla(215, 45%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(215, 45%, 20%) 0%, hsl(215, 45%, 36%) 8%, hsl(215, 45%, 35%) 92%, hsl(215, 45%, 23%) 100%)'
    },
    'bg-stone-500': {
      shadow: 'hsla(30, 30%, 28%, 0.25)',
      edge: 'linear-gradient(to left, hsl(30, 30%, 20%) 0%, hsl(30, 30%, 36%) 8%, hsl(30, 30%, 35%) 92%, hsl(30, 30%, 23%) 100%)'
    }
  }
  
  return colorMap[props.color] || colorMap['bg-purple-600']
})
</script>

<template>
  <div class="icon-3d">
    <span class="icon-shadow" :style="{ background: getColorHsl.shadow }"></span>
    <span class="icon-edge" :style="{ background: getColorHsl.edge }"></span>
    <div :class="['icon-front', props.color, sizeClasses]">
      <div :class="iconSizes">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-3d {
  position: relative;
  display: inline-block;
  user-select: none;
}

.icon-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transform: translateY(2px);
}

.icon-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.icon-front {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  color: white;
  transform: translateY(-3px);
}
</style>
