<template>
  <div>
    <div ref="container" class="absolute w-full h-full" />
  </div>
</template>
<script setup lang="ts">
const { container } = useMap({
  center: [107.054293, 35.246265],
  zoom: 4.056,
  logoVisible: false,
}, MapType.BAIDU)
</script>