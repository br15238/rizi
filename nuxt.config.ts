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
    head: {
      style: [
        {
          innerHTML: `
            html, body {
              margin: 0;
              font-family: "Noto Sans TC", sans-serif;
            }

            #__nuxt {
              width: 100%;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
              
            .contentWrap { width: 100%; max-width:1080px; margin:0 auto; display:flex; flex-direction:column; padding:0 4%; }
            img { display:inline; vertical-align:middle; }
          `
        }
      ]
    }
  }
})
