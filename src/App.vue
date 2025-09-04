<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-8">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Data Processing Animations</h1>
      <p class="text-gray-600">Watch data query, table scanning, and dashboard loading with glassmorphism effects</p>
    </div>
    
    <AnimationContainer />
  </div>
</template>

<script setup lang="ts">
import AnimationContainer from './components/AnimationContainer.vue'
</script>