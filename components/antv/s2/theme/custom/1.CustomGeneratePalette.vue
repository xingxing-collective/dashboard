<template>
  <div class="w-full">
    <div class="flex items-center justify-center gap-4">
      <div class="text-center text-sm font-semibold">
        主题色自动生成色板
      </div>
      <UPopover mode="hover" :popper="{ strategy: 'absolute' }">
        <template #default="{ open }">
          <UButton variant="ghost" square :class="[open && 'bg-gray-50 dark:bg-gray-800']" aria-label="Color picker">
            <UIcon
name="i-heroicons-swatch-20-solid" class="w-5 h-5"
              :style="{ color: typeof colors === 'string' ? colors : (colors as any).hex }" />
          </UButton>
        </template>
        <template #panel>
          <div class="p-2">
            <ChromePicker v-model="colors" />
          </div>
        </template>
      </UPopover>
    </div>
    <div ref="container" />
  </div>
</template>

<script setup lang="ts">
import { Chrome as ChromePicker } from '@ckpack/vue-color';

const { container, dataCfg, colors } = useSheetRender('pivot');
dataCfg.value = await $fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json'
);
colors.value = '#EA1720';
</script>
