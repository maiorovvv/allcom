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
			// svgr options: https://react-svgr.com/docs/options/
			svgrOptions: {
				// ...
			},

			// esbuild options, to transform jsx to js
			esbuildOptions: {
				// ...
			},

			// A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
			include: '**/*.svg?react',

			//  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
			exclude: '',
		}),
	],
	server: {
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
