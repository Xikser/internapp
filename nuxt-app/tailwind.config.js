/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./assets/**/*.{vue,js,scss}',
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	variants: {
		extend: {},
	},
	plugins: [],
};
