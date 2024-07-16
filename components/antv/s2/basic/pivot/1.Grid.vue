<template>
  <div class="w-full">
    <div class="text-center text-sm font-semibold">
      平铺模式
    </div>
    <div ref="container" />
  </div>
</template>

<script setup lang="ts">
import type { S2DataConfig } from '@antv/s2';

const { container, dataCfg, options } = useSheetRender();
dataCfg.value = {
  ...(await $fetch<S2DataConfig>(
    'https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json'
  )),
  meta: [
    {
      field: 'province',
      name: '省份',
    },
    {
      field: 'city',
      name: '城市',
    },
    {
      field: 'type',
      name: '商品类别',
    },
    {
      field: 'sub_type',
      name: '子类别',
    },
    {
      field: 'number',
      name: '数量',
    },
  ],
};

options.value = {
  hierarchyType: 'grid',
  interaction: {
    enableCopy: true,
    copyWithFormat: true,
    copyWithHeader: true,
  },
};
</script>
