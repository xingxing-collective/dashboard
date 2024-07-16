<template>
  <div>
    <div class="text-center text-sm font-semibold">
      玉珏图
    </div>
    <div
      ref="container"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
const { container } = useChartRender((chart) => {
  chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });

  chart
    .interval()
    .data([
      { question: '问题 1', percent: 0.21 },
      { question: '问题 2', percent: 0.4 },
      { question: '问题 3', percent: 0.49 },
      { question: '问题 4', percent: 0.52 },
      { question: '问题 5', percent: 0.53 },
      { question: '问题 6', percent: 0.84 },
      { question: '问题 7', percent: 1.0 },
      { question: '问题 8', percent: 1.2 },
    ])
    .encode('x', 'question')
    .encode('y', 'percent')
    .encode('color', 'percent')
    .style('stroke', 'white')
    .scale('color', {
      range: '#BAE7FF-#1890FF-#0050B3',
    })
    .axis('y', { tickFilter: (_d: any, i: any) => i !== 0 })
    .legend({
      color: {
        length: 400,
        position: 'bottom',
        layout: { justifyContent: 'center' },
      },
    })
    .animate('enter', { type: 'waveIn', duration: 800 });
});
</script>
