<template>
  <div>
    <div class="text-center text-sm font-semibold">
      风向量场
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
    .vector()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
    })
    .encode('x', 'longitude')
    .encode('y', 'latitude')
    .encode(
      'rotate',
      ({ u, v }: { u: any; v: any }) => (Math.atan2(v, u) * 180) / Math.PI
    )
    .encode('size', ({ u, v }: { u: any; v: any }) => Math.hypot(v, u))
    .encode('color', ({ u, v }: { u: any; v: any }) => Math.hypot(v, u))
    .scale('size', { range: [6, 20] })
    .scale('color', { palette: 'viridis' })
    .axis('x', { grid: false })
    .axis('y', { grid: false })
    .legend(false)
    .tooltip({ title: { channel: 'color', value: '.1f' } });
});
</script>
