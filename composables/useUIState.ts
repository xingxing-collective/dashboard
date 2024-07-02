import { createSharedComposable } from '@vueuse/core'

const _useUIState = () => {
  const route = useRoute()

  const isDashboardSidebarSlidoverOpen = ref(false)
  const isDashboardSearchModalOpen = ref(false)

  function toggleDashboardSearch() {
    if (isDashboardSidebarSlidoverOpen.value) {
      isDashboardSidebarSlidoverOpen.value = false

      setTimeout(() => {
        isDashboardSearchModalOpen.value = !isDashboardSearchModalOpen.value
      }, 200)

      return
    }

    isDashboardSearchModalOpen.value = !isDashboardSearchModalOpen.value
  }

  watch(() => route.path, () => {
    isDashboardSidebarSlidoverOpen.value = false
  })

  return {
    isDashboardSidebarSlidoverOpen,
    isDashboardSearchModalOpen,
    toggleDashboardSearch
  }
}

export const useUIState = createSharedComposable(_useUIState)
