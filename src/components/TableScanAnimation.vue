<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex items-center space-x-2">
      <h3 class="text-sm font-medium text-gray-600">Database Table Scan</h3>
      <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
        {{ timer.toFixed(1) }}s
      </span>
    </div>
    
    <!-- 原始背景: bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-md -->
    <div class="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl relative">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-red-300 rounded-full"></div>
          <div class="w-2 h-2 bg-yellow-300 rounded-full"></div>
          <div class="w-2 h-2 bg-green-300 rounded-full"></div>
        </div>
      </div>

      <!-- Query Input Area -->
      <div class="mb-3">
        <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 h-8 flex items-center">
          <div v-if="phase === 'input'" class="flex items-center space-x-1">
            <div class="w-1 h-3 bg-purple-400 animate-pulse"></div>
            <div class="w-16 h-2 bg-purple-300/60 rounded animate-fade-in"></div>
          </div>
          <div v-else class="w-20 h-2 bg-purple-400 rounded"></div>
        </div>
      </div>

      <!-- Tables Grid -->
      <div class="grid grid-cols-4 gap-2 h-[120px]">
        <div
          v-for="table in tables"
          :key="table"
          :class="[
            'w-full h-6 rounded transition-all duration-300 flex items-center justify-center relative',
            {
              'bg-gray-200 animate-pulse': phase === 'loading',
              'bg-purple-400 shadow-sm': finalHighlightedTable === table,
              'bg-gray-300/60': phase !== 'loading' && finalHighlightedTable !== table,
              'ring-2 ring-purple-400/50 animate-pulse-glow': phase === 'scanning' && scanPosition === table
            }
          ]"
          :style="{
            animationDelay: `${table * 80}ms`,
            opacity: phase === 'loading' ? 0.6 : 1
          }"
        >
        </div>
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

interface TableScanAnimationProps {
  onReset: () => void
}

defineProps<TableScanAnimationProps>()

const phase = ref<'input' | 'loading' | 'scanning' | 'complete'>('input')
const scanPosition = ref(0)
const finalHighlightedTable = ref<number | null>(null)
const key = ref(0)
const timer = ref(0)
const isRunning = ref(false)

const tables = Array.from({ length: 12 }, (_, i) => i)

let timers: ReturnType<typeof setTimeout>[] = []
let scanInterval: ReturnType<typeof setInterval> | null = null
let timerInterval: ReturnType<typeof setInterval> | null = null

const handleReplay = () => {
  key.value += 1
  phase.value = 'input'
  scanPosition.value = 0
  finalHighlightedTable.value = null
  timer.value = 0
  isRunning.value = true
}

const startAnimation = () => {
  // Clear existing timers
  timers.forEach(clearTimeout)
  timers = []
  if (scanInterval) {
    clearInterval(scanInterval)
    scanInterval = null
  }

  isRunning.value = true
  timer.value = 0

  // Phase 1: Input simulation (500ms)
  timers.push(setTimeout(() => {
    phase.value = 'loading'
  }, 500))

  // Phase 2: Tables loading (1000ms)
  timers.push(setTimeout(() => {
    phase.value = 'scanning'
  }, 1500))

  // Phase 3: Scanning animation (2500ms)
  scanInterval = setInterval(() => {
    scanPosition.value = (scanPosition.value + 1) % 12
  }, 200)

  // Phase 4: Complete (4000ms)
  timers.push(setTimeout(() => {
    if (scanInterval) {
      clearInterval(scanInterval)
      scanInterval = null
    }
    phase.value = 'complete'
    // Highlight one final table (table 5 for example)
    finalHighlightedTable.value = 5
    isRunning.value = false
  }, 4000))
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
  timers.forEach(clearTimeout)
  if (scanInterval) {
    clearInterval(scanInterval)
  }
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(147, 51, 234, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.6);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-pulse-glow {
  animation: pulse-glow 0.4s ease-in-out infinite;
}
</style>