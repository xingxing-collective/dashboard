<template>
  <div>
    <template v-for="(component, key) in components" :key="key">
      <component :is="component" />
    </template>
  </div>
</template>
<script setup lang="ts">
const components = import.meta.glob<Component>([
  '~/components/antv/g6/**'
], {
  eager: true,
  import: 'default'
})
</script>