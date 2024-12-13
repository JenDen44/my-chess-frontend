import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
            include: '**/*.svg',
        })
    ],
    server:{
        proxy: {
            '/api': {
                target: 'http://192.168.1.101:8089/chessGame/',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/ws': {
                target: 'ws://192.168.1.101:8089/chessGame/',
                ws: true
            },
        }
    },
});
