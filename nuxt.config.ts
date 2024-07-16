// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'AntV - Dashboard',
      titleTemplate: '%s',
      meta: [
        //eslint-disable-next-line
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard built with AntV',
        },
      ],
      htmlAttrs: {
        lang: 'en-US',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  ssr: false,
  ui: {
    icons: 'all',
  },
  runtimeConfig: {
    public: {
      map: {
        gaode: {
          token: import.meta.env.GAODE_MAP_TOKEN,
          themes: {
            dark: 'amap://styles/darkblue',
            light: 'light',
          },
        },
        baidu: {
          token: import.meta.env.BAIDU_MAP_TOKEN,
          themes: {
            dark: '344b005fd5b4220a55241c25e7733e81',
            light: 'c17b1c2b528429a7b04bbc8d3eb8bae9',
          },
        },
        tencent: {
          token: import.meta.env.TENCENT_MAP_TOKEN,
        },
        mapLibre: {
          token: import.meta.env.MAPLIBRE_MAP_TOKEN,
          themes: {
            dark: `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${import.meta.env.MAPLIBRE_MAP_TOKEN}`,
            light: `https://api.maptiler.com/maps/dataviz/style.json?key=${import.meta.env.MAPLIBRE_MAP_TOKEN}`,
          },
        },
        mapbox: {
          token: import.meta.env.MAPBOX_MAP_TOKEN,
          themes: {
            dark: 'mapbox://styles/mapbox/dark-v11',
            light: 'mapbox://styles/mapbox/light-v11',
          },
        },
      },
    },
  },
  components: {
    dirs: [
      {
        path: '~/components/ui',
        prefix: 'Dashboard',
      },
      '~/components',
    ],
  },
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@vueuse/nuxt', '@nuxt/eslint'],
  tailwindcss: {
    configPath: './tailwind.config.ts',
  },
  css: ['./assets/css/main.css', './assets/css/scrollbars.css'],
  colorMode: {
    preference: 'light',
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
    optimizeDeps: {
      include: ['vue3-smooth-dnd'],
    },
  },
});
