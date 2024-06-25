// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'AntV - Dashboard',
      titleTemplate: '%s',
      htmlAttrs: {
        lang: 'en-US'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  router: {
    options: {
      hashMode: true
    }
  },
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons']
  },
  components: {
    dirs: [{
      path: '~/components/ui',
      prefix: 'Dashboard'
    }, '~/components']
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],
  tailwindcss: {
    configPath: './tailwind.config.ts'
  },
  css: ['./assets/css/main.css', './assets/css/scrollbars.css'],
  colorMode: {
    preference: 'light'
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild'
    },
    optimizeDeps: {
      include: ['vue3-smooth-dnd', '@antv/g-lite']
    }
  }
})
