// https://nuxt.com/docs/api/configuration/nuxt-config
import critical from 'vite-plugin-critical'

const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt'
  ],
  runtimeConfig: {
    public: {
      emailServiceId: '',
      emailPublicKey: ''
    }
  },
  antd: {
    extractStyle: true,
    components: [],
    icons: [],
  },
  css: [
    '@/assets/variable.css',
    '@/assets/global.css'
  ],
  app: {
    baseURL: isProd ? '/rizi/' : '/',
  },
  vite: {
    plugins: [
      isProd && critical({
        criticalBase: '.output/public',
        criticalPages: [{ url: '/rizi/', template: 'index.html' }],
        inline: true,
        extract: true,
        minify: true,
        width: 1300,
        height: 900,
      })
    ].filter(Boolean)
  }
})
