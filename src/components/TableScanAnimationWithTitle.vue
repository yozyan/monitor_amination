<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex items-center space-x-2">
      <h3 class="text-sm font-medium text-gray-600">Database Table Scan</h3>
      <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
        {{ timer.toFixed(1) }}s
      </span>
    </div>
    
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

      <!-- Gradient Overlay with Title -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-300/60 to-transparent rounded-b-xl flex items-end justify-between pb-3 pl-4 pr-4">
          <h4 class="text-gray-800 text-sm font-medium text-left">Scanning datasource…</h4>
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

const tables = Array.from({ length: 16 }, (_, i) => i)

let phaseTimer: ReturnType<typeof setTimeout> | null = null
let scanTimer: ReturnType<typeof setInterval> | null = null
let timerInterval: ReturnType<typeof setInterval> | null = null

const handleReplay = () => {
  key.value += 1
  timer.value = 0
  isRunning.value = true
}

const startAnimation = () => {
  // Clear any existing timers
  if (phaseTimer) clearTimeout(phaseTimer)
  if (scanTimer) clearInterval(scanTimer)
  
  phase.value = 'input'
  scanPosition.value = 0
  finalHighlightedTable.value = null
  isRunning.value = true
  timer.value = 0
  
  // Input phase (500ms)
  phaseTimer = setTimeout(() => {
    phase.value = 'loading'
    
    // Loading phase (800ms)
    phaseTimer = setTimeout(() => {
      phase.value = 'scanning'
      
      // Scanning animation
      let currentPosition = 0
      scanTimer = setInterval(() => {
        scanPosition.value = currentPosition
        currentPosition = (currentPosition + 1) % tables.length
        
        // After 1.5 seconds of scanning, highlight final table and complete
        if (currentPosition === 0) {
          setTimeout(() => {
            if (scanTimer) clearInterval(scanTimer)
            finalHighlightedTable.value = 5 // Highlight table 5
            phase.value = 'complete'
            isRunning.value = false
          }, 200)
        }
      }, 100)
    }, 800)
  }, 500)
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
  if (phaseTimer) clearTimeout(phaseTimer)
  if (scanTimer) clearInterval(scanTimer)
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; width: 0; }
  to { opacity: 1; width: 4rem; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.4); }
  50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-pulse-glow {
  animation: pulse-glow 1s ease-in-out infinite;
}
</style>