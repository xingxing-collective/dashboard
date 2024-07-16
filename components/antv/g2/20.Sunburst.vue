<template>
  <div>
    <div class="text-center text-sm font-semibold">
      旭日图
    </div>
    <div ref="container" class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { Runtime, corelib, extend } from '@antv/g2';
import { plotlib } from '@antv/g2-extension-plot';

const { createObserver } = useObserver();
const Chart = extend(Runtime, { ...corelib(), ...plotlib() });
const hasRendered = ref(false);
const container = ref<HTMLElement>();

const useChart = () => {
  return new Chart({
    container: container.value,
    autoFit: true,
  });
};
let chart: ReturnType<typeof useChart>;
const renderChart = () => {
  if (hasRendered.value) return;
  if (chart) chart.destroy();
  chart = useChart();
  chart
    .sunburst()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antfincdn/ryp44nvUYZ/coffee.json',
    })
    .animate('enter', { type: 'waveIn' })
    .coordinate({ type: 'polar', innerRadius: 0 });
  chart.render();
  hasRendered.value = true;
};
onMounted(() => {
  createObserver(
    container.value!,
    () => {
      renderChart();
    },
    {
      threshold: 0.75,
    }
  );
});
</script>
