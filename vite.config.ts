import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		outDir: 'build',
		sourcemap: true,
    emptyOutDir: true,
		lib: {
			entry: 'src/index.ts',
			name: 'MapLibreControls',
			fileName: 'index',
		},
		rollupOptions: {
			external: ['maplibre-gl'],
			output: {
				globals: {
					'maplibre-gl': 'maplibregl',
				},
			},
		},
	},
	test: {
		browser: {
			provider: 'playwright', // or 'webdriverio'
			enabled: true,
			name: 'chromium', // browser name is required
			headless: true,
		},
		coverage: {
			exclude: [
				'example/**', 	// Exclude all files in the example directory
				'build/**', 	// Exclude all files in the build directory
				'dist/**', 		// Exclude all files in the dist directory
				'**/*.test.ts', // Exclude test files themselves from coverage
				'**/__screenshots__/**', // Exclude screenshot directory
				'vite.config.*', // Exclude vite configuration files
			],
		},
	},
});
