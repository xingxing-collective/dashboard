<template>
  <div class="w-full">
    <div class="text-center text-sm font-semibold">
      明细表模式
    </div>
    <div ref="container" />
  </div>
</template>

<script setup lang="ts">
const { container, dataCfg, options } = useSheetRender('table');
dataCfg.value = {
  fields: {
    columns: ['province', 'city', 'type', 'price', 'cost'],
  },
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
      field: 'price',
      name: '价格',
    },
    {
      field: 'cost',
      name: '成本',
    },
  ],
  data: await $fetch(
    'https://assets.antv.antgroup.com/s2/basic-table-mode.json'
  ),
};
options.value = {
  showSeriesNumber: true,
  placeholder: (_meta) => {
    return '-';
  },
};
</script>
