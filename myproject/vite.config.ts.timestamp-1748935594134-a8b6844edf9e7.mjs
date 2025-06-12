// vite.config.ts
import legacy from "file:///workspaces/ionic-react-1/my-ionic-react-app/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import react from "file:///workspaces/ionic-react-1/my-ionic-react-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///workspaces/ionic-react-1/my-ionic-react-app/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  server: {
    hmr: {
      overlay: false
      // ✅ 에러 메시지를 브라우저 오버레이에 띄우지 않음
    },
    port: 5173
    // 기본 포트 설정
  },
  define: {
    "process.env": {}
    // ✅ 환경 변수 사용 가능하게 설정
  },
  logLevel: "info",
  // ✅ 터미널에서도 로그 출력
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy9pb25pYy1yZWFjdC0xL215LWlvbmljLXJlYWN0LWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvaW9uaWMtcmVhY3QtMS9teS1pb25pYy1yZWFjdC1hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvaW9uaWMtcmVhY3QtMS9teS1pb25pYy1yZWFjdC1hcHAvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGxlZ2FjeSgpXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIGhtcjoge1xuICAgICAgb3ZlcmxheTogZmFsc2UsIC8vIFx1MjcwNSBcdUM1RDBcdUI3RUMgXHVCQTU0XHVDMkRDXHVDOUMwXHVCOTdDIFx1QkUwQ1x1Qjc3Q1x1QzZCMFx1QzgwMCBcdUM2MjRcdUJDODRcdUI4MDhcdUM3NzRcdUM1RDAgXHVCNzQ0XHVDNkIwXHVDOUMwIFx1QzU0QVx1Qzc0Q1xuICAgIH0sXG4gICAgcG9ydDogNTE3MywgLy8gXHVBRTMwXHVCQ0Y4IFx1RDNFQ1x1RDJCOCBcdUMxMjRcdUM4MTVcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ3Byb2Nlc3MuZW52Jzoge30sIC8vIFx1MjcwNSBcdUQ2NThcdUFDQkQgXHVCQ0MwXHVDMjE4IFx1QzBBQ1x1QzZBOSBcdUFDMDBcdUIyQTVcdUQ1NThcdUFDOEMgXHVDMTI0XHVDODE1XG4gIH0sXG4gIGxvZ0xldmVsOiAnaW5mbycsIC8vIFx1MjcwNSBcdUQxMzBcdUJCRjhcdUIxMTBcdUM1RDBcdUMxMUNcdUIzQzQgXHVCODVDXHVBREY4IFx1Q0Q5Q1x1QjgyNVxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBzZXR1cEZpbGVzOiAnLi9zcmMvc2V0dXBUZXN0cy50cycsXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsT0FBTyxZQUFZO0FBQ25CLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUc3QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBO0FBQUEsSUFDWDtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUEsRUFDUjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUE7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsVUFBVTtBQUFBO0FBQUEsRUFDVixNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsRUFDZDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
