<template>
  <div class=" col-span-2">
    <div class="text-center text-sm font-semibold">
      迷你图
    </div>
    <div class="containers grid grid-cols-3 grid-rows-2 h-full">
      <div
        ref="line"
        class="col-span-1 h-full"
      />
      <div
        ref="area"
        class="col-span-1 h-full"
      />
      <div
        ref="column"
        class="col-span-1 h-full"
      />
      <div
        ref="pie"
        class="col-span-1 h-full"
      />
      <div class="col-span-1 h-full grid place-items-center">
        <div
          ref="progress"
          class="h-16 w-full"
        />
      </div>
      <div
        ref="ring"
        class="col-span-1 h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { container: line } = useChartRender((chart) => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  chart.data(data);

  chart
    .line()
    .encode('x', (_: any, idx: any) => idx)
    .encode('y', (d: any) => d)
    .encode('shape', 'smooth')
    .animate('enter', { type: 'fadeIn' })
    .label({
      selector: 'last',
      text: (d: any) => d,
      textAlign: 'right',
      textBaseline: 'bottom',
      dx: -10,
      dy: -10,
      connector: true,
      fontSize: 10,
    })
    .axis(false);

  chart.interaction('tooltip', {
    render: (e: any, { _title, items }: Record<'_title' | 'items', any>) =>
      items[0].value,
  });
});
const { container: area } = useChartRender((chart) => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];

  chart.data(data);

  chart.data(data);

  chart
    .area()
    .encode('x', (_: any, idx: any) => idx)
    .encode('y', (d: any) => d)
    .encode('shape', 'smooth')
    .scale('y', { zero: true })
    .style('fill', 'linear-gradient(-90deg, white 0%, darkgreen 100%)')
    .style('fillOpacity', 0.6)
    .animate('enter', { type: 'fadeIn' })
    .axis(false);

  chart.interaction('tooltip', {
    render: (e: any, { _title, items }: Record<'_title' | 'items', any>) =>
      items[0].value,
  });
});
const { container: column } = useChartRender((chart) => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  chart.data(data);

  chart
    .interval()
    .encode('x', (_: any, idx: any) => idx)
    .encode('y', (d: any) => d)
    .axis(false);

  chart
    .lineY()
    .data([700])
    .style('arrow', true)
    .style('stroke', 'red')
    .style('lineDash', [2, 2])
    .style('arrow', true)
    .label({
      text: 'value = 700',
      position: 'right',
      dx: -10,
      textBaseline: 'bottom',
    });
  chart.interaction('tooltip', {
    render: (e: any, { _title, items }: Record<'_title' | 'items', any>) =>
      items[0].value,
  });
});
const { container: pie } = useChartRender((chart) => {
  chart.coordinate({ type: 'theta' });

  chart
    .interval()
    .data([
      { id: 'c', value: 526 },
      { id: 'sass', value: 220 },
      { id: 'php', value: 325 },
      { id: 'elixir', value: 561 },
      { id: 'rust', value: 54 },
    ])
    .transform({ type: 'stackY' })
    .encode('y', 'value')
    .encode('color', 'id')
    .style('radius', 4)
    .style('stroke', '#fff')
    .style('lineWidth', 1)
    .animate('enter', { type: 'waveIn' })
    .axis(false)
    .legend(false);

  chart.interaction('tooltip', {
    render: (e: any, { _title, items }: Record<'_title' | 'items', any>) =>
      items[0].value,
  });
});
const { container: progress } = useChartRender((chart) => {
  const progress = 0.7;
  chart.coordinate({
    transform: [{ type: 'transpose' }],
  });

  chart
    .interval()
    .data([1, progress])
    .encode('y', (d: any) => d)
    .encode('color', (d: any, idx: any) => idx)
    .scale('y', { domain: [0, 1] })
    .scale('color', { range: ['#000000', '#a0ff03'] })
    .legend(false)
    .axis(false);

  chart.text().style({
    text: `${progress * 100}%`,
    x: '50%',
    y: '50%',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'bold',
  });

  chart.interaction('tooltip', false);
});
const { container: ring } = useChartRender((chart) => {
  const progress = 0.7;

  chart.coordinate({ type: 'theta', innerRadius: 0.7 });

  chart
    .interval()
    .data([1, progress])
    .encode('y', (d: any) => d)
    .encode('color', (d: any, idx: any) => idx)
    .scale('y', { domain: [0, 1] })
    .scale('color', { range: ['#000000', '#a0ff03'] })
    .animate('enter', { type: 'waveIn' })
    .axis(false)
    .legend(false);
  chart.text().style({
    text: `${progress * 100}%`,
    x: '50%',
    y: '50%',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'bold',
  });

  chart.interaction('tooltip', false);
});
</script>
