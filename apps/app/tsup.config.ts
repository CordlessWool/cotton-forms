import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/exports/lib.ts'],
	outDir: 'dist/lib',
	format: ['cjs', 'esm'],
	external: ['valibot', 'bson'],
	dts: true,
	clean: true,
	splitting: false
});
