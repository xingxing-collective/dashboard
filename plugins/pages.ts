export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('page:start', () => {
    const route = useRoute()
    const title = route.path !== '/'
      ? `Dashboard  ${route.name?.toString().split('-').map(x => x.replace(/^\w/, c => c.toUpperCase())).join(' - ')}`
      : `AntV Dashboard`
    useSeoMeta({
      title,
      description: 'AntV - Dashboard'
    })
  })
})
