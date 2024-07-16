<template>
  <KeepAlive>
    <div class="grid grid-cols-1">
      <div ref="container" class="absolute w-full h-full" />
    </div>
  </KeepAlive>
</template>
<script setup lang="ts">
const { container } = useMap(MapType.MAPBOX);

useSeoMeta({
  title: 'L7 | AntV | Dashboard',
  description: 'L7 | AntV | Dashboard',
});
</script>