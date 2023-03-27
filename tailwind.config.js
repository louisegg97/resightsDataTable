/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './component/**/*.{vue,js}',
    './component/test.vue',
    './component/userData.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
