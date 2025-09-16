<template>
  <div class="bg-white border border-gray-200 rounded-lg p-1 h-16 shadow-lg">
    <!-- Single Panel -->
    <div v-if="type === 'single'" class="h-full flex flex-col justify-center">
      <div class="h-3 bg-blue-400 rounded mb-2 w-full"></div>
      <div class="h-10 bg-blue-500 rounded flex items-center justify-center">
        <div class="w-12 h-3 bg-white/70 rounded"></div>
      </div>
    </div>

    <!-- Quad Panel -->
    <div v-else-if="type === 'quad'" class="grid grid-cols-2 gap-1 h-full">
      <div
        v-for="i in 4"
        :key="i"
        class="bg-teal-400 rounded p-1 flex flex-col justify-center items-center"
      >
        <div class="w-3 h-1 bg-white/70 rounded mb-0.5"></div>
        <div class="w-4 h-1 bg-white/50 rounded"></div>
      </div>
    </div>

    <!-- Pie Panel -->
    <div v-else-if="type === 'pie'" class="flex items-center justify-center h-full">
      <div class="relative w-12 h-12">
        <svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="none" stroke="#E5E7EB" stroke-width="6" />
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="none"
            stroke="#8B5CF6"
            stroke-width="6"
            stroke-dasharray="113"
            stroke-dashoffset="28"
            stroke-linecap="round"
          />
          <circle cx="24" cy="24" r="12" fill="none" stroke="#E5E7EB" stroke-width="4" />
          <circle
            cx="24"
            cy="24"
            r="12"
            fill="none"
            stroke="#06B6D4"
            stroke-width="4"
            stroke-dasharray="75"
            stroke-dashoffset="30"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>

    <!-- Line Panel -->
    <div v-else-if="type === 'line'" class="h-full flex items-center justify-center p-1">
      <svg class="w-full h-10" viewBox="0 0 40 24">
        <defs>
          <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.05" />
          </linearGradient>
        </defs>
        <path d="M2,20 Q8,16 12,14 T20,10 T28,12 T38,8 L38,22 L2,22 Z" fill="url(#fillGradient)" />
        <path d="M2,20 Q8,16 12,14 T20,10 T28,12 T38,8" stroke="#3B82F6" stroke-width="2" fill="none" />
      </svg>
    </div>

    <!-- Multiline Panel -->
    <div v-else-if="type === 'multiline'" class="h-full flex items-center justify-center p-1">
      <svg class="w-full h-10" viewBox="0 0 40 24">
        <defs>
          <linearGradient id="fillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.02" />
          </linearGradient>
          <linearGradient id="fillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.02" />
          </linearGradient>
        </defs>
        <path d="M2,14 Q8,10 12,12 T20,8 T28,10 T38,6 L38,22 L2,22 Z" fill="url(#fillGradient1)" />
        <path d="M2,20 Q8,18 12,16 T20,18 T28,16 T38,18 L38,22 L2,22 Z" fill="url(#fillGradient2)" />
        <path d="M2,14 Q8,10 12,12 T20,8 T28,10 T38,6" stroke="#3B82F6" stroke-width="1.5" fill="none" />
        <path d="M2,20 Q8,18 12,16 T20,18 T28,16 T38,18" stroke="#8B5CF6" stroke-width="1.5" fill="none" />
      </svg>
    </div>

    <!-- Bar Panel -->
    <div v-else-if="type === 'bar'" class="h-full flex items-end justify-between px-1 pb-3 gap-0.5">
      <div
        v-for="(height, i) in barHeights"
        :key="i"
        class="bg-blue-500 rounded-sm"
        :style="{ width: '5px', height: `${height * 4}px` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PanelProps {
  type: 'single' | 'quad' | 'pie' | 'line' | 'multiline' | 'bar'
}

defineProps<PanelProps>()

const barHeights = [4, 6, 3, 5, 7, 4, 5]
</script>
