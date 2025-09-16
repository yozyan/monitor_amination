<template>
  <div class="flex flex-col items-center space-y-8">
    <!-- First Row -->
    <div class="flex flex-wrap justify-center gap-8">
      <!-- Table Scan Animation -->
      <TableScanAnimation :on-reset="() => { }" />

      <!-- Data Query Animation -->
      <QueryAnimation :on-complete="() => { }" />

      <!-- Dashboard Animation -->
      <DashboardAnimation :on-reset="() => { }" />
    </div>

    <!-- Second Row with Title Overlays -->
    <div class="flex flex-wrap justify-center gap-8">
      <!-- Table Scan Animation with Title -->
      <TableScanAnimationWithTitle :on-reset="() => { }" />

      <!-- Data Query Animation with Title -->
      <QueryAnimationWithTitle :on-complete="() => { }" />

      <!-- Dashboard Animation with Title -->
      <DashboardAnimationWithTitle :on-reset="() => { }" />
    </div>

    <!-- Third Row: Wireframe to Skeleton Animation -->
    <div class="flex flex-wrap justify-center gap-8">
      <WireframeLineLoadingAnimation />
      <PanelLoadingAnimation />
    </div>
  </div>
</template>

<script setup lang="ts">
import QueryAnimation from './QueryAnimation.vue'
import DashboardAnimation from './DashboardAnimation.vue'
import TableScanAnimation from './TableScanAnimation.vue'
import QueryAnimationWithTitle from './QueryAnimationWithTitle.vue'
import DashboardAnimationWithTitle from './DashboardAnimationWithTitle.vue'
import TableScanAnimationWithTitle from './TableScanAnimationWithTitle.vue'
import WireframeLineLoadingAnimation from './WireframeLineLoadingAnimation.vue'
import PanelLoadingAnimation from './PanelLoadingAnimation.vue'
</script>