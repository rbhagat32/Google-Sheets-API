import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://script.google.com/macros/s/AKfycbwC9JaNiyYHwUKYcgxaxBZD8h1iWQePXVxQwOA-nywutLlwQWBrETiPtlQFNh07ops/exec",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
