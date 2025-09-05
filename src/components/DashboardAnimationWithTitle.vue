<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex items-center space-x-2">
      <h3 class="text-sm font-medium text-gray-600">Dashboard Loading</h3>
      <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
        {{ timer.toFixed(1) }}s
      </span>
    </div>
    
    <div :key="key" class="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl relative">
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

      <!-- Gradient Overlay with Title -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-300/60 to-transparent rounded-b-xl flex items-end justify-between pb-3 pl-4 pr-4">
          <h4 class="text-gray-800 text-sm font-medium text-left">Generating monitor board…</h4>
          <button class="text-gray-800 text-lg font-bold hover:text-gray-600 transition-colors">×</button>
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