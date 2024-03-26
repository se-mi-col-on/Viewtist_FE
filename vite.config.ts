import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-15-164-226-60.ap-northeast-2.compute.amazonaws.com:8083',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
      },
      '/chat': {
        target: 'http://ec2-3-35-234-97.ap-northeast-2.compute.amazonaws.com:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat/, ''),
        secure: false,
        ws: true,
      },
      '/live': {
        target: 'http://ec2-3-35-234-97.ap-northeast-2.compute.amazonaws.com:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/live/, ''),
        secure: false,
        ws: true,
      },
    },
  },
});
