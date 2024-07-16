<script setup lang="ts">
const route = useRoute();
const links = ref([
  {
    id: 'home',
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H'],
    },
  },
  {
    id: 'AntV',
    label: 'AntV',
    icon: 'i-heroicons-adjustments-horizontal',
    defaultOpen: route.path.startsWith('/antv'),
    children: [
      {
        label: 'G2',
        icon: 'i-heroicons-chart-bar',
        to: '/antv/g2',
      },
      {
        label: 'S2',
        icon: 'i-heroicons-table-cells',
        to: '/antv/s2',
      },
      {
        label: 'L7',
        icon: 'i-heroicons-map-16-solid',
        defaultOpen: route.path.startsWith('/antv/l7'),
        children: [
          {
            label: 'GaodeMap',
            to: '/antv/l7/gaodemap',
            tooltip: {
              text: '高德',
            },
          },
          {
            label: 'TencentMap',
            to: '/antv/l7/tencentmap',
            tooltip: {
              text: '腾讯',
            },
          },
          {
            label: 'MapLibreMap',
            to: '/antv/l7/maplibremap',
            tooltip: {
              text: 'MapLibre',
            },
          },
        ],
      },
      {
        label: 'X6',
        icon: 'i-hugeicons-flow-connection',
        defaultOpen: route.path.startsWith('/antv/x6'),
        children: [
          {
            label: 'Flowchart',
            to: '/antv/x6/flowchart',
            tooltip: {
              text: '流程图',
            },
          },
        ],
      },
    ],
    tooltip: {
      text: 'AntV',
    },
  },
]);
</script>

<template>
  <DashboardLayout>
    <DashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <DashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <div class="w-full">
            <UButton color="gray" to="/" variant="ghost" class="w-full">
              <UIcon name="i-logos-nuxt-icon" class=" w-5 h-5" />
              <span class="truncate text-gray-900 dark:text-white font-semibold">Dashboard</span>
            </UButton>
          </div>
        </template>
      </DashboardNavbar>
      <DashboardSidebar>
        <DashboardSidebarLinks :links="links" />

        <UDivider />
        <div class="flex-1" />
        <UDivider class="sticky bottom-0" />
      </DashboardSidebar>
    </DashboardPanel>
    <DashboardPage>
      <DashboardPanel grow>
        <DashboardNavbar>
          <template #right>
            <DashboardHeader>
              <template #right>
                <ColorPicker />
                <ColorModeButton />
                <UButton to="https://github.com/xcodenix/dashboard" target="_blank" icon="i-simple-icons-github"
                  aria-label="GitHub" v-bind="($ui.button.secondary as any)" />
              </template>
            </DashboardHeader>
          </template>
        </DashboardNavbar>
        <DashboardPanelContent>
          <slot />
        </DashboardPanelContent>
      </DashboardPanel>
    </DashboardPage>
  </DashboardLayout>
</template>
