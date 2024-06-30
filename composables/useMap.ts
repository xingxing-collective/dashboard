import { Scene, type L7Container, type IMapConfig, type MapStyle } from '@antv/l7'
import { GaodeMap, BaiduMap, TencentMap, MapLibre, Mapbox } from '@antv/l7-maps'

export enum MapType {
  'GAODE' = "GAODE",
  'BAIDU' = "BAIDU",
  "TENCENT" = "TENCENT",
  "MAPLIBRE" = "MAPLIBRE",
  "MAPBOX" = "MAPBOX"
}
export type MapInstanceType = {
  setContainer: (sceneContainer: L7Container, id: string | HTMLDivElement) => void
}

export const useMap = (type: MapType, config: Partial<IMapConfig<{}>> = {},) => {
  const container = ref<HTMLDivElement>()

  // get gaode and tencent and baidu maps tokens
  const { public: { map: { gaode, baidu, tencent, mapLibre, mapbox } } } = useRuntimeConfig()

  const mapInstance = ref<MapInstanceType>()
  const scene = ref<Scene>()

  // initialize the map themes
  const themesConfig = computed(() => {
    // TODO: tencent map theme only has one
    return new Map<MapType, Record<'dark' | 'light', MapStyle>>()
      .set(MapType.GAODE, { dark: 'amap://styles/darkblue', light: 'light' })
      .set(MapType.BAIDU, { dark: '344b005fd5b4220a55241c25e7733e81', light: 'c17b1c2b528429a7b04bbc8d3eb8bae9' })
      .set(MapType.MAPBOX, { dark: 'mapbox://styles/mapbox/dark-v11', light: 'mapbox://styles/mapbox/light-v11' })
      .set(MapType.MAPLIBRE, {
        dark: `https://api.maptiler.com/maps/bright-v2/style.json?key=${mapLibre.token}`,
        light: `https://api.maptiler.com/maps/bright-v2/style.json?key=${mapLibre.token}`
      })
  })

  switch (type) {
    case MapType.GAODE:
      config.token = gaode.token
      mapInstance.value = useGaodeMap()
      break
    case MapType.BAIDU:
      config.token = baidu.token
      mapInstance.value = useBaiduMap()
      break
    case MapType.TENCENT:
      config.token = tencent.token
      mapInstance.value = useTencentMap()
      break
    case MapType.MAPLIBRE:
      config.token = mapLibre.token
      mapInstance.value = useMapLibre()
      break
    case MapType.MAPBOX:
      config.token = mapbox.token
      mapInstance.value = useMapbox()
      break
  }

  function useGaodeMap() {
    return new GaodeMap(config)
  }
  function useBaiduMap() {
    return new BaiduMap(config)
  }
  function useTencentMap() {
    return new TencentMap(config)
  }
  function useMapLibre() {
    return new MapLibre(config)
  }
  function useMapbox() {
    return new Mapbox(config)
  }

  function setTheme(colorMode: 'dark' | 'light') {
    if (colorMode === 'light')
      config.style = themesConfig.value.get(type)?.light
    else config.style = themesConfig.value.get(type)?.dark
  }

  function render() {
    if (!container.value)
      return
    if (scene.value)
      scene.value?.destroy()
    scene.value = new Scene({
      id: container.value!,
      map: mapInstance.value!,
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

  return { container, scene, mapInstance, useBaiduMap, useGaodeMap, useTencentMap, useMapLibre }
}