<template>
  <div>
    <div class="grid grid-cols-1 px-4 py-4">
      <template v-for="(component, key) in components" :key="key">
        <component :is="component" class="col-span-1 h-96" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const components = import.meta.glob<Component>(['~/components/antv/s2/**'], {
  eager: true,
  import: 'default',
});
useSeoMeta({
  title: 'S2 | AntV | Dashboard',
  description: 'S2 | AntV | Dashboard',
});
</script>
