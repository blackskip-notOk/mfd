import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import typedGenCssModulesPlugin from 'vite-plugin-gen-typed-css-modules'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		modulePreload: false,
		target: 'EsNext',
		minify: false,
		cssCodeSplit: false
	},
	css: {
		devSourcemap: true,
		lightningcss: {
			cssModules: {
				pattern: 'client-[name]-[hash]-[local]'
			}
		},
		transformer: 'lightningcss'
	},
	logLevel: 'warn',
	plugins: [
		react(),
		typedGenCssModulesPlugin(),
		federation({
			name: 'host-app',
			remotes: {
				remoteAuth: 'http://localhost:5001/assets/remoteEntry.js'
			},
			shared: ['react', 'react-dom']
		})
	],
	resolve: {
		alias: [
			// {
			// find: '~i18n',
			// replacement: path.resolve(__dirname, './src/app/i18n')
			// },
		]
	},
	server: {
		host: '0.0.0.0',
		open: true,
		port: 7777,
		strictPort: true
	}
})
