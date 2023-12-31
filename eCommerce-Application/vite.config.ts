import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    publicDir: './public',
    build: {
        outDir: './dist',
        emptyOutDir: true,
        sourcemap: true,
        target: 'esnext',
    },
    resolve: {
        alias: {
            'node-fetch': 'isomorphic-fetch',
        },
    },
});
