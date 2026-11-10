<script setup lang="ts">
import AccessGate from './components/AccessGate.vue'

// Accesso su richiesta: l'app è visibile solo se VITE_OPEN_ACCESS === 'true'.
// Per riaprirla a tutti (es. dopo l'attivazione dell'abbonamento) impostare
// la variabile su Vercel e ripubblicare.
const openAccess = import.meta.env.VITE_OPEN_ACCESS === 'true'
</script>

<template>
  <AccessGate v-if="!openAccess" />
  <div v-else class="min-h-screen">
    <RouterView />
  </div>
</template>
