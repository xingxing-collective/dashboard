import { Scene, GaodeMap, BaiduMap, type L7Container, type IMapConfig } from '@antv/l7'

export enum MapType {
  'GAODE' = "GAODE",
  'BAIDU' = "BAIDU"
}
export type MapInstanceType = {
  setContainer: (sceneContainer: L7Container, id: string | HTMLDivElement) => void
}

export const useMap = (config: Partial<IMapConfig<{}>>, type: MapType = MapType.GAODE) => {
  const container = ref<HTMLDivElement>()
  
  // feature set gaode and baidu maps tokens
  const { public: { map } } = useRuntimeConfig()

  const mapInstance = ref<MapInstanceType>()
  const scene = ref<Scene>()

  // initialize the map themes
  const themesConfig = computed(() => {
    return new Map<MapType, Record<'dark' | 'light', string>>()
      .set(MapType.GAODE, { dark: 'amap://styles/darkblue', light: 'light' })
      .set(MapType.BAIDU, { dark: '344b005fd5b4220a55241c25e7733e81', light: 'c17b1c2b528429a7b04bbc8d3eb8bae9' })
  })

  switch (type) {
    case MapType.GAODE:
      config.token = map.amap.token
      mapInstance.value = useGaodeMap()
      break
    case MapType.BAIDU:
      config.token = map.bmap.token
      mapInstance.value = useBaiduMap()
      break
  }

  function useGaodeMap() {
    return new GaodeMap(config)
  }

  function useBaiduMap() {
    return new BaiduMap(config)
  }

  function setTheme(colorMode: 'dark' | 'light') {
    if (colorMode === 'light')
      config.style = themesConfig.value.get(type)?.light
    else config.style = themesConfig.value.get(type)?.dark
  }

  function render() {
    if (scene.value)
      scene.value?.destroy()
    scene.value = new Scene({
      id: container.value!,
      map: mapInstance.value!
    })
  }

  watch(useColorMode(), (color) => {
    setTheme(color.value as 'dark' | 'light')
    render()
  }, {
    immediate: true
  })
  onMounted(() => {
    render()
  })

  return { container, scene, mapInstance, useBaiduMap, useGaodeMap }
}