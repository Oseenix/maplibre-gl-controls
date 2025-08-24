import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import fg from 'fast-glob';

// Function to automatically find all HTML files in the example directory
async function getHtmlInputs() {
  const htmlFiles = await fg('example/*.html');
  
  const inputs: Record<string, string> = {};
  htmlFiles.forEach((file: string) => {
    const name = file.replace('example/', '').replace('.html', '');
    inputs[name] = file;
  });
  
  return inputs;
}

export default defineConfig({
	root: './example',
	base: './',
	build: {
		outDir: '../dist',
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
		rollupOptions: {
			input: await getHtmlInputs(),
		},
	},
  plugins: [
    visualizer({
      filename: './dist/stats.html',
      open: false,
    }),
  ],
});
