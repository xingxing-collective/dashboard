// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'AntV - Dashboard',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Dashboard built with AntV' }
      ],
      htmlAttrs: {
        lang: 'en-US'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  ssr: false,
  ui: {
    icons: 'all'
  },
  runtimeConfig: {
    public: {
      map: {
        gaode: {
          token: import.meta.env.GAODE_MAP_TOKEN
        },
        baidu: {
          token: import.meta.env.BAIDU_MAP_TOKEN
        },
        tencent: {
          token: import.meta.env.TENCENT_MAP_TOKEN
        },
        mapLibre: {
          token: import.meta.env.MAPLIBRE_MAP_TOKEN
        },
        mapbox: {
          token: import.meta.env.MAPBOX_MAP_TOKEN
        }
      }
    }
  },
  components: {
    dirs: [{
      path: '~/components/ui',
      prefix: 'Dashboard'
    }, '~/components']
  },
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@vueuse/nuxt', '@nuxt/eslint'],
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
      include: ['vue3-smooth-dnd']
    }
  }
})