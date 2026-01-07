<script setup lang="ts">
// Simple animated grid overlay
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div class="absolute inset-0 grid-pattern opacity-[0.07] dark:opacity-[0.15]" />
  </div>
</template>

<style scoped>
.grid-pattern {
  background-image:
    linear-gradient(to right, rgba(139, 92, 246, 0.5) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(139, 92, 246, 0.5) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 25s linear infinite;
}

@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}
</style>
