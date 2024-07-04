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
  const colorMode = useColorMode()
  // get gaode and tencent and baidu maps tokens
  const { public: { map: { gaode, baidu, tencent, mapLibre, mapbox } } } = useRuntimeConfig()

  const mapInstance = shallowRef<MapInstanceType>()
  const scene = shallowRef<Scene>()

  // initialize the map themes
  const themesConfig = computed(() => {
    // TODO: tencent map theme only has one
    return new Map<MapType, Record<string, MapStyle>>()
      .set(MapType.GAODE, gaode.themes)
      .set(MapType.BAIDU, baidu.themes)
      .set(MapType.MAPBOX, mapbox.themes)
      .set(MapType.MAPLIBRE, mapLibre.themes).get(type)
  })

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

  function setTheme(colorMode: string) {
    if (colorMode === 'light')
      config.style = themesConfig.value?.light
    else config.style = themesConfig.value?.dark
  }

  function render() {
    if (scene.value)
      scene.value?.destroy()

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
    scene.value = new Scene({
      id: container.value!,
      map: mapInstance.value!,
    })
  }

  watch(colorMode, (color) => {
    setTheme(color.value)
    render()
  })

  onMounted(() => {
    setTheme(colorMode.value)
    render()
  })

  return { container, scene, mapInstance, useBaiduMap, useGaodeMap, useTencentMap, useMapLibre }
}