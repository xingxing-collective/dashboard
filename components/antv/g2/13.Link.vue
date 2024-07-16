<template>
  <div>
    <div class="text-center text-sm font-semibold">
      箭线
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
    .link()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
    })
    .encode('x', ['POP_1980', 'POP_2015'])
    .encode('y', ['R90_10_1980', 'R90_10_2015'])
    .encode('color', (d: any) => d.R90_10_2015 - d.R90_10_1980)
    .scale('x', { type: 'log' })
    .style('arrow', true)
    .style('arrowSize', 6)
    .axis('x', {
      labelFormatter: '~s',
      labelTransform: 'rotate(90)',
    })
    .legend(false)
    .tooltip({ title: { channel: 'color', value: '.1f' } });
});
</script>
