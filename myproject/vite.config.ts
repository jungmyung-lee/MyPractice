/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  server: {
    hmr: {
      overlay: false, // ✅ 에러 메시지를 브라우저 오버레이에 띄우지 않음
    },
    port: 5173, // 기본 포트 설정
  },
  define: {
    'process.env': {}, // ✅ 환경 변수 사용 가능하게 설정
  },
  logLevel: 'info', // ✅ 터미널에서도 로그 출력
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
