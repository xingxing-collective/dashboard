<template>
  <div>
    <div class="text-center text-sm font-semibold">
      股票图
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
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/aapl2.json',
      transform: [
        {
          type: 'map',
          callback: (d: any) => ({
            ...d,
            Date: new Date(d.Date),
          }),
        },
      ],
    })
    .scale('color', {
      domain: [1, 0, -1],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    });

  chart
    .link()
    .encode('x', 'Date')
    .encode('y', ['Low', 'High'])
    .encode('color', (d: any) => Math.sign(d.Close - d.Open)) // For LegendFilter.
    .style('stroke', 'black')
    .tooltip({
      title: (d) => d.Date.toLocaleString(),
      items: [
        { field: 'Low', name: 'low' },
        { field: 'High', name: 'high' },
      ],
    });

  chart
    .link()
    .encode('x', 'Date')
    .encode('y', ['Open', 'Close'])
    .encode('color', (d: any) => Math.sign(d.Close - d.Open))
    .style('radius', 2)
    .style('fillOpacity', 1)
    .style('lineWidth', 4)
    .style('lineCap', 'round')
    .tooltip({
      title: '',
      items: [
        { field: 'Open', name: 'open' },
        { field: 'Close', name: 'close' },
      ],
    });

  chart.interaction('tooltip', { shared: true, groupName: false });
});
</script>
