<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex items-center space-x-2">
      <h3 class="text-sm font-medium text-gray-600">Data Query Process</h3>
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

      <!-- Search Input Area -->
      <div class="mb-3">
        <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 h-8 flex items-center">
          <div v-if="phase === 'input'" class="flex items-center space-x-1">
            <div class="w-1 h-3 bg-blue-400 animate-pulse"></div>
            <div class="w-8 h-2 bg-blue-300/60 rounded animate-fade-in"></div>
          </div>
          <div v-else class="w-12 h-2 bg-blue-400 rounded"></div>
        </div>
      </div>

      <!-- Records Area -->
      <div class="space-y-1 h-[120px] overflow-hidden">
        <div
          v-for="record in records"
          :key="record"
          :class="[
            'h-4 rounded transition-all duration-300 flex items-center px-2',
            phase === 'loading' 
              ? 'bg-gray-200 animate-pulse' 
              : highlightedRecords.includes(record)
                ? 'bg-emerald-400 shadow-sm'
                : 'bg-gray-300/60',
            phase === 'searching' && searchPosition === record ? 'ring-2 ring-blue-400/50 animate-pulse-glow' : ''
          ]"
          :style="{
            animationDelay: `${record * 100}ms`,
            opacity: phase === 'loading' ? 0.6 : 1
          }"
        >
          <div v-if="phase !== 'loading'" class="flex items-center space-x-1 w-full">
            <div :class="[
              'w-2 h-2 rounded-full',
              highlightedRecords.includes(record) ? 'bg-white/80' : 'bg-gray-400/60'
            ]"></div>
            <div :class="[
              'h-1 rounded flex-1',
              highlightedRecords.includes(record) ? 'bg-white/60' : 'bg-gray-400/40'
            ]"></div>
            <div :class="[
              'w-3 h-1 rounded',
              highlightedRecords.includes(record) ? 'bg-white/60' : 'bg-gray-400/40'
            ]"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated Title Description -->
    <div class="text-center">
      <h4 class="text-sm font-medium text-gray-700 mb-1">
        <span class="inline-block animate-pulse">Searching data…</span>
      </h4>
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

interface Props {
  onComplete: () => void
}

const props = defineProps<Props>()

const phase = ref<'input' | 'loading' | 'searching' | 'complete'>('input')
const searchPosition = ref(0)
const highlightedRecords = ref<number[]>([])
const key = ref(0)
const timer = ref(0)
const isRunning = ref(false)

const records = Array.from({ length: 8 }, (_, i) => i)

let timers: ReturnType<typeof setTimeout>[] = []
let searchInterval: ReturnType<typeof setInterval> | null = null
let timerInterval: ReturnType<typeof setInterval> | null = null

const handleReplay = () => {
  key.value += 1
  phase.value = 'input'
  searchPosition.value = 0
  highlightedRecords.value = []
  timer.value = 0
  isRunning.value = true
  startAnimation()
}

const startAnimation = () => {
  // Clear existing timers
  timers.forEach(clearTimeout)
  timers = []
  if (searchInterval) clearInterval(searchInterval)
  
  isRunning.value = true
  timer.value = 0

  // Phase 1: Input simulation (500ms)
  timers.push(setTimeout(() => {
    phase.value = 'loading'
  }, 500))

  // Phase 2: Records loading (1000ms)
  timers.push(setTimeout(() => {
    phase.value = 'searching'
  }, 1500))

  // Phase 3: Search animation (2000ms)
  const targetHighlights = [1, 2, 4, 6] // Fixed records to highlight
  let highlightIndex = 0
  
  searchInterval = setInterval(() => {
    searchPosition.value = (searchPosition.value + 1) % 8
    
    // Progressively highlight fixed records during search
    if (searchPosition.value === targetHighlights[highlightIndex] && highlightIndex < targetHighlights.length) {
      if (!highlightedRecords.value.includes(searchPosition.value)) {
        highlightedRecords.value.push(searchPosition.value)
        highlightIndex++
      }
    }
  }, 250)

  // Phase 4: Complete and transition (3500ms)
  timers.push(setTimeout(() => {
    if (searchInterval) clearInterval(searchInterval)
    phase.value = 'complete'
    isRunning.value = false
    
    // Trigger slide transition after brief pause
    setTimeout(() => {
      props.onComplete()
    }, 300)
  }, 3500))
}

watch(isRunning, (newValue) => {
  if (timerInterval) clearInterval(timerInterval)
  
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
  if (searchInterval) clearInterval(searchInterval)
  if (timerInterval) clearInterval(timerInterval)
})
</script>