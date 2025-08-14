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
      title: 'Quran Radio – Free Online Islamic Radio | Tahqiq & Tartil Stations',
      titleTemplate: '%s | Listen to Beautiful Quran Recitations',
      meta: [
        // Basic SEO
        { name: 'description', content: 'Listen to Quran Radio online for free. Stream beautiful Islamic recitations with Tahqiq (slow, precise) and Tartil (melodious) stations. Available in English, Arabic, and Persian.' },
        { name: 'keywords', content: 'Quran Radio, Online Quran Radio, Islamic Radio, Quran Recitation, Listen Quran Online, Free Islamic Radio, Tahqiq, Tartil, Arabic Radio, Persian Radio, Holy Quran, Quran Streaming, Islamic Audio' },
        { name: 'author', content: 'Quran Radio' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'en, ar, fa' },
        { name: 'revisit-after', content: '7 days' },
        
        // Open Graph
        { property: 'og:title', content: 'Quran Radio – Free Online Islamic Radio | Tahqiq & Tartil Stations' },
        { property: 'og:description', content: 'Stream beautiful Quran recitations online with two specialized stations. Available in multiple languages with elegant dark design.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://online-nour-cast.ir' },
        { property: 'og:site_name', content: 'Quran Radio' },
        { property: 'og:image', content: 'https://online-nour-cast.ir/quran-icon.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'ar_SA' },
        { property: 'og:locale:alternate', content: 'fa_IR' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Quran Radio – Free Online Islamic Radio' },
        { name: 'twitter:description', content: 'Listen to beautiful Quran recitations online with Tahqiq and Tartil stations' },
        { name: 'twitter:image', content: 'https://online-nour-cast.ir/quran-icon.svg' },
        { name: 'twitter:site', content: '@QuranRadio' },
        
        // Mobile & App
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Quran Radio' },
        { name: 'application-name', content: 'Quran Radio' },
        { name: 'msapplication-TileColor', content: '#1B4332' },
        { name: 'theme-color', content: '#1B4332' },
        
        // Additional SEO
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'geo.region', content: 'IR' },
        { name: 'geo.placename', content: 'Iran' },
        { name: 'category', content: 'Religion, Audio, Streaming' },
        { name: 'coverage', content: 'Worldwide' },
        { name: 'distribution', content: 'Global' },
        { name: 'rating', content: 'General' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/quran-icon.svg' },
        { rel: 'apple-touch-icon', href: '/quran-icon.svg' },
        { rel: 'canonical', href: 'https://online-nour-cast.ir' },
        { rel: 'alternate', hreflang: 'en', href: 'https://online-nour-cast.ir' },
        { rel: 'alternate', hreflang: 'ar', href: 'https://online-nour-cast.ir' },
        { rel: 'alternate', hreflang: 'fa', href: 'https://online-nour-cast.ir' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RadioStation',
            name: 'Quran Radio',
            description: 'Free online Islamic radio streaming beautiful Quran recitations',
            url: 'https://online-nour-cast.ir',
            logo: 'https://online-nour-cast.ir/quran-icon.svg',
            sameAs: [
              'https://online-nour-cast.ir'
            ],
            broadcastAffiliateOf: {
              '@type': 'Organization',
              name: 'Quran Radio'
            },
            genre: ['Religious', 'Islamic', 'Spiritual'],
            inLanguage: ['en', 'ar', 'fa'],
            audience: {
              '@type': 'Audience',
              audienceType: 'Muslims, Islamic community, Quran listeners'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            }
          })
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      socketUrl: process.env.NUXT_PUBLIC_SOCKET_URL || (process.env.NODE_ENV === 'production' ? 'https://online-nour-cast.ir' : 'http://localhost:3001')
    }
  }
})