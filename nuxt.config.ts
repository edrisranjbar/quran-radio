// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '@@/assets/css/index.css'
  ],
  app: {
    head: {
      htmlAttrs: { class: 'dark', lang: 'en' },
      title: 'Quran Radio – Tahqiq & Tartil | Online Quran Radio',
      meta: [
        { name: 'description', content: 'Listen to Quran Radio online. Two stations: Tahqiq (slow, precise) and Tartil (measured, melodious). Mobile-first, elegant Islamic design.' },
        { name: 'keywords', content: 'Quran Radio, Online Quran Radio, Tahqiq, Tartil, Islamic Radio, Quran Recitation, Listen Quran' },
        { property: 'og:title', content: 'Quran Radio – Tahqiq & Tartil' },
        { property: 'og:description', content: 'Stream beautiful Quran recitation online with Tahqiq and Tartil stations.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/quran-icon.svg' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      socketUrl: process.env.NUXT_PUBLIC_SOCKET_URL || (process.env.NODE_ENV === 'production' ? 'https://online-nour-cast.ir' : 'http://localhost:3001')
    }
  }
})