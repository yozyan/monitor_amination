<template>
  <div class="w-[300px] h-[200px] bg-white border border-gray-200 rounded-xl p-4 shadow-lg flex flex-col gap-4">
    <!-- Top row: Icon + Title/Value -->
    <div class="flex items-center gap-4">
      <!-- Icon Placeholder -->
      <div class="w-12 h-12 border-2 border-dashed border-gray-400/70 rounded-lg flex-shrink-0" />

      <!-- Title and Value Placeholders -->
      <div class="flex flex-col gap-2 flex-grow">
        <div class="h-5 border-2 border-dashed border-gray-400/70 rounded w-3/4" />
        <div class="h-4 border-2 border-dashed border-gray-400/70 rounded w-1/2" />
      </div>
    </div>

    <!-- Bottom row: Chart -->
    <div class="flex-grow rounded-lg flex items-center justify-center">
      <svg
        class="w-full h-full"
        viewBox="0 0 260 100"
      >
        <path
          d="M10,80 Q40,20 80,50 T160,60 T220,40 L250,30"
          stroke="#6b7280"
          stroke-width="2"
          fill="none"
          class="animate-draw-line"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for this pure CSS animation component
</script>

<style scoped>
@keyframes draw-line {
  from {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
  }
  to {
    stroke-dasharray: 500;
    stroke-dashoffset: 0;
  }
}

.animate-draw-line {
  animation: draw-line 2s ease-in-out forwards;
}
</style>
