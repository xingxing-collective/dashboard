<template>
  <div>
    <div class="text-center text-sm font-semibold">
      仪表盘
    </div>
    <div
      ref="container"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
const { container } = useChartRender((chart) => {
  chart
    .gauge()
    .data({
      value: {
        target: 120,
        total: 400,
        name: 'score',
      },
    })
    .legend(false);
});
</script>
