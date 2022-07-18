const env = require('dotenv').config();

const yaMapSettings = {
  apiKey: env.parsed.YAMAP_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
};

const  translation = require('./lang/translation');

module.exports = {
  publicRuntimeConfig: {
    API_TOKEN: process.env.API_TOKEN,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  router: {
    trailingSlash: true
  },

  env: env.parsed,

  head: {
    title: 'Прокат машин без водителя в Сочи',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {hid: 'description', name: 'description', content: 'Прокат машин в Сочи: *✮* без ограничения пробега *✮* скидки до 25% *✮* 350 машин в автопарке *✮* бесплатная подача в аэропорт*✮* Бронируй онлайн!⭐'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  cache: true,

  css: [
    {
      src: '@/assets/styles/main.sass',
      lang: 'sass'
    }
  ],

  plugins: [
    {src:'~plugins/DatetimePlugin', ssr: false},
    {src:'~plugins/Assets'},
    {src:'~plugins/AppConfig'},
    {src: '~/plugins/VuexPersist', ssr: false},
    {src: '~/plugins/MaskPlugin', ssr: false},
    {src: '~/plugins/PhoneComponent', ssr: false},
    {src: '~/plugins/VueYouTube', ssr: false},
    {src: '~/plugins/baseApi', ssr: true},
  ],

  modules: [
    '@nuxtjs/device',
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-lazy-load',
    ['vue-yandex-maps/nuxt', yaMapSettings],
    'nuxt-webfontloader',
    ['nuxt-i18n', {
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
        vueI18n: {
          fallbackLocale: 'ru',
          messages: translation
        }
      }
    ]
  ],

  webfontloader: {
    custom: {
      families: [
        'Roboto:n3,n4,n7',
        'Roboto+Condensed:n7',
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap&subset=cyrillic',
        'https://fonts.googleapis.com/css?family=Roboto+Condensed:700&display=swap&subset=cyrillic',
      ]
    }
  },

  axios: {
    baseURL: 'http://space.autopilotrent.ru',

  },

  loading: { color: '#ff6a28' },

  serverMiddleware: [
    '~/middleware/seo.js'
  ],

  buildModules: [
    'vue-browser-detect-plugin/nuxt'
  ],

  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          maxAge: 60*60*24*5,
          global: true,
          type: 'bearer'
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, url: 'http://space.autopilotrent.ru/token', method: 'post', propertyName: 'access_token' },
          logout: false,
          user: { url: 'http://space.autopilotrent.ru/users/get/me/', method: 'get' }
        },
        // tokenRequired: true,
        tokenType: '',
      },
    },
    cookie: {
      options: {
          sameSite: 'lax',
      },
    },
    redirect: {
      login: '/cabinet',
      home: '/cabinet',
      callback: '/',
      logout: '/'
    }
  },

};

