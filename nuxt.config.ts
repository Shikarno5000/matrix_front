const isDev = process.env.NODE_ENV !== 'production'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    // "nuxt-security",
    'nuxt-headlessui',
    '@nuxtjs/html-validator',
    '@nuxtjs/eslint-module',
    "nuxt-lodash",
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true
      }
      }]
  ],
  headlessui: {
    prefix: 'Headless'
  },
  typescript: {
    strict: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'dark',
    classSuffix: '',
  },
  devtools: { enabled: true },
})
