<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex items-center space-x-2">
      <h3 class="text-sm font-medium text-gray-600">Dashboard Loading</h3>
      <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
        {{ timer.toFixed(1) }}s
      </span>
    </div>
    
    <!-- 原始背景: bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-md -->
    <div :key="key" class="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-red-300 rounded-full"></div>
          <div class="w-2 h-2 bg-yellow-300 rounded-full"></div>
          <div class="w-2 h-2 bg-green-300 rounded-full"></div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-3 gap-2 h-[140px]">
        <Panel
          v-for="(panel, index) in panels"
          :key="index"
          :type="panel.type"
          :delay="panel.delay"
        />
      </div>
    </div>

    <button
      @click="handleReplay"
      class="flex items-center space-x-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg hover:bg-white/30 transition-all duration-200 text-gray-700 text-sm font-medium"
    >
      <RotateCcw :size="14" />
      <span>Replay</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import Panel from './Panel.vue'

interface DashboardAnimationProps {
  onReset: () => void
}

defineProps<DashboardAnimationProps>()

const key = ref(0)
const timer = ref(0)
const isRunning = ref(false)

let timerInterval: ReturnType<typeof setInterval> | null = null
let stopTimer: ReturnType<typeof setTimeout> | null = null

const panels = [
  { type: 'single' as const, delay: 500 },
  { type: 'quad' as const, delay: 800 },
  { type: 'pie' as const, delay: 1100 },
  { type: 'line' as const, delay: 1400 },
  { type: 'multiline' as const, delay: 1700 },
  { type: 'bar' as const, delay: 2000 },
]

const handleReplay = () => {
  key.value += 1
  timer.value = 0
  isRunning.value = true
}

const startAnimation = () => {
  if (stopTimer) {
    clearTimeout(stopTimer)
  }
  
  isRunning.value = true
  timer.value = 0
  
  // Stop timer when all panels are loaded (2000ms + some buffer)
  stopTimer = setTimeout(() => {
    isRunning.value = false
  }, 2500)
}

watch(key, () => {
  startAnimation()
})

watch(isRunning, (newValue) => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  
  if (newValue) {
    timerInterval = setInterval(() => {
      timer.value += 0.1
    }, 100)
  }
})

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  if (stopTimer) {
    clearTimeout(stopTimer)
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes draw-line {
  from {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
  to {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
  }
}

@keyframes grow-bar {
  from {
    height: 0;
  }
  to {
    height: var(--target-height);
  }
}

@keyframes draw-circle {
  from {
    stroke-dashoffset: 113;
  }
  to {
    stroke-dashoffset: 28;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-draw-line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-line 1s ease-out forwards;
}

.animate-draw-circle {
  stroke-dasharray: 113;
  stroke-dashoffset: 113;
  animation: draw-circle 1.2s ease-out forwards;
}

.animate-grow-bar {
  height: 0;
  animation: grow-bar 0.8s ease-out forwards;
}
</style>