<template>
  <div>
    <div class="text-center text-sm font-semibold">
      水波图
    </div>
    <div
      ref="container"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
const { container } = useChartRender((chart) => {
  chart.liquid().data(0.3).style({
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  });
});
</script>
