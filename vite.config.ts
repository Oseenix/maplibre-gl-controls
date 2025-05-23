import { defineConfig } from 'vite';

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
});
