import type {
  Pagination,
  S2DataConfig,
  S2MountContainer,
  S2Options,
  ThemeCfg,
  TooltipContentType,
} from '@antv/s2';
import { PivotSheet, TableSheet, generatePalette, getPalette } from '@antv/s2';
import type { ColorInput } from '@ctrl/tinycolor';

export type SheetType =
  | 'pivot'
  | 'table'
  | 'gridAnalysis'
  | 'strategy'
  | 'editable';

export function useSheet(
  sheetType: SheetType,
  dom: S2MountContainer,
  dataCfg: S2DataConfig,
  options: S2Options<TooltipContentType, Pagination, string | Element, string>
) {
  switch (sheetType) {
    case 'pivot': {
      return new PivotSheet(dom, dataCfg, options);
    }
    case 'table': {
      options.height =
        options.height || typeof dom === 'string'
          ? Number(
              document.querySelector(dom as string)?.parentElement?.clientHeight
            ) -
            Number(
              document.querySelector(dom as string)?.previousElementSibling
                ?.clientHeight
            )
          : Number(dom.parentElement?.clientHeight) -
            Number(dom.previousElementSibling?.clientHeight);
      return new TableSheet(dom, dataCfg, options);
    }
    default: {
      throw new Error('sheet type is not supported');
    }
  }
}

/**
 * Render the Sheet table
 */
export function useSheetRender(sheetType: SheetType = 'pivot') {
  const container = ref<HTMLElement>();
  const dataCfg = ref<S2DataConfig>();
  const options =
    ref<S2Options<TooltipContentType, Pagination, string | Element, string>>();
  const s2 = shallowRef<PivotSheet | TableSheet>();
  const hasRendered = ref(false);
  const colors = ref<ColorInput>();
  const colorMode = useColorMode();
  const { createObserver, createResizeObserver } = useObserver();

  async function renderSheet() {
    if (hasRendered.value) return;
    s2.value = useSheet(
      sheetType,
      container.value!,
      dataCfg.value!,
      options.value!
    );
    await s2.value.render();
    if (colors.value) {
      await setThemeCfg();
    } else {
      if (colorMode.value === 'dark') {
        s2.value!.setThemeCfg({
          name: 'colorful',
          palette: generatePalette({
            ...getPalette('colorful'),
            brandColor: '#000000',
          }),
        });
        await s2.value?.render(false);
      } else {
        s2.value!.setThemeCfg({ name: 'default' });
        await s2.value?.render(false);
      }
    }
    hasRendered.value = true;
  }

  async function changeSheetSize(size: ResizeObserverSize) {
    if (!s2.value) return;
    s2.value!.changeSheetSize(size.inlineSize, size.blockSize);
    await s2.value.render(false);
  }

  async function setThemeCfg() {
    const themeCfg = ref<ThemeCfg>();
    const palette = getPalette('colorful');
    const newPalette = generatePalette({
      ...palette,
      brandColor:
        typeof colors.value === 'string'
          ? colors.value
          : (colors.value as any).hex,
    });
    themeCfg.value = {
      name: 'colorful',
      palette: newPalette,
    };
    s2.value?.setThemeCfg(themeCfg.value);
    await s2.value?.render(false);
  }

  // custom theme
  watch(colors, async () => {
    await setThemeCfg();
  });

  // feat color mode changes
  watch(colorMode, async (newVal) => {
    if (!colors.value) {
      if (newVal.value === 'dark') {
        s2.value!.setThemeCfg({
          name: 'colorful',
          palette: generatePalette({
            ...getPalette('colorful'),
            brandColor: '#000000',
          }),
        });
        await s2.value?.render(false);
      } else {
        s2.value!.setThemeCfg({ name: 'default' });
        await s2.value?.render(false);
      }
    }
  });

  onMounted(() => {
    createObserver(
      container.value!,
      () => {
        renderSheet();
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    createResizeObserver(container.value!, async ([entry]) => {
      const [size] = entry.borderBoxSize || [];
      await changeSheetSize(size);
    });
  });

  return {
    container,
    dataCfg,
    colors,
    options,
    s2,
    rendered: readonly(hasRendered),
  };
}
