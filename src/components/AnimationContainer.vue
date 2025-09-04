<template>
  <div class="flex flex-wrap justify-center gap-8">
    <!-- Data Query Animation -->
    <QueryAnimation :on-complete="() => {}" />

    <!-- Table Scan Animation -->
    <TableScanAnimation :on-reset="() => {}" />

    <!-- Dashboard Animation -->
    <DashboardAnimation :on-reset="() => {}" />
  </div>
</template>

<script setup lang="ts">
import QueryAnimation from './QueryAnimation.vue'
import DashboardAnimation from './DashboardAnimation.vue'
import TableScanAnimation from './TableScanAnimation.vue'
</script>