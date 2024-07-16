import { Chart } from '@antv/g2';

type RuntimeOptions = ConstructorParameters<typeof Chart>[0];

export const useChart = (options?: RuntimeOptions) => {
  const { value } = useColorMode();
  if (options && !options.theme) {
    options.theme = value;
  }
  return new Chart(options);
};

export function useChartRender(
  hook?: (chart: ReturnType<typeof useChart>) => void
) {
  const container = ref<HTMLElement>();
  const hasRendered = ref(false);
  const colorMode = useColorMode();
  const { createObserver } = useObserver();
  const g2 = shallowRef<ReturnType<typeof useChart>>();
  const renderChart = async () => {
    if (hasRendered.value) return;
    if (g2.value) g2.value.destroy();
    g2.value = useChart({
      container: container.value!,
      autoFit: true,
    });
    if (hook) hook(g2.value);
    await g2.value.render();
    hasRendered.value = true;
  };

  //TODO: Set chart Theme
  watch(colorMode, () => {});
  onMounted(() => {
    createObserver(
      container.value!,
      async () => {
        await renderChart();
      },
      {
        threshold: 0.5,
      }
    );
  });

  return {
    container,
    rendered: readonly(hasRendered),
  };
}
