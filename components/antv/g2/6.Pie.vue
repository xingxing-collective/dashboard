<template>
  <div>
    <div class="text-center text-sm font-semibold">
      简单饼图
    </div>
    <div
      ref="container"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];
type Data = (typeof data)[0];
const { container } = useChartRender((chart) => {
  chart.coordinate({ type: 'theta', outerRadius: 0.8 });
  chart
    .interval()
    .data(data)
    .transform({ type: 'stackY' })
    .encode('y', 'percent')
    .encode('color', 'item')
    .legend('color', {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    })
    .label({
      position: 'outside',
      text: (data: Data) => `${data.item}: ${data.percent * 100}%`,
    })
    .tooltip((data) => ({
      name: data.item,
      value: `${data.percent * 100}%`,
    }));
});
</script>
