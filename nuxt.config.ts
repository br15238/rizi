// https://nuxt.com/docs/api/configuration/nuxt-config
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
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      pathBase: process.env.NUXT_PUBLIC_PATH_BASE,
      emailServiceId: process.env.NUXT_PUBLIC_EMAIL_SERVICE_ID,
      emailPublicKey: process.env.NUXT_PUBLIC_EMAIL_PUBLIC_KEY
    }
  },
  antd: {
    extractStyle: true,
    components: [],
    icons: []
  },
  css: [
    '@/assets/variable.css',
    '@/assets/global.css'
  ],
  app: {
    baseURL: isProd ? '/rizi/' : '/'
  }
})
