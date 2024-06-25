<template>
  <div>
    <div class="grid grid-cols-3">
      <template
        v-for="[key, component] in components"
        :key="key"
      >
        <component
          :is="component"
          class="col-span-1 py-4 h-96"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const componentModules = import.meta.glob<Component>('~/components/antv/g2/**', {
  eager: true,
  import: 'default'
})
const components = computed(() => {
  return Object.entries(componentModules).sort((a, b) => {
    return parseInt(a[0].match(/\/(\d+)\./)![1], 10) - parseInt(b[0].match(/\/(\d+)\./)![1], 10)
  })
})
</script>
