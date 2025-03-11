import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: 'https://wa2.dev',
	integrations: [
		starlight({
			title: "WASM Analyzer",
			logo: {
				replacesTitle: true,
				light: "./public/logo-light.svg",
				dark: "./public/logo-dark.svg",
				alt: "WASM Analyzer Logo"
			},
			customCss: [
				// Path to your Tailwind base styles:
				'./src/styles/tailwind.css',
			],
			favicon: "/favicon.svg",
			head: [
				// Add ICO favicon fallback for Safari.
				{
				  tag: 'link',
				  attrs: {
					rel: 'icon',
					href:'/favicon.ico',
					sizes: '32x32',
				  },
				},
			],
			lastUpdated: true,
			social: {
			github: 'https://github.com/Nor2-io/wasm-analyzer'
			},
			locales: {
				// TODO: Add translations in other languages
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			sidebar: 
			[
				{
					label: 'WASM Analyzer',
					items: [
						{
							label: 'Getting Started',
							link: '/'
						},
						{
							label: 'Metadata',
							link: '/metadata/'
						},
						{
							label: 'Actions',
							autogenerate: {directory: 'actions' }
						},
						{
							label: 'Core WASM',
							autogenerate: {directory: 'core-wasm' }
						},
						{
							label: 'Component Model',
							items: 
							[   
								{
									label: 'Wit Inspection',
									link: '/component-model/wit/'
								},
								{
									label: 'Components',
									link: '/component-model/components/'
								},
								{
									label: 'Dependencies',
									link: '/component-model/dependencies/'
								}
							]
						},
						{
							label: 'Custom Sections',
							autogenerate: {directory: 'custom-sections'},
						},
					],
				}, 
				
				{
					label: 'WASM',
					collapsed: true,
					items: [
						{
							label: 'Introduction to WebAssembly',
							link: "wasm/"
						},
						{
							label: 'Short Description of WebAssembly',
							link: "wasm/1-description-of-webassembly"
						},
					{
						label: 'Building Blocks',
						items: 
							[   
								{
									label: 'Building blocks: Introduction',
									title: 'Introduction',
									link: '/wasm/building-blocks/'
								},
								{
									label: 'Imports',
									link: '/wasm/building-blocks/1-imports/'
								},
								{
									label: 'Exports',
									link: '/wasm/building-blocks/2-exports/'
								},
								{
									label: 'Functions',
									link: '/wasm/building-blocks/3-functions/'
								},
								{
									label: 'Tables',
									link: '/wasm/building-blocks/4-tables/'
								},
								{
									label: 'Memories',
									link: '/wasm/building-blocks/5-memories/'
								},
								{
									label: 'Globals',
									link: '/wasm/building-blocks/6-globals/'
								},
								{
									label: 'Custom Sections',
									link: '/wasm/building-blocks/7-custom-sections/'
								},
								{
									label: 'Building blocks: Summary',
									title: 'Summary',
									link: '/wasm/building-blocks/8-building-blocks-summary/'
								},
							]
					},
					{
						label: 'Concept and Features',
						items: 
							[   
								{
									label: 'Concepts & features: Introduction',
									title: 'Introduction',
									link: '/wasm/concepts-and-features/'
								},
								{
									label: 'Types',
									link: '/wasm/concepts-and-features/1-types/'
								},
								{
									label: 'Modules',
									link: '/wasm/concepts-and-features/2-modules/'
								},
								{
									label: 'WebAssembly Text (WAT)',
									link: '/wasm/concepts-and-features/3-wat/'
								},
								{
									label: 'The WebAssembly component model',
									link: '/wasm/concepts-and-features/4-component-model/'
								},
								{
									label: 'Wasm Interface Text (WIT)',
									link: '/wasm/concepts-and-features/5-wit/'
								},
								{
									label: 'Wasmtime',
									link: '/wasm/concepts-and-features/6-wasmtime/'
								},
								{
									label: 'Concepts & features: Summary',
									title: 'Summary',
									link: '/wasm/concepts-and-features/7-concepts-and-features-summary/'
								},
							]
					},
				],
					
				}, 
				{
					label: 'Debugging',
					items: 
						[
							{
								label: 'DWARF',
								link: '/debugging/dwarf/'
							},
						]
				}, 
				{
					label: 'Plugins',
					autogenerate: {directory: 'plugins', },
				}, 
				{
					label: 'Contributing',
					autogenerate: {directory: 'contributing', },
				}
			]
		}), 
		tailwind({
			// Disable the default base styles:
			applyBaseStyles: false,
		})
	],
	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: {
		service: {
		entrypoint: 'astro/assets/services/sharp'
		}
	}
});