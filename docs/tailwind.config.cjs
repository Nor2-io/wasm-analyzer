const starlightPlugin = require('@astrojs/starlight-tailwind');

// Generated color palettes
const accent = { 200: '#c8c2f0', 600: '#714cd0', 900: '#34265f', 950: '#251d40' };
const gray = { 100: '#f5f6fa', 200: '#ebedf5', 300: '#bfc2ca', 400: '#868b9b', 500: '#535767', 700: '#343746', 800: '#232633', 900: '#16181e' };

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [starlightPlugin()],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
}