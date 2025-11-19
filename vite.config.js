import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    hmr: {
        host: '13.60.217.81'
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
