<template>
  <div class="flex flex-col items-center space-y-3">
    <!-- Card -->
    <div class="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl">
      <!-- Title placeholder -->
      <div class="mb-3">
        <div :class="[
          'h-4 rounded',
          phase === 'wireframe' ? 'border-2 border-dashed border-gray-400/70' : 'bg-gray-200 animate-pulse'
        ]" style="width: 60%"></div>
      </div>

      <!-- Single value placeholder -->
      <div class="mb-3">
        <div :class="[
          'h-6 rounded',
          phase === 'wireframe' ? 'border-2 border-dashed border-gray-400/70' : 'bg-gray-200 animate-pulse'
        ]" style="width: 40%"></div>
      </div>

      <!-- Line chart area -->
      <div class="relative h-[110px]">
        <!-- Wireframe state: axes + drawing polyline -->
        <svg v-if="phase === 'wireframe'" viewBox="0 0 300 110" class="absolute inset-0 w-full h-full">
          <!-- Axes -->
          <line x1="20" y1="10" x2="20" y2="100" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4 4" />
          <line x1="20" y1="100" x2="290" y2="100" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4 4" />
          <!-- Polyline (wireframe) -->
          <polyline :points="points" fill="none" stroke="#6b7280" stroke-width="2" class="animate-draw-line" />
        </svg>

        <!-- Skeleton state: gray placeholders -->
        <div v-else class="absolute inset-0 px-4 pt-2 pb-3">
          <div class="grid grid-cols-12 gap-2 items-end h-full">
            <div v-for="i in 12" :key="i" class="w-full bg-gray-200 rounded animate-pulse"
              :style="{ height: `${30 + (i % 6) * 10}px` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const phase = ref('wireframe')
let toSkeletonTimer = null

// Simple wave-like points for the line
const points = '20,90 45,75 70,80 95,60 120,70 145,50 170,65 195,55 220,70 245,60 270,78 290,70'

onMounted(() => {
  // Transition from wireframe to skeleton
  toSkeletonTimer = setTimeout(() => {
    phase.value = 'skeleton'
  }, 1400)
})

onUnmounted(() => {
  if (toSkeletonTimer) clearTimeout(toSkeletonTimer)
})
</script>

<style scoped>
@keyframes draw-line {
  from {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
  }

  to {
    stroke-dasharray: 400;
    stroke-dashoffset: 0;
  }
}

.animate-draw-line {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: draw-line 1s ease-out forwards;
}
</style>