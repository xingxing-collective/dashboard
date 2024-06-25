<script setup lang="ts">
const route = useRoute()

const links = ref([{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'AntV',
  label: 'AntV',
  icon: 'i-heroicons-adjustments-horizontal',
  defaultOpen: route.path.startsWith('/antv'),
  children: [{
    label: 'G2',
    icon: 'i-heroicons-chart-bar',
    to: '/antv/g2',
    exact: true
  }, {
    label: 'S2',
    icon: 'i-heroicons-table-cells',
    to: '/antv/s2',
    exact: true
  }],
  tooltip: {
    text: 'AntV'
  }
}])
</script>

<template>
  <DashboardLayout>
    <DashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <DashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <div class="w-full">
            <UButton
              color="gray"
              to="/"
              variant="ghost"
              class="w-full"
            >
              <UAvatar
                src="https://avatars.githubusercontent.com/u/23360933?s=200&v=4"
                size="2xs"
              />
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
                <UButton
                  to="https://github.com/xingxingmofashu/XBoot"
                  target="_blank"
                  icon="i-simple-icons-github"
                  aria-label="GitHub"
                  v-bind="($ui.button.secondary as any)"
                />
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
</template>../../../components/color-picker/index.vue
