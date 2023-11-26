// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	runtimeConfig: {
		public: {
			apiBase: process.env.API_LINK || 'https://reqres.in/api'
		}
	},
	devtools: {enabled: true},
	css: ['~/assets/scss/main.scss'],
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],
	typescript: {
		typeCheck: true
	}
})
