<template>
  <div>
    <div class="text-center text-sm font-semibold">
      基础折线图
    </div>
    <div
      ref="container"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const { container } = useChartRender((chart) => {
  chart
    .data(data)
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('x', {
      range: [0, 1],
    })
    .scale('y', {
      domainMin: 0,
      nice: true,
    });

  chart.line().label({
    text: 'value',
    style: {
      dx: -10,
      dy: -12,
    },
  });
  chart.point().style('fill', 'white').tooltip(false);
});
</script>
