import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	// base: '/allcom/',
	// publicPath: '/allcom/',
	plugins: [
		react(),
		svgr({
			// A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
			include: '**/*.svg?react',
		}),
	],
	// define: {
	// 	global: {},
	// 	'process.env': {},
	// },
	server: {
		host: 'localhost',
		proxy: {
			// Конфигурация прокси
			'/ws': {
				target: 'http://localhost:8080', // Замените на URL вашего сервера
				changeOrigin: false,
				secure: false,
				ws: true, // Важно для WebSocket
			},
			// Вы можете добавить другие маршруты прокси здесь
		},
		open: true,
		// force: true,
		// rewrites: [{ from: /^\/allcom\/.*$/, to: '/allcom/index.html' }],
	},
	build: {
		outDir: 'build',
		sourcemap: true,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests',
		mockReset: true,
	},
});
