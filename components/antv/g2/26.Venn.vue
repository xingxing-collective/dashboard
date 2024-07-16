<template>
  <div>
    <div class="text-center text-sm font-semibold">
      韦恩图
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
    .path()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
      transform: [
        {
          type: 'venn',
          padding: 8,
          sets: 'sets',
          size: 'size',
          as: ['key', 'path'],
        },
      ],
    })
    .encode('d', 'path')
    .encode('color', 'key')
    .label({
      position: 'inside',
      text: (d: any) => d.label || '',
      transform: [{ type: 'contrastReverse' }],
    })
    .style('opacity', (d: any) => (d.sets.length > 1 ? 0.001 : 0.5))
    .state('inactive', { opacity: 0.2 })
    .state('active', { opacity: 0.8 })
    .interaction('elementHighlight', true)
    .legend(false);
});
</script>
