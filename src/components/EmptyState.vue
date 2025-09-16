<template>
  <div class="flex flex-col items-center text-center p-8">
    <!-- Static Dashboard Illustration -->
    <div class="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl mb-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-3 gap-2 h-[140px]">
        <StaticPanel
          v-for="(panel, index) in panels"
          :key="index"
          :type="panel.type"
        />
      </div>
    </div>

    <!-- Text Content -->
    <h1 class="text-2xl font-semibold text-gray-800 mb-2">
      You haven't created any dashboards yet
    </h1>
    <p class="text-gray-600 mb-6 max-w-sm">
      Click the 'Create' button to start building your first dashboard!
    </p>

    <!-- Call to Action Button -->
    <button
      class="flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
    >
      <Plus :size="18" class="mr-2" />
      Create Dashboard
    </button>
  </div>
</template>

<script setup lang="ts">
import StaticPanel from './StaticPanel.vue'
import { Plus } from 'lucide-vue-next'

const panels = [
  { type: 'single' as const },
  { type: 'quad' as const },
  { type: 'pie' as const },
  { type: 'line' as const },
  { type: 'multiline' as const },
  { type: 'bar' as const },
]
</script>
