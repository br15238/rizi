// https://nuxt.com/docs/api/configuration/nuxt-config
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
      domain: '',
      pathBase: '',
      emailServiceId: '',
      emailPublicKey: ''
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
    baseURL: process.env.NUXT_PUBLIC_PATH_BASE,
  }
})
