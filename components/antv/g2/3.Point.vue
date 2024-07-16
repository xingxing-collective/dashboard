<template>
  <div>
    <div class="text-center text-sm font-semibold">
      散点图
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
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');
});
</script>
