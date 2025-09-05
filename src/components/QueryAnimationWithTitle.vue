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
          <div v-if="searchPhase === 'input'" class="flex items-center space-x-1">
            <div class="w-1 h-3 bg-blue-400 animate-pulse"></div>
            <div class="w-20 h-2 bg-blue-300/60 rounded animate-fade-in"></div>
          </div>
          <div v-else class="w-24 h-2 bg-blue-400 rounded"></div>
        </div>
      </div>

      <!-- Records Display -->
      <div class="space-y-1 h-[120px] overflow-hidden">
        <div
          v-for="(record, index) in records"
          :key="index"
          :class="[
            'h-4 rounded transition-all duration-300',
            {
              'bg-gray-200 animate-pulse': searchPhase === 'loading',
              'bg-green-400': targetHighlights.includes(index) && highlightIndex >= targetHighlights.indexOf(index),
              'bg-gray-300': searchPhase !== 'loading' && (!targetHighlights.includes(index) || highlightIndex < targetHighlights.indexOf(index))
            }
          ]"
          :style="{
            animationDelay: `${index * 100}ms`,
            width: `${record.width}%`
          }"
        >
        </div>
      </div>

      <!-- Gradient Overlay with Title -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-300/60 to-transparent rounded-b-xl flex items-end justify-between pb-3 pl-4 pr-4">
          <h4 class="text-gray-800 text-sm font-medium text-left">Searching data…</h4>
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

interface QueryAnimationProps {
  onComplete: () => void
}

defineProps<QueryAnimationProps>()

const searchPhase = ref<'input' | 'loading' | 'searching' | 'complete'>('input')
const key = ref(0)
const timer = ref(0)
const isRunning = ref(false)
const highlightIndex = ref(-1)

const targetHighlights = [1, 2, 4, 6]

const records = [
  { width: 85 },
  { width: 92 },
  { width: 78 },
  { width: 88 },
  { width: 95 },
  { width: 82 },
  { width: 90 },
  { width: 87 }
]

let searchTimer: ReturnType<typeof setTimeout> | null = null
let highlightTimer: ReturnType<typeof setInterval> | null = null
let timerInterval: ReturnType<typeof setInterval> | null = null

const handleReplay = () => {
  key.value += 1
  timer.value = 0
  isRunning.value = true
}

const startAnimation = () => {
  if (searchTimer) clearTimeout(searchTimer)
  if (highlightTimer) clearInterval(highlightTimer)
  
  searchPhase.value = 'input'
  highlightIndex.value = -1
  isRunning.value = true
  timer.value = 0
  
  searchTimer = setTimeout(() => {
    searchPhase.value = 'loading'
    
    searchTimer = setTimeout(() => {
      searchPhase.value = 'searching'
      
      let currentHighlight = 0
      highlightTimer = setInterval(() => {
        if (currentHighlight < targetHighlights.length) {
          highlightIndex.value = currentHighlight
          currentHighlight++
        } else {
          if (highlightTimer) clearInterval(highlightTimer)
          searchPhase.value = 'complete'
          isRunning.value = false
        }
      }, 400)
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
  if (searchTimer) clearTimeout(searchTimer)
  if (highlightTimer) clearInterval(highlightTimer)
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; width: 0; }
  to { opacity: 1; width: 5rem; }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>