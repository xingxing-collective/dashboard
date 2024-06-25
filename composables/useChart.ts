import { Chart } from '@antv/g2'

type RuntimeOptions = ConstructorParameters<typeof Chart>[0]

export const useChart = (options?: RuntimeOptions) => {
  const { value } = useColorMode()
  if (options && !options.theme) {
    options.theme = value
  }
  return new Chart(options)
}

export function useChartRender(hook?: (chart: ReturnType<typeof useChart>) => void) {
  const container = ref<HTMLElement>()
  const hasRendered = ref(false)
  const colorMode = useColorMode()
  const { createObserver } = useObserver()

  // bug G2 Instance use ref 
  const renderChart = async () => {
    if (hasRendered.value) return
    const g2: ReturnType<typeof useChart> = useChart({
      container: container.value!,
      autoFit: true
    })
    if (hook)
      hook(g2)
    await g2.render()
    hasRendered.value = true
  }

  //TODO: Set chart Theme
  watch(colorMode, () => {

  })
  onMounted(() => {
    createObserver(container.value!, async () => {
      await renderChart()
    }, {
      threshold: 0.75
    })
  })

  return {
    container,
    rendered: readonly(hasRendered)
  }
}
