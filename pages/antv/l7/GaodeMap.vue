<template>
  <div class="grid grid-cols-1">
    <div ref="container" class="absolute w-full h-full" />
  </div>
</template>
<script setup lang="ts">
const { container } = useMap({
  center: [107.054293, 35.246265],
  zoom: 4.056
}, MapType.GAODE)
useSeoMeta({
  title: 'L7 | AntV | Dashboard',
  description:'L7 | AntV | Dashboard'
})
</script>